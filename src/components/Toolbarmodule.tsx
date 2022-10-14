import React, {useContext, useState, useMemo, memo, useEffect} from 'react';
import { IonButton } from '@ionic/react';
import toolbarmodule from "./Toolbarmodule.module.css";
import {Texttoolbar} from "./Texttoolbar";
import {Imagetoolbar} from "./Imagetoolbar";
import Draggable from 'react-draggable';
import {CanvasStore} from "../Store/CanvasStore";
import 'fabric-history';
import { fabric } from 'fabric';

const Toolbarmodule = () => {
   // console.log("Toolbarmodule")

    const { canvas }:any = useContext(CanvasStore);
    const [isTextToolbar, setTextToolbar] = useState(false);
    const [isImageToolbar , setImageToolbar] = useState(false);
    const [isColorMOde, setColorMode] = useState(false);
    const [isColorModeIcon, setColorModeIcon] = useState("dark_mode");
    const [baseImage , setBaseImg] = useState("");
    const [isUndo, setUndo] = useState({
        opacity:0.2
    });
    const [isRedo, setRedo] = useState({
        opacity:0.2
    });

    const [isBound ] = useState(window.innerHeight - 220);
    const [isBoundleft ] = useState(window.innerWidth/2 -175 );
    const [isBoundRight ] = useState(window.innerWidth/2 -175 );

    const { setFontToggleAdjust }:any = useContext(CanvasStore);
    const { setAlignToggleAdjust  }:any = useContext(CanvasStore);
    const { setToggleAdjust }:any = useContext(CanvasStore);
    const { setOpacityBold}:any = useContext(CanvasStore);
    const {setOpacityItalic}:any = useContext(CanvasStore);
    const { setTextBoxToggle}:any = useContext(CanvasStore);
    const {  setObjLock }:any = useContext(CanvasStore);
    const { setAlignBoxToggle} :any= useContext(CanvasStore);
    const { setFontToggle}:any = useContext(CanvasStore);
    const { setImageToolbarToggle}:any = useContext(CanvasStore);
    const { setObjLockIcon }:any = useContext(CanvasStore);
    const { setFormatAlignText }:any = useContext(CanvasStore);
    const { lockedObj ,setLockedObj  } :any = useContext(CanvasStore);

    const styles = {
        borderRight: '2px solid black',
    };

    const handleStop = (event :any, dragElement:any ) => {


        if(window.innerHeight - window.innerHeight/2 -110  < dragElement.y ) {

            setToggleAdjust({ top: -229 })
            setAlignToggleAdjust({ top: -59 })
            setFontToggleAdjust({   top: -412})

        }else {

            setToggleAdjust({ top:50 })
            setAlignToggleAdjust({ top: 40 })
            setFontToggleAdjust({ top: 50 })

        }

    }

    useEffect(()=> {
        eventStart()
        return () => {
            canvas?.off({
                'selection:updated': HandleControls,
                'selection:created': HandleControls ,
                'selection:cleared' : HandleCleared ,
                'object:added': HandelObjectAdd ,
                'object:removed' : HandelObjectRemove,

            });
        }
    } , [canvas?.on( 'selection:updated')]  )

    function eventStart() {
        canvas?.on({
            'selection:updated': HandleControls,
            'selection:created': HandleControls,
            'selection:cleared' : HandleCleared,
            'object:added': HandelObjectAdd ,
            'object:removed' : HandelObjectRemove,

        });

    }


    function HandleControls(){
          // console.log("selection:updated");
        if(canvas?.getActiveObject()?.type == 'i-text')
        {

            setTextToolbar(true);
            setImageToolbar(false);
        }
        else{

            setTextToolbar(false);
            setImageToolbar(true);
        }

        let objects = canvas.getActiveObject();

        objects.set({

            borderColor: '#4285F4',
            cornerColor: '#4285F4',
            cornerSize: 9,
            transparentCorners: true ,

        })

        objects.setControlsVisibility({
            bl: true,
            br: true,
            tl: true,
            tr: true,
            mb: false,
            ml: false,
            mr: false,
            mt: false,
            mtr: true,

        });



        fabric.Object.prototype.controls.mtr.offsetY = -20


        if(canvas.getActiveObject().fontWeight == 'bold' ) {
            setOpacityBold({opacity: 1});
        } else {
            setOpacityBold({opacity: 0.2});
        }

        if(canvas.getActiveObject().fontStyle  == 'italic' ) {
            setOpacityItalic({opacity: 1});
        } else {
            setOpacityItalic({opacity: 0.2 });
        }

        if(objects.lockMovementX && objects.lockMovementY ) {
            setObjLock("UnLock");
            setObjLockIcon("lock_open")
        }else{

            setObjLock("Lock");
            setObjLockIcon("lock")
            canvas.renderAll()
        }

        if( canvas.getActiveObject().type === 'activeSelection') {
            canvas.getActiveObject()._objects.forEach((o:any) => {
                if(o.lockMovementX && o.lockMovementY ) {
                    canvas.getActiveObject().set({lockMovementX: true, lockMovementY: true ,editable:false , hasControls:false , borderDashArray:[3]})
                    setObjLock("UnLock");
                    setObjLockIcon("lock_open")
                } else{
                    canvas.getActiveObject().set({lockMovementX: false, lockMovementY: false, editable:true , hasControls: true, borderDashArray: [0]})
                    setObjLock("Lock");
                    setObjLockIcon("lock")
                }
                canvas.renderAll()
            })
        }


        if( canvas.getActiveObject().type === 'activeSelection') {
        let obj = canvas.getActiveObject()
        obj._objects.forEach((o:any) => {

            if (o.type === 'i-text') {

                setTextToolbar(true);
                setImageToolbar(false);

                } else if (o.type === 'image') {

                setImageToolbar(true);
                setTextToolbar(false);
            }


            }
        );
       }

        if(canvas.getActiveObject().textAlign === 'left' ) {
            setFormatAlignText('format_align_left')
        }else if(canvas.getActiveObject().textAlign === 'center') {
            setFormatAlignText('format_align_center')
        }else if(canvas.getActiveObject().textAlign === 'right') {
            setFormatAlignText('format_align_right')
        } else{
            setFormatAlignText('format_align_justify')
        }


        if(canvas.getActiveObject().type === 'activeSelection' ) {

            let obj = canvas.getActiveObject()
            obj._objects.forEach((o:any) => {
                if (o.fontWeight == 'bold') {
                    console.log("bold2");

                    setOpacityBold({opacity: 1});
                    canvas.renderAll();
                }

            })



            obj._objects.forEach((o:any) => {
                if (o.fontWeight == '400') {

                    console.log("4002");
                    setOpacityBold({opacity: 0.2});
                    canvas.renderAll();
                }

            })

            obj._objects.forEach((o:any) => {
                if (o.fontStyle == 'italic') {


                    setOpacityItalic({opacity: 1});
                    canvas.renderAll();
                }

            })


            obj._objects.forEach((o:any) => {
                if (o.fontStyle == 'normal') {


                    setOpacityItalic({opacity: 0.2});
                    canvas.renderAll();
                }

            })

        }


        setTextBoxToggle(false)
        setAlignBoxToggle(false)
        setFontToggle(false)
        setImageToolbarToggle(false)

       canvas.renderAll()
    }


 function HandleCleared(e:any) {
     setTextToolbar(false);
     setImageToolbar(false);


 }

    function HandelObjectAdd() {

        setOpacityBold({opacity: 0.2});
        setOpacityItalic({opacity: 0.2 });
        setUndo({opacity: 1});

    }

    function HandelObjectRemove() {

        setRedo({opacity: 1});
    }



    const showTextToolbar = () => {

            setTextToolbar(!isTextToolbar);
            let iTextSample:any = new fabric.IText("Double tap \nto edit"  , {
            originX: 'center' ,
            originY: 'center',
            lineHeight: 1.1,
            fontSize: 28,
            left: canvas.width/2,
            top: canvas.height/2,

        });

        // push iText in canvas
        canvas.add(iTextSample);
        canvas.setActiveObject(iTextSample );
        canvas.renderAll()
        if(canvas.backgroundColor=='black') {
            canvas.getActiveObject().set("fill", "#fff");
        }
        canvas.renderAll()
        setTextBoxToggle(false)
        setAlignBoxToggle(false)
        setFontToggle(false)

    }


    const uploadImg = async (e:any) => {
        setImageToolbar(!isImageToolbar);

        const file = e.target.files[0];  // select only one file in sys
        const base64:any = await convertBase64(file);  // call func to convet img to base64
        setBaseImg(base64);  // Connect Base64 url with useState hook

        // set Base64i img in canvas using fabric img Object

        fabric.Image.fromURL(base64 , function(myImg:any) {

           let scaleHeight = canvas.height -100;
           let scaleWidth = canvas.width -30;

            if (myImg.width > myImg.height ) {
                myImg.scaleToWidth(scaleWidth )


            } else {
                myImg.scaleToHeight(scaleHeight  )

            }
            myImg.set({
                originX: 'center' ,
                originY: 'center',
                left: canvas.width/2,
                top: canvas.height/2,
            })

            let filter = new fabric.Image.filters.Grayscale();
            myImg.filters.push(filter);
            myImg.applyFilters();
            canvas.add(myImg);
            canvas.setActiveObject(myImg );
            canvas.renderAll()
            });

        setImageToolbarToggle(false)
    }

    const convertBase64 = (file:any) => {
        return new Promise((resolve , reject) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload =  () => {

                resolve(fileReader.result);

            };

            fileReader.onerror =  (error) => {

                reject(error);


            };

        });
    };






    const undo = () => {

        canvas.undo();
        canvas.discardActiveObject().renderAll();

        if(canvas.historyUndo.length) {

            setRedo({opacity:1})

        }
        else setUndo({opacity: 0.2});
    }
    const redo = () =>{

        canvas.redo();
        canvas.discardActiveObject().renderAll()
        if(canvas.historyRedo.length) {

            setRedo({opacity:1})

        }
        else setRedo({opacity: 0.2});

    }



    const handleColorMode = () => {
        setColorMode(!isColorMOde);

        if(isColorMOde === false)  {

            canvas.backgroundColor="black";
            let objects = canvas.getObjects();
            objects.forEach((obj:any)=>{

               obj.set("fill", "#fff");
            })

            setColorModeIcon("light_mode")

        } else {
            canvas.backgroundColor="white";
            let objects = canvas.getObjects();
            objects.forEach((obj:any)=>{
                obj.set("fill", "#000");
            })
            setColorModeIcon("dark_mode")
        }
        canvas.renderAll();
    }

    return (

        <Draggable  handle="strong"  onDrag={handleStop}   bounds={{ top:0 , bottom:isBound , left:-isBoundleft , right:isBoundRight }}  >
            <div  className={toolbarmodule.draggableText} >

            { isTextToolbar
                ? <Texttoolbar/>
                : isImageToolbar
                        ? <Imagetoolbar/>
                        :
                        <div className={toolbarmodule.btnHold } >
                            <strong style={styles} className="dragable-span">
                            <IonButton  className={toolbarmodule.btn1 } color="undefined" >
                                <span className={toolbarmodule.material_symbols_outlined} >open_with</span>
                            </IonButton>
                            </strong>
                            <IonButton  className={toolbarmodule.btn }   onClick={showTextToolbar}  color="undefined">
                                <span className={toolbarmodule.material_symbols_outlined} >format_shapes</span>
                            </IonButton>
                           <IonButton  className={toolbarmodule.btn }  color="undefined">
                            <label htmlFor="file-input" >
                                 <span className={toolbarmodule.material_symbols_outlined} >add_photo_alternate</span>
                            </label>
                            </IonButton>
                            <input accept="image/*"  id="file-input"  type="file" onChange={  uploadImg }
                                    style={{display:"none"}} />

                            <IonButton  onClick={undo} className={toolbarmodule.btn } color="undefined" >
                                <span style= {isUndo} className={toolbarmodule.material_symbols_outlined} >undo</span>
                            </IonButton>
                            <IonButton onClick={redo}  className={toolbarmodule.btn } color="undefined" >
                                <span style= {isRedo} className={toolbarmodule.material_symbols_outlined} >redo</span>
                            </IonButton>
                            <IonButton onClick={handleColorMode} className={toolbarmodule.btn } color="undefined" >
                                <span className={toolbarmodule.material_symbols_outlined} >{isColorModeIcon}</span>
                            </IonButton>


                    </div>
                    }
            </div>
        </Draggable>




    );

}



export {  Toolbarmodule}