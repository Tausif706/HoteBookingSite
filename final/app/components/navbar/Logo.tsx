"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter();
  return (
    <Image 
        onClick={() => router.push('/')}
        className="hidden md:block cursor-pointer"
        alt="no logo"
        src="/Logo.png"
        height={50}
        width={50}
    />
  )
}

export default Logo;