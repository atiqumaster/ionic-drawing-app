import React, {useState, useEffect, useContext , useRef} from 'react';
import { fabric } from 'fabric';

import { IonContent } from '@ionic/react';
import  drawing from './Drawing.module.css';
import { Toolbar } from "../components/Toolbar";
import {Titlebar} from "../components/Titlebar";
import {Menubutton} from "../components/Menubutton";
import {CanvasStore} from "../Store/CanvasStore";
import {CancelWarning} from '../components/CancelWarning';
import { useHistory } from "react-router-dom";
import {  Link  } from 'react-router-dom';

import {
    TransformWrapper,
    TransformComponent ,
    ReactZoomPanPinchProps,
    ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

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
    const [tempCanvas, setTempCanvas]: any = useState()
    const ref = useRef<ReactZoomPanPinchRef | null>(null);
    //const ref = useRef(null);

    let history = useHistory();

    // First reload initCanvas function trigger

    useEffect(() => {

        initCanvas();


    }, [cancelToggle]);

    // Connect Fabric Canvas with canvas and set height /width
    const initCanvas = () => {

        let canvasWidth = window.innerWidth ;
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

        if(isCanvasDesign?.designJson && !tempCanvas)
        {
            fabricCanvas.loadFromJSON(isCanvasDesign?.designJson, fabricCanvas.renderAll.bind(fabricCanvas), ()=>{
            });
        }
        else if(tempCanvas?.designJson)
        {

            fabricCanvas.loadFromJSON(tempCanvas?.designJson, fabricCanvas.renderAll.bind(fabricCanvas), ()=>{
            });
        }
    }


    const yesCancel = () => {
        //history.replace("/");
          history.go(-2);
    }

    const toggleCancel = () => {

        let designJson: any = JSON.stringify(canvas.toJSON());
        let thumbnail: any = canvas.toDataURL();
        let designId: any ;
        if(isCanvasDesign?.designJson)
        {
            designId= isCanvasDesign?.designId;
        }
        else {
            designId= Math.random();
        }

        let canvasDesign = {
            designJson,
            thumbnail,
            designId,
        }
        setTempCanvas(canvasDesign);
        setCancelToggle(!cancelToggle);

    }


    function useOutsideAlerter(ref:any) {
        useEffect(() => {

            function handleClickOutside(event:any) {
                if (ref.current && !ref.current.contains(event.target)) {

                    // console.log("nill");
                    canvas.discardActiveObject()
                    canvas.renderAll()
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref , canvas]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);


    return (

        <>
            {
                cancelToggle ?
                    <CancelWarning toggleCancel={toggleCancel}  yesCancel={yesCancel}  />
                    :
                    <IonContent className={drawing.hiddenFlow}>
                        <Titlebar/>
                        <div ref={wrapperRef} className={drawing.handleCanvasHeight}>
                            <Toolbar/>

                            <div   className={drawing.HandleCanvas} >
                                {/*<TransformWrapper ref={ref} panning={{ disabled: true }}>*/}
                                {/*    <TransformComponent>*/}

                                         <canvas id="canvas"   />

                                {/*    </TransformComponent>*/}
                                {/*</TransformWrapper>*/}
                            </div>
                        </div>
                        <Menubutton toggleCancel={toggleCancel}  />
                    </IonContent>
            }
        </>
    );
}


export default Drawing;
