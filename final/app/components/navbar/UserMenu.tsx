"use client"
import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { Avatar } from '../Avatar'
import { MenuItems } from './MenuItems'
import { UseRegisterModel } from '@/app/hooks/UseRegisterModel'
import { UseLoginModel } from '@/app/hooks/UseLoginModel'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { UseRentModel } from '@/app/hooks/UseRentModel'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
    currentUser? : SafeUser | null;
}


export const UserMenu : React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModel = UseRegisterModel();
    const loginModel = UseLoginModel();
    const rentModel = UseRentModel();
    const [isOpen,setisOpen] = useState(false);
    const toogleOpen = useCallback(() => {
        setisOpen((value)=>!value)
    },[]);

    const onRent = useCallback(() => {
        if(!currentUser){
            return loginModel.onOpen();
        }

        rentModel.onOpen();
    },[currentUser, loginModel, rentModel])
  return (
    <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
            <DarkModeToggle />
            <div 
            onClick={onRent}
            className='
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            hover:text-black
            transition
            cursor-pointer
            '>
                Hello {currentUser ? currentUser.name : "User"}
            </div>
            <div 
            onClick={toogleOpen}
            className='
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
            '>
                <AiOutlineMenu />
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image}/> 
                </div>
            </div>
        </div>
        {isOpen && (
            <div className='
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            text-black
            overflow-hidden
            right-0
            top-12
            text-sm'>
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                        <MenuItems 
                        onClick={()=> router.push('/trips')}
                        label='My trips'/>
                        <MenuItems 
                        onClick={()=>router.push('/favorites')}
                        label='MY favourites'/>
                        <MenuItems 
                        onClick={()=>router.push('/reservations')}
                        label='MY Reservations'/>
                        <MenuItems 
                        onClick={()=> router.push('/properties')}
                        label='MY Properties'/>
                        <MenuItems 
                        onClick={rentModel.onOpen}
                        label='Airbnb my home'/>
                        <hr />
                        <MenuItems 
                        onClick={() => router.push('/payment')}
                        label='Make Payment for Your trip'/>
                        <hr />
                        <MenuItems 
                        onClick={()=>signOut()}
                        label='Log Out'/>
                        </>
                    ) : (
                    <>
                    <MenuItems 
                    onClick={loginModel.onOpen}
                    label='Login'/>
                    <MenuItems 
                    onClick={registerModel.onOpen}
                    label='Sign Up'/>
                    </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}
