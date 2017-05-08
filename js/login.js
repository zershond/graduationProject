var loginNg = angular.module('loginApp', []);
loginNg.controller("loginController", ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
	$scope.userAccount = "";
	$scope.userPassword = "";
	$scope.errMsg = "errMsg";
	$scope.showErrMsg = false;
	$scope.errMsgAction = true;
	$scope.switchText = "登陆";
	$scope.showRegister = false;
	$scope.loginContainerC = "";
	$scope.registerContainerC = "";
	
	$scope.userAccountAvailable = false;
	$scope.userInfo = {
		userAccount: "",
		userPassword: "",
		userName: "",
		mailBox: "",
		phoneNum: "",
		age: "",
		userSign: "",
		sex: ""
	};
	
	$scope.login = function(){
		if($scope.userAccount == ""){
			$scope.showErrMsg = true;
			$scope.errMsg = "请填写账号";
			$scope.errAction();
		}else if($scope.userPassword == ""){
			$scope.showErrMsg = true;
			$scope.errMsg = "请填写密码";
			$scope.errAction();
		}else{
			$scope.errMsg = "";
			$scope.showErrMsg = false;
			var _url = "http://www.zershond.top:1200/users/login?userAccount=" + $scope.userAccount + "&accountPassword=" + $scope.userPassword;
			$http.get(_url).success(function(res){
				console.log(res);
				if(res.massage == "用户不存在" || res.massage == "密码错误"){
					$scope.showErrMsg = true;
					$scope.errMsg = res.massage;
					$scope.errAction();
				}else{
					localStorage.userId = res.data.userId;
					window.location.href = "index.html";
				}
			})
		}
	}
	$scope.errAction = function(){
		$timeout(function(){
			$scope.errMsgAction = false;
		}, 1000)
		$timeout(function(){
			$scope.errMsgAction = true;
			$scope.errMsg = "";
			$scope.showErrMsg = false;
		}, 2000)
	}
	
	$scope.showRegisterFn = function(){
		$("#login-container").animate({
			left: "-500px",
			opacity: 0
		},function(){
			$(this).css("left", "500px")
		})
		$("#register-container").animate({
			left: "0px",
			opacity: 1
		})
	}
	
	$scope.showLoginFn = function(){
		$("#register-container").animate({
			left: "-500px",
			opacity: 0
		},function(){
			$(this).css("left", "500px")
		})
		$("#login-container").animate({
			left: "0px",
			opacity: 1
		})
	}
	
	$scope.registe = function(){
		console.log(this)
		if($scope.userInfo.userAccount == ""){
			$scope.showErrMsg = true;
			$scope.errMsg = "请填写账号";
			$scope.errAction();
		}else if($scope.userInfo.userPassword == ""){
			$scope.showErrMsg = true;
			$scope.errMsg = "请填写密码";
			$scope.errAction();
		}else{
			console.log($scope.userInfo)
			var _url = "http://www.zershond.top:1200/users/addUser";
			var obj = {
					userName: $scope.userInfo.userName,
					userAccount: $scope.userInfo.userName,
					userSign: $scope.userInfo.userSign,
					userPhoneNum: $scope.userInfo.phoneNum,
					mailBox: $scope.userInfo.mailBox,
					accountPassword: $scope.userInfo.userPassword,
					sex: $scope.userInfo.sex,
					age: $scope.userInfo.age
				}
//			$http.post(_url, obj).success(function(res){
//				console.log(res)
//			})
			$.post(_url, obj, function(res){
				console.log(res);
				localStorage.userId = res.result.insertId;
				window.location.href = "index.html";
			})
		}
		
	}
	
	$scope.checkAccount = function(){
		var _url = "http://www.zershond.top:1200/users/checkAccount?userAccount=" + $scope.userInfo.userAccount;
		$http.get(_url).success(function(res){
			if(res.code == 1){
				$scope.userAccountAvailable = true;
				$scope.showErrMsg = false;
				$scope.errMsg = "";
			}else{
				$scope.userAccountAvailable = false;
				$scope.showErrMsg = true;
				$scope.errMsg = "账号已存在";
				$scope.errAction();
			}
		})
	}
	
	var str = window.location.href.split("?")[1].split("=")[1];
	if(str == 1){
		$scope.showRegisterFn();
	}
}])

function registeRequest(obj){
	
}
