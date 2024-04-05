import ArchiveMain from '@/component/asset/admin/archiveMain'
import Header from '@/component/asset/admin/header'
import Menu from '@/component/asset/admin/menu'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className='admin scrollNone'>
            <Header />
            <div className="main ">
                <Menu />
                <ArchiveMain>
                    {children}
                </ArchiveMain>
            </div>
        </div>
    )
}

export default layout