import React, {useEffect, useState} from 'react';
import { receiveRiot, getGameData, getRUserInfo } from '../../api/RUserAPI';
import "./SeasonInfo.css"

function SeasonInfo (props) {

  // const [rUser, setRUser] = useState({
  //   tier: "",
  //   rank: "",
  //   win: 0,
  //   lose: 0,
  //   riotUser: {
  //     profileIconId: 0,
  //     summonerLevel: 0
  //   }
  // })

  const updateGames = () => {
    receiveRiot(props.nickname).then(res => {
      console.log("최근 전적 업데이트", res)

      getGameData(props.nickname).then(res => {
        console.log("전적 검색", res)
      })
    })
  }
  // const [recentGames, setRecentGames] = useState({

  // })

  useEffect(() => {

    getGameData(props.nickname).then(res => {
      console.log("전적 검색", res)
    })

    getRUserInfo(props.nickname).then(res => {
      console.log("소환사 정보", res) 
    })

  })

    const showSeasonInfo = () => {
      const list = []
      for (let i=0; i<5; i++) {
        list.push(
        <div key={i}>
          <div className="champion-table">
            <div className="champion-info">
              <img className="champion-icon" src="img/champion1.jpg" alt="champion"/>
            </div>
            <div className="champion-info">
              <div>유미</div>
              <div>CS 3(0.0)</div>
            </div>
            <div className="champion-info">
              <div>1/2/0</div>
              <div>0.50:1 평점</div>
            </div>
            <div className="champion-info">
              <div>0%</div>
              <div>1게임</div>
            </div>
          </div>
        </div>
        )
      }
      return list
    }

    return (
      <div>
        <div id="season-info">
          <div className="user-table">
            <div className="user-table-info">
              <img src="img/userIcon1.jpg" alt="user icon" height="80px" width="80px" />
            </div>
            <div className="user-table-info">
              <div>{ props.nickname }</div>
              <div>주 : 정글(21%)</div>
              <div>부 : 원딜(30%)</div>
            </div>
            <div className="user-table-info">
              <img src="img/userTier.png" alt="user tier icon"  height="200px" width="200px" />
            </div>
            <div className="user-table-info">
              <div>Platinum 4</div>
              <div>0Lp / 200승 400패</div>
              <div>승률 33%</div>
            </div>
          </div>
          
          <div className="user-season-info">
            {showSeasonInfo()}
          </div>

          <button onClick={updateGames}>업데이트</button>
        </div>
      </div>
    );
}

export default SeasonInfo;