# ⚠️ SETUP REQUIRED - Environment Variables

## Quick Start Checklist

Before running the application, you need to fill in the following values in `.env.local`:

### ✅ Step 1: Supabase Setup

1. **Create Supabase Project**: https://app.supabase.com
2. **Run Database Schema**: 
   - Go to SQL Editor in Supabase Dashboard
   - Copy entire contents of `schema.sql`
   - Paste and run in SQL Editor
3. **Get Credentials**: Settings → API
   - Copy **Project URL** → Replace `your-project-url-here`
   - Copy **anon/public key** → Replace `your-anon-key-here`

### ✅ Step 2: OpenAI Setup

1. **Get API Key**: https://platform.openai.com/api-keys
2. **Copy Key** → Replace `sk-your-openai-key-here`
3. **Verify Credits**: Ensure your OpenAI account has available credits

### ✅ Step 3: Update .env.local

Open `.env.local` and replace these placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here          ← REPLACE THIS
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here        ← REPLACE THIS
OPENAI_API_KEY=sk-your-openai-key-here                  ← REPLACE THIS
```

Keep these as-is:
```env
OPENAI_MODEL=gpt-4o-mini                                ← OK (can change if needed)
NEXT_PUBLIC_SITE_URL=http://localhost:3000              ← OK for local dev
```

## Current Status

### Environment Variables Used in Codebase

| Variable | Used In | Status |
|----------|---------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `utils/supabase/client.ts`<br>`utils/supabase/server.ts`<br>`middleware.ts` | ⚠️ NEEDS VALUE |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `utils/supabase/client.ts`<br>`utils/supabase/server.ts`<br>`middleware.ts` | ⚠️ NEEDS VALUE |
| `OPENAI_API_KEY` | `app/api/generate-ideas/route.ts` | ⚠️ NEEDS VALUE |
| `OPENAI_MODEL` | `app/api/generate-ideas/route.ts` | ✅ Has default |
| `NEXT_PUBLIC_SITE_URL` | OAuth callbacks | ✅ Set for local |
| `NODE_ENV` | `app/auth/callback/route.ts` | ✅ Auto-set by Next.js |

## After Setup

Once you've filled in the values:

```bash
# Restart the dev server
npm run dev
```

Then navigate to http://localhost:3000 and test:
1. ✅ Landing page loads
2. ✅ Sign up works
3. ✅ Login works
4. ✅ Quiz loads and saves
5. ✅ Ideas generate (requires OpenAI credits)

## Files Reference

- **`.env.local`** - Your actual values (DO NOT COMMIT)
- **`.env.local.example`** - Template for reference
- **`ENV_VARIABLES.md`** - Detailed documentation
- **`RUN.md`** - Complete setup guide
- **`schema.sql`** - Database schema to run in Supabase
