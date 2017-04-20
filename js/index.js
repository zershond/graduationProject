
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
	$http.get('http://route.showapi.com/255-1?type=10&page=1&showapi_appid=26950&showapi_sign=8d59f5674739498f8ad0535edb1a4e89').success(function(resp) {
		$scope.httpLoading = false;
		$scope.items = resp.showapi_res_body.pagebean.contentlist;
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
		$ionicSlideBoxDelegate.slide(index)
	}
	
	//滑到对应页面时，导航栏对应改变
	$scope.sliceChange = function() {
		$scope.index = $ionicSlideBoxDelegate.currentIndex();
		$scope.navClick($scope.index);
		$scope.loadOther($scope.index);
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
		
		if(index == 1 && $scope.episode.length == 0) {
			$scope.httpLoading = true;
			$http({
				url: 'http://route.showapi.com/255-1',
				method: 'get',
				params: {
					showapi_appid: '26950',
					showapi_sign: '8d59f5674739498f8ad0535edb1a4e89',
					type: 29,
					page: 1
				}
			}).success(function(resp) {
				console.log(resp);
				$scope.httpLoading = false;
				$scope.episode = resp.showapi_res_body.pagebean.contentlist;
				$scope.page2loading = false;
			})
		} else if(index == 2 && $scope.sound.length == 0) {
			$scope.httpLoading = true;
			$http({
				url: 'http://route.showapi.com/255-1',
				method: 'get',
				params: {
					showapi_appid: '26950',
					showapi_sign: '8d59f5674739498f8ad0535edb1a4e89',
					type: 31,
					page: 1
				}
			}).success(function(resp) {
				console.log(resp);
				$scope.httpLoading = false;
				$scope.sound = resp.showapi_res_body.pagebean.contentlist;
				$scope.page3loading = false;
			})
		}else if(index == 3 && $scope.video.length == 0){
			$scope.httpLoading = true;
			$http({
				url: 'http://route.showapi.com/255-1',
				method: 'get',
				params: {
					showapi_appid: '26950',
					showapi_sign: '8d59f5674739498f8ad0535edb1a4e89',
					type: 41,
					page: 1
				}
			}).success(function(resp) {
				console.log(resp);
				$scope.httpLoading = false;
				$scope.video = resp.showapi_res_body.pagebean.contentlist;
				$scope.page4loading = false;
			})
		}
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
	
	//加载更多声音 
	$scope.loadMoreSound = function(){
		console.log('load more sound');
		$scope.httpLoading = true;
		$http.get('http://route.showapi.com/255-1?type=31&page=' + $scope.currentSoundPage + '&showapi_appid=26950&showapi_sign=8d59f5674739498f8ad0535edb1a4e89').success(function(resp) {
			console.log(resp);
			$scope.httpLoading = false;
			for(var i = 0; i < resp.showapi_res_body.pagebean.contentlist.length; i++) {
				$scope.sound.push(resp.showapi_res_body.pagebean.contentlist[i]);
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.currentSoundPage++;
		});
	}
	
	//加载更多视频
	$scope.loadMoreVideo = function(){
		console.log('load more video');
		$scope.httpLoading = true;
		$http.get('http://route.showapi.com/255-1?type=41&page=' + $scope.currentVideoPage + '&showapi_appid=26950&showapi_sign=8d59f5674739498f8ad0535edb1a4e89').success(function(resp) {
			console.log(resp);
			$scope.httpLoading = false;
			for(var i = 0; i < resp.showapi_res_body.pagebean.contentlist.length; i++) {
				$scope.video.push(resp.showapi_res_body.pagebean.contentlist[i]);
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.currentVideoPage++;
		});
	}
	
	//控制声音是否播放
	$scope.soundPlay = function(){
		$scope.isPlay = !$scope.isPlay;
		if($scope.isPlay){
			document.getElementById('sound').play();
		}else{
			document.getElementById('sound').pause();
		}
		
	}
	
	//控制视频播放
	$scope.videoPlay = function(){
		$scope.isVideoPlay = !$scope.isVideoPlay;
		var m = document.getElementById('video');
		if($scope.isVideoPlay){
			m.play();
		}else{
			m.pause();
		}
	}

}])

//angularJS 在video里面使用ng-src时需要用到的过滤器
listenApp.filter('trusted', ['$sce', function($sce) {
	return function(url) {
		return $sce.trustAsResourceUrl(url);
	};
}]);
