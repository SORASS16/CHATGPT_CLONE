import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const InputField = () => {
  return (
    <div className="relative flex h-screen items-end justify-center">
      <div className="flex space-x-2 pb-4 mb-10">
        <Input type="text" placeholder="Enter your Prompt here" className='m-auto w-96' />
        <Button type="submit" className='m-auto'>Enter</Button>
      </div>
    </div>
  )
}

export default InputField;