# Deploying to Vercel

This guide will help you deploy your DSA Learning Assistant to Vercel.

## 🚀 Quick Deploy

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account

2. **Import Your Repository:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose `dsa-learning-assistant-` from your repositories
   - Click "Import"

3. **Configure Environment Variables:**
   - In the "Environment Variables" section, add:
     - **Name:** `ANTHROPIC_API_KEY`
     - **Value:** Your Claude API key (starts with `sk-ant-api03-...`)
   - Click "Add"

4. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes for deployment to complete
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   cd /Users/abhinavkumar/Eng202
   vercel
   ```

4. **Follow prompts:**
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: (press enter to use default)
   - Directory: `./` (press enter)

5. **Add environment variable:**
   ```bash
   vercel env add ANTHROPIC_API_KEY
   ```
   - Select "Production"
   - Paste your Claude API key
   - Press enter

6. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## 🔑 Environment Variables

You need to set one environment variable in Vercel:

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `ANTHROPIC_API_KEY` | Your Claude API key | [console.anthropic.com](https://console.anthropic.com) |

## 📁 Project Structure for Vercel

```
Eng202/
├── api/
│   └── claude-chat.js      # Serverless function for Claude API
├── public/
│   ├── index.html           # Frontend
│   ├── styles.css           # Styles
│   └── script.js            # Frontend logic
├── vercel.json              # Vercel configuration
├── package.json             # Dependencies
└── .env                     # Local env vars (not deployed)
```

## ✅ What Changed for Vercel

1. **Created `api/claude-chat.js`** - Serverless function instead of Express server
2. **Added `vercel.json`** - Configuration for routing and builds
3. **Kept `public/` folder** - Static files served automatically
4. **CORS enabled** - API function includes CORS headers

## 🔧 Testing Locally with Vercel

To test the Vercel setup locally:

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally
vercel dev
```

This starts a local server that mimics Vercel's production environment.

## 📝 Post-Deployment

After deploying:

1. **Test your deployment:**
   - Visit your Vercel URL
   - Try asking a DSA question
   - Verify the bot responds correctly

2. **Custom Domain (Optional):**
   - Go to your project in Vercel dashboard
   - Click "Settings" → "Domains"
   - Add your custom domain

3. **Monitor Usage:**
   - Check Vercel dashboard for function invocations
   - Monitor Claude API usage at console.anthropic.com

## 🐛 Troubleshooting

**Issue: "API key not configured"**
- Solution: Make sure you added `ANTHROPIC_API_KEY` in Vercel dashboard → Settings → Environment Variables → Redeploy

**Issue: "CORS error"**
- Solution: Already handled in `api/claude-chat.js` with proper CORS headers

**Issue: "Function timeout"**
- Solution: Vercel free tier has 10s timeout. Claude usually responds in 2-3s. If issues persist, upgrade plan.

**Issue: Static files not loading**
- Solution: Check `vercel.json` routes are correct and rebuild

## 🎉 Your App is Live!

Once deployed, share your app:
- **Live URL:** `https://your-project.vercel.app`
- **Custom domain:** Set up in Vercel dashboard

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Claude API Documentation](https://docs.anthropic.com)

