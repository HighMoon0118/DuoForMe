import React from 'react';
// import { useState } from "react";
import "./SeasonInfo.css"

function SeasonInfo () {

  // const [gameName, setGameName] = useState("hideOnBush")

    const showSeasonInfo = () => {
      const list = []
      for (let i=0; i<5; i++) {
        list.push(<div>챔피언 정보</div>)
      }
      return list
    }

    return (
      <div>
        <h1>시즌 정보</h1>
        <div id="season-info">
          <div className="userInfo">소환사 정보</div>
          <div>
            {showSeasonInfo()}
          </div>
        </div>
      </div>
    );
}

export default SeasonInfo;