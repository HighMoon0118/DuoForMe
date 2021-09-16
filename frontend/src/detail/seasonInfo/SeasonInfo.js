import React from 'react';
// import { useState } from "react";
import "./SeasonInfo.css"

function SeasonInfo () {

  // const [gameName, setGameName] = useState("hideOnBush")

    const showSeasonInfo = () => {
      const list = []
      for (let i=0; i<5; i++) {
        list.push(
        <div>
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
              <div>소환사 이름</div>
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
        </div>
      </div>
    );
}

export default SeasonInfo;