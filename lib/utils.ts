import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDate, formatDistanceToNowStrict } from 'date-fns'
import qs from 'query-string'
import { Metadata } from 'next'

import { RemoveUrlQueryParams, UrlQueryParams } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeDate(from: Date) {
  const currentDate = new Date()
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, { addSuffix: true })
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, 'MMM d')
    } else {
      return formatDate(from, 'MMM d, yyyy')
    }
  }
}

export const handleError = (error: unknown) => {
  console.error(error)
  // throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions
  )

  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  )

  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions
  )

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const formatPrice = (price: string) => {
  const amount = parseFloat(price)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return formattedPrice
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach((key) => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function constructMetadata({
  title = 'Atendeo - Say Goodbye to No-Shows: The Smart Way to Ensure Event Attendance',
  description = 'Boost commitment, reward attendees, and manage events effortlessly with our innovative RSVP system',
  keywords = 'Online RSVP, Event website, Event management software, Online invitations, Wedding RSVP Site, Online invitations with RSVP, Digital Invitations',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
}: {
  title?: string
  description?: string
  keywords?: string
  image?: string
  icons?: string
} = {}): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'Atendeo',
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@devwhizz',
      creator: '@devwhizz',
      title,
      description,
      images: [image],
    },
    icons: {
      icon: icons,
      shortcut: icons,
    },
    metadataBase: new URL('https://atendeo.com/'),
    alternates: {
      canonical: 'https://atendeo.com/',
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
  }
}
