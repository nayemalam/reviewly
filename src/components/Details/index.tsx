import { MoreHoriz, Reply } from '@mui/icons-material'
import { IconButton, Rating, TextField, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { currentUser, reviews } from 'src/constants'

type Props = {
  id: string
}

export const Details = ({ id }: Props) => {
  const [item, setItem] = useState(null)
  const [response, setResponse] = useState('')
  const [confirmedResponse, setConfirmedResponse] = useState('')

  const handleResponseChange = (e) => {
    setResponse(e.target.value)
  }

  const handleConfirm = () => {
    const newReviews = reviews.map((review) => {
      if (review.id === id) {
        return {
          ...review,
          response,
        }
      }

      return review
    })

    let reply = newReviews.find((review) => review.id === id).response

    setConfirmedResponse(reply)
    localStorage.setItem(`response-${id}`, reply)
    setResponse('')
  }

  const handleEdit = () => {
    setResponse(confirmedResponse)
    setConfirmedResponse('')
  }

  const handleCancel = () => {
    setConfirmedResponse(localStorage.getItem(`response-${id}`))
  }

  useEffect(() => {
    const review = reviews.find((item) => item.id === id)
    setItem(review)

    const reply = localStorage.getItem(`response-${id}`)
    if (reply) {
      setConfirmedResponse(reply)
    }
  }, [id])

  if (item) {
    return (
      <div className="pb-12">
        <div className="grid grid-cols-1 gap-8">
          <div className="relative block border border-gray-100 mx-6 shadow-sm rounded-md h-60">
            <div className="p-6">
              <h5 className="mt-4 text-lg font-bold">{item.place}</h5>
              <Rating
                readOnly
                name="rating"
                value={item.rating}
                precision={0.5}
                className="mt-2"
              />
              <p className="mt-2 text-sm text-gray-700">{item.content}</p>
            </div>
            <div className="col-span-4 flex justify-between items-center border-t border-gray-100 px-6 py-4 bg-gray-200 absolute bottom-0 w-full">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-sm font-bold">{item.author}</span>
                <span className="text-xs text-gray-500">
                  <Moment format="MM/DD/YYYY">{item.published_at}</Moment>
                </span>
              </div>
            </div>
          </div>
        </div>
        {confirmedResponse.length === 0 ? (
          <div className="mt-8 mx-8">
            <TextField
              label={`Reply to ${item.author}`}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={response}
              onChange={handleResponseChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleConfirm()
                }
              }}
            />

            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded
                disabled:opacity-50 mr-2"
                type="button"
                onClick={handleCancel}
                disabled={response.length === 0}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                disabled:opacity-50"
                onClick={handleConfirm}
                disabled={response.length === 0}
              >
                Reply
              </button>
            </div>
          </div>
        ) : (
          <div className="relative block border border-gray-100 mx-6 shadow-sm rounded-md mt-6">
            <div className="p-6 flex justify-between items-center">
              <Reply color="primary" />

              <div className="flex-1 ml-12">
                <p className="mt-2 text-sm text-gray-700">
                  {confirmedResponse}
                </p>
                <div className="flex items-center mt-4">
                  <span className="text-sm font-bold">{currentUser.name}</span>
                  <span className="text-xs text-gray-500 pl-8">
                    <Moment format="MM/DD/YYYY">
                      {new Date().toISOString()}
                    </Moment>
                  </span>
                </div>
              </div>

              <Tooltip title="Edit">
                <IconButton onClick={handleEdit}>
                  <MoreHoriz color="primary" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}
