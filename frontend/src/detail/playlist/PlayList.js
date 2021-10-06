import axios from 'axios';
import React from 'react';
 import { useState, useEffect } from "react";
import "./PlayList.css"

function PlayList (props) {

  const spell = {
    1: 'SummonerBoost', 3: 'SummonerExhaust', 4: 'SummonerFlash', 6: 'SummonerHaste', 
    7: 'SummonerHeal', 11: 'SummonerSmite', 12: 'SummonerTeleport', 13: 'SummonerMana', 
    14: 'SummonerDot', 21: 'SummonerBarrier', 30: 'SummonerPoroRecall', 31: 'SummonerPoroThrow', 
    32: 'SummonerSnowball', 39: 'SummonerSnowURFSnowball_Mark', 54: 'Summoner_UltBook_Placeholder'}


  const showPlayInfo = () => {

    const list = []
    const date = new Date()
    for (let game of props.gameData) {
      const day = game.updatedTime.split("T")[0].split("-")
      const time = game.updatedTime.split("T")[1].split(":")
      let howLog = ""
      
      if (day[0] != date.getFullYear()) howLog = String(date.getFullYear()-day[0])+"년 전"
      else if (day[1] != date.getMonth()+1) howLog = String(date.getMonth()-day[1])+"달 전"
      else if (day[2] != date.getDate()) howLog = String(date.getDate()-day[2])+"일 전"
      else if (time[0] != date.getHours()) howLog = String(date.getHours()-time[0])+"시간 전"
      else if (time[1] != date.getMinutes()) howLog = String(date.getMinutes()-time[1])+"분 전"
      

      const min = parseInt(game.matches.gameDuration/60000)
      const sec = parseInt((game.matches.gameDuration/60000 - parseInt(game.matches.gameDuration/60000))*60)


      list.push(
        <div key={game.matches.matchId}>
          <div className="play-table" style={game.win ? {backgroundColor: "#7AB3F1"} : {backgroundColor: "#F9816A"}}>
            <div className="play-table-item">
              <div>솔랭</div>
              <div>{howLog}</div>
              { game.win ? <div>패배</div> : <div>승리</div>}
              <div>{min}분 {sec}초</div>
            </div>
            <div className="play-table-item">
              <img className="champion-icon" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${game.championName}.png`} alt="shampion"/>
            </div>
            <div className="play-table-item">
              <div className="rune-spell">
                {spell[game.summoner1Id] !== undefined ? <img className="rs-item" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/${spell[game.summoner1Id]}.png`} alt="spell"/> : <div className="rs-item"/>}
                {spell[game.summoner1Id] !== undefined ? <img className="rs-item" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/${spell[game.summoner2Id]}.png`} alt="spell"/> : <div className="rs-item"/>}
                <img className="rs-item" src="img/rune1.png" alt="rune"/>
                <img className="rs-item" src="img/rune2.png" alt="rune"/>
              </div>
            </div>
            
            <div className="play-table-item">
              <div>{game.kills} / {game.deaths} / {game.assists}</div>
              { game.deaths > 0 ? <div>{Math.ceil((game.kills+game.assists)/game.deaths*100)/100}:1 평점</div> : <div> perfect </div>}
            </div>
            
            <div className="play-table-item">
              <div>레벨{game.championLevel}</div>
              <div>{game.totalMinionsKilled}({Math.ceil(game.totalMinionsKilled/min*10)/10})CS</div>
              <div>와드 {game.visionWardsBoughtInGames}개</div>
            </div>
            
            <div className="play-table-item">
              <div className="item-list">
                {game.item0 > 0 ? <img className="item-item" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${game.item0}.png`} alt="item" /> : <div className="item-item"/>}
                {game.item1 > 0 ? <img className="item-item" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${game.item1}.png`} alt="item" /> : <div className="item-item"/>}
                {game.item2 > 0 ? <img className="item-item" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${game.item2}.png`} alt="item" /> : <div className="item-item"/>}
                {game.item6 > 0 ? <img className="item-item" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${game.item6}.png`} alt="item" /> : <div className="item-item"/>}
                {game.item3 > 0 ? <img className="item-item" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${game.item3}.png`} alt="item" /> : <div className="item-item"/>}
                {game.item4 > 0 ? <img className="item-item" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${game.item4}.png`} alt="item" /> : <div className="item-item"/>}
                {game.item5 > 0 ? <img className="item-item" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${game.item5}.png`} alt="item" /> : <div className="item-item"/>}
                <div className="item-item"/>
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