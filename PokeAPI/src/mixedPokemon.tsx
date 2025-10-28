import { useEffect, useRef, useState } from 'react'
import { generateMixedPokemonImage } from './generateImage'
import { useLocation } from 'react-router-dom'
import { NavBar } from './navBar'


export function NewPokemonPage () {
	const [generatedImage, setGeneratedImage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const canvasRef = useRef<HTMLCanvasElement | null> (null)
	const location = useLocation()
	const { pokemon1, pokemon2, ability } = location.state || {}

	useEffect(() => {
		const doGenerate = async () => {
			if (!pokemon1 || !pokemon2 || !ability) return
			

			setLoading(true)
			setGeneratedImage(null)

			const imageUrl = await generateMixedPokemonImage(pokemon1.name, pokemon2.name)

			setLoading(false)

			if (imageUrl) {
				setGeneratedImage(imageUrl)
				return
			}

			fallbackCanvasMix()
		}

		doGenerate()
	}, [pokemon1, pokemon2, ability])

    const fallbackCanvasMix = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 512
    canvas.height = 512

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const img1 = new Image()
    const img2 = new Image()
    img1.crossOrigin = 'anonymous'
    img2.crossOrigin = 'anonymous'

    img1.src = pokemon1.sprites?.other?.['official-artwork']?.front_default || ''
    img2.src = pokemon2.sprites?.other?.['official-artwork']?.front_default || ''

    await Promise.all([
      new Promise<void>((res, rej) => { img1.onload = () => res(); img1.onerror = () => res() }),
      new Promise<void>((res, rej) => { img2.onload = () => res(); img2.onerror = () => res() })
    ])

    // simple blend: left/right
    ctx.drawImage(img1, 0, 0, canvas.width / 2, canvas.height)
    ctx.globalAlpha = 0.95
    ctx.drawImage(img2, canvas.width / 2, 0, canvas.width / 2, canvas.height)
    ctx.globalAlpha = 1
  }

  return (
    <>
      <NavBar/>
      <div className="content">
        <h1>Your mixed Pokemon</h1>

        {loading && <div>Generating... please wait</div>}

        <div className="generated-image-wrapper">
          {generatedImage ? (
            <img className="generated-image" src={generatedImage} alt="generated" />
          ) : (
            <canvas ref={canvasRef} className="mixed-pokemon-canvas" />
          )}
          <div>
            <h3 style={{textTransform:'capitalize'}}>{pokemon1?.name || '—'} + {pokemon2?.name || '—'}</h3>
            <p>Ability: <strong>{ability || '—'}</strong></p>
            <p style={{fontSize:12, color:'#475569'}}>If generation fails, a fallback blend of the two official artworks is shown.</p>
          </div>
        </div>
      </div>
    </>
  )
}

