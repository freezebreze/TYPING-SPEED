import { useEffect, useRef, useState } from "react"

const useCountdownTimer = (initialTime : number) => {
    const [timeLeft, setTimeLft] = useState(initialTime)
    const intevrlRef = useRef<number | null>(null)

    const startCountdown = () => {
        intevrlRef.current = setInterval(() => {
            setTimeLft((timeLeft) => timeLeft - 1)
        }, 1000)
    }
    const restCountdown = () => {
        if (intevrlRef.current) {
            clearInterval(intevrlRef.current)
        }
        setTimeLft(initialTime)
    }
    useEffect(() => {
        if (!timeLeft && intevrlRef.current) {
            clearInterval(intevrlRef.current)
        }
    }, [timeLeft])
    return {
        timeLeft,
        startCountdown,
        restCountdown
    }
}

export default useCountdownTimer