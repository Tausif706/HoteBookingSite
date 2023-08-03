"use client"
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle} from "react-icons/fc"
import {toast} from 'react-hot-toast'
import { useCallback , useState } from "react"
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import { UseRegisterModel } from "@/app/hooks/UseRegisterModel"
import { Model } from "./Model"
import { Heading } from "../Heading"
import { Input } from "../inputs/Input"
import { Button } from "../Button"
import { signIn } from "next-auth/react"
import { UseLoginModel } from "@/app/hooks/UseLoginModel"

export const RegisterModel = () => {
  const loginModel = UseLoginModel();
  const registerModel = UseRegisterModel();
  const [isLoading,setisLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: {
        errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
        name: '',
        email: '',
        password: '',
    }
  })

  const onSubmit : SubmitHandler<FieldValues> = (data) =>{
    setisLoading(true);

    axios.post('/api/register',data)
        .then(() => {
            registerModel.onClose()
            loginModel.onOpen()
        })
        .catch((error) => {
            toast.error("something went wrong")
        })
        .finally(() => {
            setisLoading(false)
        })
  }

  const toggle = useCallback(() => {
    loginModel.onOpen();
    registerModel.onClose();
  },[loginModel,registerModel]);

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Heading 
        title='Welcome to Airbnb'
        subtitle="Create an account"/>
      <Input 
        id='name'
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id='email'
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id='password'
        label="Password"
        type="Password"
        // formatPrice
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>
            Already have an account
          </div>
          <div onClick={toggle} 
          className="text-neutral-800 cursor-pointer hover:underline">
            Log in
          </div>
        </div>
      </div>
    </div>
  )
    return (
    <Model
        disabled={isLoading}
        isOpen={registerModel.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModel.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
  )
}
