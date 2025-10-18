import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = "QW8QmWIFY4QWNJOMMrJyfqHRDTuE3wC9";

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.get("/api/rates", async (req, res) => {
  const url = "https://api.apilayer.com/fixer/latest";
  const headers = { apikey: API_KEY };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    
    if (!data.rates) {
      throw new Error("No Data Rates");
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fail Get" });
  }
});


//React
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
