import React, {useContext } from 'react';
import { IonGrid, IonRow, IonCol, IonContent , IonButton } from '@ionic/react';
import { useHistory } from "react-router-dom";
import {CanvasStore} from "../Store/CanvasStore";
import deleteWarning from "./DeleteWarning.module.css"
import home from "../Home.module.css";

const DeleteWarning  = () => {

    let history = useHistory();

    return (
        <>
            <IonContent>
                <IonGrid>

                    <IonRow>
                        <IonCol size="4" >  <span className={deleteWarning.material_symbols_outlined} >arrow_back</span></IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                            <h1>Warning</h1>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="3">
                            Are you sure you want to delete this design?
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="2">
                            <div className={deleteWarning.delBtn} >
                              <h3>Yes</h3>
                              Delete design
                            </div>
                        </IonCol>
                    </IonRow>


                </IonGrid>
            </IonContent>


        </>
    );

}

export default DeleteWarning  ;