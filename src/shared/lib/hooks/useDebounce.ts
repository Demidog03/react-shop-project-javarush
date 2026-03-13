import {useEffect, useState} from "react";

function useDebounce<T>(value: T, delayMs: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    // useEffect(() => {
    //     return () => { // делаем какие то дествия при unmount компонента/хука
    //
    //     }
    // }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delayMs)
        return () => clearTimeout(timer)
    }, [value, delayMs])

    return debouncedValue
}

export default useDebounce;