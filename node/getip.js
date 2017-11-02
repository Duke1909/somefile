var http=require("http");
var url=require('url');
var querystring=require('querystring');
var fs=require('fs');
var dns=require('dns');
http.createServer((req,res)=>{
	var path=url.parse(req.url).pathname;
	router(req,res,path);
}).listen("3000");
function router(req,res,path){
	switch(path){
	case "/parse":getip(req,res);break;
	default:goindex(req,res);
	}
}
function goindex(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	var page=fs.readFileSync('index.html');
	res.end(page);
}
function getip(req,res){
	var postData=url.parse(req.url).query;
	var domain=querystring.parse(postData).dns;
	var ip=dns.resolve(domain,function(err,a){
		res.end(domain+a);
	});
	

}

