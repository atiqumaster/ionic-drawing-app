import React, {useContext, useState} from 'react';
import {IonButton,IonRow ,IonCol} from '@ionic/react';
import home from "../Home.module.css";
import {CanvasStore} from "../Store/CanvasStore";

const ThumbnailCards  = ({val,design,loadCanvas,deleteCard}:any) => {
    const [isSaveBoxToggle, setSaveBoxToggle] = useState(false);
    const { setTitleInput  }:any = useContext(CanvasStore)


    return (
        <>
            <IonCol className={home.saveCardSize}  key={val} >
                <div   className={home.SaveDesignWrapper} >
                    <div className={home.SaveDesignAdjust} >
                        <IonRow className={home.titleInputRow}>
                            <IonCol size="10" >
                                <h3 style={{color: "white" , textTransform: "uppercase"}} >{ design.isTitleInput.length != 0 ?
                                    design.isTitleInput : "UNTITLED"

                                }</h3>
                            </IonCol>
                            <IonCol size="2" >
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
                        </IonRow >

                        <IonRow className={home.thumbnailRow} >

                            <IonCol onClick={()=>{loadCanvas(design)}}>
                                <img className={home.designImg }    src={design.thumbnail} />
                            </IonCol>

                        </IonRow>
                        <IonRow className={home.bluetoothRow} >
                            <IonCol>
                                <IonButton   size="large" className={home.BlueToothBtn} >
                                    <img className={home.sendImg} src=".././assets/images/send48.png"  />
                                    {/*<span className={home.material_symbols_outlined} >send</span>*/}
                                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;Send
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