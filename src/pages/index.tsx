import { QuestionAnswer } from '@mui/icons-material'
import { Rating, ToggleButton, ToggleButtonGroup } from '@mui/material'
import moment from 'moment'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { reviews } from 'src/constants'

type Props = {}

const Home = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false)
  const [sanitizedReviews, setSanitizedReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [isViewingAll, setIsViewingAll] = useState(true)
  const [isViewingUnanswered, setIsViewingUnanswered] = useState(false)

  const hasResponse = (id: string) => {
    if (typeof window !== 'undefined') {
      const reply = localStorage.getItem(`response-${id}`)
      return reply !== null
    }

    return false
  }

  const handleViewAll = () => {
    setIsViewingAll(true)
    setIsViewingUnanswered(false)

    setFilteredReviews(sanitizedReviews)
  }

  const handleViewUnanswered = () => {
    setIsViewingAll(false)
    setIsViewingUnanswered(true)

    const unansweredReviews = sanitizedReviews.filter(
      (review) => !hasResponse(review.id)
    )

    setFilteredReviews(unansweredReviews)
  }

  const renderTotalNumberOfReviews = () => {
    if (isViewingUnanswered) {
      return (
        <span>
          <strong>{filteredReviews.length}</strong> / {sanitizedReviews.length}{' '}
          reviews
        </span>
      )
    }

    return <span>{sanitizedReviews.length} reviews</span>
  }

  useEffect(() => {
    setIsMounted(true)
    const sanitized = reviews.map((item) => {
      return {
        ...item,
        published_at: moment(item.published_at).format('MM/DD/YYYY'),
      }
    })
    setSanitizedReviews(sanitized)
    setFilteredReviews(sanitized)
  }, [])

  return (
    <div className="pb-12">
      <div className="flex flex-col justify-center pb-8 items-center">
        <div className="flex space-x-4 m-auto">
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={
              isViewingAll ? 'all' : isViewingUnanswered ? 'unanswered' : null
            }
            onChange={(_, value) => {
              if (value === 'all') {
                handleViewAll()
              } else if (value === 'unanswered') {
                handleViewUnanswered()
              }
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="unanswered">Unanswered</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="text-center text-sm text-gray-500 pt-2">
          {isMounted && renderTotalNumberOfReviews()}
        </div>
      </div>
      <div
        className="grid grid-cols-1 gap-8 
      sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredReviews.map((item, index) => (
          <Link href={`/reviews/${item.id}`} key={`${item.id}-${index}`}>
            <a className="relative block border border-gray-100 mx-6 shadow-sm rounded-md h-60 transform transition duration-200 hover:scale-105">
              <div className="p-6">
                <h5 className="text-lg font-bold">{item.place}</h5>
                <Rating
                  readOnly
                  name="rating"
                  value={item.rating}
                  precision={0.5}
                  className="mt-2"
                />
                <p className="mt-2 text-sm text-gray-700">
                  {item.content.slice(0, 80).concat('...')}
                </p>
              </div>
              <div className="col-span-4 flex justify-between items-center border-t border-gray-100 px-6 py-4 bg-gray-200 absolute bottom-0 w-full">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-sm font-bold">{item.author}</span>
                  <span className="text-xs text-gray-500">
                    {item.published_at}
                  </span>
                  {hasResponse(item.id) && isMounted && (
                    <>
                      <QuestionAnswer color="primary" fontSize="small" />
                    </>
                  )}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
