import NotFound from '@/app/not-found'
import ArchivePhoto from '@/component/asset/admin/archivePhoto'
import Page from '@/component/display/view'
import React from 'react'

type Props = {
    params: { archive: string }
}

const page = ({ params }: Props) => {
    const data = [
        {
            name: "name01",
            img: "pic1.jpg",
            slug: "name01"
        },
        {
            name: "name02",
            img: "pic2.jpg",
            slug: "name02"
        },
        {
            name: "name03",
            img: "pic3.jpg",
            slug: "name03"
        },
        {
            name: "name04",
            img: "pic4.jpg",
            slug: "name04"
        },
        {
            name: "name05",
            img: "pic5.jpg",
            slug: "name05"
        },
    ]
    switch (params.archive) {
        case "photo":
            return <ArchivePhoto data={data} />
        case "blog":
        case "product":
        case "user":
        case "profile":
            return <div >{params.archive}</div>
        case "chat":
            return <div >{params.archive}</div>
    }
    return <NotFound />
}

export default page