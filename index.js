import express from 'express'
import bodyParser from 'body-parser'
import { postsContent } from './dataLoader.js'
import { articles } from './articleinfo.js'
import cors from 'cors'

const PORT = process.env.PORT || 6969
const app = express()

//middleware
app.use(bodyParser.json())
app.use(cors())

// routes
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

//listen
app.listen(PORT, () => {
    console.info(`FoxTrot Server listening on ${PORT}`)
})