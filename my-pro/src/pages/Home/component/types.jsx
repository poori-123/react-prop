import React from 'react'

export default function types(props) {
    var typeClick = (id) => () => {
        props.history.push('/category',{
            typeId: id
        })
    }
    return (
        <div className="types">
            {
                props.data.map(item => (
                    <div className="type-item" key={item.id} onClick={typeClick(item.id)} >
                        <img src={item.picUrl} alt=""/>
                        <p>{item.text}</p>
                    </div>
                ))
            }
        </div>
    )
}
