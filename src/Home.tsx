import React, {useContext, useEffect, useState} from 'react';
import { Link  } from 'react-router-dom';

import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonGrid,
    IonRow,
} from '@ionic/react';
import home from './Home.module.css';
import {CanvasStore} from "./Store/CanvasStore";
import { useHistory } from "react-router-dom";
import {storage} from "./Hooks/useStorage";
import {ThumbnailCards} from "./components/ThumbnailCards";

const Home = () => {


    const [thumbnail, setThumbnail]:any  =useState([])
    const { setCanvasDesign }:any = useContext(CanvasStore);
    const { isTitleInput }:any = useContext(CanvasStore);


    let history = useHistory();

    useEffect(()=> {
        loadDesign();
    } ,[])


    const loadDesign =  async ()=>{
       //let localvar = localStorage.getItem('myDesign')|| '[]';
        let localvar = await storage.get('myDesign')|| '[]';
        let getLocalArray:any = JSON.parse(localvar);
       setThumbnail([...getLocalArray as []]);
    }



    const loadCanvas = (design:any) => {

        setCanvasDesign(design)

        //canvas.onload(canvasLoad );
        history.push("/drawing");
    }


    return (
     <>
         <div className = {home.designGrid} >
        <IonHeader  className="ion-no-border ion ion-padding-top ">
            <IonToolbar>
                <IonTitle>
                    <img className={home.logo} alt="logo"  width="80"  src="./assets/images/logo.svg" />
                </IonTitle>
            </IonToolbar>
        </IonHeader>

             <IonGrid  >
                <IonRow className={home.text} >


{thumbnail?.length!=0  &&  thumbnail.map((design:any,val:any)=>{
console.log("design",design);
    return (
        <>
            <ThumbnailCards val={val} design={design} loadCanvas={loadCanvas} />

        </>
    );
})
            }


           </IonRow>

             </IonGrid>

       
                 <Link to="/sizes" >
                     <IonButton   size="large" className={home.btn} >
                         <span className={home.material_symbols_outlined} >edit_square</span>
                         CREATE
                     </IonButton>
                 </Link>
         </div>
           </>
      
      );
}
export default Home;