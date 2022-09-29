import React, {useContext  , useEffect} from 'react';
import {CanvasStore} from "../Store/CanvasStore";
import googleFonts from "./Googlefonts.module.css"

const GoogleFonts = () => {

    const { canvas }:any = useContext(CanvasStore);
    const { isFontToggleAdjust }:any = useContext(CanvasStore);

    const arrayFonts = ["ABeeZee", "Abel"   , "Abhaya Libre","Aboreto","Abril Fatface","Abyssinica SIL","Aclonica","Acme" ,"Actor", "Adamina" , "playball"]
    const selectFonts = (event:any) => {

        let activeObj = canvas.getActiveObject();
        activeObj.set('fontFamily', event.target.value);
        canvas.renderAll();
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