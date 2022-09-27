import React, {useContext ,   useState , useEffect ,  useRef} from 'react';
import { IonButton } from '@ionic/react';
import texttoolbar from "./Texttoolbar.module.css"
import {CanvasStore} from "../Store/CanvasStore";
import {GoogleFonts} from "./GoogleFonts";
import { ObjProperties } from './ObjProperties';

const Texttoolbar = () => {

    const [isTextBoxToggle, setTextBoxToggle] = useState(false);
    const [isAlignBoxToggle, setAlignBoxToggle] = useState(false);
    const [isTextFontToggle, setTextFontToggle] = useState(false);
    const [isFontToggle, setFontToggle] = useState(false);
    const [isFontBold, setFontBold] = useState(false);
    const [isFontStyle, setFontStyle] = useState(false);
    const [isOpacityBold, setOpacityBold] = useState({
        opacity:0.2
    });

    const [isOpacityItalic, setOpacityItalic] = useState({
        opacity:0.2
    });

    const { canvas }:any = useContext(CanvasStore);
    const ref = useRef(null);

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

    function showTextFont() {
        setTextFontToggle(!isTextFontToggle)

    }

    // document.body.addEventListener('click', (event) => {
    //     let a:any = event.currentTarget;
    //     if (a.classList.contains('btn')) {
    //         console.log('Element contains class');
    //       } else {
    //         console.log('Element does NOT contain class');
    //       }

    // });


    const fontBold = () => {
        setFontBold(!isFontBold);

        if(isFontBold=== false) {
            setOpacityBold({opacity: 1});
            canvas.getActiveObject().set("fontWeight","bold");
        } else {
            setOpacityBold({opacity: 0.2});
            canvas.getActiveObject().set("fontWeight","400");
        }
        canvas.renderAll();
    }

    const fontStyle = () => {
        setFontStyle(!isFontStyle);
        if(isFontStyle === false) {
            setOpacityItalic({opacity: 1});
            canvas.getActiveObject().set("fontStyle","italic");
        } else {
            setOpacityItalic({opacity: 0.2});
            canvas.getActiveObject().set("fontStyle","normal");
        }
        canvas.renderAll();

    }


    const alignLeft = () => {
        let activeObj = canvas.getActiveObject();
        activeObj.set('textAlign', 'left');

        canvas.renderAll();

    }
    const alignCenter = () => {
        let activeObj = canvas.getActiveObject();
        activeObj.set('textAlign', 'center');
        canvas.renderAll();
    }
    const alignRight = () => {
        let activeObj = canvas.getActiveObject();
        activeObj.set('textAlign', 'right');
        canvas.renderAll();
    }
    const alignJustify = () => {
        let activeObj = canvas.getActiveObject();
        activeObj.set('textAlign', 'justify');
        canvas.renderAll();
    }


    return (
        <>

            <div className={texttoolbar.toolbararea} >
                <div className={ texttoolbar.btnHold } >

                    <IonButton class="red" className={ texttoolbar.btn1 } color="undefined" >
                        <strong className="dragable-span"> <span className={ texttoolbar.material_symbols_outlined} >open_with</span></strong>
                    </IonButton>

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
                        <span className={ texttoolbar.material_symbols_outlined} >format_align_left</span>
                    </IonButton>


                    <IonButton ref={ref}  className={ texttoolbar.btn } onClick={showToggleTextBox} color="undefined" >
                        <span className={ texttoolbar.material_symbols_outlined} >more_horiz</span>
                    </IonButton>

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
                            <div className={ texttoolbar.open_align_toggle_box } >
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