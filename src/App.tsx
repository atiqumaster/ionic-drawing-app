import React ,{useEffect} from 'react';
import { IonApp ,  setupIonicReact ,  IonRouterOutlet } from '@ionic/react';
import { Redirect, Route ,  Router , Link  , BrowserRouter ,Switch} from 'react-router-dom';

import { IonReactRouter } from '@ionic/react-router';
import Home from './Home';
import Sizes from './pages/Sizes';
import Drawing from './pages/Drawing';
import CancelWarning from "./pages/CancelWarning";
import DeleteWarning from "./pages/DeleteWarning";

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


setupIonicReact();


const App = () => {


    let myDesigns:any = [];
    localStorage.setItem("myDesign", myDesigns);
    return (

        <IonApp className={app.appFlow}  >

            <IonReactRouter>

                <Switch>
                    <Route exact path="/" component={Home}   />
                    <Route  exact path="/sizes" component={Sizes}   />
                    <Route exact path="/drawing" component={Drawing}   />
                    <Route  exact path="/cancel" component={CancelWarning}   />
                    <Route exact path="/delete" component={DeleteWarning}   />
                </Switch>
            </IonReactRouter>


        </IonApp>

    );
}

export default App;