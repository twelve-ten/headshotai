# Testing Checklist - HeadshotAI

## Before Every Deploy

### Visual/UI Testing
- [ ] Landing page renders correctly (all sections visible)
- [ ] Dark mode styling consistent (no white/broken buttons)
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] All links work (nav, CTAs, footer)
- [ ] Fonts loading correctly (Syne for headings, Outfit for body)

### App Functionality
- [ ] Image upload works (drag & drop and click)
- [ ] File validation works (rejects non-images, >10MB)
- [ ] Style selection works and shows selected state
- [ ] Generate button disabled when no image
- [ ] Loading state shows during generation
- [ ] Generated image displays correctly
- [ ] Download works and produces valid PNG
- [ ] Regenerate works
- [ ] Reset/new image works

### API Testing
- [ ] API returns valid image
- [ ] API handles missing image gracefully
- [ ] API handles invalid image gracefully
- [ ] Different styles produce different results
- [ ] Error messages display correctly

### Performance
- [ ] Page loads in < 3 seconds
- [ ] No console errors
- [ ] Images lazy load where appropriate

### SEO
- [ ] Title tag correct
- [ ] Meta description correct
- [ ] OG tags present
- [ ] Sitemap accessible at /sitemap.xml
- [ ] robots.txt accessible

### Analytics
- [ ] Page views tracking
- [ ] Event tracking (upload, generate, download)

## Test Commands

```bash
# Build test
npm run build

# Local dev server
npm run dev

# Check for TypeScript errors
npx tsc --noEmit
```

## Known Issues
- (Track issues here)
