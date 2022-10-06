import { useRouter } from 'next/router'
import { Details } from 'src/components/Details'

const Reviews = () => {
  const router = useRouter()
  const { id } = router.query

  return <Details id={id as string} />
}

export default Reviews
