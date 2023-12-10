import express from 'express'
import bodyParser from 'body-parser'
import { postsContent } from './src/dataLoader.js'
import { articles } from './src/articleinfo.js'
import morgan from 'morgan'
import cors from 'cors'
import { CyanColor, YellowColor, ResetColor, log_info } from './src/log.js'

const PORT = process.env.PORT || 8888
const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())
app.use(morgan(`${CyanColor}[INFO] :date ${ResetColor}${YellowColor}:method${ResetColor} ${CyanColor}:url${ResetColor} :status :res[content-length]bytes in :response-time ms`))

// Routes
app.get('/posts', (req, res) => {
    res.status(200).send({
        posts: articles,
    })
})

app.get('/post/:title', (req, res) => {
    const { title } = req.params
    res.status(200).send({
        postData: postsContent[title]
    })
})

// Listen
app.listen(PORT, () => {
    log_info(`Blog API Server listening on ${PORT}`)
})