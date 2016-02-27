$(function(){

	var fileuploadWidth=$('#ui-fileupload').width();
	var fileuploadHeight=$('#ui-fileupload').height();
	$('#ui-fileupload-input').width(fileuploadWidth);
	$('#ui-fileupload-input').height(fileuploadHeight);

	 $("#Content").on("input",function() {
	 	 value=$(this).val().trim();
         cArr = value.match(/([\u0391-\uffe5])/ig); // 返回中文的字符
         num=value.length;
        if(num>200){
            $("#counter").css({"color": "red"});
	        $("#counter").text(-(num-200)+'字');
        }else{
	        $("#counter").text(num+'字');
            $("#counter").css({"color": "blue"});
        }
	 });
	 
	 $(".d-mobile").on("input",function() {
	 	 mobile = $(this).val().trim();
         cArr = mobile.match(/([\u0391-\uffe5])/ig); // 返回中文的字符
         num = mobile.length;
         if(num > 40){
        	layer.msg('联系方式不能超过40个字符', {time:1000});
            $(this).val(mobile.substring(0, 40));
			return false;
        }
	 });
	 
	
	$(".submitbutton").on("touchstart",function(){
		value=$("#Content").val().trim();
		cArr = value.match(/([\u0391-\uffe5])/ig); // 返回中文的字符
		num=value.length;

		imageSize=$(".new-images").size();

		if(num>200){
			layer.msg('输入超过200字', {time:1000});
			return false;
		}

		if(num<5){
			layer.msg('请至少输入5个字',  {time:1000});
			return false;
		}

		if(imageSize>4){
			layer.msg('最多可上传四张图片');

			return false;
		}
		//图片。。。
		$.ajax({
//	         "url": "http://192.168.1.137:19000/feedback/send?content="+value,
	        // "url": "http://www.devmapapi.com/feedback/send?content="+value,
	        "url": "http://192.168.1.240:19000/feedback/send?content="+value,
	        "type": "get",
	        "data": $("#ui-feedback-post").serialize(),
	        "dataType": "jsonp",
	        "success": function (data) {
	            if (data.code == 0)
	            {
	            	window.location.href='/feedback/result.html';
	            }else{
					layer.msg(d.msg, {
	                    time: 1000 //1秒关闭（如果不配置，默认是3秒）
	                }, function(){
	                    //do something
	                }); 
	            }
	        }
	    });
	    return false;
		
	});

	//todo  删除线上图片
	// $(".ui-del-image").on("touchstart",function(){
	// 	dataContent=$('#Content').val();
	// 	$.ajax({
	//         // "url": "http://192.168.1.240:19000/feedback/send",
	//         "type": "get",
	//         // "data": ,
	//         "dataType": "json",
	//         "success": function (d) {
	//             if (d.code == 0)
	//             {
	// 				layer.msg('删除失败');
	//             }else{
	// 				layer.msg('删除成功');
	//             }
	//         }
	//     });
	// });
	

		// var ffttgr;
	    $('.ui-images-box').on('touchend','.delete', function(e) {
	    	// ffttgr=$(this);
	    	// setTimeout(function(){
	    	$(this).parent().remove();
	    	// },1000);

	    	

	    	imageSize=$(".new-images").size();
	    		// console.log(imageSize);
	    	if (imageSize==3) {
				$(".add-images").show();
	    	};
	    	return false;
	    });

	    $('#ui-fileupload-input').on('touchstart', function(e) {
	    	imageSize=$(".new-images").size();
	   //  	console.log(imageSize);
	   //  	if (imageSize>4) {
				// $(".add-images").hide();
	   //  	};
			if(imageSize>=4){
				layer.msg('最多可上传四张图片');
				return false;
			}

		     $('#ui-fileupload-input').fileupload({
	         //    add: function(e, data) {
		        //         var uploadErrors = [];
		        //         var acceptFileTypes = '/(\.|\/)(jpe?g|png)$/i';
		        //         if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
		        //             uploadErrors.push('Not an accepted file type');
		        //         }
		        //         // if(data.originalFiles[0]['size'].length && data.originalFiles[0]['size'] > 5000000) {
		        //         //     uploadErrors.push('Filesize is too big');
		        //         // }
		        //         // if(uploadErrors.length > 0) {
		        //         //     alert(uploadErrors.join("\n"));
		        //         // } else {
		        //         //     data.submit();
		        //         // }
		        // },
	            dataType: 'json',
	            // url: 'http://localhost/test.php',
	            // url: 'http://www.devmapapi.com/feedback/AddPic',
			

	            url: 'http://192.168.1.240:19000/feedback/AddPic',
	            
		            acceptFileTypes: '/(\.|\/)(jpe?g|png)$/i',
	          
	            // acceptFileTypes:'/(\.|\/)(jpe?g|png)$/i',
				//url: 'http://192.168.1.137:19000/feedback/AddPic',
				// start: function(data){
				// 	console.log('start');
				// }
	            done: function (e,data) {
	                // console.log(e);
	                // console.log(data.result);

	                 if (data.result.code==0) {
	                     $('.add-images').before('<a id="fffff" class="new-images" href="'+data.result.data.fullUrl+'" ><div class="delete"><img class="delete-img" src="image/content_delete_pictures_gray40_nor.png"></div><input type="hidden" name="pic[]" value="'+data.result.data.originalUrl+'"><img src="'+data.result.data.fullUrl+'" style="height:'+fileuploadHeight+'px;"></a>');
	                     imageSize=$(".new-images").size();
					    	// console.log(imageSize);
					    	if (imageSize==4) {
								$(".add-images").hide();
					    	};
	                 }else{
		                 layer.msg(data.result.msg);
	                 };
	            }
	        })
			.bind('fileuploadchange', function (e,data) {
				filepath=data.files[0].name; 
				fileSize=data.files[0].size;
				fileCount=data.files.length;
				imageSize=$(".new-images").size();

				console.log(imageSize);
				console.log(fileCount);
// console.log(data);
				currentCount=imageSize+fileCount;
				if (currentCount>4) {
					layer.msg('最多只能上传4张图片');
					$.ajaxSetup({
					  global:false
					});
					return false;
				};
		        extStart=filepath.lastIndexOf("."); 

		        ext=filepath.substring(extStart,filepath.length).toUpperCase(); 


		        if(ext!=".PNG"&&ext!=".JPG"&&ext!=".JPEG"){ 
					layer.msg('当前格式图片不支持上传');


					$.ajaxSetup({
					  global:false
					});

		         return false; 

		        }
		        if (fileSize>2000000) {
		        	layer.msg('单张图片大小限制2M');
		        	
					$.ajaxSetup({
					  global:false
					});

					return false; 
		        };
				
			});
        });
});