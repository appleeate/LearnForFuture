import { HTTP } from "../utils/http.js";
export class LikeModel extends HTTP {
  like(behavior, artID, category) {
    this.request({
      url: behavior === "like" ? "like" : "like/cancel",
      method: "POST",
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  getClassicLikeStatus(artID, category, sClassback) {
    this.request({
      url: `classic/${category}/${artID}/favor`,
      success: sClassback
    })

  }
}