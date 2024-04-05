'use client'
import React, { useState } from 'react'
import UploadPicturePreview from '../input/uploadPicturePreview'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import store from '@/redux/store';
import EditIcon from '@mui/icons-material/Edit';
import Input from '../input/input';
import PictureModal from '../modal/pictureModal';
import Button from '../input/button';
import { UserAuthen } from '@/axios/UserAuthen';
type Props = {}

const ProfileView = (props: Props) => {
    const [edit, setEdit] = useState<boolean>(true)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentRefresh(store.getState().refresh))
    }

    update()

    const [username, setUsername] = useState<string>("")
    const [setupCover, setSetupCover] = useState<boolean>(false)
    const [setupAvata, setSetupAvata] = useState<boolean>(false)
    const [cover, setCover] = useState<string>()
    const [position, setPosition] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [coverPreview, setCoverPreview] = useState<string>()
    const [coverPreviewName, setCoverPreviewName] = useState<string>()
    const [coverFile, setCoverFile] = useState<File>()
    const [avata, setAvata] = useState<string>()
    const [avataPreview, setAvataPreview] = useState<string>()
    const [avataPreviewName, setAvataPreviewName] = useState<string>()

    const body = {
        username: username || currentUser?.username,
        cover,
        avata
    }
    const updateProfile = async (body: any) => {
        const result = await UserAuthen.updtteProfile(body)
        console.log(result)
    }

    return (
        edit ?
            <div className={`profile boxShadow ${currentTheme ? "background_light" : "background_dark"} `}>
                <UploadPicturePreview
                    icon={<AddPhotoAlternateIcon />}
                    src={coverPreview ? coverPreview : coverPreviewName ? process.env.google_url + coverPreviewName : currentUser?.cover ? process.env.google_url + currentUser?.cover?.name : null}
                    size={40}
                    func={() => { setOpenModal(true), setSetupCover(true) }}
                />
                <div style={{ width: "60%", maxWidth: "250px", borderRadius: "50%", overflow: "hidden", aspectRatio: 1, margin: "-100px 0 0" }}>
                    <UploadPicturePreview icon={<AddPhotoAlternateIcon />}
                        src={avataPreview ? avataPreview : avataPreviewName ? process.env.google_url + avataPreviewName : currentUser?.avata ? process.env.google_url + currentUser?.avata?.name : null}
                        size={60}
                        func={() => { setOpenModal(true), setSetupAvata(true) }}
                    />
                </div>
                <div className='basic_infor'>
                    <h2>Basic Infor</h2>
                    <Input value={currentUser?.username || username} onChange={(e) => setUsername(e)} name="username" />
                    <Input name="position" value={currentUser?.position || position} onChange={(e) => console.log(e)} disabled={true} />
                    <Input name="email" value={currentUser?.email || email} onChange={(e) => console.log(e)} disabled={true} />
                </div>
                <Button name='save' onClick={() => updateProfile(body)} />
                <PictureModal open={openModal} close={() => setOpenModal(false)}
                    select={(cover) => {
                        setupCover && setCoverPreviewName(cover.name),
                            setupCover && setCover(cover._id),
                            setupCover && setSetupCover(false),
                            setupAvata && setAvataPreviewName(cover.name),
                            setupAvata && setAvata(cover._id),
                            setupAvata && setSetupAvata(false),
                            setOpenModal(false)
                    }} />
            </div>
            :
            null
    )
}

export default ProfileView