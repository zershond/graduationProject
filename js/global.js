/*
DK(201A065BFDD9对话) 17:12:51
	myModule.filter('trusted', ['$sce', function ($sce) {
	    return function (url) {
	        return $sce.trustAsResourceUrl(url);
	    };
	}]);
DK(201A065BFDD9对话) 17:12:58
ng-src="{{file.file_link| trusted}}"
DK腿部挂件(985AEBD51C0D对话) 17:21:01
$scope.url = $sce.trustAsResourceUrl($scope.url); 
 */