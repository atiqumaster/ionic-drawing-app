import React ,{useEffect} from 'react';
import { IonApp ,  setupIonicReact ,  IonRouterOutlet } from '@ionic/react';
import {  Route  ,Switch} from 'react-router-dom';

import { IonReactRouter } from '@ionic/react-router';
import Home from './Home';
import Sizes from './pages/Sizes';
import Drawing from './pages/Drawing';
import WebFont from 'webfontloader';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { AnyMxRecord } from 'dns';
import app from './App.module.css'
import axios from "axios";


setupIonicReact();


const App = () => {

    let myDesigns:any = [];
    localStorage.setItem("myDesign", myDesigns);

    const loadGoogleFonts =async (fontFamily:any , fontUrl:any)=>{
        WebFont.load({
            google: {
                families: [fontFamily]
            }
        });
    }

    useEffect(()=> {
        async function getData() {
            const fonts = await axios.get(
                `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBB1ro9c5u6LIfsdsndwKTfRD8YsJIFO-U`
            );

            const fontArray = fonts.data.items.slice(0, 10);

            fontArray.forEach((font:any)=>{
                console.log(font.family);
                loadGoogleFonts(font.family,font.files.regular);
            })

        }
        getData()
    } , []);


    return (

        <IonApp className={app.appFlow}  >
            <IonReactRouter>

                <Switch>
                    <Route exact path="/" component={Home}   />
                    <Route  exact path="/sizes" component={Sizes}   />
                    <Route exact path="/drawing" component={Drawing}   />
                </Switch>

            </IonReactRouter>
        </IonApp>

    );
}

export default App;