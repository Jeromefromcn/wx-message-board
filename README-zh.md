# wx-message-board（微信留言板）

一個使用微信雲開發（Cloud Development）構建的微信小程序留言板。使用者可以瀏覽他人留言，也可以發佈自己的留言，無需傳統後端伺服器。

---

## 功能特色

- 以捲動清單呈現所有留言，最新留言優先顯示
- 輸入姓名與內容即可發佈留言
- 姓名會記錄在本機，下次發佈時自動填入
- 完全基於微信雲開發，無需外部伺服器
- 使用微信原生元件，介面簡潔、適配行動裝置

---

## 技術架構

| 層次 | 技術 |
|---|---|
| 前端 | 微信小程序（WXML / WXSS / JS） |
| 後端 | 微信雲函數（Node.js） |
| 資料庫 | 微信雲資料庫（NoSQL） |
| 執行環境 | wx-server-sdk ~2.6.3 |

---

## 前置需求

在執行或部署本專案之前，您需要：

1. **微信開發者帳號** — 於 [mp.weixin.qq.com](https://mp.weixin.qq.com) 註冊
2. 小程序 **AppID** — 在開發者後台「開發 > 開發設置」中取得
3. 安裝 **微信開發者工具** — 下載頁面：[developers.weixin.qq.com/miniprogram/dev/devtools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
4. 在微信開發者工具中建立**雲開發環境**（首次開啟雲開發專案時會自動引導建立）

---

## 安裝與部署步驟

### 1. 取得專案程式碼

```bash
git clone https://github.com/Jeromefromcn/wx-message-board.git
cd wx-message-board
```

### 2. 填入 AppID

開啟 `project.config.json`，將 `YOUR_APPID_HERE` 替換為您的 AppID：

```json
{
  "appid": "wx1234567890abcdef",
  ...
}
```

### 3. 填入雲開發環境 ID

開啟 `app.js`，將 `YOUR_ENV_ID_HERE` 替換為您的雲開發環境 ID：

```js
wx.cloud.init({
  env: 'your-env-id-abc123',
  traceUser: true,
});
```

環境 ID 可在微信開發者工具的「雲開發 > 設置」中查看。

### 4. 在微信開發者工具中開啟專案

1. 開啟微信開發者工具
2. 點擊「+」匯入專案
3. 選擇專案目錄
4. 輸入 AppID
5. 確認已啟用「雲開發」

### 5. 建立雲資料庫集合

在微信開發者工具中開啟**雲開發控制台**：

1. 進入**資料庫**頁面
2. 點擊「+」新增集合
3. 集合名稱填入：`messages`（名稱須完全一致）
4. 設定權限：**所有人可讀，僅創建者可寫**（可依需求調整）

### 6. 部署雲函數

在開發者工具中，對以下兩個雲函數資料夾各別按右鍵，選擇**「上傳並部署：雲端安裝依賴」**：

- `cloudfunctions/getMessages/`
- `cloudfunctions/addMessage/`

### 7. 預覽與測試

點擊開發者工具的「預覽」按鈕產生二維碼，使用微信掃描後即可在手機上測試；也可使用內建模擬器進行調試。

---

## 專案結構

```
wx-message-board/
├── app.js                          # 應用入口，初始化雲開發
├── app.json                        # 全域頁面路由與視窗設定
├── app.wxss                        # 全域樣式
├── project.config.json             # 微信開發者工具專案設定
├── sitemap.json                    # 搜尋索引規則
├── assets/                         # 靜態資源（圖示、圖片）
├── pages/
│   ├── index/                      # 留言列表頁
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── post/                       # 發佈留言頁
│       ├── post.js
│       ├── post.json
│       ├── post.wxml
│       └── post.wxss
├── cloudfunctions/
│   ├── getMessages/                # 取得最新 20 則留言
│   │   ├── index.js
│   │   └── package.json
│   └── addMessage/                 # 新增一則留言
│       ├── index.js
│       └── package.json
└── dev-log/                        # 開發筆記
    └── zh/
```

---

## 設定參數說明

| 檔案 | 參數 | 說明 |
|---|---|---|
| `project.config.json` | `appid` | 您的微信小程序 AppID |
| `app.js` | `wx.cloud.init` 中的 `env` | 您的雲開發環境 ID |

---

## 雲資料庫說明

**集合名稱：** `messages`

**文件欄位：**

| 欄位 | 類型 | 說明 |
|---|---|---|
| `_id` | String | 自動產生的文件 ID |
| `openid` | String | 微信使用者 OpenID（由伺服器端寫入） |
| `nickName` | String | 使用者填寫的顯示名稱 |
| `avatarUrl` | String | 頭像網址（選填） |
| `content` | String | 留言內容（最多 500 字） |
| `createdAt` | ServerDate | 伺服器端時間戳記 |

**建議索引：** 對 `createdAt` 建立降序索引，可在資料量增長後提升查詢效能。

---

## 授權條款

MIT
