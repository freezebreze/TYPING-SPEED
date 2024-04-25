import { useCallback, useState } from "react"
import { faker } from '@faker-js/faker';


const useWords = (count : number = 10) => {
    const [words, setWords] = useState(faker.word.words({count:count}))
    const updateWords = useCallback(() => {
        setWords(() => faker.word.words({count:count}))
    }, [count])
    return {words, updateWords}
}
export default useWords