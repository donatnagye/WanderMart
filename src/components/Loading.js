import React from 'react'
import { FaSpinner } from 'react-icons/fa';
import { MdHourglassEmpty } from 'react-icons/md';
import 'react-loading-skeleton/dist/skeleton.css';
import '../css/loading.css';

const Loading = () => {
    return (
        <div className="loading-spinner">
            <FaSpinner className="spinner-icon" />
        </div>
    )
}

export default Loading;