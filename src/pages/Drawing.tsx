import React, {useState, useEffect, useContext} from 'react';
import { fabric } from 'fabric';

import { IonContent } from '@ionic/react';
import  drawing from './Drawing.module.css';
import { Toolbar } from "../components/Toolbar";
import {Titlebar} from "../components/Titlebar";
import {Menubutton} from "../components/Menubutton";
import {CanvasStore} from "../Store/CanvasStore";
import {CancelWarning} from '../components/CancelWarning';
import { useHistory } from "react-router-dom";
// import 'fabric-history';

declare global {
    interface Window {
        canvas: any;

    }
}

interface AppContextInterface {
    name: string;
    author: string;
    url: string;
    isTexxtToolbar: any;
    isImageToolbar: any;
    isControls: any;
    pausePanning:any;
    PinchToZoom:any;
}


const Drawing = () => {

    const { dimension, setCanvas }:any = useContext(CanvasStore);
    const { canvas }:any = useContext(CanvasStore);
    const { isCanvasDesign , setCanvasDesign  }:any = useContext(CanvasStore);
    const [cancelToggle, setCancelToggle]: any = useState(false)


    let history = useHistory();

    // First reload initCanvas function trigger

    useEffect(() => {
        initCanvas();
        // setCanvasDesign(null);
    }, [cancelToggle]);

    // Connect Fabric Canvas with canvas and set height /width
    const initCanvas = () => {

        let canvasWidth = window.innerWidth > dimension.width ? dimension.width : window.innerWidth;
        let canvasHeight= canvasWidth * (dimension.height/dimension.width);
        let fabricCanvas:any = new fabric.Canvas('canvas', {
                width: canvasWidth - 30,
                height: canvasHeight - 30,
                backgroundColor : "#fff" ,
                allowTouchScrolling: true
            }
        );

        window.canvas =  fabricCanvas;

        setCanvas(fabricCanvas);

        if(isCanvasDesign?.designJson)
        {
            fabricCanvas.loadFromJSON(isCanvasDesign?.designJson, fabricCanvas.renderAll.bind(fabricCanvas), ()=>{
                // console.log("canvas",fabricCanvas)
            });
        }
    }


    const yesCancel = () => {
        history.push("/");
    }

    const toggleCancel = () => {

        let designJson: any = JSON.stringify(canvas.toJSON());
        let thumbnail: any = canvas.toDataURL();
        let designId: any = Math.random();
        let canvasDesign = {
            designJson,
            thumbnail,
            designId,
        }
        //console.log(canvasDesign);
        setCanvasDesign(canvasDesign)
        setCancelToggle(!cancelToggle);

    }


    return (

        <>
            {
                cancelToggle ?
                    <CancelWarning toggleCancel={toggleCancel}  yesCancel={yesCancel}  />
                    :
                    <IonContent>
                        <Titlebar/>
                        <Toolbar/>
                        <div   className={drawing.HandleCanvas} >
                            <canvas id="canvas"  className={drawing.canvasUi}  />
                        </div>
                        <Menubutton toggleCancel={toggleCancel}  />
                    </IonContent>
            }
        </>
    );
}


export  default  Drawing;
