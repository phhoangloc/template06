'use client'
import NotFound from '@/app/not-found'
import ArchiveItem from '@/component/asset/admin/archiveItem'
import ProfileView from '@/component/display/profileView'
import React, { useState } from 'react'
import store from '@/redux/store'
type Props = {
    params: { archive: string }
}

const Page = ({ params }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    switch (params.archive) {
        case "pic":
        case "file":
        case "blog":
        case "user":
        case "course":
            return <ArchiveItem archive={params.archive} position={currentUser?.position} />
        case "profile":
            return <ProfileView />
        case "chat":
            return <div >{params.archive}</div>
    }
    return <NotFound />
}

export default Page