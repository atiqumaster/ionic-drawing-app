import React, {useContext, useState} from 'react';
import { fabric } from 'fabric';
import {IonButton } from '@ionic/react';
import imagetoolbar from "./Imagetoolbar.module.css"
import {CanvasStore} from "../Store/CanvasStore";
import { ObjProperties } from './ObjProperties';




const Imagetoolbar = () => {

    const { canvas }:any = useContext(CanvasStore);

    const [isImageToolbarToggle, setImageToolbarToggle] = useState(false);
    const [isObjLock, setObjLock] = useState(false);
    const [isFlipVertical  , setFlipVertical ] = useState(false);
    const [isFlipHorizontal  , setFlipHorizontal] = useState(false);
    const [isimgInverted  , setimgInverted] = useState(false);


    const  showImageToolbar = () => {
        setImageToolbarToggle(!isImageToolbarToggle)

    }



    const flipVertical = () => {
        setFlipVertical(!isFlipVertical);
        let activeObj = canvas.getActiveObject();
        if(isFlipVertical === false) {

            activeObj.set('flipY', true);
        } else {
            activeObj.set('flipY', false);
        }
        canvas.renderAll();
    }

    const  flipHorizontal = () => {
        setFlipHorizontal(!isFlipHorizontal);
        let activeObj = canvas.getActiveObject();
        if(isFlipHorizontal === false) {

            activeObj.set('flipX', true);
        } else {
            activeObj.set('flipX', false);
        }
        canvas.renderAll();
    }

    const imgInverted = () =>  {
        let activeObj = canvas.getActiveObject();
        let filter ;
        if(isimgInverted === false) {

             filter = new fabric.Image.filters.Invert();
            activeObj.filters.push(filter);
            activeObj.applyFilters();
            setimgInverted(true);

        } else {
            activeObj.filters.pop(filter);
            activeObj.applyFilters();
            setimgInverted(false);
        }

        canvas.renderAll();
    }

    return (
        <>

            <div className={imagetoolbar.toolbararea}>
                <div className={ imagetoolbar.btnHold } >
                    <strong className="dragable-span">
                    <IonButton  className={ imagetoolbar.btn1 } color="undefined" >
                        <span className={ imagetoolbar.material_symbols_outlined} >open_with</span>
                    </IonButton>
                    </strong>
                    <IonButton onClick={flipVertical} className={ imagetoolbar.btn } color="undefined"  >
                        <span className={ imagetoolbar.material_symbols_outlineds} >flip</span>
                    </IonButton>
                    <IonButton  onClick={flipHorizontal } className={ imagetoolbar.btn } color="undefined" >
                        <span className={ imagetoolbar.material_symbols_outlined} >flip</span>
                    </IonButton>
                    <IonButton id="test1"  onClick={imgInverted} className={ imagetoolbar.btn } color="undefined" >
                        <span className={ imagetoolbar.material_symbols_outlined} >invert_colors</span>
                    </IonButton>
                    <IonButton  className={ imagetoolbar.btn } onClick={showImageToolbar} color="undefined" >
                        <span className={ imagetoolbar.material_symbols_outlined} >more_horiz</span>
                    </IonButton>


                </div>

            {
                isImageToolbarToggle ?

                         <ObjProperties/>
                      : null

            }
            </div>

        </>
    );

}

export {  Imagetoolbar };