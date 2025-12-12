# 📚 DSA Learning Assistant

A beautiful chat assistant powered by Google Gemini AI to help students master Data Structures and Algorithms. Built by Abhinav.

![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- 🤖 **AI-Powered Chat**: Uses Google Gemini to answer DSA questions
- 🎨 **Modern UI**: Dark theme with gradient accents and smooth animations
- 📱 **Mobile-Friendly**: Fully responsive design that works on all devices
- 💬 **Floating Widget**: Unobtrusive circular button that expands into a chat popup
- ⚡ **Real-time Responses**: Instant AI-generated answers with "Thinking..." indicator
- 🔒 **Secure**: API keys stored safely in environment variables

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- A Google Gemini API key (get one at [aistudio.google.com](https://aistudio.google.com/apikey))

### Installation

1. **Clone or download this repository**

```bash
cd Eng202
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure your API key**

Create a `.env` file in the root directory:

```bash
cp env.template .env
```

Then edit `.env` and add your Google Gemini API key:

```
GEMINI_API_KEY=your-actual-key-here
```

4. **Start the server**

```bash
npm start
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. Click the 🤖 mascot button in the bottom-right corner
2. The chat popup will open with a welcome message
3. Type any DSA-related question (e.g., "What is a binary search tree?")
4. Press Enter or click Send
5. Wait for the AI to generate a response
6. Continue the conversation or close the chat

## 📁 Project Structure

```
Eng202/
├── server.js           # Express backend with Gemini API integration
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (create this)
├── .env.example       # Template for environment variables
├── README.md          # This file
└── public/            # Frontend static files
    ├── index.html     # Landing page and chat widget HTML
    ├── styles.css     # Dark theme styling
    └── script.js      # Chat functionality and API calls
```

## 🌐 Deploying to Production

### Deploy on Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variable: `ANTHROPIC_API_KEY`
5. Deploy!

### Deploy on Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add environment variable: `GEMINI_API_KEY`
4. Railway will auto-detect and deploy your Node.js app

## 🛠️ Configuration

### Environment Variables

- `GEMINI_API_KEY` (required): Your Google Gemini API key
- `PORT` (optional): Server port, defaults to 3000

### Customizing the Bot

Edit the `SYSTEM_PROMPT` in `server.js` to change the bot's behavior:

```javascript
const SYSTEM_PROMPT = `You are a friendly and helpful Data Structures and Algorithms (DSA) tutor...`;
```

### Changing the Gemini Model

In `server.js`, modify the model parameter:

```javascript
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash', // Change this
  systemInstruction: SYSTEM_PROMPT
});
```

Available models:
- `gemini-1.5-flash` (recommended, fast and efficient)
- `gemini-1.5-pro` (most capable, slower)
- `gemini-2.0-flash-exp` (experimental, cutting-edge)

## 🎨 UI Customization

All styling is in `public/styles.css`. Key variables to customize:

```css
:root {
    --bg-primary: #0f0f0f;       /* Main background */
    --bg-secondary: #1a1a1a;     /* Chat background */
    --accent: #6366f1;           /* Primary accent color */
    /* ... */
}
```

## 🔒 Security Notes

- ✅ API key is stored server-side in `.env` file
- ✅ Never exposed to frontend JavaScript
- ✅ `.env` is gitignored by default
- ⚠️ Always use HTTPS in production
- ⚠️ Consider rate limiting for production use

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

MIT License - feel free to use this project however you'd like.

## 👨‍💻 Author

Created by **Abhinav** to help students learn Data Structures and Algorithms.

## 🐛 Troubleshooting

**Issue**: "API key not configured" error

**Solution**: Make sure you created a `.env` file with a valid `GEMINI_API_KEY`

---

**Issue**: Port 3000 already in use

**Solution**: Change the port in `.env`: `PORT=3001`

---

**Issue**: Chat not responding

**Solution**: Check your API key validity and network connection

## 📚 Learn More

- [Google Gemini Documentation](https://ai.google.dev/docs)
- [Express.js Guide](https://expressjs.com/)
- [DSA Learning Resources](https://www.geeksforgeeks.org/data-structures/)

---

Happy Learning! 🚀

