const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const PORT = require("./config.js")
const JWT_SECRET = require("./config.js")

const mainRouter = require("./routes/router.js")

const app = express();

app.use(cors());
app.use(cookieparser());
app.use('/api/v1', mainRouter);

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})

