'use client'
import React, { useState } from 'react'
import store from '../store'

type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {

        store.subscribe(() => setCurrentTheme(store.getState().theme))

    }

    update()
    return (
        <div className={`provider ${currentTheme ? "light" : "dark"}`} >
            {children}
        </div>

    )
}

export default Provider