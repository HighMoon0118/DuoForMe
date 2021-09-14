import React from "react"
import "./Recommend.css"
import SynergySearch from "./SynergySearch"
function Recommend() {
  // 여기에 나중에 추천 소환사 정보
  const imageUrl = "https://image.fmkorea.com/files/attach/new/20200729/14339012/2828216512/3010684221/3ad25fb851955eef99bc64f10b8c6e36.jpg"
  const RecommendUserInfo = [{id: 1, nickName: "하나", line: "top", rate:"40%", image: imageUrl, champions: [{image: imageUrl, name: "챔피언1"}, {image: imageUrl, name: "챔피언2"}, {image: imageUrl, name: "챔피언3"}]}, 
                            {id: 2, nickName: "둘", line: "middle", rate:"10%", image: imageUrl, champions: [{image: imageUrl, name: "챔피언4"}, {image: imageUrl, name: "챔피언5"}, {image: imageUrl, name: "챔피언6"}]}, 
                            {id: 3, nickName: "셋", line: "bottom", rate:"20%", image: imageUrl, champions: [{image: imageUrl, name: "챔피언7"}, {image: imageUrl, name: "챔피언8"}, {image: imageUrl, name: "챔피언9"}]}] 
  const RecommendUsers = RecommendUserInfo.map((user) =>
    <div key={user.id} className="recommend-info">
      <img src={user.image} className="user-image" alt="소환사 이미지"/>
      <div className="user-info">
        <p>{user.nickName}</p>
        <p>{user.line}</p>
        <p>{user.rate}</p>
      </div>
      <div>
        {user.champions.map((champion) =>
          <div className="champion-info">
            <img src={champion.image} className="champion-img" alt="챔피언 이미지"/>
            <span>{champion.name}</span>  
          </div>
        )}
      </div>
    </div>
  )
  return(
    <div className="recommend-first-box">
      <div className="recommend-users">
        { RecommendUsers }
      </div>
      <SynergySearch />
    </div>
  )
}
export default Recommend