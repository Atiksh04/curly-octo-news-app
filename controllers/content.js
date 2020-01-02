import mongoose from 'mongoose'
import {newsSchema} from '../Schemas/newsSchema.js' 
import fs from 'fs'
const data = mongoose.model('news_db',newsSchema)

export const postContent=(req,res)=>{
console.log('req.body',req.body);
let newData = new data(req.body);

	newData.save((err,suc)=>{
		if(err)
			console.log(err);
		else{
			console.log('suc',suc)
			console.log('Success');
			res.send('Success');
		}
	})
}
export const getContent=(req,res)=>{
	data.find({},(err,data)=>{
		if(err)
			{console.log(err)
			res.send('error in fetching data')
			}
		else{
			res.json({'text':data,'file':data.articleImg})}
	})
}
export const deleteContent = (req,res)=>{
	data.findByIdAndDelete(req.body.id,(err,data)=>{
		if(err)res.send('Error')
		else
			res.send('deleted')
		
	})
}