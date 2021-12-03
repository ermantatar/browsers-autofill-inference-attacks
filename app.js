// Imports 
const express = require("express")
const https = require('https')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.static(__dirname + '/public'));

app.use('/public/select.txt', (req, res, next) => {
    res.sendFile(__dirname + '/public/select.txt')
})

app.use('/public/dict.json', (req, res, next) => {
    res.sendFile(__dirname + '/public/dict.json')
})

app.use('/public/preview_cc.html', (req, res, next) => {
    res.sendFile(__dirname + '/public/preview_cc.html')
})

app.use('/public/preview_phone.html', (req, res, next) => {
    res.sendFile(__dirname + '/public/preview_phone.html')
})

app.use('/public/multiple_emails.html', (req, res, next) => {
    res.sendFile(__dirname + '/public/multiple_emails.html')
})

app.use('/public/input_phone.txt', (req, res, next) => {
    res.sendFile(__dirname + '/public/input_phone.txt')
})

app.use('/public/dict_phone.json', (req, res, next) => {
    res.sendFile(__dirname + '/public/dict_phone.json')
})

app.use('/public/select_phone.txt', (req, res, next) => {
    res.sendFile(__dirname + '/public/select_phone.txt')
})

app.use('/public/input_cc100k.txt', (req, res, next) => {
    res.sendFile(__dirname + '/public/input_cc100k.txt')
})

app.use('/public/dict_cc.json', (req, res, next) => {
    res.sendFile(__dirname + '/public/dict_cc.json')
})

app.use('/public/select_cc100k.txt.zip', (req, res, next) => {
    res.sendFile(__dirname + '/public/select_cc100k.txt.zip')
})

app.use('/public/select_cc100k.txt', (req, res, next) => {
    res.sendFile(__dirname + '/public/select_cc100k.txt')
})



const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

sslServer.listen(3443, () => console.log('Secure server on port 3443'))













// const port = 3000




// var certOptions = {
//     key: fs.readFileSync(path.resolve('server.key')),
//     cert: fs.readFileSync(path.resolve('server.crt'))
// }
  

// //Static Files
// app.use(express.static('public'))
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))

// app.get('', (req, res) => {
//     res.sendFile(__dirname + 'preview_cc.html')
// })

// // Listen on port 3000
// var server = https.createServer(certOptions, app).listen(3000)
// // app.listen(port, ()=> console.info(`Listening on port ${port}`))