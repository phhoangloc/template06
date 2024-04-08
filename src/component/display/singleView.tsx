import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import UploadPicturePreview from '../input/uploadPicturePreview'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PictureModal from '../modal/pictureModal';
import Input from '../input/input';
import TextAreaTool from '../input/textareaTool';
import Button from '../input/button';
import { UserAuthen } from '@/axios/UserAuthen';
import store from '@/redux/store';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import { useRouter } from 'next/navigation';
type Props = {
    item: any,
    archive: string,
    edit?: boolean
}

const SingleView = ({ item, edit, archive }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    const toPage = useRouter()

    const [wannaEdit, setWannaEdit] = useState<boolean>(false)
    const [modalPic, setModalPic] = useState<boolean>(false)

    const [name, setName] = useState<string>(item?.name)
    const [slug, setSlug] = useState<string>(item?.slug)
    const [detail, setDetail] = useState<string>(item?.detail)
    const [cover, setCover] = useState<any>(item?.cover)
    const [previewCover, setPreviewCover] = useState<any>()
    const [fileCover, setFileCover] = useState<File>()

    const createItem = async (p: string, a: string, body: any) => {
        const result = body.name && body.detail && await UserAuthen.createItem(p, a, body)
        if (result.success) {
            toPage.push("/admin/" + archive + "/" + slug)
        }
    }

    const updateItem = async (p: string, a: string, id: string, body: any) => {
        const newcover = fileCover && await UserAuthen.uploadFile(p, fileCover)
        body.cover = newcover || cover?._id
        const result = body.name && body.detail && await UserAuthen.updateItem(p, a, id, body)
        if (result.success) {
            store.dispatch(setRefresh())
            setWannaEdit(false)
            toPage.push("/admin/" + archive)

        }
    }
    const deleteItem = async (p: string, a: string, id: string) => {
        await UserAuthen.deleteItem(p, a, id)
    }


    return (edit ?
        <div className='grid_box scrollNone'>
            <div className={`imageBox center xs12 md6 lg4 boxShadow`} style={{ height: "max-content", borderRadius: "5px", top: "15%", padding: "10px" }}>
                <UploadPicturePreview icon={<AddPhotoAlternateIcon />} func={() => { setModalPic(true) }} src={previewCover ? previewCover : cover?.name ? process.env.google_url + cover.name : null} />
            </div>
            <div className={`detailBox xs12 md6 lg8 `} style={{ overflowX: "hidden" }}>
                <Button name="save" onClick={() => createItem(currentUser?.position, archive, { name, slug, cover, detail })} />
                <Input name="name" onChange={(e) => setName(e)} value={name} />
                <Input name="slug" onChange={(e) => setSlug(e)} value={slug} />
                <TextAreaTool name='' onChange={(e) => setDetail(e)} value={detail} />
            </div>
            <PictureModal open={modalPic}
                close={() => setModalPic(false)}
                select={(cover) => { setCover(cover), setModalPic(false) }}
            />
        </div> :
        wannaEdit ?
            <div className='grid_box scrollNone'>
                <div className={`imageBox center xs12 md6 lg4 boxShadow`} style={{ height: "max-content", borderRadius: "5px", top: "15%", padding: "10px" }}>
                    <UploadPicturePreview icon={<AddPhotoAlternateIcon />} func={() => { setModalPic(true) }} src={previewCover ? previewCover : cover ? process.env.google_url + cover?.name : null} />
                </div>
                <div className={`detailBox xs12 md6 lg8 `} style={{ overflowX: "hidden" }}>
                    <div style={{ display: "flex" }}>
                        <Button name="save" onClick={() => updateItem(item?.host?.position, archive, item?._id, { name, slug, detail })} />
                        <Button name="cancle" onClick={() => setWannaEdit(false)} />
                    </div>
                    <Input name="name" onChange={(e) => setName(e)} value={name} />
                    <Input name="slug" onChange={(e) => setSlug(e)} value={slug} />
                    <TextAreaTool name='' onChange={(e) => setDetail(e)} value={detail} />
                    <Button name='delete' onClick={() => deleteItem(item?.host?.position, archive, item._id)} />
                </div>
                <PictureModal open={modalPic}
                    close={() => setModalPic(false)}
                    select={(cover => { setCover(cover), setModalPic(false), setPreviewCover(null) })}
                />
            </div>
            :
            <div className='grid_box scrollNone'>
                <div className={`imageBox center xs12 md6 lg4 boxShadow`} style={{ height: "max-content", borderRadius: "5px", top: "25%", padding: "10px" }}>
                    <Image src={process.env.google_url + item?.cover?.name} width={500} height={500} alt='cover' style={{ width: "100%", height: "auto" }} />
                </div>
                <div className={`detailBox xs12 md6 lg8 `} style={{ margin: "10px", overflowX: "hidden" }}>
                    {currentUser?._id.toString() === item.host._id.toString() || currentUser?.position === "admin" ? <Button name='edit' onClick={() => setWannaEdit(!wannaEdit)} /> : null}
                    <h2 style={{ margin: "0 0 25px" }}>{item.name}</h2>
                    <div className='innerDetail' style={{ textAlign: "justify", margin: 0 }} dangerouslySetInnerHTML={{
                        __html: item?.detail
                    }} />
                    {
                        item?.lesson ? item.lesson.map((l: any, index: number) =>
                            <div key={index} style={{ margin: "5px 0", padding: "10px 0" }} onClick={() => toPage.push("/" + item.host.position + "/" + archive + "/" + item.slug + "/" + l.slug)}>
                                <h3 style={{ fontWeight: "bold" }}><span style={{ fontWeight: "normal", fontSize: "0.9rem", opacity: 0.75 }}>UNIT{index + 1}</span> {l.name}</h3>
                            </div>)
                            : null
                    }
                </div>
            </div>
    )
}

export default SingleView