import { Home } from '@mui/icons-material'
import { Button } from '@mui/material'

const Error404 = () => {
  return (
    <div className="error-404">
      <div>
        <h1>404</h1>
        <h1>Page not found</h1>
        <p>
          Uh oh... The page you are trying to access does not exist. It might
          have been moved or deleted.
        </p>
        <Button
          className="action-btn"
          variant="outlined"
          onClick={() => {
            window.location.href = '/'
          }}
          startIcon={<Home />}
        >
          Go back to the homepage
        </Button>
      </div>
    </div>
  )
}

export default Error404
