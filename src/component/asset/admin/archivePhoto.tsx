import View from '@/component/display/view'
import Button from '@/component/input/button'
import React from 'react'

type Props = {
    data: { name: string, img: string, slug: string }[]
}

const ArchivePhoto = ({ data }: Props) => {
    return (
        <div className='archive_photo'>
            <View type='grid' data={data} />
        </div>
    )
}

export default ArchivePhoto