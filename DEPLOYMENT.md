# Libri website deployment

Production: https://desktop-libri.com
Repository: https://github.com/KlediJ/libri-website
Local checkout: C:\Users\joana\Desktop\libri\libri-website
Vercel project: libri (kledi-jenicerris-projects)

This is a static website with no build step. From this checkout, commit and push the approved changes to main, then publish with:

```powershell
vercel --prod --yes --scope kledi-jenicerris-projects
```

The ignored .vercel/project.json links this folder to the existing project. Do not create a replacement Vercel project. Verify the custom domain and changed assets after deployment.

The approved LIBRI-WEB-001 preview lives in assets/libri-2-preview. Publish only its MP4 and poster, not editable source archives. Playback is user initiated. Keep the forthcoming 2.0 preview distinct from current 1.0 downloads.
