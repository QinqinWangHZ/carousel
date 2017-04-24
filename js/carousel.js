(function(){
	options={
		id:"#container",
		data : [{name:"./image/01.jpg"},{name:"./image/01.jpg"},{name:"./image/01.jpg"},{name:"./image/01.jpg"},{name:"./image/01.jpg"},{name:"./image/01.jpg"}],
		time:1000,
		index:0,
		width:800,
		height:500
	}
	var carousel = {
		init: function(obj) {
			var op=$.extend(this.options,obj);
			this.createDOM(op);
			this.carouselShow(op);
			this.handleEvent(op);
			this.carouselMotion(op);
		},


		/* 
			FunName:handleEvent
			time {Object int}
			Description:时间控制器
		*/
		handleEvent:function(obj){
			// var content=$(obj.cont);
			var unique=$(obj.id);
			var next=unique.find(".content .next");
			var Time = setInterval(function(){
				next.trigger("click");
			 }, obj.time);

			unique.find(".content").mouseover(function(){	
				if(Time){
					clearInterval(Time);
				}
			});

			unique.find(".content").mouseout(function(){
				Time = setInterval(function(){
					next.trigger("click");
			 	},obj.time);
			});	
		 
		},
		/* 
			FunName:carouselShow
			$index {Object Number}
			Description:轮播功能样式
		*/
		carouselShow:function(obj, $index){
			if (!$index) {
				var $index = obj.index;
			}
			var unique=$(obj.id);
			var nav=unique.find(".content i");
			var img=unique.find(".content .div1 div");

			img.hide();
			img.eq($index).show();
	        nav.removeClass("current");
			nav.eq($index).addClass("current");
		},
		/* 
			FunName:carouselMotion
			id {Object String}
			$index{Object Number}
			Description:小圆点控制器、向上按钮控制器、向下按钮控制器
		*/
		carouselMotion: function(obj) {
			var unique=$(obj.id);
			// var content=$(obj.cont);
			var nav=unique.find(".content i");
			var img=unique.find(".content .div1 div");
			var that = this;
			var $index = that.getCurrentIndex(obj);

			nav.on("click",function(){
				var $self = $(this);
				$index = nav.index($self);
				that.carouselShow(obj, $index);
			});

			unique.find(".content .prev").on("click",function(){
				var $index=that.Direction(obj,"prev");
				that.carouselShow(obj, $index);
			});

			unique.find(".content .next").on("click",function(){
				var $index=that.Direction(obj,"next");
				that.carouselShow(obj, $index);
			});
		},
		/* 
			通过判断向上、向下获得当前index
			id {Object Number}
			$index {Object Number}
			img {Object String}
			flag{object String}判断上下元素
		*/
		Direction:function(obj,flg){
			var unique=$(obj.id); //
			var $index = this.getCurrentIndex(obj);
			var img=unique.find(".content .div1 div");
			if (flg=="prev") {
				if ( $index > 0) {
					$index --;
				} else if ($index == 0) {
					$index = img.size() - 1;
				}
			}
			else if(flg=="next"){
				if($index < img.size()-1){
					$index ++;
				}else if($index == img.size()-1){
					$index = 0;
				}	
			}
			return $index;
		},
		/* 
			FunName:Direction
			id {Object Number}
			$index{Object Number}
			Description:获取当前的index
		*/
		getCurrentIndex: function(obj) {
			var unique=$(obj.id);
			var index=unique.find(".content .current").index();
			return index;
		},
		/* 
			FunName:Direction
			obj{object} 
			Description:构建页面
		*/
		createDOM: function(obj){
			var w=obj.width;
			var h=obj.height;
			var unique=$(obj.id);
			var n=obj.data;
			var str_1="<div class='content'></div>"
			var str1="";
			for (var i = 0; i < n.length; i++) {
				str1+="<div><img src='"+n[i].name+"' /></div>"
			}
			var str="<div class='prev'></div>"+"<div class='next'></div>"+"<div class='div1'></div>"+"<div class='div2'></div>";
			var str2="<i class='reck'></i><i class='reck'></i><i class='reck'></i><i class='reck'></i><i class='reck'></i><i class='reck'></i>";
			var str3="<div><img src='./image/prev.png' /></div>";
			var str4="<div><img src='./image/next.png' /></div>";
			unique.html(str_1);
			unique.find(".content").html(str);
			unique.find(".content .div1").html(str1);
			unique.find(".content .div2").html(str2);
			unique.find(".content .prev").html(str3);
			unique.find(".content .next").html(str4);
			if (w.indexOf("px") !=-1 || h.indexOf("px")!=-1) {
				unique.find(".content").css({
				"width": w,
				"height":h
				});
			}
			else{
				unique.find(".content").css({
				"width": w+"px",
				"height":h+"px"
				});
			}
			
			var theWidth=unique.find(".content").width()-80;
			var theHeight=(unique.find(".content").height()-20)/2;
			unique.find(".content .prev").css({
				"top":theHeight+"px"
			});
			unique.find(".content .next").css({
				"top":theHeight+"px",
				"margin-left":theWidth+"px"
			})
		}
	}
	/*
		调用轮播
	*/
	carousel.init({
		id:"#container",
		data : [{
			name:"./image/01.jpg"
		},
		{
			name:"./image/02.jpg"
		},
		{
			name:"./image/03.jpg"
		},
		{
			name:"./image/04.jpg"
		},
		{
			name:"./image/05.jpg"
		},
		{
			name:"./image/06.jpg"
		}],

		time : 1000,
		index : 0,
		width:"800",
		height:"500"
	});	

})();
