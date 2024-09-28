export const getRandomIntInRange = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Dice {
    value: number
    id: number

    constructor(value: number) {
        this.value = value
        this.id = Math.floor(Math.random() * 100000000)
    }
}

export const generateDice = (min=1, max=6) => {
    if (min > max) {
        const maxTemp = max
        max = min
        min = maxTemp
    }
    const numberVal = getRandomIntInRange(min, max)

    const dice = new Dice(numberVal)

    return dice 
}