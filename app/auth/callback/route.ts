import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Check user state logic
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                // Check public.users for dna_json
                const { data: existingUser } = await supabase
                    .from('users')
                    .select('dna_json')
                    .eq('supabase_user_id', user.id)
                    .single()

                // State Machine Enforcement
                if (!existingUser?.dna_json) {
                    // If no DNA, force Quiz
                    return NextResponse.redirect(`${origin}/quiz`)
                }

                // If has DNA, go to target or Dashboard
                // (Dashboard will handle Idea check)
                return NextResponse.redirect(`${origin}${next}`)
            }
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=auth_code_error`)
}
