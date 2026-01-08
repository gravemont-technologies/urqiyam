# Qiyam PWA - Developer Setup & Run Guide

This guide will help you set up and run the Qiyam PWA application locally.

## Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- **Supabase Account** (free tier works)
- **OpenAI API Key** (requires paid account or credits)

## Initial Setup

### 1. Clone and Install Dependencies

```bash
# Navigate to the project directory
cd qiyam

# Install dependencies
npm install
```

### 2. Configure Supabase

#### Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details and create

#### Get Your Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJhbGci...`)

#### Run the Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `schema.sql` from this project
4. Paste into the SQL Editor
5. Click "Run" to execute

This will create all necessary tables, policies, and security rules.

### 3. Configure OpenAI

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (starts with `sk-proj-...` or `sk-...`)

### 4. Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and fill in your actual values:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   # OpenAI Configuration
   OPENAI_API_KEY=sk-proj-your-actual-key-here
   OPENAI_MODEL=gpt-4o-mini

   # Application Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. Save the file

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Using the Application

### 1. Landing Page
- Navigate to `http://localhost:3000`
- Explore the features, Vision 2030 alignment, and how it works sections

### 2. Sign Up
- Click "Start Now" or "Sign In" in the navbar
- Navigate to `/signup`
- Enter your email and password
- You'll receive a confirmation email (check Supabase Auth settings if emails aren't sending)

### 3. Log In
- Navigate to `/login`
- Enter your credentials
- You'll be redirected to the quiz if it's your first time

### 4. Complete the Quiz
- Answer all 12 questions about your:
  - Life stage
  - Entrepreneurial vibe
  - Ethical preferences
  - Educational background
  - Industry interests
  - Experience level
  - Timeline expectations
  - Guiding principles
  - Unique advantages
  - Compliance approach
  - Risk appetite
  - Ultimate goals

### 5. Review Generated Ideas
- After completing the quiz, you'll be redirected to `/ideas`
- The system will generate 10 personalized startup ideas using AI
- Swipe left to reject ideas
- Swipe right to pick an idea and start your venture

### 6. Dashboard (Coming Soon)
- Once you pick an idea, you'll be redirected to `/dashboard`
- This will show your active venture and weekly challenges

## Troubleshooting

### Pages Show 404 Errors

**Solution**: Restart the development server
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### "Unauthorized" or Auth Errors

**Checklist**:
- ✅ Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- ✅ Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- ✅ Ensure you've run `schema.sql` in Supabase
- ✅ Check Supabase Dashboard → Authentication → Providers (Email should be enabled)

### Ideas Generation Fails

**Checklist**:
- ✅ Verify `OPENAI_API_KEY` is valid and has credits
- ✅ Check browser console for error messages
- ✅ Verify the model name in `OPENAI_MODEL` is correct (default: `gpt-4o-mini`)
- ✅ Check Supabase → Table Editor → `users` table has your profile with `dna_json`

### Database Errors

**Solution**: Verify Row Level Security (RLS) policies
1. Go to Supabase Dashboard → Authentication → Policies
2. Ensure policies exist for `users`, `ideas`, `ventures`, `challenges`, `scores` tables
3. If missing, re-run `schema.sql`

### Build Errors

**Common Issues**:
- Missing dependencies: Run `npm install`
- TypeScript errors: Check for type mismatches in modified files
- Environment variables: Ensure all required vars are set in `.env.local`

## Project Structure

```
qiyam/
├── app/
│   ├── api/
│   │   └── generate-ideas/    # OpenAI idea generation endpoint
│   ├── auth/
│   │   └── callback/          # OAuth callback handler
│   ├── ideas/                 # Idea swiping page
│   ├── login/                 # Login page
│   ├── quiz/                  # Onboarding quiz
│   ├── signup/                # Signup page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   ├── AboutSection.tsx       # About section
│   ├── FeaturesSection.tsx    # Features showcase
│   ├── Footer.tsx             # Footer component
│   ├── HeroSection.tsx        # Hero section
│   ├── HowItWorks.tsx         # Process explanation
│   ├── IdeaSwipe.tsx          # Swipeable idea cards
│   ├── Navbar.tsx             # Navigation bar
│   ├── Quiz.tsx               # Quiz component
│   └── SuccessStories.tsx     # Testimonials
├── lib/
│   ├── prompts.ts             # OpenAI prompt templates
│   └── quiz-data.ts           # Quiz questions data
├── utils/
│   └── supabase/
│       ├── client.ts          # Client-side Supabase client
│       └── server.ts          # Server-side Supabase client
├── middleware.ts              # Session management
├── schema.sql                 # Database schema
├── .env.local                 # Environment variables (DO NOT COMMIT)
└── .env.local.example         # Environment template
```

## Key Files to Customize

- **`lib/quiz-data.ts`**: Modify quiz questions
- **`lib/prompts.ts`**: Customize AI prompts for idea generation
- **`schema.sql`**: Database schema and RLS policies
- **`components/`**: UI components for customization

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel project settings
5. Deploy

**Important**: Update `NEXT_PUBLIC_SITE_URL` to your production URL

## Support

For issues or questions:
- Check `ENV_VARIABLES.md` for environment variable details
- Review `schema.sql` for database structure
- Check Supabase logs for backend errors
- Check browser console for frontend errors

## License

[Your License Here]
