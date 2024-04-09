'use client'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import Button from '../input/button'
import Input from '../input/input'
import TextAreaTool from '../input/textareaTool'
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    lesson: any
}

const LessonView = ({ lesson }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const [wannaEdit, setWannaEdit] = useState<boolean>(false)

    const [i, setI] = useState<number>(-1)
    const [name, setName] = useState<string>("")
    const [slug, setSlug] = useState<string>("")
    const [detail, setDetail] = useState<string>("")
    const [word, setWord] = useState<string>("")
    const [script, setScript] = useState<string>("")

    const [vocabulary, setvocabulary] = useState<any>([])

    useEffect(() => {
        lesson?.name ? setName(lesson.name) : null
        lesson?.slug ? setSlug(lesson.slug) : null
        lesson?.detail ? setDetail(lesson.detail) : null
        lesson?.vocabulary ? setvocabulary(lesson.vocabulary) : null
    }, [lesson])

    const getNewInfor = () => {
        setWord(vocabulary[i]?.word)
        setScript(vocabulary[i]?.script)
    }

    useEffect(() => {
        getNewInfor()
    }, [i])

    return (
        <div className='grid_box scrollNone'>
            {wannaEdit ?
                <div className={`detailBox xs12 `} style={{ maxWidth: "768px", margin: "auto" }}>
                    <div style={{ margin: 0, display: "flex" }}>
                        <Button name='save' onClick={() => setWannaEdit(false)} />
                        <Button name='cancel' onClick={() => setWannaEdit(false)} />
                    </div>
                    <div
                        className={`boxShadow ${currentTheme ? "background_light" : "background_dark"}`}
                        style={{ padding: "10px", borderRadius: "5px" }}
                    >
                        <Input name="Lession 01" value={name} onChange={(e) => setName(e)} />
                        <Input name="slug" value={slug} onChange={(e) => setSlug(e)} />
                        <TextAreaTool name='' onChange={(e) => setDetail(e)} value={detail} />

                    </div>
                    <div className={`boxShadow ${currentTheme ? "background_light" : "background_dark"}`}
                        style={{ padding: "10px", borderRadius: "5px" }}>
                        <div><h2>vocabulary</h2></div>
                        {
                            vocabulary.length ?
                                vocabulary.map((voca: any, index: number) =>
                                    i === index ?
                                        <div key={index}>
                                            <Input name="word" value={word || voca.word} onChange={(e) => setWord(e)} />
                                            <TextAreaTool name='' onChange={(e) => { setScript(e) }} value={voca.script} />
                                            <div style={{ display: 'flex', margin: "auto 0 auto auto", width: "max-content" }}><Button name='save' onClick={() => { setI(-1) }} /><Button name="cancel" onClick={() => setI(-1)} /></div>
                                        </div> :
                                        <div key={index}>
                                            <h3>
                                                <span style={{ fontSize: "0.9rem", fontWeight: "normal", opacity: "0.75" }}>{index + 1}. </span>
                                                {voca.word}
                                                <EditIcon onClick={() => { setI(index) }} style={{ width: "20px", height: "20px", margin: "0 10px", opacity: 0.75, cursor: "pointer" }} /></h3>
                                            <div dangerouslySetInnerHTML={{ __html: voca.script }} style={{ margin: "5px 0 0" }} />

                                        </div>
                                )
                                : null
                        }
                        <div>
                            <Button name='add' onClick={() => { console.log({ word, script }), setI(vocabulary.length), setvocabulary((p: any) => [...p, { word: "", script: "" }]) }} />
                        </div>
                    </div>


                    <div><h4>listen</h4></div>
                </div>
                :
                <div className={`detailBox xs12 `} style={{ maxWidth: "768px", margin: "auto" }}>
                    {currentUser?.position === "admin" ? <Button name='edit' onClick={() => setWannaEdit(!wannaEdit)} /> : null}
                    <div
                        className={`boxShadow ${currentTheme ? "background_light" : "background_dark"}`}
                        style={{ padding: "10px", borderRadius: "5px" }}
                    >
                        <h3 style={{ fontWeight: "normal", height: "max-content", margin: "auto 0 0 ", fontSize: "0.9rem" }}>Lession 01</h3>
                        <h2 style={{ width: "100%" }}>{lesson?.name}</h2>
                    </div>
                    <div
                        className={`boxShadow ${currentTheme ? "background_light" : "background_dark"}`}
                        style={{ padding: "10px", borderRadius: "5px", minHeight: "200px" }}>
                        <div dangerouslySetInnerHTML={{ __html: lesson.detail }} style={{ margin: 0 }} />
                    </div>
                    <div><h4>vocabulary</h4></div>
                    {
                        lesson?.vocabulary ? lesson?.vocabulary.map((voca: any, index: number) =>
                            <div key={index}
                                className={`boxShadow ${currentTheme ? "background_light" : "background_dark"}`}
                                style={{ padding: "10px", borderRadius: "5px" }}>
                                <h3><span style={{ fontSize: "0.9rem", fontWeight: "normal", opacity: "0.75" }}>{index + 1}. </span>{voca.word}</h3>
                                <div dangerouslySetInnerHTML={{ __html: voca.script }} style={{ margin: "5px 0 0", minHeight: "100px" }} />
                            </div>)
                            : null
                    }
                    <div><h4>listen</h4></div>
                    {
                        lesson?.listen ? lesson?.listen.map((listen: any, index: number) =>
                            <div key={index}>{listen.word}</div>)
                            : null
                    }
                </div>
            }
        </div>
    )
}

export default LessonView