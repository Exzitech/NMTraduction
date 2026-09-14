import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { SERVICE_IDS } from '../config/site'
import { submitContact, type ContactFields } from '../lib/submitContact'
import { EASE } from '../motion/variants'
import { Button } from './Button'
import { ChevronDownIcon } from './Icons'

type ErrorCode = 'required' | 'email'
type Errors = Partial<Record<keyof ContactFields, ErrorCode>>

const EMPTY: ContactFields = { name: '', email: '', phone: '', service: '', sourceLang: 'farsi', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fields: ContactFields): Errors {
  const errors: Errors = {}
  if (!fields.name.trim()) errors.name = 'required'
  if (!fields.email.trim()) errors.email = 'required'
  else if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = 'email'
  if (!fields.service) errors.service = 'required'
  if (!fields.message.trim()) errors.message = 'required'
  return errors
}

const inputClasses = (invalid: boolean) =>
  `w-full rounded-xl border bg-paper px-4 py-3 text-ink outline-none transition duration-300 placeholder:text-graphite/60 focus:bg-white focus:ring-4 ${
    invalid ? 'border-danger focus:ring-danger/10' : 'border-rule hover:border-coral/40 focus:border-coral focus:ring-coral/15'
  }`

export function ContactForm() {
  const { t } = useTranslation()
  const [fields, setFields] = useState(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const update =
    (key: keyof ContactFields) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = { ...fields, [key]: event.target.value }
      setFields(next)
      if (attempted) setErrors(validate(next))
    }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setAttempted(true)
    const found = validate(fields)
    setErrors(found)

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }

    setStatus('sending')
    await submitContact(fields)
    setStatus('success')
  }

  const reset = () => {
    setFields(EMPTY)
    setErrors({})
    setAttempted(false)
    setStatus('idle')
  }

  const errorText = (key: keyof ContactFields) => {
    const code = errors[key]
    return code ? t(`contact.errors.${code}`) : undefined
  }

  const describedBy = (key: keyof ContactFields) => (errors[key] ? `contact-${key}-error` : undefined)

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-rule border-t-4 border-t-coral bg-white/80 p-6 shadow-[0_40px_80px_-50px_rgba(28,34,48,0.5)] sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <Success key="success" onReset={reset} />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <h3 className="font-display text-2xl text-ink sm:col-span-2">{t('contact.form.title')}</h3>

            <Field id="contact-name" label={t('contact.form.name')} error={errorText('name')}>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                value={fields.name}
                onChange={update('name')}
                placeholder={t('contact.form.namePh')}
                aria-invalid={!!errors.name}
                aria-describedby={describedBy('name')}
                className={inputClasses(!!errors.name)}
              />
            </Field>

            <Field id="contact-email" label={t('contact.form.email')} error={errorText('email')}>
              <input
                id="contact-email"
                name="email"
                type="email"
                dir="ltr"
                autoComplete="email"
                value={fields.email}
                onChange={update('email')}
                placeholder={t('contact.form.emailPh')}
                aria-invalid={!!errors.email}
                aria-describedby={describedBy('email')}
                className={`${inputClasses(!!errors.email)} rtl:text-right`}
              />
            </Field>

            <Field id="contact-phone" label={t('contact.form.phone')}>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                dir="ltr"
                autoComplete="tel"
                value={fields.phone}
                onChange={update('phone')}
                placeholder={t('contact.form.phonePh')}
                className={`${inputClasses(false)} rtl:text-right`}
              />
            </Field>

            <Field id="contact-service" label={t('contact.form.service')} error={errorText('service')}>
              <div className="relative">
                <select
                  id="contact-service"
                  name="service"
                  value={fields.service}
                  onChange={update('service')}
                  aria-invalid={!!errors.service}
                  aria-describedby={describedBy('service')}
                  className={`${inputClasses(!!errors.service)} appearance-none pe-11 ${fields.service ? '' : 'text-graphite/70'}`}
                >
                  <option value="" disabled>
                    {t('contact.form.servicePh')}
                  </option>
                  {SERVICE_IDS.map((id) => (
                    <option key={id} value={id}>
                      {t(`services.items.${id}.title`)}
                    </option>
                  ))}
                  <option value="other">{t('services.other')}</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-graphite" />
              </div>
            </Field>

            <fieldset className="sm:col-span-2">
              <legend className="mb-2 block text-sm font-semibold text-ink">{t('contact.form.sourceLang')}</legend>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['farsi', t('languages.farsi')],
                    ['dari', t('languages.dari')],
                    ['french', t('languages.french')],
                    ['unsure', t('contact.form.unsure')],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className="cursor-pointer rounded-full border border-rule bg-paper px-4 py-2 text-sm font-semibold text-graphite transition duration-300 hover:border-ink/25 has-[:checked]:border-coral has-[:checked]:bg-coral has-[:checked]:text-night has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-coral/25"
                  >
                    <input
                      type="radio"
                      name="sourceLang"
                      value={value}
                      checked={fields.sourceLang === value}
                      onChange={update('sourceLang')}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <Field id="contact-message" label={t('contact.form.message')} error={errorText('message')} className="sm:col-span-2">
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={fields.message}
                onChange={update('message')}
                placeholder={t('contact.form.messagePh')}
                aria-invalid={!!errors.message}
                aria-describedby={describedBy('message')}
                className={`${inputClasses(!!errors.message)} resize-y`}
              />
            </Field>

            <div className="sm:col-span-2">
              <Button type="submit" arrow={status === 'idle'} disabled={status === 'sending'} className="w-full sm:w-auto">
                {status === 'sending' && (
                  <motion.span
                    aria-hidden
                    className="size-4 rounded-full border-2 border-night/30 border-t-night"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                )}
                {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

type FieldProps = { id: string; label: string; error?: string; className?: string; children: ReactNode }

function Field({ id, label, error, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pt-1.5 text-sm text-danger"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Success({ onReset }: { onReset: () => void }) {
  const { t } = useTranslation()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex min-h-[34rem] flex-col items-center justify-center text-center"
    >
      <svg viewBox="0 0 80 80" className="size-24 text-coral" aria-hidden>
        <motion.circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <motion.path
          d="M25 41 L35 51 L56 29"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.55 }}
        />
      </svg>
      <h3 ref={headingRef} tabIndex={-1} className="mt-8 font-display text-3xl text-ink outline-none">
        {t('contact.success.title')}
      </h3>
      <p className="mt-3 max-w-sm text-lg text-graphite">{t('contact.success.text')}</p>
      <Button type="button" variant="secondary" onClick={onReset} className="mt-8">
        {t('contact.success.again')}
      </Button>
    </motion.div>
  )
}
