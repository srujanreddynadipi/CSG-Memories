export function isS3Configured() {
  return Boolean(import.meta.env.VITE_S3_PRESIGN_ENDPOINT || import.meta.env.PROD)
}

export async function uploadToS3Presigned(file) {
  const presignEndpoint =
    import.meta.env.VITE_S3_PRESIGN_ENDPOINT ||
    (import.meta.env.PROD ? '/api/presign' : 'http://localhost:8787/presign')
  if (!presignEndpoint) {
    throw new Error('S3 presign endpoint not configured')
  }

  // Request a presigned PUT URL from your server
  const resp = await fetch(presignEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: file.name, contentType: file.type }),
  })

  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`Presign request failed: ${resp.status} ${text}`)
  }

  const { url, key, publicUrl } = await resp.json()

  // PUT the file to the presigned URL
  const putResp = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })

  if (!putResp.ok) {
    const text = await putResp.text()
    throw new Error(`Upload to S3 failed: ${putResp.status} ${text}`)
  }

  // Return an object similar to other upload helpers
  return {
    type: 's3',
    url: publicUrl || null,
    key: key || null,
  }
}
