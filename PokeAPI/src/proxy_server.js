import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json({ limit: '200mb' }))

app.post('/sdapi/v1/txt2img', async (req, res) => {
  try {
    const upstream = 'http://stable-diffusion.42malaga.com:7860/sdapi/v1/txt2img'
    
    console.log('Proxying request to:', upstream)
    console.log('Request body:', JSON.stringify(req.body, null, 2))
    
    const upstreamResp = await fetch(upstream, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    })

    console.log(`Upstream responded with status: ${upstreamResp.status}`)

    const contentType = upstreamResp.headers.get('content-type') || 'application/json'
    const arrayBuffer = await upstreamResp.arrayBuffer()
    res.set('Content-Type', contentType)
    res.status(upstreamResp.status).send(Buffer.from(arrayBuffer))
  } catch (err) {
    console.error('Proxy error:', err)
    res.status(500).json({ error: 'proxy error', details: err.message })
  }
})

const PORT = process.env.PORT || 5174
app.listen(PORT, () => console.log(`Proxy listening on http://localhost:${PORT}`))