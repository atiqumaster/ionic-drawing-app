import React, {useContext ,  createContext , useEffect} from 'react';
import { fabric } from 'fabric';
import {
    IonList,
    IonItem,
    IonThumbnail,
    IonImg,
    IonLabel,
    IonContent ,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonFooter ,
    IonButton,
    IonIcon ,
    IonGrid ,
    IonRow
} from '@ionic/react';
import { Redirect, Route ,  Router , Link  , BrowserRouter ,Switch} from 'react-router-dom';

import {Toolbarmodule} from "./Toolbarmodule";
import {CanvasStore} from "../Store/CanvasStore";


const Toolbar = () => {
    const { canvas }:any = useContext(CanvasStore);

useEffect(()=> {
  //  console.log("come");
    if(canvas?.getObjects()?.length && canvas.getActiveObject())
    {
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