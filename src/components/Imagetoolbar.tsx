import React, {useContext, useEffect, useRef, useState} from 'react';
import { fabric } from 'fabric';
import {IonButton } from '@ionic/react';
import imagetoolbar from "./Imagetoolbar.module.css"
import {CanvasStore} from "../Store/CanvasStore";
import { ObjProperties } from './ObjProperties';


const Imagetoolbar = () => {

    const { canvas }:any = useContext(CanvasStore);

    const [isImageToolbarToggle, setImageToolbarToggle] = useState(false);
    const [isFlipVertical  , setFlipVertical ] = useState(false);
    const [isFlipHorizontal  , setFlipHorizontal] = useState(false);
    const [isimgInverted  , setimgInverted] = useState(false);
    const styles = {
        borderRight: '2px solid black',
    };



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

    // 👇️ check if user click outside of specific container

    function useOutsideAlerter(ref:any) {
        useEffect(() => {

            function handleClickOutside(event:any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setImageToolbarToggle(false);

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
            <div className={imagetoolbar.toolbararea}>
                <div className={ imagetoolbar.btnHold } >
                    <strong style={styles} className="dragable-span">
                    <IonButton  className={ imagetoolbar.btn1 } color="undefined" >
                        <span className={ imagetoolbar.material_symbols_outlined} >open_with</span>
                    </IonButton>
                    </strong>
                    <IonButton  onClick={flipHorizontal } className={ imagetoolbar.btn } color="undefined" >
                        <span className={ imagetoolbar.material_symbols_outlined} >flip</span>
                    </IonButton>
                    <IonButton onClick={flipVertical} className={ imagetoolbar.btn } color="undefined"  >
                        <span className={ imagetoolbar.material_symbols_outlineds} >flip</span>
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
            </div>
        </>
    );

}

export {  Imagetoolbar };