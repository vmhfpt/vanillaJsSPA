const express = require("express");
const path = require("path");

const app = express();

app.use("/frontend", express.static(path.resolve(__dirname, "frontend")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));
