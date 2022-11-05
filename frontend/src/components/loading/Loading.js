import React from 'react'
import loadingImg from "../../assets/dancing-spiderman.gif"
import ReactDOM from 'react-dom'
import "./loading.scss"

const Loading = () => {
    return ReactDOM.createPortal(
        <div className='wrapper'>
            <div className='spinner'>
                <img src={loadingImg} alt="Loading..." />
            </div>
        </div>,
        document.getElementById('spinner')
    )
}

export const Spinner = () => {
    return (
        <div className='--center-all'>
            <img src={loadingImg} alt="Loading..." />
        </div>
    )
}

export default Loading