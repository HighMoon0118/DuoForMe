import React from "react"
import "./Recommend.css"
function Recommend() {
  // 여기에 나중에 추천 소환사 정보
  const RecommendUserInfo = [{id: 1, nickName: "하나", info: "유저 정보1"}, {id: 2, nickName: "둘", info: "유저 정보2"}, {id: 3, nickName: "셋", info: "유저 정보3"}] 
  const RecommendUsers = RecommendUserInfo.map((user) =>
    <div key={user.id} className="recommend-user-info">
      <p>{user.id}</p>
      <p>{user.nickName}</p>
      <p>{user.info}</p>
    </div>
  )
  return(
    <div className="recommend-first-box">
      <div className="recommend-users">
        {RecommendUsers}
      </div>
    </div>
  )
}
export default Recommend