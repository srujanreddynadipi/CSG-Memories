const path = require('path')
const fs = require('fs')

const rootEnvPath = path.join(__dirname, '..', '.env')
const serverEnvPath = path.join(__dirname, '.env')

if (fs.existsSync(rootEnvPath)) {
  require('dotenv').config({ path: rootEnvPath })
} else {
  require('dotenv').config({ path: serverEnvPath })
}
const express = require('express')
const cors = require('cors')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(cors())
app.use(express.json())

const region = process.env.AWS_REGION
const bucket = process.env.S3_BUCKET

if (!region || !bucket) {
  console.warn('AWS_REGION or S3_BUCKET not set — presign endpoint will error until configured')
}

const s3 = new S3Client({ region })

app.post('/presign', async (req, res) => {
  try {
    const { filename, contentType } = req.body
    const id = uuidv4()
    const key = `memories/${id}_${filename}`

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    })

    const url = await getSignedUrl(s3, command, { expiresIn: 900 })

    // Public URL (assuming bucket or prefix is configured for public read)
    const publicKeyPath = key.split('/').map(encodeURIComponent).join('/')
    const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${publicKeyPath}`

    res.json({ url, key, publicUrl })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
})

const port = process.env.PORT || 8787
app.listen(port, () => {
  console.log(`S3 presign server listening on http://localhost:${port}`)
})
