import React from 'react';
// import { useState } from "react";
import "./PlayList.css"

function PlayList () {


  const showPlayInfo = () => {
    const list = []
    for (let i=0; i<10; i++) {
      list.push(
        <div key={i}>
          <div className="play-table">
            <div className="play-table-item">
              <div>솔랭</div>
              <div>8시간 전</div>
              <div>패배</div>
              <div>11분 40초</div>
            </div>
            <div className="play-table-item">
              <img className="champion-icon" src="img/champion1.jpg" alt="shampion"/>
            </div>
            <div className="play-table-item">
              <div className="rune-spell">
                <img className="rs-item" src="img/spell1.png" alt="spell"/>
                <img className="rs-item" src="img/spell2.png" alt="spell"/>
                <img className="rs-item" src="img/rune1.png" alt="rune"/>
                <img className="rs-item" src="img/rune2.png" alt="rune"/>
              </div>
            </div>
            
            <div className="play-table-item">
              <div>1 / 2 / 0</div>
              <div>0.50:1 평점</div>
            </div>
            
            <div className="play-table-item">
              <div>레벨8</div>
              <div>3(0.0)CS</div>
              <div>킬관여 100%</div>
              <div>와드 2개</div>
            </div>
            
            <div className="play-table-item">
              <div className="item-list">
                <img className="item-item" src="img/item1.png" alt="item" />
                <img className="item-item" src="img/item1.png" alt="item" />
                <img className="item-item" src="img/item1.png" alt="item" />
                <img className="item-item" src="img/item1.png" alt="item" />
                <img className="item-item" src="img/item1.png" alt="item" />
                <img className="item-item" src="img/item1.png" alt="item" />
                <img className="item-item" src="img/item1.png" alt="item" />
                <img className="item-item" src="img/item1.png" alt="item" />
              </div>
            </div>

          </div>
          <br />
        </div>
      )
    }

    return list
  }

  return (
    <div id="play-list">
      <div>
        {showPlayInfo()}
      </div>
    </div>
  );
}

export default PlayList;