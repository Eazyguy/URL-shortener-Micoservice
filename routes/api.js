const express = require('express')
const router = express.Router()
const {nanoid} = require('nanoid')
const dns = require('dns')
const url = require('url')

// Initialize model
let Url = require("../models/UrlShortener")

// Your first API endpoint
router.get('/hello',async function(req, res) {
	
	let getUrl =await Url.find({})
	
	console.log(getUrl)
	
  res.json({ greeting: 'hello API' });
});

// @desc Get url from form and generate shorturl

router.post('/shorturl',async(req,res)=>{

let longUrl = req.body.url

let options = {
 family:0
}

let parsedUrl = url.parse(longUrl)

// check if url is valid
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
// Check for host validity
dns.lookup(parsedUrl.hostname,options,async(err,address)=>{

if(isValidUrl(longUrl)&& address){
	
	// if valid generate shortid and url 
	
	let shortUrl = nanoid(7)
	
	const shortUrlAd = "http://localhost:3000/api/shorturl/" + shortUrl
	
	let url =await Url.findOne({longUrl})

	// if url already exist in the data return its short url
	
	if(url){
		res.json({original_url:url.longUrl,short_url:url.urlCode})
	}else{
		
		// Checking for possible collision (optional) but if possible regenerate the id and the short url then save
		
		let shortid = await Url.find({urlCode:shortUrl})
		
		if(shortid){
			shortUrl = nanoid(7)
			const shortUrlAd = "http://localhost:3000/api/shorturl/" + shortUrl
			
			url = new Url({
		urlCode: shortUrl,
		longUrl:longUrl,
		shortUrl: shortUrlAd
	})
	
	url.save()
			
		res.json({original_url:longUrl,short_url:shortUrl})
			
		}else{
   url = new Url({
		urlCode: shortUrl,
		longUrl:longUrl,
		shortUrl: shortUrlAd
	})
	
	url.save()
	
	res.json({original_url:longUrl,short_url:shortUrl})
	
		}
		
	}
	
}else{
	// if url is invalid
	res.json({error:'invalid url'})
}
})

})

// load shorturl 
router.get('/shorturl/:id?',async(req,res)=>{
	let shortid = await Url.findOne({urlCode:req.params.id})
	
	if(shortid){
		res.redirect(shortid.longUrl)
	}else{
		res.status(404).json({error:"url not found"})
	}
})

module.exports = router