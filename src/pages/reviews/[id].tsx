import { useRouter } from 'next/router'
import { Details } from 'src/components/Details'

type Props = {}

const Reviews = (props: Props) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Details id={id as string} />
    </div>
  )
}

export default Reviews
