import { useEffect, useRef, useState } from "react"
import useWords from "./useWords"
import useCountdownTimer from "./useCountdownTimer"
import useTyping from "./useTyping"
import {calculateError, calculateAccuracy} from "../utils/helps"
export type State = 'start' | 'run' | 'finish'
const initTime = 10
const useEngine = () => {
    const [state, setState] = useState<State>('start')
    const {words, updateWords} = useWords(15)
    const {timeLeft, restCountdown, startCountdown} = useCountdownTimer(initTime)
    const {typed, clearTyped, totalTyped , resetTyped, typingAudio} = useTyping(state != 'finish')
    const errors = useRef<number>(0)
    const accuracy = useRef<number>(0)
    const totalWords = useRef<string>(words)
    //开始打字游戏
    const startTyping = () => {
        setState('run')
        startCountdown()
    }
    useEffect(() => {
        if (state == 'start' && typed) {
            startTyping()
        }
        if (state == 'run' && typed.length == words.length) {
            nextTypeing()
        }
    }, [typed])

    useEffect(() => {
        if (timeLeft == 0 && state == 'run') {
            setState('finish')
            errors.current = calculateError(typed, totalWords.current)
            accuracy.current = calculateAccuracy(typed, totalWords.current)
        }
    }, [timeLeft, state, errors, accuracy])
    const resetTyping = () => {
        setState('start')
        restCountdown()
        resetTyped()
        updateWords()
    }

    const nextTypeing = () => {
        totalWords.current = totalWords.current.concat(words)
        updateWords()
        clearTyped()
    }

    return {state,words,typingAudio, updateWords, timeLeft, typed, startTyping, resetTyping, totalTyped, errors : errors.current, accuracy: accuracy.current}
}
export default useEngine