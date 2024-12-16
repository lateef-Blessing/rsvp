'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { ContentLayout } from '@/components/protected/content-layout'
import { BackButton } from '@/components/protected/back-button'

export default function WithdrawPage() {
  const [accountNumber, setAccountNumber] = useState('')
  const [bankCode, setBankCode] = useState('')
  const [amount, setAmount] = useState('')
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [withdrawError, setWithdrawError] = useState('')
  const [withdrawSuccess, setWithdrawSuccess] = useState('')

  const router = useRouter()

  const user = useCurrentUser()
  if (!user) {
    return null
  }

  const handleWithdraw = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsWithdrawing(true)
    setWithdrawError('')
    setWithdrawSuccess('')

    try {
      const response = await fetch('/api/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountNumber,
          bankCode,
          amount: parseInt(amount),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Withdrawal failed')
      }

      const data = await response.json()
      setWithdrawSuccess(data.message)
      // Redirect to profile page after a successful withdrawal
      setTimeout(() => {
        router.push('/account')
      }, 2000)
    } catch (error) {
      if (error instanceof Error) {
        // Check if the error is an instance of Error
        setWithdrawError(error.message)
      } else {
        // If it's not an instance of Error, handle it as a generic error
        setWithdrawError('An unexpected error occurred')
      }
    } finally {
      setIsWithdrawing(false)
    }
  }

  return (
    <ContentLayout title="Withdraw Earnings">
      <BackButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </BackButton>
      <div className="w-full mx-auto rounded-lg shadow-md mt-10">
        <form onSubmit={handleWithdraw}>
          <div className="mb-4">
            <label className="block" htmlFor="accountNumber">
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="bankCode">
              Bank Code
            </label>
            <input
              type="text"
              id="bankCode"
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              required
              min="1"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-500/50"
            disabled={isWithdrawing}
          >
            {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
          </Button>
        </form>
        {withdrawError && <p className="text-red-500 mt-2">{withdrawError}</p>}
        {withdrawSuccess && (
          <p className="text-green-500 mt-2">{withdrawSuccess}</p>
        )}
      </div>
    </ContentLayout>
  )
}
