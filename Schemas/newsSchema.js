var mongoose = require('mongoose');

const Schema = mongoose.Schema

export const newsSchema=mongoose.Schema({
	title:String,
	subTitle:String,
	content:String,
	lang:String,
	author:String,
	metaTag:String,
	tag:String,
	category:String,
	section:String,
	photo:{ data: Buffer, contentType: String },
	createdAt: {type: Date, default: Date.now}
})