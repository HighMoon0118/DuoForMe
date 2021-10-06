import React, {useState} from 'react'
import "./Sidebar.css"
import {HiOutlinePencilAlt} from "react-icons/hi"
import CreditModalContainer from "../../container/CreditModalContainer"
import {BsCheckAll} from "react-icons/bs"
function SuccessMatchingUser(props) {
  const iscredit = props.isCredit === null ? false : true
  const [ modalOpen, setModalOpen ] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  function creditOpen() {
    openModal()
  }
  return(
    <div className="user-box">
      <div className="user-img">
        <img src={`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/${props.image}.png`} alt="user icon" height="40px" width="40px" />
      </div>
      <div className="user-info">
        <p className="margin-0">{props.userName}</p>
      </div>
      {!iscredit ? <HiOutlinePencilAlt size="20" onClick={() => creditOpen()}/> : <BsCheckAll size="20" />}
      <CreditModalContainer open={ modalOpen } close={ closeModal } matchinghistoryId={props.matchinghistoryId} userName={props.userName} userId={props.userId} className="modal"></CreditModalContainer>
    </div>
  )
}
export default SuccessMatchingUser