import React from 'react';
import "./SeasonInfo.css"

function SeasonInfo (props) {

    const linesInKorean = {"TOP":"탑","JUNGLE":"정글","MIDDLE":"미드","BOTTOM":"원딜","UTILITY":"서포터",}
    const lineCnt = {"TOP":0,"JUNGLE":0,"MIDDLE":0,"BOTTOM":0,"UTILITY":0,}
    const totalChamps = {}
    console.log(props.rUser);
    for (const game of props.gameData) {
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


    const showSeasonInfo = () => {

      const list = []
      for (let i=0; i<5; i++) {
        list.push(
        <div key={i}>
          {mainChamps.length>i
            ?<div className="champion-table">
              <img className="champion-icon" src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${mainChamps[i]}.png`} alt="champion"/>
              <div className="champion-info1">
                <div className="fw8">{mainChamps[i]}</div>
                <div>CS {parseInt(totalChamps[mainChamps[i]].cs/totalChamps[mainChamps[i]].cnt)}({parseInt(totalChamps[mainChamps[i]].cs/totalChamps[mainChamps[i]].play*10)/10})</div>
              </div>
              <div className="champion-info1">
                <div>{Math.round(totalChamps[mainChamps[i]].kills/totalChamps[mainChamps[i]].cnt)}/{Math.round(totalChamps[mainChamps[i]].deaths/totalChamps[mainChamps[i]].cnt)}/{Math.round(totalChamps[mainChamps[i]].assists/totalChamps[mainChamps[i]].cnt)}</div>
                <div>{Math.round(totalChamps[mainChamps[i]].kills+totalChamps[mainChamps[i]].assists/totalChamps[mainChamps[i]].deaths*100)/100}:1 평점</div>
              </div>
              <div className="champion-info2">
                <div className="fw8">{Math.round(totalChamps[mainChamps[i]].win/totalChamps[mainChamps[i]].cnt*100)}%</div>
                <div >{totalChamps[mainChamps[i]].cnt}게임</div>
              </div>
            </div>
            :<div className="champion-table"/>
          }
        </div>
        )
      }
      return list
    }

    const showProfile = () => {
      if (props.rUser === undefined) return null

      return (
        <div>
          {props.rUser.tier!=="CHALLENGER"&&props.rUser.tier!=="MASTER"
            ?<img src={`img/${(props.rUser.tier).toLowerCase()}_${(props.rUser.rank).toLowerCase()}.png`} alt="tier"  height="150px" width="150px" />
            :<img src={`img/${(props.rUser.tier).toLowerCase()}.png`} alt="tier"  height="150px" width="150px" />}
        </div>
        )
    }

    const showTierRank = () => {
      if (props.rUser === undefined) return null

      return (
        <div>
          <div className="ts-xl8">{props.rUser.tier} {props.rUser.rank}</div>
          <div className="ts-l4">{props.rUser.win}승 {props.rUser.lose}패</div>
          <div className="ts-lr8">승률 {Math.ceil(props.rUser.win/(props.rUser.win+props.rUser.lose)*100)}%</div>
        </div>
        )
    }

    const showTableInfo = () => {
      if (props.rUser === undefined) return null

      return (
        <div>
          <img className="profile-icon" src={`http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/${props.rUser.riotUser.profileIconId}.png`} alt="user icon"/>
          <div className="ts-xxl8">{ props.rUser.riotUser.name }</div>
          <div className="ts-l8">{linesInKorean[mainLines[0]]}({Math.round(lineCnt[mainLines[0]]/props.gameData.length*100)}%)</div>
          {lineCnt[mainLines[1]]>0?<div className="ts-l8">{linesInKorean[mainLines[1]]}({Math.round(lineCnt[mainLines[1]]/props.gameData.length*100)}%)</div>:null}
        </div>
        )
    }

    return (
      <div>
        <div id="season-info">
          <div className="user-table">

            <div className="user-table-info">
              {showProfile()}
              {showTierRank()}
            </div>

            <div className="user-table-info">
              {showTableInfo()}
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