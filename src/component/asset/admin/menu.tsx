'use client'
import React, { useState } from 'react'
import store from '@/redux/store'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useRouter } from 'next/navigation';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatIcon from '@mui/icons-material/Chat';
import AppsIcon from '@mui/icons-material/Apps';
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhotoIcon from '@mui/icons-material/Photo';
import PersonIcon from '@mui/icons-material/Person';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
type Props = {}

const Menu = (props: Props) => {

    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    const [i, setI] = useState<number>(0)
    const menus = [
        {
            name: "dashboard",
            icon: <DashboardIcon />,
            link: "/admin"
        },
        {
            name: "authentication",
            icon: <LockIcon />,
            children: [
                {
                    name: "login",
                    icon: <LoginIcon />,
                    link: "/admin/login"
                },
                {
                    name: "sign up",
                    icon: <PersonAddIcon />,
                    link: "/admin/signup"
                },
            ]
        },
        {
            name: "App",
            icon: <AppsIcon />,
            children: [
                {
                    name: "Chat",
                    icon: <ChatIcon />,
                    link: "/admin/chat"
                },
                {
                    name: "Blog",
                    icon: <ArticleIcon />,
                    link: "/admin/blog"
                },
                {
                    name: "Course",
                    icon: <EditNoteIcon />,
                    link: "/admin/course"
                },
                {
                    name: "Picture",
                    icon: <PhotoIcon />,
                    link: "/admin/pic"
                },
                {
                    name: "File",
                    icon: <AttachFileIcon />,
                    link: "/admin/file"
                }
            ]
        },

    ]
    const menusAdmin = [
        {
            name: "User",
            icon: <PersonIcon />,
            link: "/admin/user",
        }
    ]

    const toPage = useRouter()
    return (
        <div className={`menu ${currentMenu ? "menuOpen" : ""}`}>
            {
                menus.map((item, index) =>
                    <div key={index}>
                        <div className='item' onClick={() => item.link ? toPage.push(item.link) : setI(index)}>{item.icon}
                            <p>{item.name}</p>
                        </div>
                        {i === index ?
                            item.children?.map((child: any, childindex: number) =>
                                <div className='item child_item' key={childindex} onClick={() => toPage.push(child.link)}>
                                    {child.icon}
                                    <p>{child.name}</p>
                                </div>

                            ) : null}
                    </div>
                )

            }
            {
                currentUser.position === "admin" && menusAdmin.map((item, index) =>
                    <div key={index}>
                        <div className='item' onClick={() => item.link ? toPage.push(item.link) : setI(index)}>{item.icon}
                            <p>{item.name}</p>
                        </div>
                    </div>
                )

            }

        </div>
    )
}

export default Menu