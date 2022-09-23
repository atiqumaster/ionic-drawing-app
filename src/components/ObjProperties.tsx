import React, {useContext ,  useState } from 'react';
import {CanvasStore} from "../Store/CanvasStore";
import Objproperties from "./ObjProperties.module.css"


const ObjProperties = () => {
    const [isObjLock, setObjLock] = useState(false);    
    
    const { canvas }:any = useContext(CanvasStore);
   
    const { isToggleAdjust, setToggleAdjust }:any = useContext(CanvasStore);

 
  // console.log(isToggleAdjust);


    const objectClone = () => {
        // setObjClone(!isObjClone);

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
      setObjLock(!isObjLock)
      let activeObject = canvas.getActiveObject();
      let  items = canvas.getObjects();

      if(isObjLock === false) {
          items.forEach(function(item:any) {
          if(item.selectable == true) {
              activeObject.selectable = false;
              activeObject.evented = false
              activeObject.hoverCursor = 'default';
          }
          });

      } else {

          items.forEach(function(item:any) {

              if(item.selectable == false){
                  item.selectable = true;
                  item.hoverCursor= 'move';
                  item.evented = true;
              }

          });


              }

       canvas.discardActiveObject().renderAll();
  }



    const bringToFronts = () => {
        let activeObj = canvas.getActiveObject();
        canvas.bringToFront(activeObj);
        canvas.renderAll();
    }

    const bringForwards = () => {
        let activeObj = canvas.getActiveObject();
        canvas.bringForward(activeObj);
        canvas.renderAll();
    }

    const sendBackward = () => {
        let activeObj = canvas.getActiveObject();
        canvas.sendBackwards(activeObj);
        canvas.renderAll();
    }

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
                        <span className={ Objproperties.material_symbols_outlined_box} >lock</span>
                        LOCK
                    </button>
                <button onClick={bringToFronts}   className={ Objproperties.toggleBtn } color="undefined"  >
                    <span className={ Objproperties.material_symbols_outlined_box} >move_up</span>
                    BRING TO FRONT
                </button>
                        <button onClick={bringForwards}  className={ Objproperties.toggleBtn } color="undefined"  >
                            <span className={ Objproperties.material_symbols_outlined_box} >arrow_forward</span>
                            BRING FORWARD
                        </button>
                        <button  onClick={sendBackward}  className={ Objproperties.toggleBtn } color="undefined"  >
                            <span className={ Objproperties.material_symbols_outlined_box} >arrow_back</span>
                            SEND BACKWARD
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