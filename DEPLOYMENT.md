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

The approved LIBRI-LAUNCH-001 version 2 hero film lives in assets/libri-2-launch-v2. Publish its MP4, poster and WebVTT captions, not editable source archives. The hero starts muted unless reduced motion is enabled, with playback, sound/replay and caption controls. Native controls and the poster work without JavaScript. Keep the forthcoming 2.0 film distinct from current 1.0 downloads. The earlier LIBRI-WEB-001 media remains in assets/libri-2-preview for existing links but is no longer embedded on the page.
