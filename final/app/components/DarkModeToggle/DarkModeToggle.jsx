"use client"
import React, { useContext } from 'react'
import style from './DarkModeToggle.module.css'
import { ThemeContext } from '../../context/ThemeContext'
const DarkModeToggle = () =>{

    const { toggle ,mode} = useContext(ThemeContext)
  return (
    <div className={style.container} onClick={toggle}>
        <div className={style.icon}>🌙</div>
        <div className={style.icon}>☼</div>
        <div className={style.ball} 
        style={mode === "light"? { left:"2px" ,  background:'black'}:{right:"2px" , background:'white'}}/>    
    </div>
  )
}

export default DarkModeToggle