import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import { fetchPokemons, handleSelectPokemon, showPokemonsChoice, fetchAllAbilities, getAbilityDetails } from './pokemons'
import { NavBar, LoginNavBar, HomeNavBar } from './navBar'
import { useLocation } from 'react-router-dom'
import { NewPokemonPage } from './mixedPokemon'

function  LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (email && password) {
      console.log('Login exitoso:', { email, password })
      navigate('/home')
      setEmail('')
      setPassword('')
    } else {
      alert('Por favor completa todos los campos')
    }
  }
  return (
    <>
      <LoginNavBar/>
      <div className="content">
        <h1>PokeAPI</h1>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </div>
          <div>
            <input 
                type="password" 
                value={password} 
                placeholder="Enter you password" 
                onChange={(e) => setPassword(e.target.value)} 
                required
                />
          </div>
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </>
  )
}

function HomePage() {
  const [pokemons, setPokemons] = useState<any[]>([])
  const [selectedPokemon1, setSelectedPokemon1] = useState<any>(null)
  const [selectedPokemon2, setSelectedPokemon2] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true)
      const data = await fetchPokemons()
      setPokemons(data)
      setLoading(false)
    }
    loadPokemons()
  }, [])

  const selectPokemon1 = async (name: string) => {
    const data = await handleSelectPokemon(name)
    setSelectedPokemon1(data)
  }

  const selectPokemon2 = async (name: string) => {
    const data = await handleSelectPokemon(name)
    setSelectedPokemon2(data)
  }

  const handleShowPokemons = () => {
    if (selectedPokemon1 && selectedPokemon2) {
      navigate('/pokemons', { state: { pokemon1: selectedPokemon1, pokemon2: selectedPokemon2} })
    } else {
      alert('Please select two pokemons')
    }
  }

  return (
    <>
      <HomeNavBar/>
      <div className="content">
        <h1>Create your Pokemon</h1>

        <div className="pokemon-container">
          <div className="pokemon-box">
            <select onChange={(e) => selectPokemon1(e.target.value)} defaultValue="">
              <option value="">Select your first Pokemon</option>
              {pokemons.map((pokemon) => (
                <option key={pokemon.name} value={pokemon.name}>
                  {pokemon.name}
                </option>
              ))}
            </select>
          </div>
          <div className="pokemon-box">
            <select onChange={(e) => selectPokemon2(e.target.value)} defaultValue="">
              <option value="">Select your second Pokemon</option>
              {pokemons.map((pokemon) => (
                <option key={pokemon.name} value={pokemon.name}>
                  {pokemon.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleShowPokemons}>Look at your Pokemons</button>
      </div>
    </>
  )
}

function PokemonPage() {
  const location = useLocation()
  const { pokemon1, pokemon2 } = location.state || {}
  const [abilities, setAbilities] = useState<any[]>([])
  const [selectedAbility, setSelectedAbility] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loadAbilities = async () => {
      setLoading(true)
      const data = await fetchAllAbilities()
      setAbilities(data)
      setLoading(false)
    }
    loadAbilities()
  }, [])

  const handleNewPokemons = () => {
    if (selectedAbility) {
      navigate('/newPokemon', { state: { pokemon1: pokemon1, pokemon2: pokemon2, ability: selectedAbility} })
    } else {
      alert('Please select an Ability')
    }
  }

  return (
    <>
      <NavBar/>
      <div className="content">
        <h1>Select an Ability</h1>

        {showPokemonsChoice({pokemon1, pokemon2})}

        <div className="ability-selection">
          <select onChange={(e) => setSelectedAbility(e.target.value)} defaultValue="">
            <option value="">Choose an ability</option>
            {abilities.map((ability) => (
              <option key={ability.name} value={ability.name}>
                {ability.name}
              </option>
            ))}
          </select>
        </div>

        {selectedAbility && (
          <div className="ability-result">
            <h2>Selected Ability: {selectedAbility}</h2>
          </div>
        )}

        <button onClick={handleNewPokemons}>Look your mix!</button>
        
      </div>
    </>
  )
}


// function NewPokemonPageWrapper() {
//   const location = useLocation()
//   const { pokemon1, pokemon2, ability } = location.state || {}

//   return <></>
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/pokemons" element={<PokemonPage/>}/>
        <Route path="/newPokemon" element={<NewPokemonPage/>}/>
      </Routes>
    </Router>
  )
}


export default App