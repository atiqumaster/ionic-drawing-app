import React, {useContext,  useState} from 'react';
import { fabric } from 'fabric';
import { IonButton } from '@ionic/react';
import toolbarmodule from "./Toolbarmodule.module.css";
import {Texttoolbar} from "./Texttoolbar";
import {Imagetoolbar} from "./Imagetoolbar";
import Draggable from 'react-draggable';
import {CanvasStore} from "../Store/CanvasStore";
import 'fabric-history';

const Toolbarmodule = () => {


    const { canvas }:any = useContext(CanvasStore);

    const [isTextToolbar, setTextToolbar] = useState(false);
    const [isImageToolbar , setImageToolbar] = useState(false);
    const [isColorMOde, setColorMode] = useState(false);
    const [isColorModeIcon, setColorModeIcon] = useState("light_mode");
    const [baseImage , setBaseImg] = useState("");
    const [isUndo, setUndo] = useState({
        opacity:0.2
    });
    const [isRedo, setRedo] = useState({
        opacity:0.2
    });

    const [isBound , setBound] = useState(window.innerHeight - 220);
    const [isBoundleft , setBoundleft] = useState(window.innerWidth/2 -175 );
    const [isBoundRight , setBoundRight] = useState(window.innerWidth/2 -175 );

    const { setFontToggleAdjust }:any = useContext(CanvasStore);
    const { setAlignToggleAdjust  }:any = useContext(CanvasStore);
    const { setToggleAdjust }:any = useContext(CanvasStore);

    const handleStop = (event :any, dragElement:any ) => {


        if(window.innerHeight - 420  < dragElement.y ) {

            setToggleAdjust({ top: -310 })
            setAlignToggleAdjust({ top: -60 })
            setFontToggleAdjust({   top: -412})

        }else {

            setToggleAdjust({ top:52 })
            setAlignToggleAdjust({ top: 42 })
            setFontToggleAdjust({ top: 52})

        }


    }





    canvas?.on('selection:created', ()=>{
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
            // cornerStyle:'square',.

            borderColor: '#4285F4',
            cornerColor: '#4285F4',
            cornerSize: 9,
            transparentCorners: true
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

    });
    canvas?.on('selection:updated', ()=>{
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
            // cornerStyle:'square',.

            borderColor: '#4285F4',
            cornerColor: '#4285F4',
            cornerSize: 9,
            transparentCorners: true
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

    });

    canvas?.on('selection:cleared', ()=>{

            setTextToolbar(false);
            setImageToolbar(false);

    });






    const showTextToolbar = () => {

            setTextToolbar(!isTextToolbar);
        let iTextSample = new fabric.IText(     "Double tap \nto edit"  , {
            left: 50,
            top: 50,
            originX: 'center' ,
            originY: 'center',
            fontFamily: 'Montserrat',
            lineHeight: 1.1,
            fontSize: 28

        });



        // push iText in canvas
        canvas.add(iTextSample);
        canvas.setActiveObject(iTextSample );
        canvas.centerObject(iTextSample);

        if(canvas.backgroundColor=='black') {
            canvas.getActiveObject().set("fill", "#fff");
        }
    }



    const uploadImg = async (e:any) => {
        setImageToolbar(!isImageToolbar);


        const file = e.target.files[0];  // select only one file in sys
        //console.log(file);
        const base64:any = await convertBase64(file);  // call func to convet img to base64
        setBaseImg(base64);  // Connect Base64 url with useState hook

        // set Base64i img in canvas using fabric img Object



        fabric.Image.fromURL(base64 , function(myImg:any) {

           let scaleHeight = canvas.height -10;
           let scaleWidth = canvas.width - 10 ;
            //console.log(scale);
            if (myImg.width > myImg.height) {
                myImg.scaleToWidth(scaleWidth)
            } else {
                myImg.scaleToHeight(scaleHeight)
            }


            myImg.set({
                borderColor: '#4285F4',
                cornerColor: '#4285F4',
                cornerSize: 9,
                transparentCorners: true
            })

            myImg.setControlsVisibility({
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




            canvas.add(myImg);
            canvas.centerObject(myImg);
            canvas.setActiveObject(myImg);

            let object = canvas.getActiveObject();
            let filter = new fabric.Image.filters.Grayscale();
            object.filters.push(filter);
            object.applyFilters();
        });


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




    canvas?.on('object:added', ()=>{

            setUndo({opacity: 1});

    });

    canvas?.on('object:removed', ()=>{

        setRedo({opacity: 1});

    });



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


            setColorModeIcon("dark_mode")

        } else {
            canvas.backgroundColor="white";
            let objects = canvas.getObjects();
            objects.forEach((obj:any)=>{
                obj.set("fill", "#000");
            })
            setColorModeIcon("light_mode")
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
                            <strong className="dragable-span">
                            <IonButton  className={toolbarmodule.btn1 } color="undefined" >
                                <span className={toolbarmodule.material_symbols_outlined} >open_with</span>
                            </IonButton>
                            </strong>
                            <IonButton  className={toolbarmodule.btn }  onClick={showTextToolbar}  color="undefined">
                                <span className={toolbarmodule.material_symbols_outlined} >format_shapes</span>
                            </IonButton>

                            <label htmlFor="file-input" className={toolbarmodule.btnInput }>
                                 <span className={toolbarmodule.material_symbols_outlined} >add_photo_alternate</span>
                            </label>
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

export {  Toolbarmodule};