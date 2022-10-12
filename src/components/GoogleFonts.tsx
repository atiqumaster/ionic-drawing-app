import React, {useContext  , useEffect} from 'react';
import {CanvasStore} from "../Store/CanvasStore";
import googleFonts from "./Googlefonts.module.css"

const GoogleFonts = () => {

    const { canvas }:any = useContext(CanvasStore);
    const { isFontToggleAdjust }:any = useContext(CanvasStore);
    const { setFontToggle}:any = useContext(CanvasStore);

    const arrayFonts = ["Acme", "Akshar"   , "Artifika","Comic Neue","Courier Prime","EB Garamond","Just Another Hand",
        "Black Han Sans" ,"Montserrat", "Playball" , "Poppins" , " Ultra" , "Smythe" , " Rock Salt","Brush Script MT" ]

    const selectFonts = (event:any) => {
        setFontToggle(false)
        if(canvas.getActiveObject().lockMovementX || canvas.getActiveObject().lockMovementY) return
        let activeObj = canvas.getActiveObject();
        activeObj.set('fontFamily', event.target.value);
        canvas.renderAll();
        setFontToggle(false)
    }


    return (
        <>

            <div style={isFontToggleAdjust}   id="font-list" className={googleFonts.text_font_toggle} >
                {
                    arrayFonts.map((font:any) => {
                        return  <button className={googleFonts.font_option}
                                        value={font} style={{fontFamily: font}}  onClick={selectFonts} >{font}</button>

                    })
                }
            </div>


        </>
    );

}
export { GoogleFonts };