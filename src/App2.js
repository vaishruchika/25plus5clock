import React, { Component } from 'react';
import './App2.css';
const audio=document.getElementById('beep');

class App2 extends Component {
  state={
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25*60,
    currentTimer: 'Session',
    isPlaying: false,
  }
  
  constructor(props){
    super(props);
    this.loop=undefined;
  }

  componentWillUnmount() {
    clearInterval(this.loop);
      }    
 
  handlePlayPause=()=>{
    const {isPlaying}=this.state;
    if(isPlaying){
      clearInterval(this.loop);
      this.setState({
        isPlaying: false
      });
    }
    else{
      this.setState({
        isPlaying: true
      });
    this.loop=setInterval(()=>{
      const {clockCount,currentTimer,breakCount,sessionCount}=this.state;

      if(clockCount===0){
        this.setState({
          currentTimer: (currentTimer==='Session') ? 'Break' : 'Session',
          clockCount: (currentTimer==='Session') ? 
          (breakCount*60) : (sessionCount*60)
        })
        audio.play();
      }else{
      this.setState({
        clockCount: clockCount-1
      });
    }
    },1000);
    }
  }


  handleReset=()=>{
   this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25*60,
      currentTimer: 'Session',
      isPlaying: false,
   }) ;
   clearInterval(this.loop);
   audio.pause();
   audio.currentTime=0;
  }

  
  convertToTime=(count)=>{
    let minutes=Math.floor(count/60);
    let seconds=count % 60;
    let fseconds=seconds<10 ? ('0'+seconds) : seconds;
    let fminutes=minutes<10 ? ('0'+minutes) : minutes;
    return `${fminutes} : ${fseconds}`
  }

  handleBreakIncrease=()=>{
    const {breakCount,isPlaying, currentTimer}=this.state;
    if (breakCount<60){
    if(!isPlaying && currentTimer==='Break'){
      this.setState({
        breakCount: breakCount+1,
        clockCount: (breakCount+1) * 60
      });
    }else{
      this.setState({
        breakCount: breakCount + 1
      });
    }
  }  
  }

  handleBreakDecrease=()=>{
    const {breakCount,isPlaying, currentTimer}=this.state;
    if (breakCount>1){
    if(!isPlaying && currentTimer==='Break'){
      this.setState({
        breakCount: breakCount-1,
        clockCount: (breakCount-1) * 60
      });
    }else{
      this.setState({
        breakCount: breakCount - 1
      });
    }
  }  
  }
  
  handleSessionIncrease=()=>{
    const {sessionCount,isPlaying, currentTimer}=this.state;
    if (sessionCount<60){
      if(!isPlaying && currentTimer==='Session'){
        this.setState({
          sessionCount: sessionCount+1,
          clockCount: (sessionCount+1) * 60
        });
      }else{
        this.setState({
          sessionCount: sessionCount + 1
        });
      }
  }
  }

  handleSessionDecrease=()=>{
    const {sessionCount,isPlaying, currentTimer}=this.state;
    if (sessionCount>1){
      if(!isPlaying && currentTimer==='Session'){
        this.setState({
          sessionCount: sessionCount-1,
          clockCount: (sessionCount-1) * 60
        });
      }else{
        this.setState({
          sessionCount: sessionCount - 1
        });
      }
  }
  }

  render (){
    const {breakCount, sessionCount,clockCount,currentTimer,isPlaying}=this.state;
    
    const breakProps={
      name: 'break',
      title: 'Break Length',
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease
    }

    const sessionProps={
      name: 'session',
      title: 'Session Length',
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease
    }


    return (
      <>
    <div className='flex'>
<SetTimer {...breakProps}/>
<SetTimer {...sessionProps} />
    </div>
    <div className='clock-container'>
    <h1 id="timer-label">{currentTimer}</h1>
    <span id="time-left">{this.convertToTime(clockCount)}</span>
    <div className='flex'>
    <button id='start_stop' onClick={this.handlePlayPause}>{isPlaying ?'Pause' : 'Play'}</button>
    <button id='reset' onClick={this.handleReset}>reset</button>
    </div>
    </div>
    </>
    );
  }
}
const SetTimer=(props)=>(
<div className='timer-container'>
    <h2 id={`${props.name}-label`}>{props.title}</h2>
    <div className='flex actions-wrapper'>
        <button id={`${props.name}-decrement`} onClick={props.handleDecrease}>-</button>
        <span id={`${props.name}-length`}>{props.count}</span>
    <button id={`${props.name}-increment`} onClick={props.handleIncrease}>+</button>
        </div>
        </div>
)
export default App2;