# User Intentions & Vision

This document captures the exact prompts and intentions provided by the user to ensure alignment.

## Core Motto & Positioning
- Headline: "Build startups in alignment with your values and Qatar's vision"
- Subheadline: "Personalized guidance to launch sustainable ventures that matter—saving time on mismatched ideas and ensuring compliance from day one."

## Design Philosophy
"The UI/UX is designed to be elite yet approachable, with a focus on a tool-based MVP. Use Rich Aesthetics: The USER should be wowed at first glance. Vibrant colors (Maroon), modern typography (Outfit), smooth gradients, dynamic animations."

## Critical Auth Flow Fix (Urgent Request)
"Problem: 404 after email verification + broken core workflow sequence.
Root Cause: Missing/incorrect route handlers for post-verification flow + improper user state management.
User State Machine Violation: Core workflow MUST be: Landing → Signup → Quiz → Ideas → Venture."

## Required Fixes (Surgical)
1. **Auth Callback Route**: Handle redirects based on quiz completion.
2. **Dashboard Route Guard**: Check `dna_json` before rendering.
3. **Quiz Completion Handler**: Server-side processing.

## Landing Page Tabs & Flow
"Can you ensure all the tabs are points of references in the landing page itself... Rest of the tabs will be informed by the core user workflow."
- Home
- How It Works
- Vision 2030
- Success Stories
- About

## OpenAI Requirements
"Generate 10 diverse, Qatar-compliant startup ideas... Align to areas of interest and specialty, skills, values, QNV2030. Output JSON array."
