import React, { useState} from 'react';
import {IonButton,IonRow ,IonCol} from '@ionic/react';
import home from "../Home.module.css";

const ThumbnailCards  = ({val,design,loadCanvas,deleteCard}:any) => {
    const [isSaveBoxToggle, setSaveBoxToggle] = useState(false);

    return (
        <>
            <IonCol className={home.saveCardSize}  key={val} >
                <div   className={home.SaveDesignWrapper} >
                    <div className={home.SaveDesignAdjust} >
                        <IonRow>
                            <IonCol size="11" >
                                <h3 style={{color: "white"}} >{design.isTitleInput}</h3>
                            </IonCol>
                            <IonCol size="1" >
                                <IonButton  className={home.btn1 } onClick={()=>{setSaveBoxToggle(!isSaveBoxToggle)}} color="undefined" >
                                    <span className={ home.material_symbols_outlineds} >more_horiz</span>
                                </IonButton>
                                {
                                    isSaveBoxToggle ?
                                        <button   className={ home.toggleBtn } color="undefined"  onClick={()=>{deleteCard(design)}}>
                                            <span className={ home.material_symbols_outlined_box} >delete</span>
                                            DELETE DESIGN
                                        </button>
                                        : null
                                }
                            </IonCol>
                        </IonRow>

                        <IonRow>

                            <IonCol onClick={()=>{loadCanvas(design)}}>
                                <img className={home.designImg }    src={design.thumbnail} />
                            </IonCol>

                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton   size="large" className={home.BlueToothBtn} >
                                    <span className={home.material_symbols_outlined} >send</span>
                                    Send
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>
            </IonCol>
        </>
    );

}

export { ThumbnailCards  };