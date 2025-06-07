const starsContainer = document.getElementById("stars");
const starIcons = document.querySelectorAll(".stars i");
const currentRatingDisplay = document.getElementById("currentRating");

let selectedRating = 0; // ユーザーが確定した評価
let isRated = false; // 評価が確定したかどうか

function highlightStars(rating) {
  starIcons.forEach((star) => {
    const starValue = parseInt(star.dataset.value);
    if (starValue <= rating) {
      star.classList.remove("far"); // 未選択の星
      star.classList.add("fas", "hovered"); // 選択済みの星 (Font Awesome solid icon)
    } else {
      star.classList.remove("fas", "hovered");
      star.classList.add("far"); // 未選択の星
    }
  });
}

// マウスオーバーイベント
starIcons.forEach((star) => {
  star.addEventListener("mouseover", () => {
    if (!isRated) {
      // 評価確定前のみ反応
      const value = parseInt(star.dataset.value);
      highlightStars(value);
    }
  });

  // マウスアウトイベント
  star.addEventListener("mouseout", () => {
    if (!isRated) {
      // 評価確定前のみ反応
      highlightStars(selectedRating); // 確定済みの評価に戻す
    }
  });

  // クリックイベント
  star.addEventListener("click", () => {
    if (!isRated) {
      // 評価確定前のみ反応
      selectedRating = parseInt(star.dataset.value);
      highlightStars(selectedRating); // クリックされた評価で星を更新
      currentRatingDisplay.textContent = selectedRating;

      isRated = true; // 評価を確定
      starsContainer.classList.add("rated"); // 確定後のスタイルを適用
      starIcons.forEach((s) => s.classList.remove("hovered")); // ホバー状態を解除

      alert(`あなたは${selectedRating}つ星を評価しました！`);
      // ここでサーバーに評価を送信するなどの処理を追加できます
    }
  });
});

// 初期表示 (ページロード時)
highlightStars(selectedRating);
