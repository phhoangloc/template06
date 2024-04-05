'use client'
import { UserAuthen } from '@/axios/UserAuthen'
import SingleView from '@/component/display/singleView'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
type Props = {
    params: { archive: string, slug: string }
}

const Page = ({ params }: Props) => {

    const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentRefresh(store.getState().refresh))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()


    const [item, setItem] = useState<any>({})
    const getItemBySlug = async (a: string, s: string) => {
        const result = await UserAuthen.getOneItembySlug(a, s)

        if (result?.success && result.data.length) {
            setItem(result.data[0])
        } else {
            setItem({})
        }
    }

    useEffect(() => {
        getItemBySlug(params.archive, params.slug)
    }, [currentRefresh])

    if (params.slug === "new") {
        return (
            <div className='single'>
                <SingleView item={item} edit={true} archive={params.archive} />
            </div>
        )
    }
    return (
        <div className='single'>
            {item?._id ? <SingleView item={item} edit={false} archive={params.archive} /> : null}
        </div>
    )
}

export default Page