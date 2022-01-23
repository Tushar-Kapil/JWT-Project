const express = require("express");
const app = express();
const cors = require("cors");

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/auth", require("./routes/jwtauth"));
app.use("/dashboard", require("./routes/dashboard"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
