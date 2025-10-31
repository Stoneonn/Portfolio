# Migration Guide: Repository Restructure

## What Changed?

The repository structure has been reorganized to support a cleaner separation between the Next.js application and other files you may want to add to your repository.

### Before:
```
Portfolio/
├── app/
├── components/
├── public/
├── package.json
└── ...
```

### After:
```
Portfolio/
├── web/              # Next.js application
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── ...
├── README.md
└── ...               # Room for other files/projects
```

## Why This Change?

This restructure allows you to:
- Add unrelated files or projects to the repository root without affecting the Next.js build
- Keep the Next.js application isolated and self-contained
- Support monorepo-style organization if needed in the future
- Follow best practices for project organization when deploying to platforms like Vercel or DigitalOcean

## What You Need to Do

### If You're Cloning Fresh
Just follow the updated README.md instructions:
```bash
git clone <your-repo-url>
cd Portfolio/web
npm install
npm run dev
```

### If You Already Had a Clone
1. Pull the latest changes: `git pull origin main`
2. The Next.js app is now in the `web` directory
3. Navigate to `web` before running any npm commands:
   ```bash
   cd web
   npm install
   npm run dev
   ```

### If You're Deploying to Vercel
**Important:** Update your Vercel project settings:
1. Go to your project on Vercel
2. Navigate to Settings → General
3. Find "Root Directory" and click Edit
4. Set it to `web`
5. Save and redeploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions for various hosting platforms.

### If You're Using DigitalOcean
Update your app settings:
1. Set **Source Directory** to `web`
2. Ensure build command is still `npm run build`
3. Ensure run command is still `npm start`

## File Paths

All application files remain the same relative to each other, they're just nested one level deeper:

- `app/` → `web/app/`
- `components/` → `web/components/`
- `public/` → `web/public/`
- `package.json` → `web/package.json`

Documentation files remain at the root:
- `README.md`
- `INSTALLATION.md`
- `QUICK_START.md`
- `IMPLEMENTATION_NOTES.md`
- `DEPLOYMENT.md` (new)

## Path Aliases Still Work

The `@/*` path alias in TypeScript continues to work exactly as before because it's relative to the tsconfig.json location:

```typescript
// This still works:
import { Spotlight } from '@/components/ui/spotlight'
import { PROJECTS } from '@/app/data'
```

## Need Help?

- For setup instructions, see [INSTALLATION.md](./INSTALLATION.md)
- For deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md)
- For questions about existing features, see [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md)

## Questions?

If you encounter any issues with this restructure, please open an issue on GitHub.
