import React, {useContext ,   useState , useEffect ,  useRef} from 'react';
import { IonButton } from '@ionic/react';
import texttoolbar from "./Texttoolbar.module.css"
import {CanvasStore} from "../Store/CanvasStore";
import {GoogleFonts} from "./GoogleFonts";
import { ObjProperties } from './ObjProperties';


const Texttoolbar = () => {

    const {isTextBoxToggle, setTextBoxToggle}:any = useContext(CanvasStore);
    const {isAlignBoxToggle, setAlignBoxToggle} :any= useContext(CanvasStore);
    const {isFontToggle, setFontToggle}:any = useContext(CanvasStore);
    const {isOpacityBold, setOpacityBold}:any = useContext(CanvasStore);
    const {isOpacityItalic, setOpacityItalic}:any = useContext(CanvasStore);
    const { canvas }:any = useContext(CanvasStore);
    const { isAlignToggleAdjust }:any = useContext(CanvasStore);
    const { formatAlignText , setFormatAlignText }:any = useContext(CanvasStore);
   // const [formatAlignTextCenter , setFormatAlignTextCenter ] = useState("format_align_center");
    const ref = useRef(null);


    const styles = {
        borderRight: '2px solid black',
    };




    const showFontToggle = () => {
        setFontToggle(!isFontToggle)
        setAlignBoxToggle(false)
        setTextBoxToggle(false);
    }

    const showToggleTextBox = () => {
        setTextBoxToggle(!isTextBoxToggle)
        setAlignBoxToggle(false)
        setFontToggle(false);

    }


    const showAlignTextBox = () => {
        setAlignBoxToggle(!isAlignBoxToggle)
        setTextBoxToggle(false);
        setFontToggle(false);

    }




    const fontBold = () => {

        if(canvas.getActiveObject().fontWeight == 'bold') {
            setOpacityBold({opacity: 0.2});
            canvas.getActiveObject().set("fontWeight","400");


        } else {
            setOpacityBold({opacity: 1});
            canvas.getActiveObject().set("fontWeight","bold");
        }

        if(canvas.getActiveObject().type === 'activeSelection') {
            canvas.getActiveObject()._objects.forEach((o:any) => {
                if(o.fontWeight == 'bold') {

                    setOpacityBold({opacity: 0.2});
                    o.set("fontWeight","400");
                } else{
                    setOpacityBold({opacity: 1});
                    o.set("fontWeight","bold");
                }
            })
        }
        canvas.renderAll();
    }

    const fontStyle = () => {
        if(canvas.getActiveObject().fontStyle == 'italic') {
            setOpacityItalic({opacity: 0.2});
            canvas.getActiveObject().set("fontStyle","normal");
        } else {
            setOpacityItalic({opacity: 1});
            canvas.getActiveObject().set("fontStyle","italic");
        }

        if(canvas.getActiveObject().type === 'activeSelection') {
            canvas.getActiveObject()._objects.forEach((o:any) => {
                if(o.fontStyle == 'italic') {

                    setOpacityItalic({opacity: 0.2});
                    o.set("fontStyle","normal");
                } else{
                    setOpacityItalic({opacity: 1});
                    o.set("fontStyle","italic");
                }
            })
        }
        canvas.renderAll();

    }

    const alignLeft = () => {
        let activeObj = canvas.getActiveObject();
        activeObj.set('textAlign', 'left');
        canvas.renderAll();
        setAlignBoxToggle(false)
        setFormatAlignText('format_align_left')

    }
    const alignCenter = () => {
        let activeObj = canvas.getActiveObject();
        activeObj.set('textAlign', 'center');
        canvas.renderAll();
        setAlignBoxToggle(false)
        setFormatAlignText('format_align_center')
    }
    const alignRight = () => {
        let activeObj = canvas.getActiveObject();
        activeObj.set('textAlign', 'right');
        canvas.renderAll();
        setAlignBoxToggle(false)
        setFormatAlignText('format_align_right')
    }
    const alignJustify = () => {
        let activeObj = canvas.getActiveObject();
        activeObj.set('textAlign', 'justify');
        canvas.renderAll();
        setAlignBoxToggle(false)
        setFormatAlignText('format_align_justify')
    }


// 👇️ check if user click outside of specific container

    function useOutsideAlerter(ref:any) {
        useEffect(() => {

            function handleClickOutside(event:any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    //console.log(event.target);
                    setAlignBoxToggle(false)
                    setTextBoxToggle(false);
                    setFontToggle(false);
                     //console.log("nill");
                    //  canvas.discardActiveObject()
                    // canvas.renderAll()
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

        const wrapperRef = useRef(null);
        useOutsideAlerter(wrapperRef);


    return (
        <>
            <div ref={wrapperRef}>
            <div className={texttoolbar.toolbararea} >
                <div className={ texttoolbar.btnHold } >
                    <strong style={styles} className="dragable-span">
                    <IonButton class="red" className={ texttoolbar.btn1 } color="undefined" >
                         <span className={ texttoolbar.material_symbols_outlined} >open_with</span>
                    </IonButton>
                    </strong>
                    <div id="font" className={texttoolbar.button_grp}  onClick={showFontToggle} >
                        <button className={texttoolbar.current_font} >
                            Font
                        </button>
                    </div>

                    <IonButton onClick={fontBold} className={ texttoolbar.btn } color="undefined"  >
                        <span  style= {isOpacityBold} className={ texttoolbar.material_symbols_outlined }  >format_bold</span>
                    </IonButton>
                    <IonButton  onClick={fontStyle}  className={ texttoolbar.btn } color="undefined" >
                        <span  style= {isOpacityItalic}  className={ texttoolbar.material_symbols_outlined} >format_italic</span>
                    </IonButton>
                    <IonButton  className={ texttoolbar.btn }  onClick={showAlignTextBox} color="undefined" >
                        <span className={ texttoolbar.material_symbols_outlined} >{formatAlignText}</span>
                    </IonButton>


                    <IonButton  className={ texttoolbar.btn } onClick={showToggleTextBox} color="undefined" >
                        <span className={ texttoolbar.material_symbols_outlined} >more_horiz</span>
                    </IonButton>
                </div>

                    {
                        isFontToggle ?
                            < GoogleFonts/>
                            : null
                    }


                    {
                        isTextBoxToggle ?
                            <ObjProperties/>
                            : null
                    }
                    {
                        isAlignBoxToggle ?
                            <div style={isAlignToggleAdjust}  className={ texttoolbar.open_align_toggle_box } >
                                <IonButton onClick={alignLeft}  className={ texttoolbar.aligntoggleBtn } color="undefined"  >
                                    <span className={ texttoolbar.material_symbols_outlined_box} >format_align_left</span>
                                </IonButton>
                                <IonButton  onClick={alignCenter}   class="ion-text-left" className={ texttoolbar.aligntoggleBtn } color="undefined"  >
                                    <span className={ texttoolbar.material_symbols_outlined_box} >format_align_center</span>
                                </IonButton>
                                <IonButton onClick={alignRight}  className={ texttoolbar.aligntoggleBtn } color="undefined"  >
                                    <span className={ texttoolbar.material_symbols_outlined_box} >format_align_right</span>
                                </IonButton>
                                <IonButton  onClick={alignJustify} className={ texttoolbar.aligntoggleBtn } color="undefined"  >
                                    <span className={ texttoolbar.material_symbols_outlined_box} >format_align_justify</span>
                                </IonButton>

                            </div>
                            : null

                    }

                </div>
            </div>
        </>
    );

}

export {  Texttoolbar };