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
	}
	
	$scope.checkAccount = function(){
		
	}
}])