import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// Add a route handler for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Chat Application API');
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});