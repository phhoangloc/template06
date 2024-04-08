'use client'
import React, { useState } from 'react'

type Props = {
    lesson: any
}

const LessonView = ({ lesson }: Props) => {
    const [wannaEdit, setWannaEdit] = useState<boolean>(false)
    const [modalPic, setModalPic] = useState<boolean>(false)
    return (
        <div className='grid_box scrollNone'>
            <div className={`detailBox xs12 `} style={{ margin: "0px", overflowX: "hidden" }}>

                <h2>{lesson?.name}</h2>
                <div dangerouslySetInnerHTML={{ __html: lesson.detail }} />
                {
                    lesson?.vocabulary ? lesson?.vocabulary.map((voca: any, index: number) =>
                        <div key={index}>
                            <h3>{voca.word}</h3>
                            <p>{voca.script}</p>
                        </div>)
                        : null
                }
                {
                    lesson?.listen ? lesson?.listen.map((listen: any, index: number) =>
                        <div key={index}>{listen.word}</div>)
                        : null
                }
            </div>
        </div>
    )
}

export default LessonView