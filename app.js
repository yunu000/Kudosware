const express=require('express');
const ejs = require('ejs');
const fs=require('fs');
const bodyparser=require('body-parser')
const path=require('path')
const pdf=require('pdf-parse')

const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set('view engine','ejs');

const dirPath=path.join(__dirname,'/public/pdfs/Data')

const files= fs.readdirSync(dirPath).map(name=>
{
		return {
			name: path.basename(name,".pdf"),
			url :`/pdfs/Data/${name}`
		};
});

app.get("/",function(req,res)
{
	res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res)
{
	keywords=req.body.searchText;
	res.render("content",{files:files,file:files[0].name});
})

app.get("/:file", (req, res) => {
  const file = files.find(f => f.name === req.params.file);
  res.render("content", { files:files, file :req.params.file});
});

app.listen(process.env.PORT || 5500,()=>
{

})
