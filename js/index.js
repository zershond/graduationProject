
var listenApp = angular.module('listenApp', ['ionic']);
listenApp.controller('listenController', ['$scope', '$http', '$ionicScrollDelegate', '$ionicSideMenuDelegate', '$ionicSlideBoxDelegate', function($scope, $http, $ionicScrollDelegate, $ionicSideMenuDelegate, $ionicSlideBoxDelegate) {
	
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
		name: "...",
		sign: "...",
		icon: "img/icon.jpg"
	}
	
	
	//禁止左右滑动切换子页面，禁止右滑显示左列表
//	var mainSlide = $ionicSlideBoxDelegate.$getByHandle('mainSlide');
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
	$http.get('http://route.showapi.com/255-1?type=10&page=1&showapi_appid=26950&showapi_sign=8d59f5674739498f8ad0535edb1a4e89').success(function(resp) {
		$scope.httpLoading = false;
		window.location.href = "#navpage" + $scope.index;
		$scope.items = resp.showapi_res_body.pagebean.contentlist;
		//加载完成时广播，与感动控件有关
		$scope.$broadcast('scroll.infiniteScrollComplete');
		//当前页数+1
		$scope.currentPage++;
		//隐藏撑高页面的节点
		$scope.page1loading = false;
		
		//禁止左右滑动切换子页面，禁止右滑显示左列表
//		mainSlide.enableSlide(false);
//		$ionicSideMenuDelegate.$getByHandle('leftMenu').canDragContent(false);
	});

	//趣图子页面拉到底部时加载更多
	$scope.loadMore = function() {
		console.log('load more');
		$scope.httpLoading = true;
		$http.get('http://route.showapi.com/255-1?type=10&page=' + $scope.currentPage + '&showapi_appid=26950&showapi_sign=8d59f5674739498f8ad0535edb1a4e89').success(function(resp) {
			console.log(resp);
			$scope.httpLoading = false;
			for(var i = 0; i < resp.showapi_res_body.pagebean.contentlist.length; i++) {
				$scope.items.push(resp.showapi_res_body.pagebean.contentlist[i]);
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.currentPage++;
		});
	}

	//是否加载更多，当当前页面超过十的时候，不加载更多
	$scope.moreDataCanBeLoaded = function() {
		if($scope.currentPage > 10) {
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
//		$scope.loadOther($scope.index);
		window.location.href = "#navpage" + $scope.index;
	}
	
	//点击进入详情页
	$scope.clickItem = function(item) {
		$scope.detail.showDetail = true;
		$scope.detail.data = item;
		console.log($scope.detail)
	}

	//点击关闭详情页
	$scope.closeDetail = function() {
		$scope.detail.showDetail = false;
	}

	//滑到其他子页面时加载页面对应内容
	//1表示第二个页面，加载段子，以此类推
	$scope.loadOther = function(index) {
		
	}
	
	//加载更多段子
	$scope.loadMoreEpisode = function() {
		console.log('load more episode');
		$scope.httpLoading = true;
		$http.get('http://route.showapi.com/255-1?type=29&page=' + $scope.currentEpisodePage + '&showapi_appid=26950&showapi_sign=8d59f5674739498f8ad0535edb1a4e89').success(function(resp) {
			console.log(resp);
			$scope.httpLoading = false;
			for(var i = 0; i < resp.showapi_res_body.pagebean.contentlist.length; i++) {
				$scope.episode.push(resp.showapi_res_body.pagebean.contentlist[i]);
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.currentEpisodePage++;
		});
	}
//获取天气
	$scope.getWeather = function(){
		console.log("get weather");
		window.location.href = "weather.html?city=" + $scope.city;
		
//		$scope.httpLoading = true;
//		var _url = "http://wthrcdn.etouch.cn/weather_mini?city=" + $scope.city;
//		$http.get(_url).success(function(res){
//			$scope.httpLoading = false;
//
//			$scope.weatherSrc = "weather.html";
//			console.log(res);
//			$scope.today = res.data.forecast[0];
//			$scope.today.msg = res.data.ganmao;
//			$scope.today.city = res.data.city;
//		})
		
	}
	
	//获取个人信息
	$scope.getUserInfo = function(){
		var _url = "www.zershond.top:1200/users/getUserInformation?userId=" + $scope.userId;
//		$http.get(_url).success(function(res){
//			console.log(res);
//		})
	}

}])

//angularJS 在video里面使用ng-src时需要用到的过滤器
listenApp.filter('trusted', ['$sce', function($sce) {
	return function(url) {
		return $sce.trustAsResourceUrl(url);
	};
}]);



mui.plusReady(function(){
	plus.key.addEventListener('backbutton',function(){
		if(confirm('确认退出？')){
			plus.runtime.quit();
		}
//		history.go(-1)
	},false);	
})