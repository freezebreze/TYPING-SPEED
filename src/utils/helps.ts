export function formatPercentage(percentage : number) {
    return percentage.toFixed(0) + '%'
}

export function calculateError(userInput : string , words : string) {
    const chars = userInput.split('')
    return chars.reduce((acc, char, index) => {
        if(char !== words[index]) {
            acc++
        }
        return acc
    }, 0)
}

export function calculateAccuracy(userInput : string , words : string) {
    const error = calculateError(userInput, words)
    const total = userInput.length
    return ((total - error) / total) * 100
}