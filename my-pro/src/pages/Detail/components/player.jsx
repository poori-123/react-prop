import React, {useRef, useEffect} from 'react';
import flvjs from 'flv.js';
import close from '../../../asset/close.webp';

export default function Player({url, setShowPlayer}) {
    var playerDom = useRef();
    useEffect(()=>{
        if(flvjs.isSupported()){
            var videoUrl = url.mp4VideoUrl || url.webmVideoUrl;
            var videoElement = playerDom.current;
            var flvPlayer = flvjs.createPlayer({
                type: videoUrl.endsWith('mp4') ? 'mp4' : 'webp',
                url: videoUrl
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
            videoElement.addEventListener('ended', ()=>{
                setShowPlayer(false);
            })
        }
    },[setShowPlayer,url])
    return (
        <div className="player">
            <div className="close" onClick={ ()=>{setShowPlayer(false)} } >
                <img src={close} alt=""/>
            </div>
            <video ref={playerDom} ></video>
        </div>
    )
}
