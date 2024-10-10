import express from "express";
import cors from "cors";
import axios from "axios";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// Serve static files from the React frontend app
// Change this line to use the 'public' directory where we'll copy the frontend build
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const response = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": process.env.CHATENGINE_PRIVATE_KEY } }
    );
    return res.send(response.data);
  } catch (e) {
    return res.status(404).json(e.response.data);
  }
});

// Anything that doesn't match the above, send back the index.html file
// Update this line to use the 'public' directory
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});