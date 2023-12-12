import { useEffect, useRef } from "react"

export function useDebouncedCallback<T extends any[]>(
  callback: (...args: T) => void,
  wait: number
) {
  // track args & timeout handle between calls
  const argsRef = useRef<T>()
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }

  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  useEffect(() => cleanup, [])

  return function debouncedCallback(...args: T) {
    // capture latest args
    argsRef.current = args

    // clear debounce timer
    cleanup()

    // start waiting again
    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current)
      }
    }, wait)
  }
}
