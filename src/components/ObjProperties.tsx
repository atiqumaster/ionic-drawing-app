import React, {useContext ,  useState } from 'react';
import {CanvasStore} from "../Store/CanvasStore";
import Objproperties from "./ObjProperties.module.css"


const ObjProperties = () => {

    const { canvas }:any = useContext(CanvasStore);
    const { isToggleAdjust, setToggleAdjust }:any = useContext(CanvasStore);
    const { isObjLock, setObjLock }:any = useContext(CanvasStore);
    const { isObjLockIcon, setObjLockIcon }:any = useContext(CanvasStore);
    const { setTextBoxToggle }:any = useContext(CanvasStore);
    const {isImageToolbarToggle, setImageToolbarToggle}:any = useContext(CanvasStore);
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

        setTextBoxToggle(false)
        setImageToolbarToggle(false)
    }

    const objectDelete = () => {

        canvas.getActiveObjects().forEach((obj:any) => {
            canvas.remove(obj)
        });
        canvas.discardActiveObject().renderAll()
        setTextBoxToggle(false)
        setImageToolbarToggle(false)
    }

  const objectLock = () => {

      let activeObject = canvas.getActiveObject();
      if(activeObject.lockMovementX && activeObject.lockMovementY ) {
          activeObject.set({lockMovementX: false, lockMovementY: false , hasControls:true, borderDashArray:[0]})
          setObjLock("UnLock");
          setObjLockIcon("lock")
      }else{
          activeObject.set({lockMovementX: true, lockMovementY: true , hasControls:false , borderDashArray:[3]})
          setObjLock("Lock");
          setObjLockIcon("lock_open")
      }


      canvas.renderAll();
      setTextBoxToggle(false)
      setImageToolbarToggle(false)
  }



    const bringToFronts = () => {
        let activeObj = canvas.getActiveObject();
        activeObj.bringToFront()
        canvas.discardActiveObject().renderAll()
        setTextBoxToggle(false)
        setImageToolbarToggle(false)
    }


    const sendToBacks = () => {
        let activeObj = canvas.getActiveObject();
        activeObj.sendToBack()
        canvas.discardActiveObject().renderAll()
        setTextBoxToggle(false)
        setImageToolbarToggle(false)
    }


    return (
        <>

       <div  style={isToggleAdjust}  className={ Objproperties.open_toggle_box } >
                    <button onClick={objectClone}  className={ Objproperties.toggleBtn } color="undefined"  >
                        <span className={ Objproperties.material_symbols_outlined_box} >content_copy</span>
                        Duplicate
                    </button>
                    <button onClick={objectLock}     className={ Objproperties.toggleBtn } color="undefined"  >
                        <span className={ Objproperties.material_symbols_outlined_box} >{isObjLockIcon}</span>
                        {isObjLock}
                    </button>
                <button onClick={bringToFronts}   className={ Objproperties.toggleBtn } color="undefined"  >
                    <span className={ Objproperties.material_symbols_outlined_box} >move_up</span>
                    BRING TO FRONT
                </button>

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
