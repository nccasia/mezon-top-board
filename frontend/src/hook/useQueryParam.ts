import { useLocation } from "react-router-dom"

const useQueryParam = (): URLSearchParams => {
  const { search } = useLocation()
  return new URLSearchParams(search)
}

export default useQueryParam