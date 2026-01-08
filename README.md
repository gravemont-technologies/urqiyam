# Qiyam PWA - Personalized Startup Engine

A values-first companion for entrepreneurs in Qatar, guiding users to build sustainable businesses aligned with their personal values and Qatar National Vision 2030.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase and OpenAI credentials

# 3. Run database schema in Supabase SQL Editor
# Copy contents of schema.sql and run in Supabase Dashboard

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000
```

## 📚 Documentation

- **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** - Complete guide on how to run and use the app
- **[RUN.md](./RUN.md)** - Detailed setup instructions
- **[ENV_VARIABLES.md](./ENV_VARIABLES.md)** - Environment variables reference
- **[SETUP_REQUIRED.md](./SETUP_REQUIRED.md)** - Quick setup checklist

## ✨ Features

- **Personalized Quiz**: 12-question onboarding to capture your entrepreneurial DNA
- **AI-Powered Ideas**: Generate 10 tailored startup concepts using OpenAI
- **Tinder-Style Swiping**: Pick the idea that resonates with you
- **Qatar Vision 2030 Aligned**: Ideas respect QNV2030 pillars
- **Compliance-First**: Built-in consideration for Qatari regulations
- **Values-Based**: Align ventures with personal ethics and religious principles

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: OpenAI GPT-4o-mini
- **Animations**: Framer Motion
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18.17+
- Supabase account (free tier works)
- OpenAI API key (requires credits)

## 🔑 Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=your-openai-key
OPENAI_MODEL=gpt-4o-mini
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

See [ENV_VARIABLES.md](./ENV_VARIABLES.md) for details.

## 📁 Project Structure

```
qiyam/
├── app/                    # Next.js pages and API routes
│   ├── api/               # API endpoints
│   ├── auth/              # Authentication
│   ├── ideas/             # Idea swiping
│   ├── login/             # Login page
│   ├── quiz/              # Onboarding quiz
│   └── signup/            # Signup page
├── components/            # React components
├── lib/                   # Utilities and data
├── utils/supabase/        # Supabase clients
├── middleware.ts          # Session management
└── schema.sql             # Database schema
```

## 🎯 User Flow

1. **Landing Page** → Learn about Qiyam
2. **Sign Up** → Create account
3. **Quiz** → Answer 12 questions about your entrepreneurial profile
4. **Ideas** → AI generates 10 personalized startup ideas
5. **Swipe** → Pick an idea or reject
6. **Dashboard** → Manage your venture (coming soon)

## 🗄️ Database Setup

Run `schema.sql` in your Supabase SQL Editor to create:

- `users` - User profiles and DNA
- `ideas` - Generated startup ideas
- `ventures` - Active user ventures
- `challenges` - Weekly tasks
- `scores` - Barakah, Business, Sustainability metrics

All tables include Row Level Security (RLS) policies.

## 🧪 Testing the App

### 1. Test Landing Page
```
http://localhost:3000
```
- Verify hero section loads
- Test navbar navigation
- Check all sections render

### 2. Test Authentication
```
http://localhost:3000/signup
http://localhost:3000/login
```
- Create test account
- Verify email confirmation (or disable in Supabase)
- Test login flow

### 3. Test Quiz
```
http://localhost:3000/quiz
```
- Complete all 12 questions
- Verify data saved in Supabase `users` table
- Check `dna_json` column

### 4. Test Idea Generation
```
http://localhost:3000/ideas
```
- Wait for AI generation (5-30 seconds)
- Verify 10 ideas created in `ideas` table
- Test swipe left (reject)
- Test swipe right (pick)

## 🐛 Troubleshooting

### Pages show 404
```bash
# Restart dev server
npm run dev
```

### Authentication errors
- Verify Supabase credentials in `.env.local`
- Check `schema.sql` was run
- Verify RLS policies exist

### Ideas generation fails
- Check OpenAI API key is valid
- Ensure OpenAI account has credits
- Verify quiz was completed

See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for detailed troubleshooting.

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

Update `NEXT_PUBLIC_SITE_URL` to your production URL.

## 📝 License

[Your License Here]

## 🤝 Contributing

[Your Contributing Guidelines Here]

## 📧 Support

[Your Support Contact Here]

---

**Built with ❤️ for entrepreneurs in Qatar and beyond**
