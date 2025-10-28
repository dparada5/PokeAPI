// import { useState } from 'react'

export const fetchPokemons = async () => {
	try {
		const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
		const data = await response.json()
		return (data.results)
	} catch (error) {
		console.error('Error fetching pokemons: ', error);
		return []
	}
}


export const handleSelectPokemon = async (name: string) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
		const data = await response.json()
		return (data)
	} catch (error) {
		console.error('Error fetching pokemon details: ', error);
		return []
	}
}

export const fetchAllAbilities = async () => {
	try {
		const response = await fetch('https://pokeapi.co/api/v2/ability?limit=300')
		const data = await response.json()
		return data.results || []
	} catch (error) {
		console.error('Error fetching abilities: ', error);
		return []
	}
}

export const getAbilityDetails = async (abilityName: string) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`)
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error fetching ability details: ', error);
		return null
	}
}

export function showPokemonsChoice ({pokemon1, pokemon2} : {pokemon1: any, pokemon2: any}) {
    if (!pokemon1 || !pokemon2) return null

    return (
    <div className="pokemon-preview" style={{marginBottom: 12}}>
      <div style={{textAlign:'center'}}>
        <img src={pokemon1.sprites?.other?.['official-artwork']?.front_default || ''} alt={pokemon1.name} />
        <div style={{textTransform:'capitalize'}}>{pokemon1.name}</div>
      </div>
      <div style={{fontSize: '24px', color:'#64748b'}}>+</div>
      <div style={{textAlign:'center'}}>
        <img src={pokemon2.sprites?.other?.['official-artwork']?.front_default || ''} alt={pokemon2.name} />
        <div style={{textTransform:'capitalize'}}>{pokemon2.name}</div>
      </div>
    </div>
  )
}

//export function showPokemonAbilities