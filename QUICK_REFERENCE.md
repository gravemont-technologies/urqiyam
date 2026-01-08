# Qiyam PWA - Quick Reference

## Essential Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Clear cache (if pages show 404)
rm -rf .next && npm run dev
```

## URLs (Local Development)

| Page | URL | Purpose |
|------|-----|---------|
| Landing | http://localhost:3000 | Homepage |
| Signup | http://localhost:3000/signup | Create account |
| Login | http://localhost:3000/login | Sign in |
| Quiz | http://localhost:3000/quiz | Onboarding (12 questions) |
| Ideas | http://localhost:3000/ideas | AI-generated ideas + swiping |
| Dashboard | http://localhost:3000/dashboard | Venture management (WIP) |

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4o-mini
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Supabase Setup

1. Create project at https://app.supabase.com
2. Go to SQL Editor
3. Copy entire `schema.sql` file
4. Paste and run
5. Get credentials from Settings → API

## Database Tables

| Table | Purpose |
|-------|---------|
| `users` | User profiles + DNA (quiz answers) |
| `ideas` | AI-generated startup ideas |
| `ventures` | Active user ventures |
| `challenges` | Weekly tasks (WIP) |
| `scores` | Barakah/Business/Sustainability metrics |

## Common Issues

| Problem | Solution |
|---------|----------|
| 404 on pages | Restart: `npm run dev` |
| Auth errors | Check Supabase credentials in `.env.local` |
| Ideas fail | Verify OpenAI key + credits |
| Build fails | Clear cache: `rm -rf .next` |

## File Structure

```
app/
├── api/generate-ideas/    # OpenAI endpoint
├── auth/callback/         # OAuth handler
├── ideas/                 # Swipe UI
├── login/                 # Login page
├── quiz/                  # Quiz page
├── signup/                # Signup page
└── page.tsx               # Landing page

components/
├── IdeaSwipe.tsx          # Swipeable cards
├── Quiz.tsx               # Quiz logic
└── [other UI components]

lib/
├── prompts.ts             # AI prompts
└── quiz-data.ts           # 12 questions

utils/supabase/
├── client.ts              # Client-side DB
└── server.ts              # Server-side DB
```

## Testing Checklist

- [ ] Landing page loads at http://localhost:3000
- [ ] Signup creates user in Supabase
- [ ] Login works and redirects
- [ ] Quiz saves to `users.dna_json`
- [ ] Ideas generate (check `ideas` table)
- [ ] Swipe left marks idea as `rejected`
- [ ] Swipe right creates venture

## Key Files to Edit

| Task | File |
|------|------|
| Change quiz questions | `lib/quiz-data.ts` |
| Modify AI prompts | `lib/prompts.ts` |
| Update database schema | `schema.sql` (re-run in Supabase) |
| Edit landing page | `app/page.tsx` + `components/` |
| Change styles | `app/globals.css` |

## Documentation

- **DEVELOPER_GUIDE.md** - Complete usage guide
- **RUN.md** - Setup instructions
- **ENV_VARIABLES.md** - Environment reference
- **README.md** - Project overview

## Support Resources

- Supabase: https://supabase.com/docs
- Next.js: https://nextjs.org/docs
- OpenAI: https://platform.openai.com/docs
- Tailwind: https://tailwindcss.com/docs

---

**Need help? Check DEVELOPER_GUIDE.md for detailed instructions**
