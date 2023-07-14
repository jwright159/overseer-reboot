import { createContext } from "react"

export const PowerContext = createContext(0)
export const SetPowerContext = createContext((power: number) => {})