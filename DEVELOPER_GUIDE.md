# Qiyam PWA - Developer Guide

## Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables (see below)
cp .env.local.example .env.local
# Edit .env.local with your credentials

# 3. Run database schema in Supabase (see below)

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000
```

---

## Detailed Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

**What gets installed:**
- Next.js 16.1.1 (React framework)
- Supabase client libraries (database & auth)
- OpenAI SDK (AI idea generation)
- Framer Motion (animations)
- Tailwind CSS (styling)

### Step 2: Configure Supabase

#### A. Create Supabase Project

1. Go to https://app.supabase.com
2. Click **"New Project"**
3. Choose organization and fill in:
   - **Project name**: `qiyam` (or your choice)
   - **Database password**: Save this securely
   - **Region**: Choose closest to your users
4. Click **"Create new project"** (takes ~2 minutes)

#### B. Run Database Schema

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open `schema.sql` from this project
4. Copy the **entire file contents**
5. Paste into the SQL Editor
6. Click **"Run"** or press `Ctrl+Enter`

**What this creates:**
- `users` table (user profiles & DNA)
- `ideas` table (generated startup ideas)
- `ventures` table (active user ventures)
- `challenges` table (weekly tasks)
- `scores` table (Barakah, Business, Sustainability metrics)
- Row Level Security (RLS) policies for data protection

#### C. Get API Credentials

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: Long string starting with `eyJhbGci...`

#### D. Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Ensure **Email** is enabled (should be by default)
3. (Optional) Configure email templates in **Email Templates**

### Step 3: Configure OpenAI

1. Go to https://platform.openai.com/api-keys
2. Click **"Create new secret key"**
3. Name it `qiyam-dev` or similar
4. Copy the key (starts with `sk-proj-...` or `sk-...`)
5. **Important**: Ensure your OpenAI account has credits/billing enabled

### Step 4: Set Environment Variables

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` in your editor

3. Replace the placeholder values:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key

   # OpenAI Configuration
   OPENAI_API_KEY=sk-proj-your-actual-openai-key
   OPENAI_MODEL=gpt-4o-mini

   # Application Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Save the file

### Step 5: Run the Application

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 16.1.1 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.x.x:3000
- Environments: .env.local

✓ Ready in 8.5s
```

---

## Using the Application

### 1. Landing Page (`/`)

**URL**: http://localhost:3000

**What you'll see:**
- Hero section with Doha skyline background
- Navbar with navigation links
- Features section (Personalized, Compliant, Vision 2030)
- How It Works (5-step process)
- Success Stories
- About section
- Footer

**Test navigation:**
- Click navbar links to scroll to sections
- Click "Start Now" → redirects to `/signup`
- Click "Sign In" → redirects to `/login`

### 2. Sign Up (`/signup`)

**URL**: http://localhost:3000/signup

**How to test:**
1. Enter email: `test@example.com`
2. Enter password: `Test123!@#` (min 6 characters)
3. Click **"Sign up"**
4. Check for success message: *"Check your email for the confirmation link"*

**What happens:**
- User created in Supabase Auth
- Confirmation email sent (check Supabase → Authentication → Users)
- For development, you can confirm users manually in Supabase Dashboard

**To skip email confirmation (dev only):**
1. Supabase Dashboard → Authentication → Settings
2. Disable "Enable email confirmations"

### 3. Log In (`/login`)

**URL**: http://localhost:3000/login

**How to test:**
1. Enter your email
2. Enter your password
3. Click **"Sign in"**
4. On success → redirects to `/quiz` (first time) or `/dashboard` (returning user)

**Social login (optional):**
- Google and GitHub buttons are visible
- Requires OAuth setup in Supabase (see Supabase docs)

### 4. Onboarding Quiz (`/quiz`)

**URL**: http://localhost:3000/quiz

**Access**: Requires authentication (redirects to `/login` if not logged in)

**How to test:**
1. Answer all 12 questions:
   - **Q1**: Life Stage (Student, Professional, etc.)
   - **Q2**: Vibe (Hustle, Balanced, Impact, Spiritual)
   - **Q3**: Ethics (Standard, Islamic, Social Impact, Environmental)
   - **Q4**: College (Engineering, Computing, Health, Business, Arts, None)
   - **Q5**: Domains (Select up to 3: FinTech, EdTech, etc.)
   - **Q6**: Experience (Beginner, Intermediate, Expert)
   - **Q7**: Timeline (< 1 year, 1-3 years, 3-5 years, 5+ years)
   - **Q8**: Principles (Select up to 2: Profit-first, Community-first, etc.)
   - **Q9**: Advantage (Technical Skills, Network, Capital, etc.)
   - **Q10**: Compliance (Strict, Pragmatic, Guided)
   - **Q11**: Risk Appetite (Low, Medium, High)
   - **Q12**: Goal (Financial Freedom, Social Impact, QNV2030, Mastery)

2. Click **"Finish"** on the last question

**What happens:**
- Answers saved to `users` table in Supabase
- DNA profile created in `dna_json` column
- User redirected to `/ideas`

**Verify in Supabase:**
1. Go to Table Editor → `users`
2. Find your user row
3. Check `dna_json` column has your answers

### 5. Ideas Generation & Swiping (`/ideas`)

**URL**: http://localhost:3000/ideas

**Access**: Requires authentication + completed quiz

**How to test:**

#### First Visit (Idea Generation)
1. Page shows loading state: *"Analyzing your startup DNA..."*
2. API calls OpenAI to generate 10 ideas (takes 5-30 seconds)
3. Page reloads and shows first idea card

**What happens behind the scenes:**
- Fetches your DNA from `users` table
- Calls `/api/generate-ideas` endpoint
- OpenAI generates 10 personalized ideas
- Ideas saved to `ideas` table with status `pending`

#### Swiping Interface
Each idea card shows:
- **Title**: Startup name
- **Description**: What the business does
- **Scores**: Vision, Deen (if applicable), Market, Execution
- **Potential Impact**: Why it matters
- **Weaknesses**: Honest challenges
- **Rationale**: Why you should pick/drop it

**Actions:**
- **Swipe Left** or click **✕**: Reject idea
  - Idea status → `rejected`
  - Next idea appears
  
- **Swipe Right** or click **♥**: Pick idea
  - Idea status → `picked`
  - Venture created in `ventures` table
  - User locked to this venture
  - Redirect to `/dashboard`

**Verify in Supabase:**
1. Table Editor → `ideas`: See all 10 generated ideas
2. Table Editor → `ventures`: See created venture (after picking)

### 6. Dashboard (`/dashboard`)

**URL**: http://localhost:3000/dashboard

**Status**: ⚠️ **Under Construction**

**Current behavior**: Shows placeholder or 404

**Planned features:**
- Active venture summary
- Barakah, Business, Sustainability scores
- Current week challenges
- Progress tracking

---

## Development Workflow

### Making Changes

```bash
# The dev server auto-reloads on file changes
npm run dev

# Edit any file in:
# - app/ (pages and routes)
# - components/ (React components)
# - lib/ (utilities and data)
# - utils/ (Supabase clients)
```

### Testing Changes

1. **Landing Page**: Edit `app/page.tsx` or components in `components/`
2. **Quiz Questions**: Edit `lib/quiz-data.ts`
3. **AI Prompts**: Edit `lib/prompts.ts`
4. **Styles**: Edit `app/globals.css` or component Tailwind classes
5. **Database Schema**: Edit `schema.sql` and re-run in Supabase

### Common Tasks

#### Add a New Page

```bash
# Create new route
mkdir app/new-page
touch app/new-page/page.tsx
```

```tsx
// app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page Content</div>
}
```

#### Add a New Component

```bash
touch components/MyComponent.tsx
```

```tsx
// components/MyComponent.tsx
export default function MyComponent() {
  return <div>My Component</div>
}
```

#### Modify Quiz Questions

Edit `lib/quiz-data.ts`:

```typescript
{
  id: '13',
  key: 'new_question',
  text: 'Your new question?',
  type: 'single',
  options: ['Option 1', 'Option 2'],
  whyDescription: 'Why we ask this...'
}
```

#### Change AI Prompt

Edit `lib/prompts.ts`:

```typescript
export const IDEAS_PROMPT = (dna: any) => `
Your custom prompt here...
User DNA: ${JSON.stringify(dna)}
`;
```

---

## Troubleshooting

### Issue: Pages show 404

**Cause**: Dev server cache issue

**Solution**:
```bash
# Stop server (Ctrl+C)
# Clear Next.js cache
rm -rf .next
# Restart
npm run dev
```

### Issue: "Unauthorized" errors

**Checklist**:
- ✅ `.env.local` has correct Supabase URL and key
- ✅ `schema.sql` was run in Supabase
- ✅ User is logged in (check browser cookies)
- ✅ RLS policies exist (Supabase → Authentication → Policies)

**Debug**:
```javascript
// In browser console
const { data: { user } } = await supabase.auth.getUser()
console.log(user) // Should show user object
```

### Issue: Ideas generation fails

**Checklist**:
- ✅ `OPENAI_API_KEY` is valid
- ✅ OpenAI account has credits
- ✅ Quiz was completed (check `users.dna_json`)

**Debug**:
1. Open browser DevTools → Network tab
2. Navigate to `/ideas`
3. Look for `/api/generate-ideas` request
4. Check response for error message

**Common errors**:
- `401 Unauthorized`: Invalid OpenAI key
- `429 Too Many Requests`: Rate limit or no credits
- `500 Internal Server Error`: Check server logs

### Issue: Database errors

**Verify schema**:
```sql
-- Run in Supabase SQL Editor
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Should return: users, ideas, ventures, challenges, scores
```

**Verify RLS**:
```sql
-- Check policies exist
SELECT tablename, policyname FROM pg_policies 
WHERE schemaname = 'public';
```

### Issue: Build fails

```bash
# Check for TypeScript errors
npm run build

# Common fixes:
npm install          # Reinstall dependencies
rm -rf .next         # Clear cache
rm -rf node_modules  # Nuclear option
npm install
```

---

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
   - `NEXT_PUBLIC_SITE_URL` (set to your Vercel URL)
5. Deploy

### Environment Variables for Production

Update `.env.local` → Vercel Environment Variables:
- Change `NEXT_PUBLIC_SITE_URL` to production URL
- Keep same Supabase credentials (or create production project)
- Use production OpenAI key with higher rate limits

---

## Project Structure

```
qiyam/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── generate-ideas/
│   │       └── route.ts          # OpenAI idea generation endpoint
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # OAuth callback handler
│   ├── ideas/
│   │   └── page.tsx              # Idea swiping page
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── quiz/
│   │   └── page.tsx              # Onboarding quiz page
│   ├── signup/
│   │   └── page.tsx              # Signup page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/                   # React components
│   ├── AboutSection.tsx
│   ├── FeaturesSection.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── HowItWorks.tsx
│   ├── IdeaSwipe.tsx             # Swipeable idea cards
│   ├── Navbar.tsx
│   ├── Quiz.tsx                  # Quiz logic
│   └── SuccessStories.tsx
│
├── lib/                          # Utilities
│   ├── prompts.ts                # OpenAI prompts
│   └── quiz-data.ts              # Quiz questions
│
├── utils/
│   └── supabase/
│       ├── client.ts             # Client-side Supabase
│       └── server.ts             # Server-side Supabase
│
├── middleware.ts                 # Session management
├── schema.sql                    # Database schema
├── .env.local                    # Environment variables
├── .env.local.example            # Template
├── ENV_VARIABLES.md              # Env docs
├── RUN.md                        # Setup guide
└── DEVELOPER_GUIDE.md            # This file
```

---

## Key Technologies

- **Next.js 16**: React framework with App Router
- **Supabase**: PostgreSQL database + authentication
- **OpenAI GPT-4o-mini**: AI idea generation
- **Framer Motion**: Smooth animations
- **Tailwind CSS**: Utility-first styling

---

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **OpenAI API Docs**: https://platform.openai.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## License

[Your License Here]
