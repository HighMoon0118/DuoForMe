import React, {useState} from "react"
import "./MatchingModal.css";

const Modal = ( props ) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;


  const [location, setLocation] = useState({ x: 495, y: 50 })

  const [startLocation, setStartLocation] = useState({ x: 0, y: 0 })

  const [mouseLocation, setMouseLocation] = useState({ x: 0,  y: 0 }) 

  const [fold, setFold] = useState(false)
  const [size, setSize] = useState({w: 1000, h:600})

  const dragStart = (e) =>{
    setMouseLocation({x:e.pageX, y:e.pageY})
    setStartLocation({x:location.x, y:location.y})
  }
  const drag = (e) =>{
    const xGap = e.pageX - mouseLocation.x
    const yGap = e.pageY - mouseLocation.y
    if (Math.abs(location.x-startLocation.x-xGap) <= 100) {
      setLocation({x:startLocation.x+xGap, y:startLocation.y+yGap})
    }
  }

  const foldModal = () => {
    if (fold) {
      setSize({w:900, h:600})
      setFold(false)
    } else {
      setSize({w:700, h:60})
      setFold(true)
    }
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div>
      {
        open ? (
          <div id="matching-modal">
            <div className="modal" 
            draggable
            onDragStart={dragStart}
            onDrag={drag}
            style={{left: location.x, top: location.y, width: size.w, height: size.h}}>
              <div className="main" draggable>
                <div className="info">
                  <button>수락</button>
                  <button onClick={close}>거절</button>
                </div>
                <div className="chat" >
                  <div className="message"  style={fold ? {display: "none"} : {display: "block"}}></div>
                  <input type="text" />
                  <button>></button>
                </div>
                <div className="fold">
                  <button onClick={ foldModal }>▼</button>
                </div>
              </div>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}
export default Modal