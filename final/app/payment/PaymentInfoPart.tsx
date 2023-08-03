import Image from 'next/image'
import React from 'react'

export const PaymentInfoPart = () => {
  return (
    <>
    <div className="
        w-full
        h-[70vh]
        overflow-hidden
        rounded-xl
        relative
      ">
        <Image 
          alt="Image"
          src={'/frameForInfo.jpg'}
          fill
          objectFit='responsive'
          // className="object-cover w-full"
        /> 
            <div className='absolute text-black mx-4 my-4'>
                <h1>hello</h1>
            </div>
    </div>
    </>
  )
}
