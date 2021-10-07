import React, {useState, useEffect, useRef} from "react"
import "./MatchingModal.css";
import { getGameData, getRUserInfo, getRecommended } from './api/RUserAPI';
import MatchingTimer from "./MatchingTimer"

const MatchingModal = ( {isMatched, duoName, sendMsg, accpetOrRefuse, lolNickname,
                          exitMatching, isFolded, setFolded, canChat, chat, rUser, gameData, setRUser, setGameData} ) => {

  const [location, setLocation] = useState({ x: 280, y: 80 })
  const [startLocation, setStartLocation] = useState({ x: 0, y: 0 })
  const [mouseLocation, setMouseLocation] = useState({ x: 0,  y: 0 }) 
  const [size, setSize] = useState({w: 1000, h:600})
  const [choose, setChoice] = useState(false)
  const [message, setMessage] = useState("")
  const [recommend, setRecommend] = useState([])
  
  const chatting = useRef()
  const scrollToBottom = () => {
    if (chatting.current !== null && chatting.current !== undefined){
      chatting.current.scrollIntoView({ behavior: 'auto', block: 'end' });
    }
  }; 
  
  let recommended = []
  
  useEffect(() => {
    if (isMatched) {
      setLocation({x:280, y:80})
      setSize({w: 1000, h:600})
      setChoice(false)
      setMessage("")

      getGameData(duoName).then(res => {
        setGameData(res.data)
        getRUserInfo(duoName).then(res => {
          setRUser(res.data)
        })
      })

      getRecommended(lolNickname, { params: params}).then(res => {
        setRecommend(res.data)
      })
    }
  }, [isMatched])

  const linesInKorean = {"TOP":"탑","JUNGLE":"정글","MIDDLE":"미드","BOTTOM":"원딜","UTILITY":"서포터",}
  const lineCnt = {"TOP":0,"JUNGLE":0,"MIDDLE":0,"BOTTOM":0,"UTILITY":0,}
  const totalChamps = {}
  for (const game of gameData) {
    lineCnt[game.individualPosition] += 1
    if (game.championName in totalChamps) {
      totalChamps[game.championName].kills += game.kills
      totalChamps[game.championName].deaths += game.deaths
      totalChamps[game.championName].assists += game.assists
      totalChamps[game.championName].cnt += 1
      totalChamps[game.championName].cs += game.totalMinionsKilled
      totalChamps[game.championName].play += parseInt(game.matches.gameDuration/60000)
      totalChamps[game.championName].win += game.win?1:0
    } else {
      totalChamps[game.championName] = {
        kills: game.kills,
        deaths: game.deaths,
        assists: game.assists,
        cnt: 1,
        cs: game.totalMinionsKilled,
        play: parseInt(game.matches.gameDuration/60000),
        win: game.win?1:0,
      }
    }
  }

  const mainLines = Object.keys(lineCnt)
  mainLines.sort(function(first, second) {
    return lineCnt[second] - lineCnt[first]
  })
  
  const mainChamps = Object.keys(totalChamps)
  
  mainChamps.sort(function(first, second) {
    return  totalChamps[second].cnt - totalChamps[first].cnt;
  })


  const params = new URLSearchParams()
  for (let i = 0; i<5; i++) {
    if (i==mainChamps.length) break
    params.append("championName", mainChamps[i])
  }


  const showTier = () => {
    if (rUser.tier == undefined) return null

    if (rUser.tier!=="CHALLENGER"&&rUser.tier!=="MASTER") {
      return <img src={`detail/img/${(rUser.tier).toLowerCase()}_${(rUser.rank).toLowerCase()}.png`} alt="tier"  height="110px" width="110px" />
    } 

    return <img src={`detail/img/${(rUser.tier).toLowerCase()}.png`} alt="tier"  height="110px" width="110px" />
  }

  const showRUserInfo = () => {
    if (isFolded || rUser===undefined) return null

    return (
      <div className="user-table">
        <div className="user-table-info">
          { showTier() }
          <div className="ts-xl8">{rUser.tier} {rUser.rank}</div>
          <div className="ts-l4">{rUser.win}승 {rUser.lose}패</div>
          <div className="ts-lr8">승률 {Math.ceil(rUser.win/(rUser.win+rUser.lose)*100)}%</div>
        </div>
        <div className="user-table-info">
          <img className="profile-icon" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/profileicon/${rUser.riotUser.profileIconId}.png`} alt="user icon"/>
          <div className="ts-xxl8">{ rUser.riotUser.name }</div>
          <div className="ts-l8">{linesInKorean[mainLines[0]]}({Math.round(lineCnt[mainLines[0]]/gameData.length*100)}%)</div>
          {lineCnt[mainLines[1]]>0?<div className="ts-l8">{linesInKorean[mainLines[1]]}({Math.round(lineCnt[mainLines[1]]/gameData.length*100)}%)</div>:null}
        </div>
      </div>
    )
  }

  const showSeasonInfo = () => {
    if (isFolded) return null

    // if (recommended.length == 0) return null

    const list = []
    for (let i=0; i<5; i++) {
      list.push(
      <div className="recommend" key={i}>
        {mainChamps.length>i
          ?
          <div className="duo-champs">
            <img className="champion-icon" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${mainChamps[i]}.png`} alt="champion"/>
            <div className="champion-info1">
              <div className="fw8">{mainChamps[i]}</div>
            </div>
            <div className="champion-info2">
              <div>{Math.round(totalChamps[mainChamps[i]].kills/totalChamps[mainChamps[i]].cnt)}/{Math.round(totalChamps[mainChamps[i]].deaths/totalChamps[mainChamps[i]].cnt)}/{Math.round(totalChamps[mainChamps[i]].assists/totalChamps[mainChamps[i]].cnt)}</div>
              <div>{Math.round(totalChamps[mainChamps[i]].kills+totalChamps[mainChamps[i]].assists/totalChamps[mainChamps[i]].deaths*100)/100}:1</div>
            </div>
            <div className="champion-info3">
              <div className="fw8">{Math.round(totalChamps[mainChamps[i]].win/totalChamps[mainChamps[i]].cnt*100)}%</div>
              <div >{totalChamps[mainChamps[i]].cnt}게임</div>
            </div>
          </div>
          :null
        }
        {mainChamps.length>i
          ?<div className="space">
            <img src="./img/handshake.png" alt="champion" height="40" width="40"/>
          </div>
          :null
        }
        {mainChamps.length>i
          ?
          <div className="my-champs">
            {recommend[i]!=="null"
            ?<img className="champion-icon" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${recommend[i]}.png`} alt="champion"/>
            :<img className="champion-icon" src="./img/anonymous.png" alt="champion"/>
            }
            <div className="champion-info1">
              {recommend[i]!=="null"
              ?<div className="fw8">{recommend[i]}</div>
              :<div className="fw8">???</div>
              }
              
            </div>
          </div>
          :null
        }
      </div>
      )
    }
    return (
      <div className="user-season-info">
        {list}
      </div>
      )
  }

  const showChat = () => {
    if (isFolded) return null 

    scrollToBottom()
    
    const list = []
    for (let i=0; i<chat.length; i++) {
      list.push(
        <div className="message-line" key={i}>
          { duoName===chat[i].sender
          ?<div className="duo-name">{chat[i].sender}</div>
          :<div className="my-name">{chat[i].sender}</div>
        }
        { duoName===chat[i].sender
          ?<div className="message1">{chat[i].message}</div>
          :<div className="message2">{chat[i].message}</div>
        }
        </div>
      )
    }
    list.push(<div className="blank" key={chat.length}></div>)

    return (
      <div ref={chatting}>
        {list}
      </div>
    )
  }

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
    if (isFolded) {
      setSize({w:1000, h:600})
      setFolded(false)
    } else {
      setSize({w:700, h:60})
      setFolded(true)
    }
  }

  const accept = () => {
    setChoice(true)
    accpetOrRefuse(true)
  }

  const refuse = () => {
    setChoice(true)
    accpetOrRefuse(false)
  }

  const exit = () => {
    exitMatching()
  }
  const inputMessage = (e) => {
    setMessage(e.target.value)
  }

  const sendMessage = (e) => {
    if (e.key=="Enter" || e.type=="click") {
      sendMsg(message)
      setMessage("")
    }
  }


  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div>
      {
        isMatched
        ?<div id="matching-modal">
          <div className="modal" 
          draggable
          onDragStart={dragStart}
          onDrag={drag}
          style={{left: location.x, top: location.y, width: size.w, height: size.h}}>
            <div className="main" draggable>
              <div className="info">
                {!canChat && <button onClick={accept} disabled={choose}>수락</button>}
                {!canChat && <button onClick={refuse} disabled={choose}>거절</button>}
                {canChat && <button onClick={exit}>나가기</button>}
                <MatchingTimer canChat={canChat} isFolded={isFolded} exit={exit}/>
                {showRUserInfo()}
                {showSeasonInfo()}
              </div>
              <div className="chat" >
                <div className="chatting-space" style={isFolded ? {display: "none"} : {display: "block"}}>
                  {showChat()}
                </div>
                <input disabled={!canChat} type="text" value={message} onChange={inputMessage} onKeyPress={sendMessage}/>
                <button disabled={!canChat} onClick={sendMessage}>SEND</button>
              </div>
              <div className="fold">
                <button onClick={ foldModal }>▼</button>
              </div>
            </div>
          </div>
        </div>
        :null
      }
    </div>
  )
}
export default MatchingModal