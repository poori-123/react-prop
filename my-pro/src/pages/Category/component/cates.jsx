import React from 'react'
import AppScroll from '../../../components/app-scroll/app-scroll';
export default function cates(props) {
    var changeTypeAction = (id) => () => {
        props.changeType(id);
    }
    return (
        <div className="cates">
            <AppScroll className="scroll">
               {
                    props.data.map(item => (
                        <li onClick={changeTypeAction(item.id)} style={{color: props.typeId === item.id && 'red'}}  key={item.id} >{item.text}</li>
                    ) )
                } 
            </AppScroll>
            
        </div>
    )
}
