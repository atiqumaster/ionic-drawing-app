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
            const fontArray = fonts.data.items.slice(0, 4);

            fontArray.forEach((font:any)=>{
               // console.log(font.family);
                loadGoogleFonts(font.family,font.files.regular);
            })


        }
        getData()
    });

    const arrayFonts = ["ABeeZee", "Abel"  ,"ABeeZee" , "Acme" , "Adamina" ]

    const selectFonts = (event:any) => {
        let activeObj = canvas.getActiveObject();
        activeObj.set('fontFamily', event.target.value);
        canvas.renderAll();
    }

    return (
        <>


                  <select className={googleFonts.text_font_toggle}  onChange={selectFonts}   >
                      <option className={googleFonts.font_selected} selected  >font</option>
                      {
                          arrayFonts.map((font:any) => {
                              return <option
                                  className={googleFonts.font_option}
                                  value={font}  >{font}</option>
                          })
                      }
                   </select>

        </>
);

}
export { GoogleFonts };