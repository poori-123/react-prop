import React, { useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Toast } from 'antd-mobile';

export default function ListItem({data}) {
    var dispatch = useDispatch();
    var listItem = useRef();
    var del = useRef();

    useEffect(()=>{
        let offset = 0;
        let w = del.current.offsetWidth;
        listItem.current.addEventListener( 'touchstart', (ev)=>{
            let start = ev.changedTouches[0].clientX - offset ;

            let moveAction = (ev)=>{
                listItem.current.className = 'list-item';
                let m = ev.changedTouches[0].clientX - start;
                if(m >= 0){
                    m = 0
                }
                if(m <= -w ){
                    m = -w;
                }
                offset = m;
                listItem.current.style.transform = `translateX( ${m}px )`;
            }

            let endAction = () => {
                listItem.current.className = 'list-item slide';
                if(offset <=0 && offset >= -w/2 ){
                    listItem.current.style.transform = `translateX( 0px )`;
                    offset = 0;
                }else{
                    listItem.current.style.transform = `translateX( ${-w}px )`;
                    offset = -w;
                }
                document.removeEventListener( 'touchmove', moveAction );
                document.removeEventListener( 'touchend', endAction );
            }
            document.addEventListener( 'touchmove', moveAction );
            document.addEventListener( 'touchend', endAction  )
        } )
    },[])

    var minuAction = useCallback((id) => () =>{
        if(data.count <= 1){
            Toast.info('最少购买一件！', 1);
            return;
        }
        dispatch({
            type: 'cart/updata',
            data:{
                id,
                key: 'count',
                value: Number(data.count) - 1
            }
        })
    },[dispatch,data.count])
    var addAction = useCallback((id) => () =>{
        dispatch({
            type: 'cart/updata',
            data:{
                id,
                key: 'count',
                value: Number(data.count) + 1
            }
        })
    },[dispatch,data.count])
    var changeAction = useCallback( (ev) =>{
        dispatch({
            type: 'cart/updata',
            data:{
                id: data._id,
                key: 'choosed',
                value: ev.target.checked
            }
        })
    },[dispatch,data._id] )
    var delAction = useCallback( () => {
        dispatch({
            type: 'cart/deleteData',
            id: data._id
        })
    },[])
    return (
        <div className="list-item-wrap">
            <div className="list-item" ref={listItem} >
                <div className="choose">
                    <input type="checkbox" checked={data.choosed} onChange={changeAction}  />
                </div>
                <div className="imgBox">
                    <img src={data.imgUrl} alt=""/>
                </div>
                <div className="info">
                    <h3 className="ellipsis">{data.name}</h3>
                    <h4>
                        <div className="sku ellipsis">
                            {
                                data.selectedArr.map( item => (
                                    <span key={item.id} >{item.value}</span>
                                ) )
                            }
                        </div>
                        <div className="pri">￥{data.price}</div>
                    </h4>
                    <div className="count">
                        <span className={ data.count <= 1 ? 'def' : '' }  onClick={minuAction(data._id)} >-</span>
                        <p>{data.count}</p>
                        <span onClick={addAction(data._id)} >+</span>
                    </div>
                </div>
            </div>
            <div className="del" onClick={delAction} ref={del} >删除</div>
        </div>
        
    )
}
