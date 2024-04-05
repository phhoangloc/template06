'use client'
import NotFound from '@/app/not-found'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';
import store from '@/redux/store'
import { useState } from 'react'
import UploadButton from '../input/uploadButton'
import { UserAuthen } from '@/axios/UserAuthen'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import DeleteIcon from '@mui/icons-material/Delete';
type Props = {
    type: string,
    data: any[],
    createNew?: () => void
}

const View = ({ type, data, createNew }: Props) => {

    const toPage = useRouter()

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()

    const getFile = async (e: any) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            await UserAuthen.uploadFile(file)
            store.dispatch(setRefresh())
        }
    }

    const deleteFile = async (name: string, id: string) => {
        await UserAuthen.deleteFile(name, id)
        store.dispatch(setRefresh())

    }

    switch (type) {
        case "pic":
            return (
                <div className='grid_box'>
                    <div className={currentTheme ? 'xs6 sm4 md3 lg2 boxShadow background_light' : 'xs6 sm4 md3 lg2 boxShadow background_dark'} style={{ borderRadius: "5px", cursor: "pointer" }}
                        onClick={() => createNew && createNew()}>
                        <div className='center' style={{ aspectRatio: 10 / 8, position: "relative", margin: 0, textAlign: "center" }}>
                            <UploadButton icon={<AddIcon />} func={(e) => getFile(e)} />
                        </div>
                        <div style={{ aspectRatio: 10 / 2, margin: "5px 0px", fontSize: "0.9rem", textAlign: "center" }}>
                            <p title={"new"} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}>new</p>
                        </div>
                    </div>
                    {data.map((item, index) =>
                        <div className={currentTheme ? 'xs6 sm4 md3 lg2 boxShadow background_light' : 'xs6 sm4 md3 lg2 boxShadow background_dark'} key={index}
                            style={{ borderRadius: "5px", padding: "5px", cursor: "pointer", position: "relative" }}
                        >
                            <DeleteIcon style={{ position: "absolute", top: 5, right: 5, zIndex: 1, borderRadius: "5px" }} onClick={() => deleteFile(item.name, item._id)} />
                            <div style={{ aspectRatio: 10 / 8, position: "relative", margin: 0, }}>
                                {
                                    item.cover?.name && <Image src={process.env.google_url + item.cover?.name} fill sizes='100%' style={{ objectFit: 'cover', borderRadius: "5px" }} alt='ava' priority={true} /> ||
                                    item.name && <Image src={process.env.google_url + item.name} fill sizes='100%' style={{ objectFit: 'cover', borderRadius: "5px" }} alt='ava' priority={true} />
                                }
                            </div>
                            <div style={{ aspectRatio: 10 / 2, margin: "5px 0px", fontSize: "0.9rem", textAlign: "center" }}>
                                <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}
                                    onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : toPage.push(item.genre + "/" + item.name) }}>{item.name || item.title} </p>
                            </div>
                        </div>
                    )}
                </div>
            )
        case "grid":
            return (
                <div className='grid_box'>
                    <div className={currentTheme ? 'xs6 sm4 md4 lg3 boxShadow background_light' : 'xs6 sm4 md4 lg3 boxShadow background_dark'} style={{ borderRadius: "5px", cursor: "pointer" }}
                        onClick={() => createNew && createNew()}>
                        <div className='center' style={{ aspectRatio: 10 / 8, position: "relative", margin: 0, textAlign: "center" }}>
                            <UploadButton icon={<AddIcon />} func={(e) => getFile(e)} />
                        </div>
                        <div style={{ aspectRatio: 10 / 2, margin: "5px 0px", fontSize: "0.9rem", textAlign: "center" }}>
                            <p title={"new"} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}>new</p>
                        </div>
                    </div>
                    {data?.map((item, index) =>
                        <div className={currentTheme ? 'xs6 sm4 md4 lg3 boxShadow background_light' : 'xs6 sm4 md4 lg3 boxShadow background_dark'} key={index}
                            style={{ borderRadius: "5px", padding: "5px", cursor: "pointer", position: "relative" }}
                        >
                            <div style={{ aspectRatio: 10 / 8, position: "relative", margin: 0, }}>
                                {
                                    item.cover?.name && <Image src={process.env.google_url + item.cover?.name} fill sizes='100%' style={{ objectFit: 'cover', borderRadius: "5px" }} alt='ava' priority={true} /> ||
                                    item.name && <Image src={process.env.google_url + item.name} fill sizes='100%' style={{ objectFit: 'cover', borderRadius: "5px" }} alt='ava' priority={true} />
                                }
                            </div>
                            <div style={{ aspectRatio: 10 / 2, margin: "5px 0px", fontSize: "0.9rem", textAlign: "center" }}>
                                <p title={item.name} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}
                                    onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : toPage.push(item.genre + "/" + item.name) }}>{item.name || item.title || item.username} </p>
                            </div>
                        </div>
                    )}
                </div>
            )
        case "list":
            return (
                <div className={`grid_box boxShadow ${currentTheme ? "background_light" : "background_dark"}`} style={{ borderRadius: "5px", margin: "0px" }}>
                    <div className={'xs12 hoverColor'} style={{ borderRadius: "10px", padding: "10px", cursor: "pointer", margin: "5px" }}
                        onClick={() => createNew && createNew()}>
                        <div style={{ margin: "0px", fontSize: "0.9rem", textAlign: "center" }}>
                            <p title={"new"} style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap", textAlign: "left" }}>new</p>
                        </div>
                    </div>
                    {
                        data?.map((item, index) =>
                            <div className={'xs12 hoverColor'} key={index}
                                style={{ borderRadius: "5px", padding: "10px", cursor: "pointer", position: "relative", margin: "5px" }}
                            >
                                <DeleteIcon style={{ position: "absolute", top: 5, right: 5, zIndex: 1, borderRadius: "5px" }} onClick={() => deleteFile(item.name, item._id)} />
                                <div style={{ margin: "0px", fontSize: "0.9rem", textAlign: "center" }}>
                                    <p title={item.name} style={{ width: "90%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap", textAlign: "left" }}
                                        onClick={() => { item.slug ? toPage.push(item.genre + "/" + item.slug) : toPage.push(item.genre + "/" + item.name) }}>{item.name || item.title || item.username} </p>
                                </div>
                            </div>
                        )
                    }
                </div >
            )
    }
    return <NotFound />
}

export default View