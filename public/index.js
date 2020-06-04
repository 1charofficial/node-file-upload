const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');


const app = express();

//enable files to upload
app.use(fileUpload({
    creatParentPath: true

}))

app.use(express.static(path.join(__dirname, 'public')))
//add other middleware

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}))

app.set('view engine', '.hbs' );



//start app

//const port = process.env.PORT || 3000; --> and add port and ${port} where '3000' should be.

app.listen(3000, () => 
console.log(`we are here live and direct from port 3000`));


//creat first route to let users upload profile pics

app.post('/upload-avatar', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'

            });
        }else {
            //use the name of the input field (i.e. 'avatar) to retrieve the upload
            let avatar = req.files.avatar;

            //use mv() method to place the file in the upload file
            avatar.mv('./uploads' + avatar.name);

            //send response

            res.send({
                status: true,
                message: 'File has been uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }

            });
        }
    }catch (err) {
        res.status(500).send(err);
    }
});



app.get('/', async (req, res) => {
    res.render('upload-avatar')
})


//start app

//const port = process.env.PORT || 3000; --> and add port and ${port} where '3000' should be.

app.listen(3000, () => 
console.log(`we are here live and direct from port 3000`));


app.get('/', async (req, res) => {
    res.render('index')
})

app.post('/upload', async (req, res) => {
    let file = req.files.foo;
    res.render('upload', {file});
    
})