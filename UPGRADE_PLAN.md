# Supertech Website - Next.js 16 Upgrade Plan

## 📊 Current State Analysis

### Current Package Versions
| Package | Current Version | Target Version |
|---------|-----------------|----------------|
| Next.js | 13.5.1 | 16.x |
| React | 18.2.0 | 19.x |
| React DOM | 18.2.0 | 19.x |
| TypeScript | 5.2.2 | 5.5+ |
| Tailwind CSS | 3.3.3 | 4.x |
| ESLint | 8.49.0 | 9.x |
| @types/react | 18.2.22 | latest |
| @types/react-dom | 18.2.7 | latest |
| Node.js | (check local) | 20.9+ required |

### Project Structure
- **Framework**: Next.js App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Library**: Radix UI primitives
- **Build Output**: Static export (`output: 'export'`)
- **Pages**: Home, About, Contact, FAQ, Gallery, Impact, Products (Fertilizers, Supertech), Admin

---

## 🚀 Next.js 16 Key Changes

### Breaking Changes to Address

#### 1. Node.js Requirement
- **Minimum**: Node.js 20.9.0
- **Action**: Verify local Node.js version with `node -v`

#### 2. Turbopack as Default Bundler
- Turbopack is now the default bundler (faster builds, ~10x faster Fast Refresh)
- No action required - automatic improvement

#### 3. Removal of `next lint` Command
- **Current**: `"lint": "next lint"` in package.json
- **New**: Configure ESLint manually
- **Action**: Update lint script to `"lint": "eslint ."`

#### 4. Middleware → Proxy Rename
- `middleware.ts` is now `proxy.ts`
- **Status**: ✅ No middleware.ts in project - no migration needed

#### 5. Runtime Config Removed
- `serverRuntimeConfig` and `publicRuntimeConfig` removed
- Use `.env` files instead
- **Status**: ✅ Not used in project

#### 6. Async Dynamic APIs
- `cookies()`, `headers()`, `params`, `searchParams` are now async
- Must use `await` when accessing these
- **Action**: Check all server components for these usages

### New Features to Leverage

#### 1. Cache Components (`use cache` directive)
```typescript
'use cache'
export default async function Page() {
  // This page/component will be cached
}
```

#### 2. Partial Pre-Rendering (PPR)
- Combine static and dynamic content efficiently
- Enable in `next.config.js`:
```javascript
experimental: {
  ppr: true
}
```

#### 3. Improved Developer Experience
- Enhanced build logging
- Better error messages
- Turbopack performance improvements

---

## 🎨 Tailwind CSS 4 Changes

### Major Syntax Changes

#### 1. New Import Syntax
**Current (v3):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**New (v4):**
```css
@import "tailwindcss";
```

#### 2. Configuration Changes
- Tailwind v4 uses CSS-first configuration
- `tailwind.config.ts` can be migrated to CSS variables
- For backward compatibility, you can still use JS config with PostCSS

#### 3. New Features
- Lightning CSS integration (faster builds)
- Container queries built-in
- New color functions
- Improved dark mode handling

### Recommended Approach
- **Option A**: Stay with Tailwind CSS v3.4+ for maximum compatibility with shadcn/ui
- **Option B**: Upgrade to Tailwind CSS v4 with migration codemod

---

## 📦 Package Update Plan

### Phase 1: Core Framework (Critical)
```bash
npm install next@latest react@latest react-dom@latest
npm install -D @types/react@latest @types/react-dom@latest typescript@latest
```

### Phase 2: Build Tools
```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npm install -D eslint@latest eslint-config-next@latest
```

### Phase 3: UI Components (Radix UI)
```bash
npm install @radix-ui/react-accordion@latest \
  @radix-ui/react-alert-dialog@latest \
  @radix-ui/react-aspect-ratio@latest \
  @radix-ui/react-avatar@latest \
  @radix-ui/react-checkbox@latest \
  @radix-ui/react-collapsible@latest \
  @radix-ui/react-context-menu@latest \
  @radix-ui/react-dialog@latest \
  @radix-ui/react-dropdown-menu@latest \
  @radix-ui/react-hover-card@latest \
  @radix-ui/react-label@latest \
  @radix-ui/react-menubar@latest \
  @radix-ui/react-navigation-menu@latest \
  @radix-ui/react-popover@latest \
  @radix-ui/react-progress@latest \
  @radix-ui/react-radio-group@latest \
  @radix-ui/react-scroll-area@latest \
  @radix-ui/react-select@latest \
  @radix-ui/react-separator@latest \
  @radix-ui/react-slider@latest \
  @radix-ui/react-slot@latest \
  @radix-ui/react-switch@latest \
  @radix-ui/react-tabs@latest \
  @radix-ui/react-toast@latest \
  @radix-ui/react-toggle@latest \
  @radix-ui/react-toggle-group@latest \
  @radix-ui/react-tooltip@latest
```

### Phase 4: Utility Libraries
```bash
npm install @hookform/resolvers@latest \
  class-variance-authority@latest \
  clsx@latest \
  cmdk@latest \
  date-fns@latest \
  embla-carousel-react@latest \
  input-otp@latest \
  lucide-react@latest \
  next-themes@latest \
  react-day-picker@latest \
  react-hook-form@latest \
  react-resizable-panels@latest \
  recharts@latest \
  sonner@latest \
  tailwind-merge@latest \
  tailwindcss-animate@latest \
  vaul@latest \
  zod@latest
```

### Phase 5: Remove Deprecated Packages
```bash
npm uninstall @next/swc-wasm-nodejs  # No longer needed
```

---

## 📋 Step-by-Step Migration Checklist

### Pre-Migration
- [ ] Verify Node.js version is 20.9+
- [ ] Create a backup branch: `git checkout -b backup-before-nextjs16`
- [ ] Commit all current changes
- [ ] Document any custom configurations

### Migration Steps

#### Step 1: Update Node.js (if needed)
```bash
node -v
# If < 20.9, update Node.js using nvm or direct download
nvm install 20
nvm use 20
```

#### Step 2: Use Automated Codemod (Recommended)
```bash
npx @next/codemod@canary upgrade latest
```
This will:
- Update dependencies
- Migrate deprecated APIs
- Update configuration files

#### Step 3: Manual Updates (if codemod fails)
```bash
# Clear existing node_modules and lock file
rm -rf node_modules package-lock.json

# Install new versions
npm install next@latest react@latest react-dom@latest
npm install -D @types/react@latest @types/react-dom@latest
```

#### Step 4: Update package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
```

#### Step 5: Update next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Optional: Enable new features
  // experimental: {
  //   ppr: true,
  // },
};

module.exports = nextConfig;
```

#### Step 6: Update ESLint Configuration
Create or update `.eslintrc.json`:
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {}
}
```

#### Step 7: Update Tailwind CSS (if upgrading to v4)
**Option A - Stay on v3 (Recommended for stability):**
```bash
npm install tailwindcss@^3.4.0
```

**Option B - Upgrade to v4:**
1. Update `globals.css`:
```css
@import "tailwindcss";

/* Keep your custom CSS variables */
@theme {
  --color-background: 0 0% 100%;
  --color-foreground: 20 14.3% 4.1%;
  /* ... other variables */
}
```

#### Step 8: Test the Application
```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

### Post-Migration Verification
- [ ] All pages render correctly
- [ ] Styling is intact (Tailwind classes work)
- [ ] UI components function properly (dialogs, dropdowns, etc.)
- [ ] Forms submit correctly
- [ ] Dark mode works (if implemented)
- [ ] Static export builds successfully
- [ ] No TypeScript errors
- [ ] No console errors

---

## ⚠️ Potential Issues & Solutions

### Issue 1: React 19 Compatibility
Some packages may not yet support React 19. Solutions:
- Check package changelogs for React 19 support
- Use `--legacy-peer-deps` flag temporarily
- Pin specific versions if needed

### Issue 2: shadcn/ui Components
shadcn/ui may need updates for React 19:
- Regenerate components: `npx shadcn@latest add <component-name>`
- Check shadcn/ui documentation for v19 compatibility

### Issue 3: Static Export Limitations
With `output: 'export'`, some Next.js 16 features won't work:
- Server Components with data fetching
- Dynamic routes without `generateStaticParams`
- API routes

### Issue 4: Tailwind CSS Plugin Compatibility
`tailwindcss-animate` may need updates for Tailwind v4:
- Check for v4-compatible version
- Alternative: Use CSS animations directly

---

## 📚 Reference Documentation

### Official Documentation
- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
- [Next.js Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [React 19 Release Notes](https://react.dev/blog)

### Package Documentation
- [Radix UI](https://www.radix-ui.com/docs/primitives)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Lucide React Icons](https://lucide.dev/guide/packages/lucide-react)

### Helpful Resources
- [Next.js Codemods](https://nextjs.org/docs/app/building-your-application/upgrading/codemods)
- [Tailwind CSS Migration Guide](https://tailwindcss.com/docs/upgrade-guide)

---

## 🗓️ Recommended Timeline

| Day | Task |
|-----|------|
| Day 1 | Backup, verify Node.js, run codemod |
| Day 1-2 | Update core packages (Next.js, React) |
| Day 2 | Update UI packages (Radix, shadcn components) |
| Day 3 | Update utility packages |
| Day 3-4 | Fix breaking changes, test all pages |
| Day 4-5 | Update Tailwind CSS (if upgrading to v4) |
| Day 5 | Final testing, deploy to staging |

---

## 📝 Notes

- **Current Build**: Static export - keep this configuration
- **No Middleware**: No proxy.ts migration needed
- **shadcn/ui**: Uses CSS variables - compatible with both Tailwind v3 and v4
- **Recommendation**: Start with Tailwind v3.4 for stability, upgrade to v4 later

---

*Document created: December 6, 2025*
*Last updated: December 6, 2025*

---

## ✅ MIGRATION COMPLETED

### What Was Updated

| Package | Old Version | New Version |
|---------|-------------|-------------|
| Next.js | 13.5.1 | 15.5.7 |
| React | 18.2.0 | 19.0.0 |
| React DOM | 18.2.0 | 19.0.0 |
| TypeScript | 5.2.2 | 5.7.2 |
| Tailwind CSS | 3.3.3 | 3.4.17 |
| ESLint | 8.49.0 | 9.17.0 |
| All Radix UI packages | Various | Latest |
| All utility packages | Various | Latest |

### Changes Made
1. ✅ Updated `package.json` with all latest package versions
2. ✅ Removed deprecated `@next/swc-wasm-nodejs` package
3. ✅ Updated lint script from `next lint` to `eslint .`
4. ✅ Added `--turbopack` flag to dev script for faster builds
5. ✅ Created new ESLint flat config (`eslint.config.mjs`)
6. ✅ Removed old `.eslintrc.json`
7. ✅ Fixed `react-day-picker` v9 breaking changes in calendar component
8. ✅ Build successful - all 12 pages generated
9. ✅ TypeScript check passed with no errors

### Post-Migration Verification
- ✅ `npm run typecheck` - Passed
- ✅ `npm run build` - Passed (12 static pages generated)
- ⏳ `npm run dev` - Ready to test

### Backup Branch
A backup of your code before migration is available at:
```bash
git checkout backup-before-nextjs16
```

