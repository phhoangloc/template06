import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Loading from '@/app/loading';
type Props = {
    open: boolean
    fileId?: string,
    closeModal?: () => void
}

const PlayerView = ({ open, fileId, closeModal }: Props) => {
    return (
        fileId ? <div className="iframe center" style={{ display: open ? "flex" : "none", position: "absolute", width: "100vw", height: "100vh", top: 0, left: 0, zIndex: 3, background: "black" }}>
            <CloseIcon style={{ position: "absolute", top: "5px", left: "5px", cursor: "hover" }} onClick={() => closeModal && closeModal()} />
            <div style={{ margin: "auto", width: "90%", height: "90%" }}><iframe src={`https://drive.google.com/file/d/${fileId}/preview`} style={{ width: "100%", height: "100%", border: "none", }} allow="autoplay"></iframe></div>
        </div> : <div className="iframe" style={{ display: open ? "block" : "none", position: "absolute", width: "100vw", height: "100vh", top: 0, left: 0, zIndex: 3 }}><Loading /></div>
    )
}

export default PlayerView