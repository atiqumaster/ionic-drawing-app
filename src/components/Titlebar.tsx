import React, {useContext } from 'react';
import {
    IonButton,
    IonGrid ,
    IonRow ,
    IonInput ,
    IonCol
} from '@ionic/react';
import titlebars from './Titlebar.module.css';
import { useHistory } from "react-router-dom";
import {CanvasStore} from "../Store/CanvasStore";

const Titlebar  = () => {
    let history = useHistory();
    const { setTitleInput  }:any = useContext(CanvasStore)
    const { isCanvasDesign , setCanvasDesign  }:any = useContext(CanvasStore);

    const handleClick = () => {

        history.goBack();
        setCanvasDesign(null);
    }

    const handleInput = (event:any) => {

        setTitleInput(event.target.value)

    }


    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonCol  size="1" className={titlebars.colBtn}>
                        <IonButton   onClick={() => handleClick()} size="large" className={titlebars.btn} >
                            <span className={titlebars.material_symbols_outlined} >arrow_back</span>
                        </IonButton>
                    </IonCol>
                    <IonCol size="11" >

                        <IonInput type="text"  onIonChange={handleInput}  className={titlebars.tileInput}   placeholder="Enter Title" />


                    </IonCol>
                </IonRow>
        </IonGrid>

        </>
    );

}

export { Titlebar  };