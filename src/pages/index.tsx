import { QuestionAnswer } from '@mui/icons-material'
import { Rating } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import Moment from 'react-moment'
import { reviews } from 'src/constants'
import { Review } from 'src/types'

type Props = {}

const Home = (props: Props) => {
  const [sanitizedReviews, setSanitizedReviews] = useState<Review[]>(reviews)

  const hasComment = (id: string) => {
    if (typeof window !== 'undefined') {
      const reply = localStorage.getItem(`response-${id}`)
      return reply !== null
    }

    return false
  }

  return (
    <div className="pb-12">
      <div
        className="grid grid-cols-1 gap-8 
      sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {reviews.map((item, index) => (
          <Link href={`/reviews/${item.id}`} key={`${item.id}-${index}`}>
            <a className="relative block border border-gray-100 mx-6 shadow-sm rounded-md h-60 transform transition duration-200 hover:scale-105">
              <div className="p-6">
                <h5 className="mt-4 text-lg font-bold">{item.place}</h5>
                <Rating
                  readOnly
                  name="rating"
                  value={item.rating}
                  precision={0.5}
                  className="mt-2"
                />
                <p className="mt-2 text-sm text-gray-700">
                  {item.content.slice(0, 100).concat('...')}
                </p>
              </div>
              <div className="col-span-4 flex justify-between items-center border-t border-gray-100 px-6 py-4 bg-gray-200 absolute bottom-0 w-full">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-sm font-bold">{item.author}</span>
                  <span className="text-xs text-gray-500">
                    <Moment format="MM/DD/YYYY">{item.published_at}</Moment>
                  </span>
                  {hasComment(item.id) && (
                    <QuestionAnswer color="primary" fontSize="small" />
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
