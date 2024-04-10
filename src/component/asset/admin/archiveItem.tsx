'use client'
import { UserAuthen } from '@/axios/UserAuthen'
import View from '@/component/display/view'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import NotFound from '@/app/not-found'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
type Props = {
    position: string
    archive: string
}

const ArchiveItem = ({ position, archive }: Props) => {
    const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentRefresh(store.getState().refresh))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    const [data, setData] = useState<any>([])
    const limit = 10
    const [page, setPage] = useState<number>(0)

    const getItem = async (p: string, archive: string, skip: number, limit: number) => {
        const result = await UserAuthen.getItem(p, archive, skip, limit)
        if (result?.success) {
            setData(result.data)
        } else {
            setData([])

        }
    }

    useEffect(() => {
        position && getItem(position, archive, page * limit, limit)
    }, [currentRefresh, position])

    const toPage = useRouter()

    if (archive === "pic") {

        return (
            <div className='archive_item'>
                <View type='pic' data={data} />
            </div>
        )
    }
    if (archive === "file") {

        return (
            <div className='archive_item'>
                <View type='file' data={data} />
            </div>
        )
    }
    if (archive === "user") {

        return (
            <div className='archive_item'>
                <View type='list' data={data} />
            </div>
        )
    }
    return (
        <div className='archive_item'>
            <View type='grid' data={data} createNew={() => toPage.push(archive + "/new")} />
        </div>
    )
}

export default ArchiveItem