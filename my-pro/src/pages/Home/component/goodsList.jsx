import React from 'react';

export default function goodsList(props) {
    var goodDetail = (id) => () => {
        props.history.push('/detail/' + id)
    }
    return (
        <div className="goodsList">
            {props.data.map(item => (
                <div className="good-item" key={item.id} onClick={goodDetail(item.id)}  >
                    <img src={item.picUrl} alt=""/>
                    <h3 className="ellipsis">{item.name}</h3>
                    <h4>￥{item.price}</h4>
                </div>
            ))}
        </div>
    )
}
