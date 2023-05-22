import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'
import { Pokemon } from '@/app/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  console.log(name)
  const pokemonDir = path.join(process.cwd(), 'data')
  const pokemonFileContents = await fs.readFile(
    pokemonDir + '/pokemon.json',
    'utf-8',
  )
  const pokemon: Pokemon[] = JSON.parse(pokemonFileContents)
  const findPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(name?.toLowerCase() ?? ''),
  )
  return NextResponse.json(findPokemon.slice(0, 10))
}
