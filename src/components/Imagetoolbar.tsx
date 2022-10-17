import React, {useContext, useEffect, useRef, useState} from 'react';
import { fabric } from 'fabric';
import {IonButton } from '@ionic/react';
import imagetoolbar from "./Imagetoolbar.module.css"
import {CanvasStore} from "../Store/CanvasStore";
import { ObjProperties } from './ObjProperties';
import 'fabric-history';

const Imagetoolbar = () => {
    console.log("image toolbar speed test")
    const { canvas }:any = useContext(CanvasStore);


    const [isimgInverted  , setimgInverted] = useState(false);
    const {isImageToolbarToggle, setImageToolbarToggle}:any = useContext(CanvasStore);
    const styles = {
        borderRight: '2px solid black',
    };


    const  showImageToolbar = () => {
        setImageToolbarToggle(!isImageToolbarToggle)
    }


    const  flipHorizontal = () => {

        if(canvas.getActiveObject().lockMovementX || canvas.getActiveObject().lockMovementY) return


        if(canvas.getActiveObject().type != 'activeSelection') {
            if (canvas.getActiveObject().flipX === false) {
                canvas.getActiveObject().set('flipX', true);
            } else {
                canvas.getActiveObject().set('flipX', false);
            }
        }


        if(canvas.getActiveObject().type === 'activeSelection') {
            canvas.getActiveObject()._objects.forEach((o:any) => {
                if(o.lockMovementX == false && o.lockMovementY == false) {

                    if (o.flipX === false) {
                        console.log("nill true");
                        o.set('flipX', true);

                    } else {
                        console.log("nill FALSE");
                        o.set('flipX', false);

                    }
                }
            })
        }

        canvas.renderAll();
    }


    const flipVertical = () => {


        if(canvas.getActiveObject().lockMovementX || canvas.getActiveObject().lockMovementY) return

        if(canvas.getActiveObject().type != 'activeSelection') {
            let obj = canvas.getActiveObject()
            if (obj.flipY === false) {
                obj.set('flipY', true);
            } else {
                obj.set('flipY', false);
            }
        }


        if(canvas.getActiveObject().type === 'activeSelection') {
            canvas.getActiveObject()._objects.forEach((o:any) => {
                if(o.lockMovementX == false && o.lockMovementY == false) {

                    if (o.flipY === false) {
                        console.log("nill true");
                        o.set('flipY', true);

                    } else {
                        console.log("nill FALSE");
                        o.set('flipY', false);

                    }
                }
            })
        }


        canvas.renderAll();
    }


    const imgInverted = () =>  {
        if(canvas.getActiveObject().lockMovementX || canvas.getActiveObject().lockMovementY) return


        if(canvas.getActiveObject().type != 'activeSelection') {
            let filter:any ;
            if(isimgInverted === false) {

                filter = new fabric.Image.filters.Invert();

                canvas.getActiveObject().filters.push(filter);

                canvas.getActiveObject().applyFilters();
                setimgInverted(true);

            } else {
                canvas.getActiveObject().filters.pop(filter);
                canvas.getActiveObject().applyFilters();
                setimgInverted(false);
            }
        }

        let filtering:any ;

        if(canvas.getActiveObject().type === 'activeSelection') {
            canvas.getActiveObject()._objects.forEach((o:any) => {
                if(o.lockMovementX == false && o.lockMovementY == false) {
                    if (isimgInverted === false) {
                        filtering = new fabric.Image.filters.Invert();
                        o.filters.push(filtering);
                        o.applyFilters();

                        setimgInverted(true);

                    } else {
                        o.filters.pop(filtering);
                        o.applyFilters();

                        setimgInverted(false);
                    }
                }
            })
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