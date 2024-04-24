import usesDarkMode from "../hooks/useDarkMode"
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useRef } from "react";
const ToggleDark = () => {
    const {isDark,setIsDark} = usesDarkMode()
    const btn = useRef<HTMLButtonElement>(null)
    const handleClick = () => {
        btn.current?.blur()
        setIsDark(!isDark)
    }
    return <button ref={btn} className="absolute w-4 h-5 text-2xl top-4 right-8 dark:text-slate-400" onClick={handleClick}>
        {isDark? <MdDarkMode /> : <CiLight />}
    </button>
}
export default ToggleDark