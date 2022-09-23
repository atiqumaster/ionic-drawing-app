import React, {useContext } from 'react';
import {
    IonButton,
    IonGrid ,
    IonRow ,
    IonInput ,
    IonCol
} from '@ionic/react';
import { useHistory } from "react-router-dom";
import {CanvasStore} from "../Store/CanvasStore";

const DeleteWarning  = () => {

    let history = useHistory();

    return (
        <>
            <h1>Delete Warning button is here</h1>

        </>
    );

}

export default DeleteWarning  ;