import { Delete, MoreHoriz, Reply } from '@mui/icons-material'
import { IconButton, Rating, TextField, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { currentUser, reviews } from 'src/constants'

type Props = {
  id: string
}

export const Details = ({ id }: Props) => {
  const [item, setItem] = useState(null)
  const [typing, setTyping] = useState('')
  const [response, setResponse] = useState('')

  const handleTypingChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTyping(event.target.value)
  }

  const handleConfirm = () => {
    if (typing.trim().length > 0) {
      setResponse(typing.replace(/\s+/g, ' '))
      localStorage.setItem(`response-${id}`, typing.replace(/\s+/g, ' '))
      setTyping('')
    }
  }

  const handleEdit = () => {
    setTyping(response)
    setResponse('')
  }

  const handleCancel = () => {
    const responseExistsInLocalStorage = localStorage.getItem(`response-${id}`)
    if (responseExistsInLocalStorage) {
      setResponse(responseExistsInLocalStorage)
      setTyping(responseExistsInLocalStorage)
    } else {
      setTyping('')
    }
  }

  const handleRemove = () => {
    localStorage.removeItem(`response-${id}`)
    setResponse('')
    setTyping('')
  }

  useEffect(() => {
    const review = reviews.find((item) => item.id === id)
    setItem(review)

    const reply = localStorage.getItem(`response-${id}`)
    if (reply) {
      setResponse(reply)
    }
  }, [id])

  if (item) {
    return (
      <div className="pb-12">
        <div className="grid grid-cols-1 gap-8">
          <div className="block border border-gray-100 mx-6 shadow-sm rounded-md">
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
            <div className="col-span-4 flex justify-between items-center border-t border-gray-100 px-6 py-4 bg-gray-200 w-full">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-sm font-bold">{item.author}</span>
                <span className="text-xs text-gray-500">
                  <Moment format="MM/DD/YYYY">{item.published_at}</Moment>
                </span>
              </div>
            </div>
          </div>
        </div>
        {response.length === 0 ? (
          <div className="mt-8 mx-8">
            <TextField
              label={`Reply to ${item.author}`}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={typing}
              onChange={handleTypingChange}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  e.shiftKey &&
                  typing.trim().length > 0
                ) {
                  handleConfirm()
                }
              }}
              helperText="Press Shift + Enter to reply"
            />

            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded
                disabled:opacity-50 mr-2"
                type="button"
                onClick={handleCancel}
                disabled={typing.length === 0}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                disabled:opacity-50"
                onClick={handleConfirm}
                disabled={typing.trim().length === 0}
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
                <p className="mt-2 text-sm text-gray-700">{response}</p>
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

              <Tooltip title="Remove">
                <IconButton onClick={handleRemove}>
                  <Delete
                    sx={{
                      color: '#e64926',
                    }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-md">Review for id {id} does not exist</h1>
    </div>
  )
}
