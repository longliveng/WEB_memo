/*

js打开 app

参考文章(Reference):
http://blog.csdn.net/spring21st/article/details/8065266
http://ju.outofmemory.cn/entry/89179
https://segmentfault.com/q/1010000004373496

*/

var isMircoMessager,deviceType;

if (navigator.userAgent.match(/(MicroMessenger);?/i)  || navigator.userAgent.match(/(Weibo);?/i) || navigator.userAgent.match(/(QQ\/);?/i)) {
	isMircoMessager = true;
} else {
	isMircoMessager = false;
}

if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
	deviceType = 0;
	if (navigator.userAgent.match(/(Safari);?/i)) {
		isSafari = true;
	}
} else if (navigator.userAgent.match(/(Macintosh);?/i)){
	deviceType = 2;
} else { //}if (navigator.userAgent.match(/(android|linux);?/i)) {
	deviceType = 1;
}

// 不要下拉刷新	
// function stopScrolling( touchEvent ) { 
// 	touchEvent.preventDefault(); 
// }
// document.addEventListener( 'touchstart' , stopScrolling , false );
// document.addEventListener( 'touchmove' , stopScrolling , false );

function getQueryStr(str) {
	var rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(LocString), tmp;
	if (tmp = rs) {
		return tmp[2];
	}
	return "0";
}

var timeout;
// var t=1000;
var hasApp = true;
var checking = true;
var firstOpen=true;
function openApp(cardId) {
	// alert(navigator.userAgent);

	if (isMircoMessager) {
		openDiv();
	} else {
		if (!checking){
			return false;
		}

		if (deviceType == 0) {
			var t1=Date.now();

			openIos('edushi://'+cardId,function(t){
				var t2 = Date.now();
				gapTime =t2 - t1;

				if (t) {
					checking = false;
			
					setTimeout(function() {
						window.location.href = "edushi://"+cardId;

					}, 50);

					var t2 = Date.now();
					setTimeout(function(){
						if (Date.now() - t2 < 1100) {
					        window.location.href = "https://itunes.apple.com/cn/app/blabla";
					    }else
				    	{
					    	window.close();
				    	}
					}, 1000);

				}else{
					return false;
				}
			});
			
		} else if (deviceType == 2) {
			window.location = "https://itunes.apple.com/cn/app/blabla";

		} else {
				if (navigator.userAgent.match(/(UCBrowser);?/i)) {
				}

				setTimeout(function() {
					checking = false;
					if(!hasApp) {
						window.location = "http://app.edushi.com/edushi.apk?card="+cardId;
					}
				}, 2000);
				
				var t1=Date.now();
				var ifr = $('<iframe id="ifr"></iframe>');
				//ifr.attr('src', 'edushi://show?card=120.15868487&lat=30.27986082');
				ifr.attr('src', "edushi://show?card="+cardId);
				//ifr.attr('src', 'edushi://120.15868487_30.27986082');
				$('body').append(ifr);
				timeout = setTimeout(function() {
					try_to_open_app(t1);
				}, t);

		}
	}
}

function try_to_open_app(t1) {
	var t2 = Date.now();
	if (!t1 || t2 - t1 < t + 500) {
		hasApp = false;
	}
	clearInterval(timeout);
}

function openDiv() {
		document.getElementById('popWindow').style.display = 'block';
		document.getElementById('maskLayer').style.display = 'block';
		if (deviceType == 0) {
			document.getElementById('tips_bg').src = './image/bg_ios.png';
		} else {
			document.getElementById('tips_bg').src = './image/bg_android.png';
		}
	}

function openIos(url, callback) {
    if (!url) {
        return;
    }
    var node = document.createElement('iframe');
    node.style.display = 'none';
    var body = document.body;
    var timer;
    var clear = function(evt, isTimeout) {
       (typeof callback==='function') &&  callback(isTimeout);
        window.removeEventListener('pagehide', hide, true);
        window.removeEventListener('pageshow', hide, true);
        if (!node) {
            return;
        }

        node.onload = null;
        body.removeChild(node);
        node = null;

    };
    var hide = function(e){
        clearTimeout(timer);
        clear(e, false);
    };
    window.addEventListener('pagehide', hide, true);
    window.addEventListener('pageshow', hide, true);
    node.onload = clear;
    node.src = url;
    body.appendChild(node);

    var now = +new Date();
    //如果事件失败，则1秒设置为空
    timer = setTimeout(function(){
        timer = setTimeout(function(){
          var newTime = +new Date();
          if(now-newTime>1300){
            clear(null, false);
          }else{
            clear(null, true);
          }

        }, 1200);
    }, 60);
}