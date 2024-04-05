import React, { useRef, useState } from 'react'
import store from '@/redux/store'
type Props = {
    onChange: (e: string) => void,
    name: React.ReactNode,
    value: string,
    type?: string,
    onfocus?: () => void,
    disabled?: boolean
}

const Input = ({ onChange, name, value, type, onfocus, disabled }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const [focus, setFocus] = useState<boolean>(false)

    return (
        <div className={`input ${focus || value ? "input_focus" : ""} `}>
            <p className={`name ${focus || value ? "name_focus" : ""}`} >{name}</p>
            <input className="input_box"
                disabled={disabled ? disabled : false}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => { setFocus(true); onfocus && onfocus() }}
                onBlur={() => setFocus(false)}
                type={type}
            ></input>
        </div >
    )
}

export default Input