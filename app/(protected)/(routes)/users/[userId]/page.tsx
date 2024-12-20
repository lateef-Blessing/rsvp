import { UserInfo } from '@/components/protected/user-info'
import { ContentLayout } from '@/components/protected/content-layout'
import { getUserById } from '@/actions/user'
import { redirect } from 'next/navigation'
import { formatPrice } from '@/lib/utils'
import { BackButton } from '@/components/protected/back-button'

interface Props {
  params: {
    userId: string
  }
}

export default async function Profile({ params }: Props) {
  const user = await getUserById(params?.userId)

  if (!user) {
    return redirect('/users')
  }

  return (
    <ContentLayout title="Profile">
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
      <div className="w-full mx-auto rounded-lg shadow-md p-6 mt-8">
        <div className="flex items-center">
          <img
            src="/assets/images/avatar.jpg"
            alt={user.name!}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <p className="text-gray-500">
              Earnings: {formatPrice(user.balance.toString())}
            </p>
          </div>
        </div>
      </div>

      <UserInfo user={user} />
    </ContentLayout>
  )
}
