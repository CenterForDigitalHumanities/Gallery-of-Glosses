'use client'
 
import { createContext, useContext } from 'react'
 
export const ManuscriptContext = createContext<Promise<any> | null>(null)
 
export function ManuscriptProvider({
  children,
  manuscriptPromise,
}: {
  children: React.ReactNode
  manuscriptPromise: Promise<any>
}) {
  return (
    <ManuscriptContext.Provider value={manuscriptPromise}>{children}</ManuscriptContext.Provider>
  )
}
 
export function useManuscriptContext() {
  let context = useContext(ManuscriptContext)
  if (!context) {
    throw new Error('useManuscriptContext must be used within a ManuscriptProvider')
  }
  return context
}
