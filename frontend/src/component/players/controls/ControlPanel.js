import React from 'react'
import Button from './Button'
import './control-panel.css'
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import { BsRepeat, BsShuffle } from "react-icons/bs";
function ControlPanel({changerepeat,changeprevious ,changenext, play, isPlaying, duration, currentTime }) {
  function secondsToHms(seconds) {
    if (!seconds) return '00m 00s'

    let duration = seconds
    let hours = duration / 3600
    duration = duration % 3600

    let min = parseInt(duration / 60)
    duration = duration % 60

    let sec = parseInt(duration)

    if (sec < 10) {
      sec = `0${sec}`
    }
    if (min < 10) {
      min = `0${min}`
    }
    
    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}h ${min}m ${sec}s`
    } else if (min == 0) {
      return `00m ${sec}s`
    } else {
      return `${min}m ${sec}s`
    }
  }

  return (
    <div className='control-panel'>
      <div className='timer'>{secondsToHms(currentTime)}</div>
      <div className='control-button'>
      <div className='control-repeat' onClick={() => changerepeat()}><BsRepeat/></div>
      <div onClick={() => changeprevious()}><RxTrackPrevious/></div>
      <Button play={play} isPlaying={isPlaying} />
      <div onClick={() => changenext()}><RxTrackNext/></div>
      <div className='control-BsShuffle' onClick={() => changerepeat()}><BsShuffle/></div>

      </div>
      <div className='timer'>{secondsToHms(duration)}</div>
    </div>
  )
}
export default ControlPanel
