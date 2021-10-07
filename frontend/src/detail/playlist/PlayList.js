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
      const uDate = new Date(game.matches.gameCreation)
      let howLog = ""
      
      if (uDate.getFullYear()+1 < date.getFullYear()) howLog = String(date.getFullYear()-uDate.getFullYear())+"년 전"
      if (uDate.getFullYear()+1 == date.getFullYear()) howLog = String(12+date.getMonth()-uDate.getMonth())+"달 전"
      else if (uDate.getMonth()+1 < date.getMonth()) howLog = String(date.getMonth()-uDate.getMonth())+"달 전"
      else if (uDate.getMonth()+1 == date.getMonth()) howLog = String(30+date.getDate()-uDate.getDate())+"일 전"
      else if (uDate.getDate()+1 < date.getDate()) howLog = String(date.getDate()-uDate.getDate())+"일 전"
      else if (uDate.getDate()+1 == date.getDate()) howLog = String(24+date.getHours()-uDate.getHours())+"시간 전"
      else if (uDate.getHours()+1 < date.getHours()) howLog = String(date.getHours()-uDate.getHours())+"시간 전"
      else if (uDate.getHours()+1 == date.getHours()) howLog = String(60+date.getMinutes()-uDate.getMinutes())+"분 전"
      else if (uDate.getMinutes()+1 < date.getMinutes()) howLog = String(date.getMinutes()-uDate.getMinutes())+"분 전"
      else if (uDate.getMinutes()+1 == date.getMinutes()) howLog = String(60+date.getSeconds()-uDate.getSeconds())+"초 전"
      

      const min = parseInt(game.matches.gameDuration/60000)
      const sec = parseInt((game.matches.gameDuration/60000 - parseInt(game.matches.gameDuration/60000))*60)


      list.push(
        <div key={game.matches.matchId}>
          <div className="play-table" style={game.win ? {backgroundColor: "#7AB3F1"} : {backgroundColor: "#F9816A"}}>
            <div className="play-header">
              <div>솔랭</div>
              <div>{howLog}</div>
              { game.win ? <div>승리</div> : <div>패배</div>}
              <div>{min}분 {sec}초</div>
            </div>
            <div className="play-champ">
              <img className="champion-icon" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${game.championName}.png`} alt="shampion"/>
            </div>
            <div className="play-spell">
              <div className="rune-spell">
                {spell[game.summoner1Id] !== undefined ? <img className="rs-item" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/${spell[game.summoner1Id]}.png`} alt="spell"/> : <div className="rs-item"/>}
                {spell[game.summoner1Id] !== undefined ? <img className="rs-item" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/${spell[game.summoner2Id]}.png`} alt="spell"/> : <div className="rs-item"/>}
              </div>
            </div>
            
            <div className="play-kda">
              <div>{game.kills} / {game.deaths} / {game.assists}</div>
              { game.deaths > 0 ? <div className="bolder">{Math.ceil((game.kills+game.assists)/game.deaths*100)/100}:1 평점</div> : <div className="bolder"> perfect </div>}
            </div>
            
            <div className="play-info">
              <div>레벨 {game.champLevel}</div>
              <div>{game.totalMinionsKilled}({Math.ceil(game.totalMinionsKilled/min*10)/10})CS</div>
              <div>와드 {game.visionWardsBoughtInGames}개</div>
            </div>
            
            <div className="play-items">
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