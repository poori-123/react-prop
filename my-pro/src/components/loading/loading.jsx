import React from 'react'
import './style.scss';
export default function loading() {
    return (
        <div className="loading">
            <div className="ani">
                <span className="s1"></span>
                <span className="s2"></span>
            </div>
            <p>loading...</p>
        </div>
    )
}
