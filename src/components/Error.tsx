import React from 'react'

export default function Error({children} : {children:React.ReactNode}) {
  return (
    <p className='p-3 my-4 text-sm font-bold text-center text-white uppercase bg-red-600'>{children}</p>
  )
}
