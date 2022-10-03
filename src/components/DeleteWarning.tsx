import React from 'react';
import { IonGrid, IonRow, IonCol, IonContent , IonButton } from '@ionic/react';
import deleteWarning from './DeleteWarning.module.css'

const DeleteWarning = (props:any) => {

    return (
        <>
           <IonContent className={deleteWarning.deleteBg}>
                <IonGrid>

                    <IonRow className={deleteWarning.delRowOne} >
                        <IonCol size="4" className={deleteWarning.material_symbols_outlined} >  <span onClick={props.toggleDelete}>arrow_back</span></IonCol>
                    </IonRow>

                    <IonRow  className={deleteWarning.delRowTwo} >
                        <IonCol size="6">
                            <h1 className={deleteWarning.headWarning
                            } >Warning</h1>
                        </IonCol>
                    </IonRow>

                    <IonRow  className={deleteWarning.delRowThree} >
                        <IonCol size="8" className={deleteWarning.paraWarning}>
                            Are you sure you want to delete this design?
                        </IonCol>
                    </IonRow>

                    <IonRow className={deleteWarning.delRowFour} >
                        <IonCol size="6">
                            <div onClick={props.deleteCards}  className={deleteWarning.btnWarning} >
                              <h3>Yes</h3>
                                <p>Delete design</p>
                            </div>
                        </IonCol>
                    </IonRow>

                </IonGrid>
            </IonContent>

        </>
    );

}

export { DeleteWarning };