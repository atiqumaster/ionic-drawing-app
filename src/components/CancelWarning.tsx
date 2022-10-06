import React from 'react';
import { IonGrid, IonRow, IonCol, IonContent , IonButton } from '@ionic/react';
import cancelwarning from './CancelWarning.module.css'
import deleteWarning from "./DeleteWarning.module.css";
import {  Link  } from 'react-router-dom';

const CancelWarning = (props:any) => {

    return (
        <>
            <IonContent className={cancelwarning.cancelBg} >
                <IonGrid>

                    <IonRow className={cancelwarning.cancelRowOne} >
                        <IonCol size="9"   >
                            <h2 className={cancelwarning.headWarning }>
                                DO YOU REALLY WANT TO CANCEL AND DISCARD YOUR CHANGES?</h2>
                        </IonCol>
                    </IonRow>

                    <IonRow className={cancelwarning.cancelRowTwo} >
                        <IonCol size="6">
                            <IonButton  className={cancelwarning.btnCanceNo } onClick={props.toggleCancel} >NO , I WANT TO SAVE FIRST</IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow className={cancelwarning.cancelRowThree} >
                        <IonCol size="3">
                           <IonButton className={cancelwarning.btnCanceYes } onClick={props.yesCancel } >YES</IonButton>
                        </IonCol>
                    </IonRow>

                </IonGrid>
            </IonContent>

        </>
    );

}

export { CancelWarning };