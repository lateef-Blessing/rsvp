import { EventWithUserWithCategory } from '@/types'
import { EventCard } from '@/components/protected/event-card'
import { Pagination } from '@/components/protected/pagination'
import Link from 'next/link'

interface Props {
  data: EventWithUserWithCategory[]
  emptyTitle: string
  emptyStateSubtext: string
  limit: number
  page: number | string
  totalPages?: number
  urlParamName?: string
  collectionType?: 'Events_Organized' | 'All_Events'
}

export const EventsCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: Props) => {
  return (
    <>
      {data?.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderLink = collectionType === 'Events_Organized'

              return (
                <li key={event.id} className="flex justify-center">
                  <EventCard event={event} hasOrderLink={hasOrderLink} />
                </li>
              )
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold mb-2">{emptyTitle}</h3>
          {emptyStateSubtext == 'create_button' && (
            <Link
              href="/create"
              className="bg-primary px-4 py-2 rounded-md text-center w-max"
            >
              Create One Now
            </Link>
          )}
          {emptyStateSubtext != 'create_button' && (
            <p className="p-regular-14">{emptyStateSubtext}</p>
          )}
        </div>
      )}
    </>
  )
}
