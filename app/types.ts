export interface Pokemon {
  id: number
  name: string
  type?: string[] | null
  hp: number
  attack: number
  defense: number
  special_attack: number
  special_defense: number
  speed: number
}
