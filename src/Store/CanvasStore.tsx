import {
    createContext,
    useMemo,
    useState,
} from 'react';
import create from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';


interface Props {

    theme: any;
    setTheme: any;
    setDimension:any;

    canvas:any;
    setCanvas:any;
    baseImage:any;
    setBaseImg:any;
    obj:any;
    isOpacity:any;
    self:any;
    thumbnail:any;
    setThumbnail: any;
    isCanvasDesign: any;
    setCanvasDesign:any;

}





export const CanvasStore = createContext<Props |null>(null);

export const useStore = create(subscribeWithSelector(() => ({
    canvasSaving: false,
})));



export function StoreContext({ children }:any) {
    const [dimension, setDimension] = useState({
        width:400,
        height:300
    });
    const [canvas, setCanvas] = useState(null);
    const [isToggleAdjust , setToggleAdjust ] = useState({
        top:52
    });

    const [isCanvasDesign , setCanvasDesign ] = useState(null);
    const [isTitleInput , setTitleInput ] = useState(null);
    const [isDeleteDesign , setDeleteDesign ] = useState(null);


    const canvasProviderValues:any = useMemo(() => ({
        dimension,
        setDimension,
        canvas,
        setCanvas ,
        isToggleAdjust ,
        setToggleAdjust ,
        isCanvasDesign ,
        setCanvasDesign ,
        isTitleInput ,
        setTitleInput,
        isDeleteDesign,
        setDeleteDesign
    }), [
        dimension,
        canvas ,
        isToggleAdjust ,
        isCanvasDesign ,
        isTitleInput ,
        isDeleteDesign

    ]);

    return (
        <CanvasStore.Provider value={{ ...canvasProviderValues }}>
            { children }
        </CanvasStore.Provider>
    );
}

