import express  from 'express'
import cors from 'cors'
import mongoose  from 'mongoose'
import bodyParser  from 'body-parser'
import {routes} from './routes/appRoutes.js'
import verify from './controllers/loginController.js'
import multer from 'multer'
import {newsSchema} from './Schemas/newsSchema.js'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'


const app = express()

var upload = multer({ dest: 'uploads/' })
app.use(express.static(path.join(__dirname,'/build')))
app.use(cors()) 
mongoose.Promise= global.Promise;
mongoose.connect("mongodb://admin:6hX42t0k1SczxhMz@SG-news-29523.servers.mongodirector.com:27017/admin");
app.use(bodyParser.json())

routes(app)

app.post('/api/content', upload.single('photo'),function (req, res, next) {
if(req.headers.authorization){
		jwt.verify(req.headers.authorization,'RESTFULAPIs',(err,decode)=>{
			if(err)console.log(err)
			else
			{
			const data = mongoose.model('news_db',newsSchema)
				let newData = new data(req.body);
				newData.photo.data = fs.readFileSync(req.file.path)
				newData.photo.type= req.file.mimetype
					
					newData.save((err,suc)=>{
						if(err)
							console.log(err);
						else{
							res.send('Success');
						}
				})
			}
		})
	}
	else{
		res.send('UnAuthorized Admin')
	}
})

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname+'/build/index.html'))
})


app.listen(8080,()=>{
	console.log('started at 8080')
})