// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];
http.createServer(function(req,res){
	var objUrl = url.parse(req.url,true);
	var pathname = objUrl.pathname;
	//get 请求
	if(pathname == '/'){
		fs.readFile('./index.html',function(err,data){
			if(err){
				throw err;
			}
			var str = data.toString();
			var str2 = '';
			comments.forEach(function(item){
				str2 += '<li>'+item+'</li>';
			});
			str = str.replace('<%comments%>',str2);
			res.end(str);
		});
	}else if(pathname == '/add'){
		//post 请求
		var str = '';
		req.on('data',function(chunk){
			str += chunk;
		});
		req.on('end',function(){
			comments.push(str);
			res.end(JSON.stringify(comments));
		});
	}else{
		var file = './'+pathname;
		var extname = path.extname(file);
		fs.readFile(file,function(err,data){
			if(err){
				res.end('404');
			}
			getMime(extname,function(mime){
				res.writeHead(200,{"Content-Type":mime});
				res.end(data);
			});
		});
	}
}).listen(8080,'