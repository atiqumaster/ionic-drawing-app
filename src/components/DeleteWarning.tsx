import React, {useContext ,  createContext , useEffect} from 'react';
import { IonGrid, IonRow, IonCol, IonContent , IonButton } from '@ionic/react';
import deleteWarning from './DeleteWarning.module.css'

const DeleteWarning = (props:any) => {

    return (
        <>
           <IonContent>
                <IonGrid>

                    <IonRow>
                        <IonCol size="4" >  <span onClick={props.toggleDelete}>arrow_back</span></IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                            <h1>Warning</h1>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="8">
                            Are you sure you want to delete this design?
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                            <div onClick={props.deleteCards} >
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

export { DeleteWarning };