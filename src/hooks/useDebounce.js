import { useEffect, useState } from 'react'

// Default delay -> half of a second
export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
};