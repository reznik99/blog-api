import { readdir, readFile } from 'fs'

const postsContent = new Map()

// Read all articles into map on startup
readFiles('articles/', (filename, content) => {
    filename = filename.split('.md')[0]
    postsContent[filename] = content
}, errHandler)

function readFiles(dirname, onFileContent, onError) {
    readdir(dirname, (err, filenames) => {
        if (err) {
            onError(err)
            return
        }
        filenames.forEach(filename => {
            readFile(dirname + filename, 'utf-8', (err, content) => {
                if (err) {
                    onError(err)
                    return
                }
                onFileContent(filename, content)
            })
        })
    })
}

function errHandler(err) {
    console.error(err)
}

export {
    postsContent
}