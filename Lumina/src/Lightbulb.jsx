import { ref, onValue } from "firebase/database"
import database from './backend.js'
import React, { useEffect, useState } from 'react';
import Styles from './cssmodules/Lightbulb.module.css'

import BulbOff from "./assets/bulbOff.svg"
import BulbOn10 from "./assets/bulbOn(10_).svg"
import BulbOn30 from "./assets/bulbOn(30_).svg"
import BulbOn50 from "./assets/bulbOn(50_).svg"
import BulbOn70 from "./assets/bulbOn(70_).svg"
import BulbOn90 from "./assets/bulbOn(90_).svg"
import BulbOn100 from "./assets/bulbOn(100_).svg"

const Lightbulb = () => {
    
    const [bulbImage, setBulbImage] = useState()
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight)

    useEffect(() => {
        const retrieveViewport = () =>{
            setViewportHeight(window.innerHeight);
        }
        retrieveViewport()
        window.addEventListener('resize', retrieveViewport)

        return () => {
            window.removeEventListener('resize', retrieveViewport); 
        };

    }, [])

    useEffect(() => {
        const retrieveData = (path) => {
            const dbRef = ref(database, path)
            
            onValue(dbRef, (snapshot) => {
                let data = snapshot.val().Light_Value
                if(data == 0){
                    setBulbImage(BulbOff)
                }
                else if(data <= 300){
                    setBulbImage(BulbOn10)
                }
                else if(data <= 700){
                    setBulbImage(BulbOn30)
                }
                else if(data <= 1100){
                    setBulbImage(BulbOn50)
                }
                else if(data <= 1600){
                    setBulbImage(BulbOn70)
                }
                else if(data <= 1900){
                    setBulbImage(BulbOn90)
                }
                else{
                    setBulbImage(BulbOn100)
                }
            })       
        }
        retrieveData('LuminaApp')
    }, [])

    const imageStyle = {
        height: `${viewportHeight/28}rem`
    }

    const Lightbulb = <div className={Styles.main}>
                        <div className={Styles.container}>
                            <img style={imageStyle} src={bulbImage} alt="" draggable='false'/>
                        </div>
                    </div>

    return(<>{Lightbulb}</>)
}

export default Lightbulb
