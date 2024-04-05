'use client'
import React, { useState } from 'react'
import { Cherry_Bomb_One } from 'next/font/google'

const cherry = Cherry_Bomb_One({ subsets: ["latin"], weight: "400" })
const Clock = () => {

    const [hours, setHours] = useState<String>("")
    const [minutes, setMinutes] = useState<String>("")
    const [seconds, setSeconds] = useState<String>("")

    function updateClock() {
        const now = new Date();
        setHours(now.getHours().toString().padStart(2, "0"))
        setMinutes(now.getMinutes().toString().padStart(2, "0"))
        setSeconds(now.getSeconds().toString().padStart(2, "0"))
    }

    setInterval(() => {
        updateClock()
    }, 1000)

    return (
        hours && minutes ?
            <div className={cherry.className} style={{ marginBottom: "25px", fontSize: "30px", letterSpacing: "2.5px", transform: "scale(2.5)" }}>{hours}:{minutes} </div> :
            null
    )
}

export default Clock