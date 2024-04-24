import { useEffect, useRef, useState } from "react"
const isKeyAllowed = (code : string) => {
    return (code === 'Backspace' || code.startsWith('Key') || code.startsWith('Digit') || code === 'Space' || code === 'Minus' || code === 'Equal')
}
const useTyping = (enabled : boolean) => {
    const [typed, setTyped] = useState<string>('')
    const [cursor, setCursor] = useState<number>(0)
    const totalTyped = useRef<number>(0)
    const typingAudio = useRef<HTMLAudioElement>(null)
    const keydownHandler = ({key, code} : KeyboardEvent) => {
        typingAudio.current!.currentTime = 0
        typingAudio.current?.play()
        if (!isKeyAllowed(code)) return
        if (!enabled && key !== 'Backspace') return
        switch(key) {
            case 'Backspace':
                if (totalTyped.current > 0) {
                    setTyped(prev => prev.slice(0, -1))
                    setCursor(prev => prev - 1)
                    totalTyped.current -= 1
                }
                break
            default:
                setTyped((prev) => prev.concat(key))
                totalTyped.current += 1
        }
    }
    // 清楚用户输入 重置光标
    const clearTyped = () => {
        //重置输入
        setTyped('')
        //重置游标
        setCursor(0)
    }
    //重置所有状态
    const resetTyped = () => {
        //重置输入
        setTyped('')
        //重置游标
        setCursor(0)
        totalTyped.current = 0
    }

    const resetTotalTyped = () => {
        totalTyped.current = 0
    }

    useEffect(() => {
        window.addEventListener('keydown' ,keydownHandler)
        return () => {
            window.removeEventListener('keydown', keydownHandler)
        }
    }, [keydownHandler])

    return {
        typed,
        typingAudio,
        cursor,
        totalTyped : totalTyped.current,
        clearTyped,
        resetTotalTyped,
        resetTyped
    }
}

export default useTyping