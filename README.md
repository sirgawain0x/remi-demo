# Remi Demo

AI-Powered Property Management Assistant

## Setup Instructions

This project provides two secure approaches for handling your Gemini API key:

### Option 1: Server-based Approach (Recommended)

This approach uses a Node.js server to securely serve your API key.

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create a `.env` file:**

   ```bash
   cp env.example .env
   ```

   Then edit `.env` and add your actual Gemini API key:

   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Start the server:**

   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Option 2: Config File Approach

This approach uses a separate config file for the API key.

1. **Edit the config file:**
   Open `config.js` and replace `your_gemini_api_key_here` with your actual Gemini API key.

2. **Open the HTML file:**
   Open `remi-demo-config.html` in your browser.

## Deployment

### Deploy to Render

1. **Push your code to GitHub**

2. **Connect to Render:**

   - Go to [render.com](https://render.com)
   - Create a new Web Service
   - Connect your GitHub repository

3. **Configure the service:**

   - **Name:** `remi-demo`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Add Environment Variables:**

   - Go to Environment tab
   - Add `GEMINI_API_KEY` with your actual API key
   - Add `NODE_ENV` with value `production`

5. **Deploy:**
   - Click "Create Web Service"
   - Render will automatically deploy your app

### Deploy to Vercel

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel
   ```

3. **Add Environment Variables:**

   - Go to your Vercel dashboard
   - Navigate to your project
   - Go to Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your actual API key

4. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Environment Variables

For deployment, you'll need to set these environment variables:

- `GEMINI_API_KEY` - Your Google Gemini API key
- `NODE_ENV` - Set to `production` (optional)
- `PORT` - Automatically set by deployment platforms

## Security Notes

- **Never commit API keys to version control**
- The `.gitignore` file is configured to exclude sensitive files
- The server approach is more secure as it keeps the API key on the server side
- The config file approach is simpler but exposes the API key in the browser
- Environment variables are the most secure way to handle API keys in production

## Features

- Generate professional maintenance request emails
- AI-powered content generation using Google's Gemini API
- Responsive design with modern UI
- Copy-to-clipboard functionality

## API Key Setup

To get a Gemini API key:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to your configuration

## Files

- `remi-demo.html` - Original file (updated for server approach)
- `remi-demo-config.html` - Alternative version using config file
- `server.js` - Node.js server for secure API key handling
- `config.js` - Configuration file for API key (Option 2)
- `package.json` - Node.js dependencies
- `.gitignore` - Git ignore rules for sensitive files
- `vercel.json` - Vercel deployment configuration
- `render.yaml` - Render deployment configuration
- `Procfile` - Heroku deployment configuration
