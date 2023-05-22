import { Pokemon } from "@/app/types";
import PokemonTable from "./PokemonTable";
import { store } from "@/store";

const SSRPokemonTable = () => {
    return <PokemonTable pokemons={store.getState().search.startupPokemon} />
}
export default SSRPokemonTable