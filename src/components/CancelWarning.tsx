import React, {useContext ,  createContext , useEffect} from 'react';
import { IonGrid, IonRow, IonCol, IonContent , IonButton } from '@ionic/react';
import { useHistory } from "react-router-dom";
import cancelwarning from './CancelWarning.module.css'

const CancelWarning = (props:any) => {

    return (
        <>
            <IonContent>
                <IonGrid>

                    <IonRow>
                        <IonCol size="4" ><h1>DO YOU REALLY WANT TO CANCEL AND DISCARD YOUR CHANGES?</h1></IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                            <IonButton  onClick={props.toggleCancel} >NO , I WANT TO SAVE FIRST</IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="3">
                          <IonButton onClick={props.yesCancel } >YES</IonButton>
                        </IonCol>
                    </IonRow>

                </IonGrid>
            </IonContent>

        </>
    );

}

export { CancelWarning };