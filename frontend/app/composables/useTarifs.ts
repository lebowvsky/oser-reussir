/**
 * Tarifs actifs exposés par l'API publique.
 * Partagé entre SectionTarifs (rendu de la section) et TheNavbar (affichage
 * conditionnel de l'ancre) : la clé `useFetch` étant commune, une seule
 * requête est émise et les deux composants restent synchronisés.
 */
export interface Tarif {
  id: string
  title: string
  price: string
  description: string
}

export function useTarifs() {
  const config = useRuntimeConfig()
  const baseUrl = import.meta.server ? config.apiBaseServer : config.public.apiBase
  // Clé stable indispensable : l'URL diffère entre le serveur (réseau Docker
  // interne) et le client (localhost). Sans elle, le payload SSR n'est pas
  // transféré au client → mismatch d'hydratation (cf. commit ce4aab3).
  return useFetch<Tarif[]>(`${baseUrl}/tarifs`, {
    key: 'tarifs',
    default: () => [],
  })
}
