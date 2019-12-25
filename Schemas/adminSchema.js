var mongoose = require('mongoose');

const Schema = mongoose.Schema

export const adminSchema=mongoose.Schema({
	email:String,
	password:String
})