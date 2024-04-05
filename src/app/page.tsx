'use client'
import Clock from "@/component/asset/clock";
import App from "@/component/asset/app";
import { useEffect, useState } from "react";
import store from "@/redux/store";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonIcon from '@mui/icons-material/Person';
import { setTheme } from "@/redux/reducer/ThemeReduce";
import Image from "next/image";
import Divider from "@/component/display/divider";
import { setRefresh } from "@/redux/reducer/RefreshReduce";

export default function Home() {

  const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
  const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
  const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)

  const update = () => {
    store.subscribe(() => setCurrentTheme(store.getState().theme))
    store.subscribe(() => setCurrentUser(store.getState().user))
    store.subscribe(() => setCurrentRefresh(store.getState().refresh))
  }

  useEffect(() => {
    update()
  })

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
      name: "admin",
      link: "/admin"
    },
    {
      name: "log out",
      func: () => { localStorage.clear(); store.dispatch(setRefresh()) }
    }
  ]

  const [dividerOpen, setDividerOpen] = useState<boolean>(false)
  const [bgPreview, setBgPreview] = useState<string>("")
  return (
    <div className="landing center textAlignCenter" style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, width: "100%", textAlign: "right", height: "40px", zIndex: 2 }}>
        {currentUser?.avata ?
          <Image src={process.env.google_url + currentUser?.avata.name} width={500} height={500} alt="avata" style={{ cursor: "pointer", width: "30px", height: "auto", margin: "5px", borderRadius: "50%" }} onClick={() => setDividerOpen(!dividerOpen)} /> :
          <PersonIcon style={{ width: "30px", height: "30px", margin: "5px" }} onClick={() => setDividerOpen(!dividerOpen)} />}
        {currentTheme ? <DarkModeIcon onClick={() => store.dispatch(setTheme(false))} style={{ width: "30px", height: "30px", margin: "5px" }} /> : <LightModeIcon onClick={() => store.dispatch(setTheme(true))} style={{ width: "30px", height: "30px", margin: "5px" }} />}
        {currentUser._id ? <Divider data={profiles} modalOpen={dividerOpen} closeModal={() => setDividerOpen(false)} /> : <Divider data={deviders} modalOpen={dividerOpen} closeModal={() => setDividerOpen(false)} />}
      </div>
      {currentUser?.cover ? <Image src={process.env.google_url + currentUser?.cover?.name} fill alt='bg' style={{ objectFit: 'cover', opacity: "0.25", zIndex: 0 }} /> : null}
      <Clock />
      <App />
    </div>
  );
}
