import Caret from "./Caret"

const UserTypings = ({userInput, words, className} : {userInput : string ,words : string , className ?: string}) => {
    const typedCharacters  = userInput.split("")
    return <div className={className}>
        {typedCharacters.map((char, idx) => {
            return <Character char={char} key={idx} expect = {words[idx]} ></Character>
        })}
        <Caret></Caret>
    </div>
}
const Character = ({char, expect} : {char:string, expect : string}) => {
    const isCorrect = char === expect
    const isWhiteSpace = expect === " "
 return <span className={
    cn({
        "text-green-500": isCorrect && !isWhiteSpace,
        "text-red-500": !isCorrect && !isWhiteSpace,
        "bg-red-400": !isCorrect && isWhiteSpace,
        "dark:text-primary-500": isCorrect && !isWhiteSpace,
    })
 }>{expect}</span>
}

function cn(classlist : {[key : string] : boolean}) {
    return Object.entries(classlist).filter(([key, value]) => value).map(([key, value]) => key).join(" ")
}
export default UserTypings