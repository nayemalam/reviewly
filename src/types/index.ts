export type Review = {
  id: string
  author: string
  place: string
  published_at: string
  rating: number
  content: string
}

export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
