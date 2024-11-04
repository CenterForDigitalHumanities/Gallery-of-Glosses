'use client'
 
import { createContext, useContext } from 'react'
 
export const WitnessContext = createContext<Promise<any> | null>(null)
 
export function WitnessProvider({
  children,
  witnessPromise,
}: {
  children: React.ReactNode
  witnessPromise: Promise<any>
}) {
  return (
    <WitnessContext.Provider value={witnessPromise}>{children}</WitnessContext.Provider>
  )
}
 
export function useWitnessContext() {
  let context = useContext(WitnessContext)
  if (!context) {
    throw new Error('useWitnessContext must be used within a WitnessProvider')
  }
  return context
}
