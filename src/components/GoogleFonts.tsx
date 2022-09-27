import React, {useContext  , useEffect} from 'react';
import {CanvasStore} from "../Store/CanvasStore";
import googleFonts from "./Googlefonts.module.css"
import axios from "axios";


const GoogleFonts = () => {

    const { canvas }:any = useContext(CanvasStore);



    const loadGoogleFonts =async (fontFamily:any , fontUrl:any)=>{
        const font:any = new FontFace(fontFamily, `local(${fontFamily}), url(${fontUrl})`);
        await font.load()
        document.fonts.add(font);
        document.body.classList.add("fonts-loaded");

    }
    useEffect(()=> {
        async function getData() {
            const fonts = await axios.get(
                `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBB1ro9c5u6LIfsdsndwKTfRD8YsJIFO-U`
            );
            // console.log(fonts.data.items);
            const fontArray = fonts.data.items.slice(0, 10);

            fontArray.forEach((font:any)=>{
                console.log(font.family);
                loadGoogleFonts(font.family,font.files.regular);
            })


        }
        getData()
    });

    const arrayFonts = ["ABeeZee", "Abel"   , "Abhaya Libre","Aboreto","Abril Fatface","Abyssinica SIL","Aclonica","Acme" ,"Actor", "Adamina" , "playball"]

    const selectFonts = (event:any) => {

        let activeObj = canvas.getActiveObject();
        activeObj.set('fontFamily', event.target.value);
        canvas.renderAll();
    }

    return (
        <>



            <div id="font-list" className={googleFonts.text_font_toggle} >
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