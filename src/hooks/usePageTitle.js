import { useEffect } from 'react'

/** Sets the browser tab title for the current page. */
export default function usePageTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title
    return () => {
      document.title = prev
    }
  }, [title])
}
