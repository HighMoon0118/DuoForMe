import React from "react"
import "./Recommend.css"
function Recommend({recommend}) {
  // 여기에 나중에 추천 소환사 정보
  const SearchChampions = []
  const RecommendChampions = []
  for (let rec of recommend) {
    SearchChampions.push(Object.keys(rec))
    RecommendChampions.push(Object.values(rec))
  }

  const RecommendUserInfo = []
  for (let i = 0; i < 3; i++) {
    let info = {"id": i, "searchCham": SearchChampions[i], "recomCham": RecommendChampions[i] }
    RecommendUserInfo.push(info)
  }
  console.log(RecommendUserInfo[0].recomCham)
  const RecommendUsers = RecommendUserInfo.map((user) =>
    <div className="user-box">
      <div className="user-info">
        <div>{user.searchCham}<div style={{display:"inline", marginLeft:"5px"}}>듀오 챔피언 추천 순위</div></div>
      </div>
      <div key={user.id} className="recommend-info">
        <div className="top-box">
          <img src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${user.searchCham}.png`} className="user-image" alt="소환사 이미지"/>
        </div>
        <div className="bottom-box">
          <div className="champion-box">
            {user.recomCham[0][0][0] === "null" ? <div className="null"></div> : 
              <div className="champion-info">
                <img src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${user.recomCham[0][0][0]}.png`} className="champion-img" alt="챔피언 이미지"/>
                <div className="champion-name">{user.recomCham[0][0][0]}</div>  
                <div className="champion-name">{user.recomCham[0][0][1]}점</div>  
              </div>
            }
          </div>
          <div className="champion-box">
            {user.recomCham[0][1][0] === "null" ? <div className="null"></div> : 
              <div className="champion-info">
                <img src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${user.recomCham[0][1][0]}.png`} className="champion-img" alt="챔피언 이미지"/>
                <div className="champion-name">{user.recomCham[0][1][0]}</div>  
                <div className="champion-name">{user.recomCham[0][1][1]}점</div>  
              </div>
            }
          </div>
          <div className="champion-box">
            {user.recomCham[0][2][0] === "null" ? <div className="null"></div> : 
              <div className="champion-info">
                <img src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${user.recomCham[0][2][0]}.png`} className="champion-img" alt="챔피언 이미지"/>
                <div className="champion-name">{user.recomCham[0][2][0]}</div>  
                <div className="champion-name">{user.recomCham[0][2][1]}점</div>  
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
  return(
    <div id="recommend">
      <div className="recommend-first-box">
        <div className="recommend-users">
          { RecommendUsers }
        </div>
      </div>
    </div>
  )
}
export default Recommend