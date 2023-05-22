'use client';

import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"

import { RootState, AppDispatch } from "@/store"
import { setSearch } from "@/store/searchSlice"
import PokemonTable from "./PokemonTable";
import { Pokemon } from "@/app/types";
import { useEffect } from "react";
import { pokemonApi } from "@/store/pokemonApi";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const SearchInput = () => {
    const dispatch = useAppDispatch()
    const search = useAppSelector((state) => state.search.search)
    const startupPokemon = useAppSelector((state) => state.search.startupPokemon)
    const data = useAppSelector(
        (state) => {
            return state.pokemonApi.queries[`search("${search}")`]?.data as Pokemon[]
        }
    )

    useEffect(() => {
        dispatch(pokemonApi.endpoints.search.initiate(search))
    }, [dispatch, search])
    
    return (
        <div>
            <div className="mb-6">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 ">Search for Pokemon</label>
                <input 
                    type="text"
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    id="large-input" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div>
                <PokemonTable pokemons={search.length ? data ?? [] : startupPokemon} />
            </div>

            <div>
                <pre>search: {search}</pre>
                <pre>result: {JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    )
}

export default SearchInput