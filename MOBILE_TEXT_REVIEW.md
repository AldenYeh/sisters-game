# 手機家長控制文字修正

Owner 在 iPhone Safari 截圖中指出白框按鈕沒有文字。父任務圖片工作者已實看原附件：空白控制項位於「清除此玩家超時」正上方，其他文字正常。依 UI 原始碼，此控制項是 `#parent-duration button[type=submit]`，文字為「授權／續時」。標題仍為「首次設定家長密碼」是第一次設定後進入授權階段的既有行為，並非按鈕內容被清除。

## 根因與修正

[WebKit 官方 iOS 預設樣式](https://raw.githubusercontent.com/WebKit/WebKit/main/Source/WebCore/css/html.css) 對提交按鈕設定白色文字。本網站家長按鈕改為白底，卻沒有明確文字色；預設白字因此仍可保留。此次僅修正共用 `family.css` 的控制項樣式：按鈕明確使用深色文字與 `currentColor` 填色，取消原生按鈕外觀；輸入和選單使用明確的白底深色字，等待／停用按鈕仍可讀。首頁及十二個遊戲頁的 CSS 連結帶版本參數，避免繼續使用舊樣式。

密碼驗證、授權、十分鐘寬限、扣抵、當局保存及跨分頁邏輯沒有變更。沒有讀取真實家長密碼或玩家資料，沒有清除記錄。

## 驗證與限制

測試 `tests/mobile-family-text-browser.cjs` 使用 Chromium 390×844 觸控模式，分別設定 light／dark 系統外觀。低優先權的白字樣式重現 iOS UA 色彩衝突；這是針對原始樣式的可重現測試，不能當成 Safari 或實體 iPhone 執行。相同測試檢查初次長密碼設定、授權／續時、錯誤密碼、取消及停用狀態，並覆蓋十二個遊戲上的共用控制項。

完整結果及虛構資料 UI 截圖在 `outputs/mobile-family-text/`；父任務原附件不在網站或交付截圖中。本雲端 Library helper 回報 `download failed`，沒有產出附件本地檔，也沒有使用替代網址繞過；瀏覽器的正常 WebKit 安裝回報 `403 Domain forbidden`，因此沒有 WebKit／實體裝置驗證宣稱。

實測26項通過：2個舊樣式空白重現及十二個遊戲各2種系統外觀的修正／操作檢查，pageerror為0。另9項家長流程、48個版面組合、3個既有Node基線與14項家長核心檢查通過。Root及art_restore各自實看舊空白與修正後Spot光／暗畫面；art_restore另用兩個獨立測試瀏覽器完成長密碼設定及20分鐘授權，全部通過。100張素材與拼圖拖曳修正保持在工作樹中，此次獨立提交僅含家長樣式及快取連結、針對性測試與本報告。
