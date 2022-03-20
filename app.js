const express = require('express');

const multer = require('multer');

const path = require('path')

const app = express();

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 2000

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })

var multipleUploads = upload.fields([{name:'avatar',maxCount:1} ,{name:'gallery',maxCount:8}])

app.get('/', (req, res) => {
    res.render('index')

})

app.post('/uploadfile', multipleUploads, (req, res) => {
    if (req.files){
        console.log("files uploaded");
        console.log(req.files)
    }
})

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})