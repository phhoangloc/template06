'user client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import UploadButton from '../input/uploadButton';
import { UserAuthen } from '@/axios/UserAuthen';
import RefreshIcon from '@mui/icons-material/Refresh';
import store from '@/redux/store';
type Props = {
    open?: boolean,
    close?: () => void
    select?: (e: any) => void
}

const PictureModal = ({ open, close, select }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()


    const [refresh, setRefresh] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    const getFile = async (e: any) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            // create && create(reader.result, file)
            setLoading(true)
            const result = await UserAuthen.uploadFile(file)
            if (result) {
                setLoading(false)
                setRefresh(n => n + 1)
            }
        }
    }

    const [data, setData] = useState<any>([])

    const getPhoto = async (p: string, archive: string, skip: number, limit: number) => {
        const result = await UserAuthen.getItem(p, archive, skip, limit)
        if (result?.success) {
            setData(result.data)
        } else {
            setData([])
        }
    }

    useEffect(() => {
        currentUser?.position && getPhoto(currentUser?.position, "pic", 0, 0)
    }, [refresh])


    return (
        <div className='pictureModal' style={{ display: open ? "block" : "none" }}>
            <CloseIcon onClick={() => close && close()} style={{ position: "absolute", right: "5px", top: "5px", zIndex: 2 }} />
            <div className='pictureBox scrollNone grid_box '>
                <div
                    className='xs4 sm4 md3 lg2 boxShadow center '
                    style={{ height: "max-content", borderRadius: "5px", cursor: "pointer", textAlign: "center", padding: "5px" }}>
                    <div className='center' style={{ aspectRatio: 1, position: "relative", margin: 0 }}>
                        <UploadButton icon={loading ? <RefreshIcon /> : <AddIcon />} func={(e) => getFile(e)} />
                    </div>
                </div>
                {
                    data?.map((item: any, index: any) =>
                        <div
                            className='xs4 sm4 md3 lg2 boxShadow'
                            key={index}
                            style={{ height: "max-content", borderRadius: "5px", cursor: "pointer" }}
                            onClick={() => select && select(item)}>
                            <div style={{ aspectRatio: 1, position: "relative", margin: 0 }}>
                                <Image src={process.env.google_url + item.name} sizes='100%' alt='pic' fill style={{ objectFit: 'cover', borderRadius: "5px" }} priority={true} />
                            </div>

                        </div>
                    )

                }
            </div>
        </div>
    )
}

export default PictureModal