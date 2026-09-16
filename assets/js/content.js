(() => {
  "use strict";

  const t = (zh, bopomofo) => Object.freeze({ zh, bopomofo });

  window.SISTERS_CONTENT = Object.freeze({
    site: {
      title: t("姊妹益智樂園", "ㄐㄧㄝˇ ㄇㄟˋ ㄧˋ ㄓˋ ㄌㄜˋ ㄩㄢˊ"),
      choosePlayer: t("選擇玩家", "ㄒㄩㄢˇ ㄗㄜˊ ㄨㄢˊ ㄐㄧㄚ"),
      choosePlayerFirst: t("請先選擇玩家", "ㄑㄧㄥˇ ㄒㄧㄢ ㄒㄩㄢˇ ㄗㄜˊ ㄨㄢˊ ㄐㄧㄚ"),
      currentPlayer: t("目前玩家", "ㄇㄨˋ ㄑㄧㄢˊ ㄨㄢˊ ㄐㄧㄚ"),
      today: t("今天想玩什麼？", "ㄐㄧㄣ ㄊㄧㄢ ㄒㄧㄤˇ ㄨㄢˊ ㄕㄣˊ ㄇㄜ˙"),
      chooseGame: t("選一個遊戲", "ㄒㄩㄢˇ ㄧˊ ㄍㄜ˙ ㄧㄡˊ ㄒㄧˋ"),
      games: t("邏輯遊戲", "ㄌㄨㄛˊ ㄐㄧˊ ㄧㄡˊ ㄒㄧˋ"),
      logicGames: t("邏輯遊戲", "ㄌㄨㄛˊ ㄐㄧˊ ㄧㄡˊ ㄒㄧˋ"),
      learningGames: t("學習遊戲", "ㄒㄩㄝˊ ㄒㄧˊ ㄧㄡˊ ㄒㄧˋ"),
      creativeGames: t("創作遊戲", "ㄔㄨㄤˋ ㄗㄨㄛˋ ㄧㄡˊ ㄒㄧˋ"),
      available: t("可以玩", "ㄎㄜˇ ㄧˇ ㄨㄢˊ"),
      developing: t("開發中", "ㄎㄞ ㄈㄚ ㄓㄨㄥ")
    },
    players: Object.freeze({
      sister: { id: "sister", icon: "👧", name: t("姊姊", "ㄐㄧㄝˇ ㄐㄧㄝˇ") },
      youngerSister: { id: "youngerSister", icon: "👶", name: t("妹妹", "ㄇㄟˋ ㄇㄟˋ") },
      guest: { id: "guest", icon: "👤", name: t("訪客", "ㄈㄤˇ ㄎㄜˋ") }
    }),
    categories: Object.freeze([
      {
        id: "logic",
        icon: "🧩",
        name: t("邏輯遊戲", "ㄌㄨㄛˊ ㄐㄧˊ ㄧㄡˊ ㄒㄧˋ"),
        available: true,
        games: Object.freeze([
          { id: "maze", icon: "🐾", name: t("迷宮", "ㄇㄧˊ ㄍㄨㄥ"), href: "games/maze/index.html", available: true },
          { id: "sudoku", icon: "🐟", name: t("兒童數獨", "ㄦˊ ㄊㄨㄥˊ ㄕㄨˋ ㄉㄨˊ"), href: "games/sudoku/index.html", available: true },
          { id: "puzzle", icon: "🧩", name: t("拼圖", "ㄆㄧㄣ ㄊㄨˊ"), href: "games/puzzle/index.html", available: true },
          { id: "sliding", icon: "🚪", name: t("滑塊闖關", "ㄏㄨㄚˊ ㄎㄨㄞˋ ㄔㄨㄤˋ ㄍㄨㄢ"), href: "games/sliding/index.html", available: true },
          { id: "memory", icon: "🚧", name: t("記憶翻牌", "ㄐㄧˋ ㄧˋ ㄈㄢ ㄆㄞˊ"), available: false }
        ])
      },
      { id: "learning", icon: "📚", name: t("學習遊戲", "ㄒㄩㄝˊ ㄒㄧˊ ㄧㄡˊ ㄒㄧˋ"), available: false, games: Object.freeze([]) },
      { id: "creative", icon: "🎨", name: t("創作遊戲", "ㄔㄨㄤˋ ㄗㄨㄛˋ ㄧㄡˊ ㄒㄧˋ"), available: false, games: Object.freeze([]) }
    ]),
    common: {
      home: t("回首頁", "ㄏㄨㄟˊ ㄕㄡˇ ㄧㄝˋ"),
      records: t("遊戲紀錄", "ㄧㄡˊ ㄒㄧˋ ㄐㄧˋ ㄌㄨˋ"),
      back: t("返回", "ㄈㄢˇ ㄏㄨㄟˊ"),
      backToPlayers: t("返回選玩家", "ㄈㄢˇ ㄏㄨㄟˊ ㄒㄩㄢˇ ㄨㄢˊ ㄐㄧㄚ"),
      backToCategories: t("返回遊戲分類", "ㄈㄢˇ ㄏㄨㄟˊ ㄧㄡˊ ㄒㄧˋ ㄈㄣ ㄌㄟˋ"),
      backToGames: t("返回遊戲列表", "ㄈㄢˇ ㄏㄨㄟˊ ㄧㄡˊ ㄒㄧˋ ㄌㄧㄝˋ ㄅㄧㄠˇ"),
      cancel: t("取消", "ㄑㄩˇ ㄒㄧㄠ")
    },
    maze: {
      title: t("貓咪迷宮", "ㄇㄠ ㄇㄧ ㄇㄧˊ ㄍㄨㄥ"),
      chooseDifficulty: t("選擇難度", "ㄒㄩㄢˇ ㄗㄜˊ ㄋㄢˊ ㄉㄨˋ"),
      start: t("開始遊戲", "ㄎㄞ ㄕˇ ㄧㄡˊ ㄒㄧˋ"),
      easy: t("簡單", "ㄐㄧㄢˇ ㄉㄢ"), normal: t("普通", "ㄆㄨˇ ㄊㄨㄥ"), hard: t("困難", "ㄎㄨㄣˋ ㄋㄢˊ"), super: t("超級迷宮", "ㄔㄠ ㄐㄧˊ ㄇㄧˊ ㄍㄨㄥ"),
      easyHint: t("岔路少", "ㄔㄚˋ ㄌㄨˋ ㄕㄠˇ"), normalHint: t("更多岔路", "ㄍㄥˋ ㄉㄨㄛ ㄔㄚˋ ㄌㄨˋ"), hardHint: t("長長假路", "ㄔㄤˊ ㄔㄤˊ ㄐㄧㄚˇ ㄌㄨˋ"), superHint: t("19×19 挑戰", "ㄊㄧㄠˇ ㄓㄢˋ"),
      player: t("玩家", "ㄨㄢˊ ㄐㄧㄚ"), difficulty: t("難度", "ㄋㄢˊ ㄉㄨˋ"),
      hidePath: t("隱藏路徑", "ㄧㄣˇ ㄘㄤˊ ㄌㄨˋ ㄐㄧㄥˋ"), showPath: t("顯示路徑", "ㄒㄧㄢˇ ㄕˋ ㄌㄨˋ ㄐㄧㄥˋ"),
      restart: t("重新開始", "ㄔㄨㄥˊ ㄒㄧㄣ ㄎㄞ ㄕˇ"),
      ready: t("貓咪準備好了", "ㄇㄠ ㄇㄧ ㄓㄨㄣˇ ㄅㄟˋ ㄏㄠˇ ㄌㄜ˙"),
      wallCell: t("牆壁", "ㄑㄧㄤˊ ㄅㄧˋ"), carrotGoal: t("小魚終點", "ㄒㄧㄠˇ ㄩˊ ㄓㄨㄥ ㄉㄧㄢˇ"), rabbitPlayer: t("玩家貓咪", "ㄨㄢˊ ㄐㄧㄚ ㄇㄠ ㄇㄧ"),
      keepGoing: t("繼續找小魚", "ㄐㄧˋ ㄒㄩˋ ㄓㄠˇ ㄒㄧㄠˇ ㄩˊ"),
      wall: t("前面是牆，換個方向", "ㄑㄧㄢˊ ㄇㄧㄢˋ ㄕˋ ㄑㄧㄤˊ，ㄏㄨㄢˋ ㄍㄜ˙ ㄈㄤ ㄒㄧㄤˋ"),
      newMaze: t("新的迷宮，出發", "ㄒㄧㄣ ㄉㄜ˙ ㄇㄧˊ ㄍㄨㄥ，ㄔㄨ ㄈㄚ"),
      restartMessage: t("重新出發", "ㄔㄨㄥˊ ㄒㄧㄣ ㄔㄨ ㄈㄚ"),
      completed: t("完成啦", "ㄨㄢˊ ㄔㄥˊ ㄌㄚ˙"),
      completionTime: t("完成時間", "ㄨㄢˊ ㄔㄥˊ ㄕˊ ㄐㄧㄢ"), totalCompletions: t("累計完成", "ㄌㄟˇ ㄐㄧˋ ㄨㄢˊ ㄔㄥˊ"),
      newBest: t("新的最快紀錄", "ㄒㄧㄣ ㄉㄜ˙ ㄗㄨㄟˋ ㄎㄨㄞˋ ㄐㄧˋ ㄌㄨˋ"),
      playAgain: t("再玩一次", "ㄗㄞˋ ㄨㄢˊ ㄧˊ ㄘˋ"),
      completionCount: t("完成次數", "ㄨㄢˊ ㄔㄥˊ ㄘˋ ㄕㄨˋ"), fastest: t("最快紀錄", "ㄗㄨㄟˋ ㄎㄨㄞˋ ㄐㄧˋ ㄌㄨˋ"),
      times: t("次", "ㄘˋ"),
      noRecord: t("尚無紀錄", "ㄕㄤˋ ㄨˊ ㄐㄧˋ ㄌㄨˋ"), clearAll: t("清除所有紀錄", "ㄑㄧㄥ ㄔㄨˊ ㄙㄨㄛˇ ㄧㄡˇ ㄐㄧˋ ㄌㄨˋ"),
      clearConfirm: t("確定要刪除所有玩家的迷宮紀錄嗎", "ㄑㄩㄝˋ ㄉㄧㄥˋ ㄧㄠˋ ㄕㄢ ㄔㄨˊ ㄙㄨㄛˇ ㄧㄡˇ ㄨㄢˊ ㄐㄧㄚ ㄉㄜ˙ ㄇㄧˊ ㄍㄨㄥ ㄐㄧˋ ㄌㄨˋ ㄇㄚ˙"),
      confirmClear: t("確定清除", "ㄑㄩㄝˋ ㄉㄧㄥˋ ㄑㄧㄥ ㄔㄨˊ"),
      up: t("上", "ㄕㄤˋ"), down: t("下", "ㄒㄧㄚˋ"), left: t("左", "ㄗㄨㄛˇ"), right: t("右", "ㄧㄡˋ")
    }
  });
})();
