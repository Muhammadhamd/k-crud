import express from "express"
import path from  "path"
import postrouter from "./router/post.mjs"
const __dirname = path.resolve()
const app = express()


app.use(express.json())

app.use(postrouter)
app.use(express.static(__dirname))

const PORT = process.env.PORT || 3000


app.listen(PORT , (
    console.log(PORT)
)
    
)