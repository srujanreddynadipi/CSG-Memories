import { v4 as uuidv4 } from 'uuid'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const region = process.env.AWS_REGION
const bucket = process.env.S3_BUCKET

const s3 = new S3Client({ region })

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!region || !bucket) {
    return res.status(500).json({ message: 'AWS_REGION or S3_BUCKET is missing' })
  }

  try {
    const { filename, contentType } = req.body ?? {}

    if (!filename || !contentType) {
      return res.status(400).json({ message: 'filename and contentType are required' })
    }

    const id = uuidv4()
    const key = `memories/${id}_${filename}`

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    })

    const url = await getSignedUrl(s3, command, { expiresIn: 900 })
    const publicKeyPath = key.split('/').map(encodeURIComponent).join('/')
    const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${publicKeyPath}`

    return res.status(200).json({ url, key, publicUrl })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message || 'Failed to generate presigned url' })
  }
}
