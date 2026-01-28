'use client'

import { ReactNode } from 'react'
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, useAuth, UserButton } from '@clerk/nextjs'
import { ThemeProvider } from './theme-provider'
import { UnauthenticatedView } from '@/features/auth/components/unauthenticated-view'
import { AuthLoadingView } from '@/features/auth/components/auth-loading-view'
import { useConvexAuth } from "convex/react";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

/**
 * Provides Clerk authentication, a Convex client wired to Clerk, and theming, and renders auth-aware views.
 *
 * @param children - UI rendered inside the provider when the user is authenticated
 * @returns A React element that wraps `children` with ClerkProvider, ConvexProviderWithClerk, and ThemeProvider and displays authenticated, unauthenticated, or loading views based on auth state
 */
export default function ConvexClientProvider({ children }: { children: ReactNode }) {

  function DebugAuth() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    console.log({ isAuthenticated, isLoading });
    return null;
  }

  return (
    <ClerkProvider>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
              <SignedIn>
                <UserButton />
                {children}
              </SignedIn>

              <SignedOut>
                <UnauthenticatedView />
              </SignedOut>
              <AuthLoading>
                <AuthLoadingView/>  
              </AuthLoading>
              </ThemeProvider>
        </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}