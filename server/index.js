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

// Whitelist local frontend and live Vercel frontend
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL, // Your production Vercel URL from .env or Render dashboard
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman or mobile tools) or matched origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Health-check route (useful for Render deployment verification)
app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "healthy", message: "Server is running smoothly!" });
});

// Your updated POST route with a proper response
app.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log(`Your Email is ${email} and your password is ${password}`);

  // Always send a response back to the client
  return res.status(200).json({
    success: true,
    message: "Data received successfully",
    user: { email },
  });
});

// Read the port dynamically from Render's environment, fallback to 5000 locally
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
