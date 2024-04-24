import { useRef } from "react"
import { MdRefresh } from "react-icons/md"
interface RestButtonProps  {
    onRest:() => any,
    className?: string
}
const RestButton = ({onRest:handleRest, className} : RestButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const handleClick = () => {
        buttonRef.current?.blur()
        handleRest()
    }
    return (
        <button ref={buttonRef} onClick={handleClick} className= {`block rounded px-8 py-2 hover:bg-slate-700/50 ${className}`} >
            <MdRefresh className=" size-6"></MdRefresh>
        </button>
    )
}



export default RestButton