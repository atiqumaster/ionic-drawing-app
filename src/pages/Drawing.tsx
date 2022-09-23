import React, {useState, useEffect, useContext} from 'react';
import { fabric } from 'fabric';

import { IonContent } from '@ionic/react';
import  drawing from './Drawing.module.css';
import { Toolbar } from "../components/Toolbar";
import {Titlebar} from "../components/Titlebar";
import {Menubutton} from "../components/Menubutton";
import {CanvasStore} from "../Store/CanvasStore";


import 'fabric-history';



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
    const [isPan , setPan ]= useState(true);
    const [isdraggable , setIsdraggable ]= useState(false);
    const { isCanvasDesign , setCanvasDesign  }:any = useContext(CanvasStore);



    // First reload initCanvas function trigger
    useEffect(() => {
        initCanvas();


    }, []);

//  canvas Pan reset

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




    return (

        <>
              <IonContent>

                  <Titlebar/>

                  <Toolbar/>

                   <div   className={drawing.HandleCanvas} >

                             <canvas id="canvas"  className={drawing.canvasUi}  />

                       </div>
                  <Menubutton/>
              </IonContent>
        </>

    );
}

export  default  Drawing;
