import { ChevronLeft } from '@mui/icons-material'
import {
  Button,
  Fade,
  IconButton,
  Paper,
  Popper,
  Tooltip,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { currentUser } from 'src/constants'

type Props = {}

export const Navigation = (props: Props) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => !prev)
  }

  const handleClear = () => {
    if (
      confirm(
        'Are you sure you want to clear all your replies to your customers?'
      )
    ) {
      if (typeof window !== 'undefined') {
        let responseItems = Object.keys(localStorage).filter((item) =>
          item.includes('response-')
        )

        responseItems.forEach((item) => {
          localStorage.removeItem(item)
        })

        router.reload()
      }
    }

    setOpen(false)
  }

  return (
    <header className="bg-teal-600 border-b border-gray-300 mb-10">
      <div className="flex h-16 items-center gap-8 px-8">
        <div className="flex items-center">
          {router.pathname.includes('reviews') ? (
            <Tooltip title="Back to Home" sx={{ marginRight: 1 }}>
              <IconButton onClick={() => router.back()}>
                <ChevronLeft />
              </IconButton>
            </Tooltip>
          ) : (
            <span>👍</span>
          )}
          <Typography
            variant="h6"
            className="text-white font-bold"
            sx={{
              paddingLeft: router.pathname.includes('reviews') ? 0 : 2.85,
            }}
          >
            Reviewly
          </Typography>
        </div>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav className="hidden md:block" aria-labelledby="header-navigation">
            <h2 className="sr-only" id="header-navigation">
              Header navigation
            </h2>
          </nav>
        </div>
        <div
          className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center hover:bg-gray-500 hover:text-white hover:cursor-pointer"
          onClick={handleClick}
        >
          {currentUser.name[0].toUpperCase()}
        </div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper sx={{ py: 2 }}>
                <div className="w-12 h-12 rounded-full bg-gray-100 flex justify-center items-center m-auto mb-4">
                  {currentUser.name[0].toUpperCase()}
                </div>
                <div className="px-4">
                  <span className="text-sm font-bold">Name: &nbsp;</span>
                  <span className="text-sm">{currentUser.name}</span>
                </div>
                <div className="px-4">
                  <span className="text-sm font-bold">Role: &nbsp;</span>
                  <span className="text-sm">{currentUser.role}</span>
                </div>
                <div className="mt-4 px-4">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClear}
                  >
                    Remove all replies
                  </Button>
                </div>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    </header>
  )
}
