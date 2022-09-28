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
    const {isFontBold, setFontBold}:any = useContext(CanvasStore);
    const {isOpacityBold, setOpacityBold}:any = useContext(CanvasStore);
    const {isOpacityItalic, setOpacityItalic}:any = useContext(CanvasStore);
    const {isFontStyle, setFontStyle}:any = useContext(CanvasStore);


    const { canvas }:any = useContext(CanvasStore);
    const ref = useRef(null);
    const { isToggleAdjust, setToggleAdjust }:any = useContext(CanvasStore);

    const { isAlignToggleAdjust, setAlignToggleAdjust }:any = useContext(CanvasStore);


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



    canvas?.on('selection:updated', ()=>{
  console.log("zabi");
        if(canvas.getActiveObject().fontWeight == 'bold' ) {
            setOpacityBold({opacity: 1});
        } else {
            setOpacityBold({opacity: 0.2});
        }

        if(canvas.getActiveObject().fontWeight == 'italic' ) {
            setOpacityItalic({opacity: 1});
        } else {
            setOpacityItalic({opacity: 0.2 });
        }

        canvas.renderAll();
    });

    canvas?.on('object:added', ()=>{
        setOpacityBold({opacity: 0.2});
        setOpacityItalic({opacity: 0.2 });
    });

    canvas?.on('selection:created', ()=>{
        if(canvas.getActiveObject().fontWeight == 'bold') {
            setOpacityBold({opacity: 1});

        } else {
            setOpacityBold({opacity: 0.2});

        }
        if(canvas.getActiveObject().fontWeight == 'italic' ) {
            setOpacityItalic({opacity: 1});
        } else {
            setOpacityItalic({opacity: 0.2 });
        }
        canvas.renderAll();
    });




    const fontBold = () => {

        if(canvas.getActiveObject().fontWeight == 'bold') {
            //console.log("gill");
            setOpacityBold({opacity: 0.2});
            canvas.getActiveObject().set("fontWeight","400");


        } else {
            //console.log("nill");
            setOpacityBold({opacity: 1});
            canvas.getActiveObject().set("fontWeight","bold");
        }
        canvas.renderAll();
    }

    const fontStyle = () => {
      //  setFontStyle(!isFontStyle);
        if(canvas.getActiveObject().fontStyle == 'italic') {
            setOpacityItalic({opacity: 0.2});
            canvas.getActiveObject().set("fontStyle","normal");
        } else {
            setOpacityItalic({opacity: 1});
            canvas.getActiveObject().set("fontStyle","italic");
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