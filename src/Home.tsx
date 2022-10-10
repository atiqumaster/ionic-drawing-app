import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonGrid,
    IonRow,
} from '@ionic/react';
import home from './Home.module.css';
import { CanvasStore } from "./Store/CanvasStore";
import { useHistory } from "react-router-dom";
import { storage } from "./Hooks/useStorage";
import { ThumbnailCards } from "./components/ThumbnailCards";
import { DeleteWarning } from "./components/DeleteWarning";

const Home = () => {

    const [thumbnail, setThumbnail]: any = useState([])
    const [deleteToggle, setDeleteToggle]: any = useState(false)
    const { setCanvasDesign }: any = useContext(CanvasStore);
    const [isDeleteDesign , setDeleteDesign ]: any = useState();
    const [isDesignHome ,  setDesignHome]: any = useState(true);
    const { isTitleInput ,setTitleInput  }:any = useContext(CanvasStore)
    let history = useHistory();

    useEffect(() => {
        loadDesign();
    }, [])


    const loadDesign = async () => {
        let localvar = await storage.get('myDesign') || '[]';
        let getLocalArray: any = JSON.parse(localvar);
        setThumbnail([...getLocalArray as []]);
        console.log(getLocalArray.length)
        if(getLocalArray.length == 0) {
            setDesignHome(false)

        }else {
            setDesignHome(true)

        }

    }


    const loadCanvas = (design: any) => {
        setCanvasDesign(design)
        history.push("/drawing");
        setTitleInput(design.isTitleInput)
    }
    const deleteCards = async () => {

        let filteredArray = thumbnail.filter((des:any)=> des.designId !== isDeleteDesign.designId);
        setThumbnail([...filteredArray as []]);
        await storage.set('myDesign', JSON.stringify(filteredArray));

        if(filteredArray.length == 0 ) {
             setDesignHome(false)
        }
        setDeleteToggle(false);
        history.push("/");
    }
    const toggleDelete=(design:any)=>{
        setDeleteToggle(!deleteToggle);
        !deleteToggle ? setDeleteDesign(design) :setDeleteDesign(null) ;
    }


    return (
        <>
            {
                deleteToggle?
                    <DeleteWarning toggleDelete={toggleDelete} deleteCards={deleteCards} />
                    :
                    <div className={home.designGrid} >
                        <IonHeader className="ion-no-border ion ion-padding-top ">
                            <IonToolbar>
                                <IonTitle>
                                    <img className={home.logo} alt="logo" width="80" src="./assets/images/logo.svg" />
                                </IonTitle>
                            </IonToolbar>
                        </IonHeader>

                        <IonGrid  >
                            <IonRow className={home.text} >
                                {
                                    isDesignHome ? (
                                    thumbnail?.length != 0 && thumbnail.map((design: any, val: any) => {

                                        return (
                                            <>
                                                <ThumbnailCards val={val} design={design} loadCanvas={loadCanvas} deleteCard={toggleDelete} />

                                            </>
                                        );
                                    })
                                    )  : <h1 className={home.deisgnHeading}>YOU HAVE NO SAVED DESIGNS</h1>
                                }

                            </IonRow>
                        </IonGrid>

                        <Link to="/sizes" >
                            <IonButton size="large" className={home.btn} >
                                <span className={home.material_symbols_outlined} >edit_square</span>
                                CREATE
                            </IonButton>
                        </Link>

                    </div>

            }

        </>

    );
}
export default Home;

