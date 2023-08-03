"use client"

import useLoadingModel from "@/app/hooks/UseLoadingModel"
import { Model } from "./Model"

const LoadingModel = () => {
    const loadingModel = useLoadingModel()
  return (
    <Model
        disabled={false}
        isOpen={loadingModel.isOpen}
        title=""
        actionLabel=""
        onClose={loadingModel.onClose}
        onSubmit={() => {}}
        body={<h1 className="flex items-center justify-center">...loading</h1>}
        footer={<p> </p>}
        />
  )
}
export default LoadingModel