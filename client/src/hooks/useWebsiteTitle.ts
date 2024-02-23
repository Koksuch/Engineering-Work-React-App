import { useEffect } from "react"

export default function useWebsiteTitle(title: string) {
  const setTitle = (newTitle: string) => {
    document.title = newTitle
  }
  useEffect(() => {
    if (title) {
      setTitle(title)
    }
  }, [title])

  return setTitle
}
