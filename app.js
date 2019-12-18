var app=angular.module('galleryModal',[]);
//////////////////////////
	
	app.run(function($rootScope){
		$rootScope.media_url=function(uuid,w)
		{
			if(!uuid)return '';
			if(!uuid || uuid==undefined || uuid=="undefined")return "";
			return   'images/'+ uuid ;
		}
		$rootScope.bg_url=function(id,w){
			return {'background-image':'url('+$rootScope.media_url(id,w)+')'}
		}
	});
	app.controller('galModalCtrl',function($scope,$rootScope,$timeout){
		 
		$scope.$watch('modal.index',function(index){
			$scope.current=$scope.modal.rows[$scope.modal.index]||0;
		})
		
		
	})
	app.controller('mainCtrl',function($scope,$rootScope,$timeout){
		 
		 
		$scope.galModal={ };
		$scope.html={rows:[]};
		$scope.galModal.index=-1;
		 
		var images=['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'  ];
		for(var i=1;i<5;i++)
			$scope.html.rows.push( {id:10*i,name:'Name:'+i,personal:'person.jpg',content:images,course:'Photoshp Illustrator',year:' 2019'} );
		$scope.galModal.rows=$scope.html.rows;	
		 
		$scope.start_gal=function(index)
		{
			 
			
			$scope.galModal.open({
				afterClose:function(){$scope.galModal.index=-1;},
				afterOpen:function(){$scope.galModal.index=index;},
			});
		}
		 
		 
	})