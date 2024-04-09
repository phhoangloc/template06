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
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
type Props = {
    item: any,
    archive: string,
    edit?: boolean
}

const SingleView = ({ item, edit, archive }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
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

    const [newLesson, setNewLesson] = useState<string>("")

    const createLesson = async (v: string, course: string) => {
        const body = {
            name: v,
            slug: v,
            course
        }

        const result = v && await UserAuthen.createLesson(currentUser.position, body)
        if (result?.success) {
            store.dispatch(setRefresh())
        }
    }

    return (edit ?
        <div className='grid_box scrollNone'>
            <div className={`imageBox center xs12 md6 lg4 boxShadow ${currentTheme ? "background_light" : "background_dark"}`} style={{ height: "max-content", borderRadius: "5px", top: "15%", padding: "10px" }}>
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
                <div className={`imageBox center xs12 md6 lg4 boxShadow ${currentTheme ? "background_light" : "background_dark"}`} style={{ height: "max-content", borderRadius: "5px", top: "15%", padding: "10px" }}>
                    <UploadPicturePreview icon={<AddPhotoAlternateIcon />} func={() => { setModalPic(true) }} src={previewCover ? previewCover : cover ? process.env.google_url + cover?.name : null} />
                </div>
                <div className={`detailBox xs12 md6 lg8 `} style={{ overflowX: "hidden" }}>
                    <div style={{ display: "flex" }}>
                        <Button name="save" onClick={() => updateItem(item?.host?.position, archive, item?._id, { name, slug, detail })} />
                        <Button name="cancel" onClick={() => setWannaEdit(false)} />
                    </div>
                    <div className={` boxShadow ${currentTheme ? "background_light" : "background_dark"}`} style={{ padding: "10px", borderRadius: "5px" }}>
                        <Input name="name" onChange={(e) => setName(e)} value={name} />
                        <Input name="slug" onChange={(e) => setSlug(e)} value={slug} />
                        <TextAreaTool name='' onChange={(e) => setDetail(e)} value={detail} />
                    </div>
                    {item?.genre === "course" ?
                        <div className={` boxShadow ${currentTheme ? "background_light" : "background_dark"}`} style={{ padding: "10px", borderRadius: "5px" }}>
                            <div><h2>Lesson</h2></div>
                            {
                                item?.lesson ? item.lesson.map((l: any, index: number) =>
                                    <div style={{ display: "flex", margin: 0 }} key={index}>
                                        <Input name={`lesson ${index + 1}`} onChange={(e) => setSlug(e)} value={l.name} disabled={true} />
                                        <EditIcon onClick={() => toPage.push("/" + item.host.position + "/" + archive + "/" + item.slug + "/" + l.slug)}
                                            style={{ width: "30px", height: "30px", boxSizing: "border-box", padding: "5px", margin: "20px 0" }}
                                        />
                                    </div>
                                )
                                    : null
                            }
                            <div style={{ display: "flex", margin: 0 }} >
                                <Input name={`new lesson`} onChange={(e) => setNewLesson(e)} value={newLesson} />
                                <AddIcon onClick={() => createLesson(newLesson, item._id)}
                                    style={{ width: "30px", height: "30px", boxSizing: "border-box", padding: "5px", margin: "20px 0" }}
                                />
                            </div>
                        </div> : null
                    }
                    <div style={{ width: "max-content", margin: "10px 0 10px auto" }}><Button name='delete' onClick={() => deleteItem(item?.host?.position, archive, item._id)} /></div>
                    <div>
                        <PictureModal open={modalPic}
                            close={() => setModalPic(false)}
                            select={(cover => { setCover(cover), setModalPic(false), setPreviewCover(null) })}
                        />
                    </div>
                </div>

            </div>
            :
            <div className='grid_box scrollNone'>
                <div className={`imageBox center xs12 md6 lg4 boxShadow ${currentTheme ? "background_light" : "background_dark"}`} style={{ height: "max-content", borderRadius: "5px", top: "25%", padding: "10px" }}>
                    <Image src={process.env.google_url + item?.cover?.name} width={500} height={500} alt='cover' style={{ width: "100%", height: "auto" }} />
                </div>
                <div className={`detailBox xs12 md6 lg8 `} style={{ margin: "10px", overflowX: "hidden" }}>
                    {currentUser?._id.toString() === item.host._id.toString() || currentUser?.position === "admin" ? <Button name='edit' onClick={() => setWannaEdit(!wannaEdit)} /> : null}
                    <div className={`innerDetail boxShadow ${currentTheme ? "background_light" : "background_dark"}`} style={{ textAlign: "justify", padding: "10px", borderRadius: "5px", minHeight: "100px" }} >
                        <h2 style={{ paddingBottom: "5px", borderBottom: "1px solid #aaa" }}>{item.name}</h2>
                        <div dangerouslySetInnerHTML={{
                            __html: item?.detail
                        }} />
                    </div>
                    {
                        item?.lesson ? item.lesson.map((l: any, index: number) =>
                            <div key={index}
                                onClick={() => toPage.push("/" + item.host.position + "/" + archive + "/" + item.slug + "/" + l.slug)}
                                className={` boxShadow ${currentTheme ? "background_light" : "background_dark"}`} style={{ textAlign: "justify", borderRadius: "5px", minHeight: "100px" }} >
                                <div style={{ display: "flex", margin: "10px", padding: "10px 0", borderBottom: "1px solid #aaa" }}>
                                    <h4 style={{ fontWeight: "normal", opacity: 0.75, height: "max-content", margin: "auto 0 0 " }}>Lesson{index + 1}</h4>
                                    <h4 style={{ fontWeight: "bold", fontSize: "1.1rem", margin: "auto auto auto 10px" }}> {l.name}</h4>
                                </div>
                            </div>)
                            : null
                    }
                </div>
            </div>
    )
}

export default SingleView