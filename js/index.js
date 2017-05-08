
var listenApp = angular.module('listenApp', ['ionic']);
listenApp.controller('listenController', ['$scope', '$http', '$ionicScrollDelegate', '$ionicSideMenuDelegate', '$ionicSlideBoxDelegate', function($scope, $http, $ionicScrollDelegate, $ionicSideMenuDelegate, $ionicSlideBoxDelegate) {
	//
	$scope.domain = 'http://www.zershond.top:1200'
	
	//每个页面的数据分开四个数组存放
	$scope.items = [];
	$scope.episode = [];
	$scope.sound = [];
	$scope.video = [];
	
	//ajax请求时显示遮罩层
	$scope.httpLoading = true;
	
	//当前页面，默认趣图页面
	$scope.currentPage = 1;
	$scope.currentEpisodePage = 1;
	$scope.currentSoundPage = 1;
	$scope.currentVideoPage = 1;
	
	//导航栏是否选中
	$scope.navSelected = [1, 0, 0, 0];
	
	//控制每个子页面第一次加载是否到底部
	$scope.page1loading = true;
	$scope.page2loading = true;
	$scope.page3loading = true;
	$scope.page4loading = true;
	
	//详情页题头控制
	$scope.index = 0;
	$scope.word = ['趣图','段子','声音','视频'];
	
	//详情页要显示的数据存放的对象
	$scope.detail = {
		showDetail: false,
		data: {},
	};
	
	//播放控件
	$scope.isPlay = false;
	$scope.isVideoPlay = false;
	
	//天气页面Src
//	$scope.data.weatherSrc = "weatherSearch.html";
	$scope.data = {
		weatherSrc: "weatherSearch.html"
	}
	//获取天气的城市
	$scope.city = "广州";
	//获取天气详情

	$scope.today = {
		
	}
	
	//个人信息
	$scope.showMoreInfo = true;
	$scope.userId = "";
	$scope.userData = {
		name: "用户未登录",
		sign: "",
		icon: "img/defaultIcon.jpg",
		phoneNum: "",
		mailBox: ""
	}
	
	
	//禁止左右滑动切换子页面，禁止右滑显示左列表
	var mainSlide = $ionicSlideBoxDelegate.$getByHandle('mainSlide');
//	var leftMenu = $ionicSideMenuDelegate.$getByHandle('leftMenu');

	//强制刷新整个页面
	$scope.pageRefresh = function(){
		window.location.reload();
	}

	//点击显示左边列表
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	}

	//默认加载趣图页面的第一页数据
	$http.get('http://www.zershond.top:1200/home/homePage?pageNum=1').success(function(resp) {
		$scope.httpLoading = false;
		window.location.href = "#navpage" + $scope.index;
		$scope.items = resp.result;
		//加载完成时广播，与感动控件有关
		$scope.$broadcast('scroll.infiniteScrollComplete');
		//当前页数+1
		$scope.currentPage++;
		//隐藏撑高页面的节点
		$scope.page1loading = false;
		
		//禁止左右滑动切换子页面，禁止右滑显示左列表
		mainSlide.enableSlide(false);
//		$ionicSideMenuDelegate.$getByHandle('leftMenu').canDragContent(false);
	});

	//趣图子页面拉到底部时加载更多
	$scope.loadMore = function() {
		$scope.httpLoading = true;
		$http.get('http://www.zershond.top:1200/home/homePage?pageNum=' + $scope.currentPage).success(function(resp) {
			console.log(resp);
			$scope.httpLoading = false;
			for(var i = 0; i < resp.result.length; i++) {
				$scope.items.push(resp.result[i]);
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.currentPage++;
		});
	}

	//是否加载更多，当当前页面超过十的时候，不加载更多
	$scope.moreDataCanBeLoaded = function() {
		if($scope.currentPage > 2) {
			return false;
		}
		return true;
	}
	
	//点击导航栏时跳到对应子页面
	$scope.navClick = function(index) {
		for(var i in $scope.navSelected) {
			$scope.navSelected[i] = 0;
		}
		$scope.navSelected[index] = 1;
		$ionicSlideBoxDelegate.slide(index);
		window.location.href = "#navpage" + index;
	}
	
	//滑到对应页面时，导航栏对应改变
	$scope.sliceChange = function() {
		$scope.index = $ionicSlideBoxDelegate.currentIndex();
		$scope.navClick($scope.index);
		window.location.href = "#navpage" + $scope.index;
	}
	
	//点击进入详情页
	$scope.clickItem = function(item) {
		$scope.detail.showDetail = true;
		$scope.detail.data = item;
	}

	//点击关闭详情页
	$scope.closeDetail = function() {
		$scope.detail.showDetail = false;
	}

	//获取天气
	$scope.getWeather = function(){
		console.log("get weather");
		window.location.href = "weather.html?city=" + $scope.city;
	}
	
	//获取个人信息
	$scope.getUserInfo = function(){
		if(localStorage.userId){
			var _url = "http://www.zershond.top:1200/users/getUserInformation?userId=" + localStorage.userId;
			$http.get(_url).success(function(res){
				console.log(res.result[0]);
				var response = res.result[0];
				$scope.userId = response.userId;
				$scope.userData.name = response.userName;
				$scope.userData.icon = response.userIcon == null ? "img/defaultIcon.jpg" : $scope.domain + response.userIcon;
				$scope.userData.sign = response.userSign;
				$scope.userData.phoneNum = response.userPhoneNum;
				$scope.userData.mailBox = response.mailBox;
				$scope.showMoreInfo = true;
				setLocalUserId(response.userId);
			})
		}else{
			$scope.showMoreInfo = false;
			$scope.userId = "";
			$scope.userData.name = "用户未登录";
			$scope.userData.sign = "";
			$scope.userData.icon = "img/defaultIcon.jpg";
		}
	}
	
	//登录或者注册
	$scope.login = function(register){
		if(register){
			window.location.href = "loginRegister.html?register=1";
		}else{
			window.location.href = "loginRegister.html?register=0";
		}
		
	}
	
	//退出登录 登出
	$scope.logup = function(){
		clearLocalUserId();
		window.location.href = "loginRegister.html?register=0";
	}
	
	$scope.getUserInfo();

}])


function getLocalUserId(){
	var obj = {
		code: 1,
		userId: ""
	}
	if(localStorage.userId){
		obj.code = 0;
		obj.userId = localStorage.userId;
	}else{}
	return obj;
}

function setLocalUserId(userId){
	localStorage.userId = userId;
}

function clearLocalUserId(){
	localStorage.userId = "";
}


//angularJS 在video里面使用ng-src时需要用到的过滤器
listenApp.filter('trusted', ['$sce', function($sce) {
	return function(url) {
		return $sce.trustAsResourceUrl(url);
	};
}]);


mui.init({
	gestureConfig:{
		tap: false, //默认为true
		doubletap: false, //默认为false
		longtap: false, //默认为false
		swipe: false, //默认为true
		drag: false, //默认为true
		hold:false,//默认为false，不监听
		release:false//默认为false，不监听
	}
});
mui.plusReady(function(){
	plus.key.addEventListener('backbutton',function(){
		if(confirm('确认退出？')){
			plus.runtime.quit();
		}
	},false);	
})