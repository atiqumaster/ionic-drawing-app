import React, {useContext ,  useState } from 'react';
import {CanvasStore} from "../Store/CanvasStore";
import Objproperties from "./ObjProperties.module.css"
import {fastFood} from "ionicons/icons";


const ObjProperties = () => {

    const { canvas }:any = useContext(CanvasStore);
    const { isToggleAdjust, setToggleAdjust }:any = useContext(CanvasStore);
    const { isObjLock, setObjLock }:any = useContext(CanvasStore);


    const objectClone = () => {

        let cloned = canvas.getActiveObject()
        cloned.clone(function(clonedObj:any) {

            canvas.discardActiveObject();
            clonedObj.set({
                left: clonedObj.left + 20,
                top: clonedObj.top + 20,
                 evented: true,
            });

            if (clonedObj.type === 'activeSelection') {
                // active selection needs a reference to the canvas.
                clonedObj.canvas = canvas;
                clonedObj.forEachObject(function(obj:any) {
                    canvas.add(obj);
                });
            } else {
                canvas.add(clonedObj);
            }
            canvas.setActiveObject(clonedObj);
            canvas.requestRenderAll();
        });




    }

    const objectDelete = () => {

        canvas.getActiveObjects().forEach((obj:any) => {
            canvas.remove(obj)
        });
        canvas.discardActiveObject().renderAll()
    }

  const objectLock = () => {

      let activeObject = canvas.getActiveObject();
      if(activeObject.lockMovementX && activeObject.lockMovementY ) {
          activeObject.set({lockMovementX: false, lockMovementY: false})
          setObjLock("Lock");
      }else{
          activeObject.set({lockMovementX: true, lockMovementY: true})
          setObjLock("UnLock");
      }


      canvas.renderAll();
  }



    const bringToFronts = () => {
        let activeObj = canvas.getActiveObject();
        canvas.bringToFront(activeObj);
        canvas.renderAll();
    }

    // const bringForwards = () => {
    //     let activeObj = canvas.getActiveObject();
    //     canvas.bringForward(activeObj);
    //     canvas.renderAll();
    // }
    //
    // const sendBackward = () => {
    //     let activeObj = canvas.getActiveObject();
    //     canvas.sendBackwards(activeObj);
    //     canvas.renderAll();
    // }

    const sendToBacks = () => {
        let activeObj = canvas.getActiveObject();
        canvas.sendToBack(activeObj);
        canvas.renderAll();
    }

    

    return (
        <>

       <div  style={isToggleAdjust}  className={ Objproperties.open_toggle_box } >
                    <button onClick={objectClone}  className={ Objproperties.toggleBtn } color="undefined"  >
                        <span className={ Objproperties.material_symbols_outlined_box} >content_copy</span>
                        Duplicate
                    </button>
                    <button onClick={objectLock}     className={ Objproperties.toggleBtn } color="undefined"  >
                        <span className={ Objproperties.material_symbols_outlined_box} > {canvas.getActiveObject().lockMovementX && canvas.getActiveObject().lockMovementY ? "lock_open"  : "lock" }</span>
                        {isObjLock}
                    </button>
                <button onClick={bringToFronts}   className={ Objproperties.toggleBtn } color="undefined"  >
                    <span className={ Objproperties.material_symbols_outlined_box} >move_up</span>
                    BRING TO FRONT
                </button>
                        {/*<button onClick={bringForwards}  className={ Objproperties.toggleBtn } color="undefined"  >*/}
                        {/*    <span className={ Objproperties.material_symbols_outlined_box} >arrow_forward</span>*/}
                        {/*    BRING FORWARD*/}
                        {/*</button>*/}
                        {/*<button  onClick={sendBackward}  className={ Objproperties.toggleBtn } color="undefined"  >*/}
                        {/*    <span className={ Objproperties.material_symbols_outlined_box} >arrow_back</span>*/}
                        {/*    SEND BACKWARD*/}
                        {/*</button>*/}
                        <button onClick={sendToBacks}    className={ Objproperties.toggleBtn } color="undefined"  >
                            <span className={ Objproperties.material_symbols_outlined_box} >move_down</span>
                            SEND TO BACK
                        </button>
                        <button onClick={objectDelete}   className={ Objproperties.toggleBtn } color="undefined"  >
                            <span className={ Objproperties.material_symbols_outlined_box} >delete</span>
                            DELETE
                        </button>
                    </div>

        </>
);

}
export { ObjProperties };