import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import * as admin from "firebase-admin";
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// Initialize Firebase Admin
admin.initializeApp();
const db = getFirestore();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/apply", async (req, res) => {
    try {
      const { jobId, applicantName, applicantEmail, applicantPhone, coverLetter, portfolioLink } = req.body;
      
      const appData = {
        jobId, applicantName, applicantEmail, applicantPhone, coverLetter, portfolioLink,
        timestamp: FieldValue.serverTimestamp()
      };

      // 1. Add to Firestore
      await db.collection('applications').add(appData);

      // 2. Add to Google Sheets
      const doc = new GoogleSpreadsheet('1af_uesBtZw_9xmaVidnqH2tKQdvniETqAVxDAoMyJSU', 
        new JWT({
          email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        })
      );
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      await sheet.addRow({
        'Job ID': jobId,
        'Name': applicantName,
        'Email': applicantEmail,
        'Phone': applicantPhone,
        'Cover Letter': coverLetter,
        'Portfolio': portfolioLink,
        'Timestamp': new Date().toISOString()
      });
      
      res.json({ status: "ok" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to submit" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
