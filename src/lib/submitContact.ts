export type ContactFields = {
  name: string
  email: string
  phone: string
  service: string
  sourceLang: string
  message: string
}

// Envoi simulé. Avant la mise en ligne, brancher ici un service de formulaire (Web3Forms, Formspree…).
export async function submitContact(_fields: ContactFields): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1200))
}
