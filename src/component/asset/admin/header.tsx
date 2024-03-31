'use client'
import React, { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import { setTheme } from '@/redux/reducer/ThemeReduce';
import Divider from '@/component/display/divider';
type Props = {}

const Header = (props: Props) => {

    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => update())

    const deviders = [
        {
            name: "log in",
            link: "/admin/login"
        },
        {
            name: "sign up",
            link: "/admin/signup"
        }
    ]

    const [dividerOpen, setDividerOpen] = useState<boolean>(false)

    return (
        <div className='header'>
            {currentMenu ? <MenuOpenIcon onClick={() => store.dispatch(setMenu(false))} /> : <MenuIcon onClick={() => store.dispatch(setMenu(true))} />}
            <h1>Admin</h1>
            <div className="icons">
                <PersonIcon onClick={() => setDividerOpen(!dividerOpen)} />
                {currentTheme ? <DarkModeIcon onClick={() => store.dispatch(setTheme(false))} /> : <LightModeIcon onClick={() => store.dispatch(setTheme(true))} />}
            </div>
            <Divider data={deviders} modalOpen={dividerOpen} />
        </div>
    )
}

export default Header