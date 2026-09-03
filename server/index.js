// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const port = 5000;
// const app = express();

// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.post("/", (req, res) => {
//   const { email, password } = req.body;
//   console.log(`Your Email is ${email} and your password is ${password}`);
// });

// app.listen(port, () => {
//   console.log(`server is running on port http://localhost:${port}`);
// });
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Whitelist origins (Localhost + Live Vercel URLs)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL, // e.g. https://front-an-dbackend.vercel.app
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      // Check if the origin matches our allowed list or any vercel.app preview URL
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app");

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", message: "Server is running smoothly!" });
});

// Root POST endpoint
app.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log(`Your Email is ${email} and your password is ${password}`);

  return res.status(200).json({
    success: true,
    message: "Data received successfully",
    user: { email },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
