import React, {useContext , useEffect} from 'react';
import {Toolbarmodule} from "./Toolbarmodule";
import {CanvasStore} from "../Store/CanvasStore";


const Toolbar = () => {
    const { canvas }:any = useContext(CanvasStore);

useEffect(()=> {

    if(canvas?.getObjects()?.length && canvas.getActiveObject())
    {
        let objects = canvas.getActiveObject();

        objects.set({

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
        canvas.renderAll();
    }


} , [canvas?.on('selection:created')])
   // zoom in/out for mobile app


    return (
        <>
            <Toolbarmodule/>
        </>
    );

}

export { Toolbar };