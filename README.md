# wx-message-board

A WeChat mini-program message board built with WeChat Cloud Development (云开发). Users can browse messages left by others and post their own messages — no traditional backend server required.

---

## Features

- Browse all messages in a scrollable list, newest first
- Post a message with your name and text content
- Name is remembered locally for subsequent posts
- Powered entirely by WeChat Cloud Development (no external server)
- Clean, mobile-first UI using WeChat's native components

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | WeChat Mini-Program (WXML / WXSS / JS) |
| Backend | WeChat Cloud Functions (Node.js) |
| Database | WeChat Cloud Database (NoSQL) |
| Runtime | wx-server-sdk ~2.6.3 |

---

## Prerequisites

Before you can run or deploy this project you need:

1. A **WeChat developer account** — register at [mp.weixin.qq.com](https://mp.weixin.qq.com)
2. A mini-program **AppID** (found in the developer dashboard under "Development > Development Settings")
3. **WeChat DevTools** installed — download from [developers.weixin.qq.com/miniprogram/dev/devtools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
4. A **Cloud Development environment** created inside WeChat DevTools (first launch of a cloud-enabled project will prompt you)

---

## Setup & Deployment

### 1. Clone the repository

```bash
git clone https://github.com/Jeromefromcn/wx-message-board.git
cd wx-message-board
```

### 2. Set your AppID

Open `project.config.json` and replace `YOUR_APPID_HERE` with your actual AppID:

```json
{
  "appid": "wx1234567890abcdef",
  ...
}
```

### 3. Set your Cloud Environment ID

Open `app.js` and replace `YOUR_ENV_ID_HERE` with your Cloud Development environment ID:

```js
wx.cloud.init({
  env: 'your-env-id-abc123',
  traceUser: true,
});
```

You can find your environment ID in WeChat DevTools under "Cloud Development > Settings".

### 4. Open in WeChat DevTools

1. Open WeChat DevTools
2. Click "+" to import a project
3. Select the project directory
4. Enter your AppID
5. Make sure "Cloud Development" is enabled

### 5. Create the Cloud Database collection

In WeChat DevTools, open the **Cloud Development console**:

1. Go to **Database**
2. Click **"+"** to create a new collection
3. Name it exactly: `messages`
4. Set permissions to: **All users can read, only creator can write** (or adjust as needed)

### 6. Deploy the Cloud Functions

For each cloud function, right-click its folder in DevTools and select **"Upload and deploy: cloud install dependencies"**:

- `cloudfunctions/getMessages/`
- `cloudfunctions/addMessage/`

### 7. Preview and test

Click **"Preview"** in DevTools to generate a QR code and scan it with WeChat on your phone, or use the built-in simulator.

---

## Project Structure

```
wx-message-board/
├── app.js                          # App entry, cloud init
├── app.json                        # Global page routing & window config
├── app.wxss                        # Global styles
├── project.config.json             # WeChat DevTools project config
├── sitemap.json                    # Search indexing rules
├── assets/                         # Static assets (icons, images)
├── pages/
│   ├── index/                      # Message list page
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── post/                       # Write message page
│       ├── post.js
│       ├── post.json
│       ├── post.wxml
│       └── post.wxss
├── cloudfunctions/
│   ├── getMessages/                # Fetch latest 20 messages
│   │   ├── index.js
│   │   └── package.json
│   └── addMessage/                 # Insert a new message
│       ├── index.js
│       └── package.json
└── dev-log/                        # Development notes
    └── zh/
```

---

## Configuration Reference

| File | Key | Description |
|---|---|---|
| `project.config.json` | `appid` | Your WeChat mini-program AppID |
| `app.js` | `env` in `wx.cloud.init` | Your Cloud Development environment ID |

---

## Cloud Database

**Collection name:** `messages`

**Document schema:**

| Field | Type | Description |
|---|---|---|
| `_id` | String | Auto-generated document ID |
| `openid` | String | WeChat user OpenID (set server-side) |
| `nickName` | String | Display name entered by the user |
| `avatarUrl` | String | Avatar URL (optional) |
| `content` | String | Message text (max 500 chars) |
| `createdAt` | ServerDate | Server-side timestamp |

**Recommended index:** `createdAt` descending — improves query performance as the collection grows.

---

## License

MIT
