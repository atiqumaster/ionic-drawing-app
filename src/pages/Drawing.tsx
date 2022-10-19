import React, {useState, useEffect, useContext , useRef} from 'react';
import { fabric } from 'fabric';
import './drawing.css'
import { IonContent } from '@ionic/react';
import  drawing from './Drawing.module.css';
import { Toolbar } from "../components/Toolbar";
import {Titlebar} from "../components/Titlebar";
import {Menubutton} from "../components/Menubutton";
import {CanvasStore} from "../Store/CanvasStore";
import {CancelWarning} from '../components/CancelWarning';
import { useHistory } from "react-router-dom";
import { useGesture , useDrag} from "react-use-gesture";

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

type Props = {
    style?: any;
    className?: any;
    contentStyle?: React.CSSProperties;
};


const Drawing  = () => {

    const { dimension, setCanvas }:any = useContext(CanvasStore);
    const { canvas }:any = useContext(CanvasStore);
    const { isCanvasDesign , setCanvasDesign  }:any = useContext(CanvasStore);
    const [cancelToggle, setCancelToggle]: any = useState(false)
    const [tempCanvas, setTempCanvas]: any = useState()
    const ref = useRef<ReactZoomPanPinchRef | null>(null);
    //const ref = useRef(null);

    // zoom panning state
    const [zoom, setZoom]: any = useState(false)

    let history = useHistory();
    const [panning, setPanning]: any = useState(true)
    // First reload initCanvas function trigger
    const [canvasMove , setCanvasMove]:any = useState({ x: 0, y: 0 })



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
        if(isCanvasDesign?.designJson ) {
            history.go(-1);
        } else{
            history.go(-2);
        }
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



    // panning two finger Detect
    useEffect(()=>{
        twoFingerPan()
    } , [])

    function twoFingerPan() {

        var container:any = document.querySelector("#container");

        var active:any = false;
        var currentX:any;
        var currentY:any;
        var initialX:any;
        var initialY:any;
        var xOffset = 0;
        var yOffset = 0;

        container.addEventListener("touchstart", dragStart, false);
        container.addEventListener("touchend", dragEnd, false);
        container.addEventListener("touchmove", drag, false);


        function dragStart(e:any) {
            if (e.type === "touchstart") {
                initialX = e.touches[1].clientX - xOffset;
                initialY = e.touches[1].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }

        }

        function dragEnd(e:any) {
            initialX = currentX;
            initialY = currentY;

        }

        function drag(e:any) {

                e.preventDefault();

                if (e.type === "touchmove") {
                    currentX = e.touches[1].clientX - initialX;
                    currentY = e.touches[1].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }

                xOffset = currentX;
                yOffset = currentY;


            setCanvasMove({ x:currentX , y:currentY })

        }

    }


    // @ts-ignore
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
                                <TransformWrapper
                                    ref={ref}
                                    minScale={0.5}
                                    maxScale={7}
                                    doubleClick={ {disabled:true}}
                                    pinch={{disabled:false}}
                                    panning={{ disabled: panning }}
                                >

                                    <TransformComponent>
                                        <div id="container"  style={{
                                            transform: `translate3d(${canvasMove.x}px, ${canvasMove.y}px, 0px)`,
                                        }} >
                                            <canvas id="canvas" />
                                        </div>

                                     </TransformComponent>
                                </TransformWrapper>
                            </div>
                        </div>

                        <Menubutton toggleCancel={toggleCancel}  />
                    </IonContent>
            }
        </>
    );
}


export default Drawing;

