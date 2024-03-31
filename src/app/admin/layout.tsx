import Archive from '@/component/asset/admin/archive'
import Header from '@/component/asset/admin/header'
import Menu from '@/component/asset/admin/menu'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className='admin'>
            <Header />
            <div className="main ">
                <Menu />
                <Archive>{children}</Archive>
            </div>
        </div>
    )
}

export default layout