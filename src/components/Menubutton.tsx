import React, {useContext  } from 'react';
import {
    IonButton,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';
import menubutton from './Menubutton.module.css'
import {CanvasStore} from "../Store/CanvasStore";
import { useHistory } from "react-router-dom";
import {storage} from "../Hooks/useStorage";


const Menubutton = (props:any) => {

    const { canvas }:any = useContext(CanvasStore);
    const { isCanvasDesign , setCanvasDesign  }:any = useContext(CanvasStore);
    let history = useHistory();
    const { isTitleInput ,setTitleInput  }:any = useContext(CanvasStore)
    const storeCanvas = async () => {

        if (isCanvasDesign) {

            let getID = isCanvasDesign.designId;

            let localArray: [] = JSON.parse(await storage.get('myDesign') || '[]');
            localArray.forEach((obj: any) => {
                if (obj.designId == getID) {
                    obj.designJson = JSON.stringify(canvas.toJSON());
                    obj.thumbnail = canvas.toDataURL();
                    obj.isTitleInput = isTitleInput;

                }
            })
            setCanvasDesign(null);
            await storage.set('myDesign', JSON.stringify(localArray));
            canvas.renderAll();
            history.go(-2);
            setTitleInput(isTitleInput)
        } else {

            let designJson: any = JSON.stringify(canvas.toJSON());
            let thumbnail: any = canvas.toDataURL();
            let designId: any = Math.random();

            let canvasDesign = {
                designJson,
                thumbnail,
                designId,
                isTitleInput
            }

            let tempArray: any = [];

            if (await storage.get('myDesign')) {

                let getLocalArray: any = JSON.parse(await storage.get('myDesign') || '[]');
                tempArray.push(...getLocalArray);
            }

            tempArray.push(canvasDesign);
            await storage.set('myDesign', JSON.stringify(tempArray));
            canvas.renderAll();
            history.go(-2);

        }
    }


    return (
        <>

            <IonGrid>
                <IonRow className={menubutton.BtnFlow}>
                    <IonCol size="6" >
                        <IonButton    className={menubutton.cancel} color="undefined"  onClick={props.toggleCancel}>Cancel</IonButton>
                    </IonCol>
                    <IonCol size="6" >
                        <IonButton    onClick={()=>{storeCanvas()}}   className={menubutton.save }>
                            <span className={ menubutton.material_symbols_outlined} >check</span>save
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>

        </>
    );

}

export {  Menubutton };