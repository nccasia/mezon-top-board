export type RatingFormProps = {
  onSubmitted?: (data: {
    comment: string
    score: number
  }) => void
}