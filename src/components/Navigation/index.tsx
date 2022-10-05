import { Reply } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/router'

type Props = {}

export const Navigation = (props: Props) => {
  const router = useRouter()

  return (
    <header className="bg-teal-600 border-b border-gray-300 mb-10">
      <div className="flex h-16 items-center gap-8 px-8">
        <div className="flex items-center">
          {router.pathname.includes('reviews') ? (
            <Tooltip title="Back to Home" sx={{ marginRight: 1 }}>
              <IconButton onClick={() => router.back()}>
                <Reply />
              </IconButton>
            </Tooltip>
          ) : (
            <span>👍</span>
          )}
          <Typography
            variant="h6"
            className="text-white font-bold"
            sx={{
              paddingLeft: router.pathname.includes('reviews') ? 0 : 2.75,
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
        <div className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center hover:bg-gray-500 hover:text-white hover:cursor-pointer">
          N
        </div>
      </div>
    </header>
  )
}
