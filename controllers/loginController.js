import mongoose from 'mongoose'
import {adminSchema} from '../Schemas/adminSchema.js' 
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const data = mongoose.model('admin_db',adminSchema)

export const postAdmin=(req,res)=>{
console.log('req.body',req.body);
	req.body.password=bcrypt.hashSync(req.body.password,10);
	let newData = new data(req.body);
	newData.save((err,suc)=>{
		if(err)
			console.log(err);
		else{
			console.log('Success');
			res.send('Success in register');
		}
	})
}
export const getAdmin=(req,res)=>{
	data.find({email:req.body.email},(err,dataFound)=>{
		if(err)
		{	console.log('error in fetching data',err)
		res.json({message:"Error in Fetching"})
		}
		else
			{	console.log('body',req.body)
				dataFound= dataFound[0]
				if(dataFound === undefined){
					res.json({message:"User not found"})
				}else{
					if(!bcrypt.compareSync(req.body.password,dataFound.password))
				 	res.json({message:"Authentication failed wrong password"});
				else{
					res.json({message:"Success", token:jwt.sign({email:dataFound.email},'RESTFULAPIs')})
				}	
				}			
				
			}
	})
}
export const verify = (req,res,next)=>{
	console.log('req.headers',req.headers.authorization)
	if(req.headers.authorization){
		jwt.verify(req.headers.authorization,'RESTFULAPIs',(err,decode)=>{
			if(err)console.log(err)
			else
			{console.log('decode',decode)
				console.log('called next')
				next();
			}
		})
	}
	else{
		res.send('UnAuthorized Admin')
	}
}
export const autoLogin = (req,res)=>{
	console.log('req.headers',req.headers.authorization)
	if(req.headers.authorization){
		jwt.verify(req.headers.authorization,'RESTFULAPIs',(err,decode)=>{
			if(err)console.log(err)
			else
			{ 
				res.send('Verified')
			}
		})
	}
	else{
		res.send('UnAuthorized')
	}
}