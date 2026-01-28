"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

const DemoPage = () => {
    
    const [loading,setLoading] = useState(false)

    const handleBlocking = async ()=>{
        setLoading(true)
        await fetch("/api/demo/bloking", {method:"POST"})
        setLoading(false)
    }


  return (
    <div className="p-8 space-x-4">
        <Button disabled={loading} onClick={handleBlocking}>
            {loading ? "Loading..." : "Bloking"}
        </Button>
    </div>
  )
}

export default DemoPage