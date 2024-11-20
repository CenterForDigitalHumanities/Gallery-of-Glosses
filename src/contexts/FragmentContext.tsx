'use client'
 
import { createContext, useContext } from 'react'
 
export const FragmentContext = createContext<Promise<any> | null>(null)
 
export function FragmentProvider({
  children,
  fragmentPromise,
}: {
  children: React.ReactNode
  fragmentPromise: Promise<any>
}) {
  return (
    <FragmentContext.Provider value={fragmentPromise}>{children}</FragmentContext.Provider>
  )
}
 
export function useFragmentContext() {
  let context = useContext(FragmentContext)
  if (!context) {
    throw new Error('useFragmentContext must be used within a FragmentProvider')
  }
  return context
}
