'use client'
 
import { createContext, useContext } from 'react'
 
export const GlossContext = createContext<Promise<any> | null>(null)
 
export function GlossProvider({
  children,
  glossPromise,
}: {
  children: React.ReactNode
  glossPromise: Promise<any>
}) {
  return (
    <GlossContext.Provider value={glossPromise}>{children}</GlossContext.Provider>
  )
}
 
export function useGlossContext() {
  let context = useContext(GlossContext)
  if (!context) {
    throw new Error('useGlossContext must be used within a GlossProvider')
  }
  return context
}
