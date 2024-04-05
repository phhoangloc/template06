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
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import Image from 'next/image';
type Props = {}

const Header = (props: Props) => {

    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)


    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))

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
    const profiles = [
        {
            name: "profile",
            link: "/admin/profile"
        },
        {
            name: "log out",
            func: () => { localStorage.clear(); store.dispatch(setRefresh()) }
        }
    ]

    const [dividerOpen, setDividerOpen] = useState<boolean>(false)

    return (
        <div className='header'>
            {currentMenu ? <MenuOpenIcon onClick={() => store.dispatch(setMenu(false))} /> : <MenuIcon onClick={() => store.dispatch(setMenu(true))} />}
            <h1>Admin</h1>
            <div className="icons">
                {currentUser?.avata ? <Image src={process.env.google_url + currentUser?.avata?.name} width={500} height={500} alt='ava' style={{ width: "30px", height: "30px", margin: "auto", cursor: "pointer", borderRadius: "50%" }} onClick={() => setDividerOpen(!dividerOpen)} /> : <PersonIcon onClick={() => setDividerOpen(!dividerOpen)} />}
                {currentTheme ? <DarkModeIcon onClick={() => store.dispatch(setTheme(false))} /> : <LightModeIcon onClick={() => store.dispatch(setTheme(true))} />}
            </div>
            {currentUser._id ? <Divider data={profiles} modalOpen={dividerOpen} closeModal={() => setDividerOpen(false)} /> : <Divider data={deviders} modalOpen={dividerOpen} closeModal={() => setDividerOpen(false)} />}
        </div>
    )
}

export default Header