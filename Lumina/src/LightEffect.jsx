import { useEffect, useState } from 'react'
import Styles from './cssmodules/LightEffect.module.css'
import database from './backend.js'
import {ref, onValue} from 'firebase/database'

const viewportWidth = ''

const LightEffect = () => {
    
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
    const [effectWidth, setEffectWidth] = useState(0)
    const [bgColor, setBgColor] = useState('#857843')

    useEffect(() => {
        const retrieveViewport = () =>{
            setViewportWidth(window.innerWidth);
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
                    setEffectWidth(0)
                }
                else if(data <= 300){
                    setEffectWidth(viewportWidth/100)
                    setBgColor('#857843')
                }
                else if(data <= 700){
                    setEffectWidth(viewportWidth/65)
                    setBgColor('#AFA05E')
                }
                else if(data <= 1100){
                    setEffectWidth(viewportWidth/50)
                    setBgColor('#BEAE68')
                }
                else if(data <= 1600){
                    setEffectWidth(viewportWidth/30)
                    setBgColor('#CEBE78')
                }
                else if(data <= 1900){
                    setEffectWidth(viewportWidth/20)
                    setBgColor('#F0E19F')
                }
                else{
                    setEffectWidth(viewportWidth)
                    setBgColor('#FFF')
                }
            })       
        }
        retrieveData('LuminaApp')
    }, [])


    const effectStyle = {
        width : `${effectWidth}rem`,
        height : `${effectWidth}rem`,
        border : "none",
        borderRadius : `${effectWidth}rem`,
        backgroundColor : `${bgColor}`, 
        boxShadow : `0 0 20px ${bgColor}`,
    }

    const lightEffect = <div className={Styles.main}>
                            <div style={effectStyle} className="effect"></div>
                        </div>

    return(<>{lightEffect}</>)
}

export default LightEffect