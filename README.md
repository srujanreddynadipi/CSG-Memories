# B.Tech Memories

A React + Tailwind CSS class memory site for the CSE batch 2022-2026. It shows a vertical chronological timeline, supports local, Cloudinary, and S3 image uploads, stores everything in LocalStorage, and includes a class anthem embed on the home page.

## Tech Stack

- React
- React Router
- Tailwind CSS
- LocalStorage
- Cloudinary unsigned uploads
- S3 presigned uploads
- uuid
- date-fns

## Setup

1. Install dependencies:

	```bash
	npm install
	```

2. Create a `.env` file in the project root:

	```bash
	VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
	VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
	VITE_S3_PRESIGN_ENDPOINT=http://localhost:8787/presign
	```

3. Start the dev server:

	```bash
	npm run dev
	```

## Cloudinary configuration

Create an unsigned upload preset in Cloudinary and copy the preset name into `VITE_CLOUDINARY_UPLOAD_PRESET`. The app uses the unsigned upload endpoint, so no API secret is required in the browser.

If these env vars are missing, the app still works with local image uploads.

## S3 configuration

S3 uploads use a small local presign server. Create `server/.env` from `server/.env.example`, then run the presign server with your AWS credentials.

The app expects a public S3 object URL after upload. The simplest setup is:

- use a dedicated S3 bucket for memories
- allow the server to generate presigned `PUT` URLs
- make uploaded objects readable by the website, either through a public bucket/prefix or a CloudFront distribution in front of the bucket

Start the presign server:

```bash
cd server
npm install
npm start
```

The browser app will call `VITE_S3_PRESIGN_ENDPOINT` to request upload URLs.

## Features

- Full-screen home hero with batch identity and CTA
- Vertical alternating timeline with year markers
- Add Memory modal with date, caption, story, tags, and image uploads
- Memory detail overlay with a swipeable carousel
- Class anthem embed saved locally
- Sample seed memories loaded on first run

## Data Model

```json
{
  "id": "uuid",
  "date": "2022-08-12",
  "caption": "First day at college",
  "story": "We were all nervous but excited...",
  "friends": ["Rahul", "Priya", "Anil"],
  "images": [
	 { "type": "local", "url": "..." }
  ]
}
```

All memories are stored as a sorted JSON array in LocalStorage.

## S3 credentials you need to provide

For the presign server, you need:

- `AWS_REGION` - the AWS region where the bucket lives
- `S3_BUCKET` - your bucket name
- `AWS_ACCESS_KEY_ID` - access key for an IAM user or role with S3 upload permission
- `AWS_SECRET_ACCESS_KEY` - secret for that access key
- `AWS_SESSION_TOKEN` - only if you are using temporary credentials

Recommended IAM permissions for that user/role:

- `s3:PutObject`
- `s3:GetObject` if the bucket or prefix is private and you later want signed reads
- `s3:ListBucket` only if you need listing from the server

Important: do not put AWS secrets in the browser `.env`. Keep them only in `server/.env`.
# CSG-Memories
