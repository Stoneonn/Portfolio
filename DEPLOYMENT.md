# Deployment Guide

## Repository Structure

This repository uses a subdirectory structure with the Next.js application in the `web` folder:

```
Portfolio/
├── web/              # Next.js application (build directory)
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── ...
└── ...               # Other files/projects can be added here
```

## Deploying to Vercel

When deploying to Vercel, you need to specify that the Next.js app is in the `web` subdirectory.

### Method 1: During Initial Setup

1. Import your repository to Vercel
2. In the project configuration, set **Root Directory** to `web`
3. Vercel will automatically detect the Next.js framework
4. Deploy

### Method 2: For Existing Projects

1. Go to your project on Vercel
2. Navigate to **Settings** → **General**
3. Find the **Root Directory** section
4. Click **Edit**
5. Enter `web` as the root directory
6. Save and redeploy

### Deploy Button

When using the "Deploy with Vercel" button, you'll need to manually set the root directory to `web` after the initial import.

## Deploying to Other Platforms

### DigitalOcean App Platform

1. In your app settings, set the **Source Directory** to `web`
2. Set build command: `npm run build`
3. Set run command: `npm start`

### Netlify

1. In your site settings, set **Base directory** to `web`
2. Build command: `npm run build`
3. Publish directory: `web/.next`

### Docker

If using Docker, make sure your Dockerfile sets the working directory to `/app/web` or copies files from the `web` directory.

## Important Notes

- All npm commands should be run from the `web` directory
- Package.json and other build configurations are in `web/`
- Static assets are in `web/public/`
- Environment variables should be configured in your hosting platform as usual

## Local Development

```bash
cd web
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)
