# Monthly Broker Comparisons (Internal Dashboard)

A private dashboard to monitor and compare Swiss real estate broker activity (rent/sale/total listings) updated from Google Sheets. This version is accessible to authorized users only.

## 🔐 Access Control
This app is login-protected and available only to authorized team members. Unauthorized access is not permitted.

## ✨ Features
- Broker ranking by listing volume (rent/sale/total)
- Categorization by agency type: "proptech" vs "traditional"
- Updated regularly via Google Sheets + n8n
- JSON-based API powering the frontend

## 🛡️ Legal & Privacy
- No personal data is collected or stored
- Data is sourced manually and may not reflect real-time broker stats
- Use of this dashboard is internal; do not distribute content externally

## 📦 Tech Stack
- Next.js + App Router
- Tailwind CSS
- Google Sheets + n8n (OAuth2-secured backend)

## 🚀 Deployment

### Environment Variables
Create a `.env.local` file with the following variables:

```env
AUTH_USERNAME=your_username
AUTH_PASSWORD=your_password
N8N_BROKER_DATA_URL=https://your-n8n-instance.com/webhook/broker-data
N8N_API_TOKEN=your_n8n_api_token
NODE_ENV=production
```

### Deploy to Vercel
1. Push this repository to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Local Development
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
