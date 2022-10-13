import React, {useContext } from 'react';
import {
    IonList,
    IonImg,
    IonLabel,
    IonContent ,
    IonToolbar,
    IonTitle,

} from '@ionic/react';
import sizes from './Sizes.module.css';
import {  Link  } from 'react-router-dom';

import {CanvasStore} from "../Store/CanvasStore";

type Item = {
    src: string;
    text: string;
    width: string;
    height:string;
    type:string;
};


const items: Item[] = [
    { src: '../assets/images/canvasPortrait.png', text: '4.2in - portrait' , width: '300' ,height:'400' ,type:'portrait' } ,
    { src: '../assets/images/canvasLandScape.png', text: '4.2in - landscape' ,width: '400' ,height:'300' ,type:'landscape'} ,
    { src: '../assets/images/canvasExpend.png', text: '7.5in' , width: '800' ,height:'400' ,type:'expend' } ,

];


const Home = () => {
 const { setDimension }:any = useContext(CanvasStore);
    const { isTitleInput ,setTitleInput  }:any = useContext(CanvasStore)
    const { setCanvasDesign }: any = useContext(CanvasStore);
    return (
        <>
            <IonToolbar className={sizes.sizebg} >
                <IonTitle className ={sizes.sizeTitle}>SELECT YOUR DISPLAY SIZE:</IonTitle>
            </IonToolbar>

            <IonContent className={sizes.overHidden}>
                <IonList lines="none" className={sizes.handleSizesBox}>
                    {items.map((image, i) => (

                        <div className={sizes.handleItem} key={i}  >
                            <Link to="/drawing"  className={sizes.linkBox}  onClick={()=>{
                                setTitleInput("")
                                setCanvasDesign("")
                                setDimension(
                                    {
                                        width:image.width,
                                        height: image.height,
                                        type: image.type
                                    }
                                );
                            }}      >

                                <IonImg src={image.src}  />
                                <IonLabel className ={sizes.boxTitle}  >{image.text}</IonLabel>
                            </Link>
                        </div>

                    ))}
                </IonList>
            </IonContent>
        </>
    );

}

export default Home;