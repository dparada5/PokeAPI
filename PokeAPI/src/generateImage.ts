export const generateMixedPokemonImage = async (
  pokemon1: string,
  pokemon2: string
): Promise<string | null> => {
  try {
    const prompt = `pokemon fusion hybrid of ${pokemon1} and ${pokemon2}, digital art, vibrant colors`

    const response = await fetch('http://localhost:5174/sdapi/v1/txt2img', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt: prompt,
				negative_prompt: 'blurry, low quality, distorted, ugly, deformed, pixelated, amateur, poorly drawn',
				steps: 20,
				cfg_scale: 7,
				width: 512,
				height: 512,
				sampler_index: 'Euler a'
			})
		})

		if (!response.ok) {
			const errorText = await response.text()
			console.error('API Error Response:', errorText)
			throw new Error(`API Error: ${response.status}`)
		}

		const data = await response.json()

		        console.log('API Response:', data)

        // Si es base64
        if (data.images?.[0]) {
            const base64 = data.images[0]
            if (!base64.startsWith('data:')) {
                return `data:image/png;base64,${base64}`
            }
            return base64
        }

		return null
	} catch (error) {
		console.error('Error generating image: ', error);
		return null
	}
}