import type { SwapEventObject } from "swapy";

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
        this.id = getRandomIntInRange(10000000, 99999999) // ensures the id will always be 8 characters long
    }
}

// NOT YET IMPLEMENTED 
export class DiceSlot {
    id: number 
    displayOnscreen: boolean
    
    constructor(id: number, displayOnscreen: boolean) {
        this.id = id
        this.displayOnscreen = displayOnscreen
    }

    // probably should make the check/toggle for visibility a class function? 
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

const filterdicePoolListById = (id: string, diceList: Dice[]) => {
    let numberId = parseInt(id)
    let potentialDice = diceList.find(obj => obj.id === numberId)
    return potentialDice
}

export const sumRowDice = (swapObj: SwapEventObject, diceList: Dice[]): number => {
    let sum = 0
        for (let key in swapObj) {
            // how i'm currently identifying slots in the sum is by key length
            if (key.length == 2 && swapObj[key]) {
                console.log(`There is an object of id ${swapObj[key]} at slot id ${key}`)

                let diceObj = filterdicePoolListById(swapObj[key], diceList)
                if (diceObj) {
                    console.log(`Found a dice with a value of ${diceObj.value}!`)
                    sum += diceObj.value
                }
            }
        }
        return sum
}

// DICE SET FUNCTIONS (TEST THEM PLEASE!!!)

export const deleteDiceFromSet = (dice: Dice, diceSet: Set<Dice>) => {

    const hasDice = diceSet.has(dice)

    if (hasDice) diceSet.delete(dice)
}

export const searchDiceSetById = (id: string, diceSet: Set<Dice>) => {

    let numberId = parseInt(id)
    let diceList = Array.from(diceSet)
    let potentialDice = diceList.find(obj => obj.id === numberId)
    return potentialDice
}

const sumRowDiceSetVersion = (swapObj: SwapEventObject, diceSet: Set<Dice>): number => {
    let sum = 0
    let diceList = Array.from(diceSet)
        for (let key in swapObj) {
            // how i'm currently identifying slots in the sum is by key length
            if (key.length == 2 && swapObj[key]) {
                console.log(`There is an object of id ${swapObj[key]} at slot id ${key}`)

                let diceObj = filterdicePoolListById(swapObj[key], diceList)
                if (diceObj) {
                    console.log(`Found a dice with a value of ${diceObj.value}!`)
                    sum += diceObj.value
                }
            }
        }
        return sum
}