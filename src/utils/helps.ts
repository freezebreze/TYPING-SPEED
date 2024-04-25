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

export function calculateAccuracy(total : number , error : number) {
    if (total > 0) {
        return ((total - error) / total) * 100
    }
    return 0
}