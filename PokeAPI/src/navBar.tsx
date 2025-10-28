import { useNavigate } from 'react-router-dom'
import './App.css'

export function NavBar() {
	const navigate = useNavigate()

	return (
		<nav className="navbar">
			<button onClick={() => navigate('/home')}>Home</button>
			<h2>PokeAPI</h2>
			<button onClick={() => navigate('/')}>LOGOUT</button>
		</nav>
	)
}

export function HomeNavBar () {
	const navigate = useNavigate()

	return (
		<nav className="navbar">
			<h2>PokeAPI</h2>
			<button onClick={() => navigate('/')}>LOGOUT</button>
		</nav>
	)
}

export function LoginNavBar () {
	return (
		<nav className="navbar">
			<h2>PokeAPI</h2>
		</nav>
	)
}