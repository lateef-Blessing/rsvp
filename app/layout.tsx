import { Delius_Swash_Caps } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

import '@/app/globals.css'
import { auth } from '@/auth'
import { ModalProvider } from '@/providers/modal-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { constructMetadata } from '@/lib/utils'

const deliusSwashCaps = Delius_Swash_Caps({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-delius-swash-caps',
})

export const metadata = constructMetadata()

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <title>{(metadata.title as string) || 'Atendeo'}</title>
          <meta
            name="description"
            content={metadata.description || 'Default description'}
          />
          <meta
            name="keywords"
            content={(metadata.keywords as string) || 'Default keywords'}
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:locale"
            content={metadata.openGraph?.locale || 'en_US'}
          />
          <meta
            property="og:site_name"
            content={metadata.openGraph?.siteName || 'Atendeo'}
          />
          <meta
            property="og:title"
            content={
              String(metadata.openGraph?.title || metadata.title) ||
              'Default Title'
            }
          />
          <meta
            property="og:description"
            content={
              metadata.openGraph?.description ||
              metadata.description ||
              'Default description'
            }
          />
          <meta property="og:image" content="/thumbnail.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:site"
            content={metadata.twitter?.site || '@devwhizz'}
          />
          <meta
            name="twitter:creator"
            content={metadata.twitter?.creator || '@devwhizz'}
          />
          <meta
            name="twitter:title"
            content={
              String(metadata.twitter?.title || metadata.title) ||
              'Default Title'
            }
          />
          <meta
            name="twitter:description"
            content={
              metadata.twitter?.description ||
              metadata.description ||
              'Default description'
            }
          />
          <meta name="twitter:image" content="/thumbnail.png" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="canonical"
            href={
              (metadata.alternates?.canonical as string) ||
              'https://atendeo.com'
            }
          />
        </Head>
        <body className={`${deliusSwashCaps.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="atendeo-theme"
          >
            <ModalProvider />
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
