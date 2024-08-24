import TrackPlayer, { Event, RepeatMode } from "react-native-track-player";
import {playListData} from './src/constants'



export async function setup(){
    let flag=false;
    try {
        await  TrackPlayer.getCurrentTrack();
        flag=true;
    } catch (error) {
        await TrackPlayer.setupPlayer()
        flag=true
    }
    finally{
        return flag
    }
}

export async function addTrack(){
    await TrackPlayer.add(playListData)
    await TrackPlayer.getRepeatMode(RepeatMode.Queue)
}

export async function playbackService(){
    TrackPlayer.addEventListener(Event.RemotePause,()=>{
        TrackPlayer.pause();
    })
    TrackPlayer.addEventListener(Event.RemotePlay,()=>{
        TrackPlayer.play();
    })
    TrackPlayer.addEventListener(Event.RemoteNext,()=>{
        TrackPlayer.skipToNext();
    })
    TrackPlayer.addEventListener(Event.RemotePrevious,()=>{
        TrackPlayer.skipToPrevious;
    })
}