'use client'
import NotFound from '@/app/not-found'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';
import store from '@/redux/store'
import { useState } from 'react'
type Props = {
    type: string,
    data: { name: string, img: string, slug: string }[]
}

const View = ({ type, data }: Props) => {

    const toPage = useRouter()

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {

        store.subscribe(() => setCurrentTheme(store.getState().theme))

    }

    update()

    switch (type) {
        case "grid":
            return (
                <div className='grid_box'>
                    <div className={currentTheme ? 'xs6 sm4 md3 lg2 boxShadow background_light' : 'xs6 sm4 md3 lg2 boxShadow background_dark'} style={{ borderRadius: "5px" }}>
                        <div className='center' style={{ aspectRatio: 10 / 8, position: "relative", margin: 0, textAlign: "center" }}>
                            <AddIcon style={{ margin: "auto" }} />
                        </div>
                        <div style={{ aspectRatio: 10 / 2, margin: "5px 0px", fontSize: "0.9rem", textAlign: "center" }}>
                            <p title={"new"} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}>new</p>
                        </div>
                    </div>
                    {data.map((item, index) =>
                        <div className={currentTheme ? 'xs6 sm4 md3 lg2 boxShadow background_light' : 'xs6 sm4 md3 lg2 boxShadow background_dark'} key={index} style={{ borderRadius: "5px", padding: "5px" }} onClick={() => { + toPage.push("photo/" + item.slug) }}>
                            <div style={{ aspectRatio: 10 / 8, position: "relative", margin: 0, }}>
                                <Image src={"/img/" + item.img} fill style={{ objectFit: 'cover', borderRadius: "5px" }} alt='ava' />
                            </div>
                            <div style={{ aspectRatio: 10 / 2, margin: "5px 0px", fontSize: "0.9rem", textAlign: "center" }}>
                                <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}>{item.name}</p>
                            </div>
                        </div>
                    )}
                </div>
            )
    }
    return <NotFound />
}

export default View