// alert(111);
(function(){
	var myFir = function(){
		var firIm = (function(){ //目的：形成块级作用域，避免外界修改
			var arr = ['welcome','{','　　return "hello world"','}'];
			var betaAppHost = $("#betaAppHost").get(0);
			var firShow = $("#firShow").get(0);
			var jsons = {
				init : function(){ //初始化
					setTimeout(function(){
						$("#loadingCover").find("img").hide();//图片隐藏
						jsons.loading();
						jsons.creattext(betaAppHost,arr);	//添加文字动画
					},800);
					setInterval(function(){
						$("#logo").fadeToggle(3000);
					},3000);
				},
				loading : function(){ // 开场动画
					var winw = $(window).width() + 200;
					var winh = $(window).height() + 200;
					var loading = $("#loadingCover").find(".circle");
					var w = loading.width();
					var h = loading.height();
					var timer = null;
					clearInterval(timer);
					timer = setInterval(function(){
						loading.css({
							"width" : w += 20,
							"height" : h += 20,
							marginTop : -(w/2),
							marginLeft : -(h/2)
						})
						if(w > winw && h >= winh){
							clearInterval(timer);
							//首页 动画完成，淡出loadingCover
							$("#loadingCover").fadeOut();

						}
					},16);
				},
				creattext : function(id,arr){ //创建动态文字
					var speed = 100;
					var c = "",index = 0,pos = 0;
					var strLen = arr[0].length;
					var tlen = arr.length; 
					var row = 0;
					appendWord();
					function appendWord(){
						c='';
						row = Math.max(0,index-tlen);
						while(row < index){
							c += arr[row++] + '\r\n';
						}
						id.innerText = c+arr[index].slice(0,pos)+"|"; 
						if(pos==strLen){
							pos = 0;
							c = arr[index]+"\r\n";
							index ++;			
							if(index < tlen){
								strLen = arr[index].length;
								setTimeout(appendWord,speed);
							}else{
								id.innerText = id.innerText.replace("|","");
							}
						}else{
							pos++;
							setTimeout(appendWord,speed);
						}	
					}
				}
			};
			return jsons.init();
		})();
		return firIm;
	};
	window.myFirs = myFir ; //返回调用接口
})();