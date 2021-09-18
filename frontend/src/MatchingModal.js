import React, {useState} from "react"
import "./MatchingModal.css";

const Modal = ( props ) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;


  const [location, setLocation] = useState({
    x: 0,
    y: 50
  })

  const [startLocation, setStartLocation] = useState({
    x: 0,
    y: 0
  })

  const [mouseLocation, setMouseLocation] = useState({
    x: 0,
    y: 0
  }) 

  const [fold, setFold] = useState(false)
  const [size, setSize] = useState({w: 700, h:700})

  const dragStart = (e) =>{
    setMouseLocation({x:e.pageX, y:e.pageY})
    setStartLocation({x:location.x, y:location.y})
  }
  const drag = (e) =>{
    const xGap = e.pageX - mouseLocation.x
    const yGap = e.pageY - mouseLocation.y
    if (Math.abs(location.x-startLocation.x-xGap) <= 50) {
      setLocation({x:startLocation.x+xGap, y:startLocation.y+yGap})
    }
  }

  const foldModal = () => {
    if (fold) {
      setSize({w:700, h:700})
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
            onDragStart={dragStart}
            onDrag={drag}
            style={{left: location.x, top: location.y, height: size.h}}>
              <div className="header" draggable>
                매칭 모달
                <button onClick={ foldModal }>버튼</button>
              </div>
              <div className="main" style={fold ? {opacity: 0} : {opacity: 1}}>
                {props.children}
              </div>
              <div className="footer" style={fold ? {opacity: 0} : {opacity: 1}}>
                <button className="close" onClick={close}> close </button>
              </div>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}
export default Modal