import { useEffect, useCallback, useState } from "react"
import useWords from "./useWords"
import useCountdownTimer from "./useCountdownTimer"
import useTyping from "./useTyping"
import { calculateError } from "../utils/helps"
export type State = 'start' | 'run' | 'finish'
const initTime = 30
const initWords = 1
const useEngine = () => {
    const [state, setState] = useState<State>('start')
    const {words, updateWords} = useWords(initWords)
    const {timeLeft, restCountdown, startCountdown} = useCountdownTimer(initTime)
    const {typed, clearTyped, totalTyped , resetTyped, typingAudio, cursor} = useTyping(state != 'finish')
    const [errors, setErrors] = useState(0)
    const isStarting = state === 'start' && cursor > 0
    const areWordsFinished = cursor == words.length;
    //开始打字游戏
    const startTyping = () => {
        setState('run')
        startCountdown()
    }

    const sumErrors = useCallback(() => {
        const wordsReached = words.substring(0, Math.min(cursor, words.length))

        setErrors(prevErrors => prevErrors + calculateError(typed, wordsReached))
    }, [typed, words, cursor])

    useEffect(() => {
        if (isStarting) {
            startTyping()
        }
    }, [typed, errors, words, cursor])

    useEffect(() => {
        if (areWordsFinished) {
            nextTypeing()
        }
    }, [areWordsFinished, cursor, typed])

    useEffect(() => {
        if (timeLeft == 0 && state == 'run') {
            setState('finish')
            sumErrors()
        }
    }, [timeLeft, state])

    const resetTyping = () => {
        setState('start')
        restCountdown()
        resetTyped()
        updateWords()
        setErrors(0)
    }

    const nextTypeing = () => {
        updateWords()
        clearTyped()
        sumErrors()
    }

    return {state,words,typingAudio, updateWords, timeLeft, typed, startTyping, resetTyping, totalTyped, errors}
}
export default useEngine