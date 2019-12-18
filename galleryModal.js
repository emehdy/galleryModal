
	app.directive('galleryModal',function(){
		var _def={
				 
				position:'fixed', 
				width:'100%', 
				height:'100%', 
				top:'0px', 
				left:'0px', 
				zIndexIn: '9999',  
				zIndexOut: '-9999',  
				color: '#39BEB9', 
				opacityIn:'1',  
				opacityOut:'0', 
				animatedIn:'zoomIn',
				animatedOut:'zoomOut',
				animationDuration:'.6s', 
				overflow:'auto', 
				// Callbacks
				beforeOpen: function() {},           
				afterOpen: function() {}, 
				beforeClose: function() {}, 
				afterClose: function() {}
		};
		//Init styles
		function _makeInitStyles(settings)
		{
			return {
				'position':settings.position,
				'width':settings.width,
				'height':settings.height,
				'top':settings.top,
				'left':settings.left,
				'background-color':settings.color,
				'overflow-y':settings.overflow,
				'z-index':settings.zIndexOut,
				'opacity':settings.opacityOut,
				'-webkit-animation-duration':settings.animationDuration,
				'-moz-animation-duration':settings.animationDuration,
				'-ms-animation-duration':settings.animationDuration,
				'animation-duration':settings.animationDuration
			};
		}
		function galleryModal($el,scope,options) 
		{
			scope.modal.render=false;
			$el = $($el);
			
			//Defaults
			var settings = $.extend(_def, options);
			$el.addClass('animated');
			$el.addClass('galleryModal-off'); 
			//Apply stles
			$el.css(_makeInitStyles(settings));
			scope.modal.open=function(options) 
			{       
				$.extend(settings, options||{ });  
				$('body, html').css({'overflow':'hidden'});
				if ($el.hasClass('galleryModal-off')) {
					$el.removeClass(settings.animatedOut);
					$el.removeClass('galleryModal-off');
					$el.addClass('galleryModal-on');
				} 

				 if ($el.hasClass('galleryModal-on')) {
					scope.modal.render=true;
					settings.beforeOpen();
					$el.css({'opacity':settings.opacityIn,'z-index':settings.zIndexIn});
					$el.addClass(settings.animatedIn);  
					$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterOpen);
				};  
				  
			} ;
			 
			


			scope.modal.close=function() 
			{
				
				$('body, html').css({'overflow':'auto'});

				settings.beforeClose(); //beforeClose
				if ($el.hasClass('galleryModal-on')) {
					$el.removeClass('galleryModal-on');
					$el.addClass('galleryModal-off');
				} 

				if ($el.hasClass('galleryModal-off')) {
					$el.removeClass(settings.animatedIn);
					$el.addClass(settings.animatedOut);
					$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
				};

			} ;
			 
			function afterClose () {       
				$el.css({'z-index':settings.zIndexOut});
				settings.afterClose(); //afterClose
				scope.modal.render=false;
				scope.$apply();
			}

			function afterOpen () {
				
				settings.afterOpen(); //afterOpen
				scope.$apply();
			}
			
		}
	
	
		var opt={color:'rgba(30, 30, 30, 0.8)'};//animatedIn: 'bounceIn' ,animatedOut: 'bounceOut',};
		return {
			restrict: 'A',
			templateUrl:function( element,attr){ return attr.templateUrl} ,
			scope:{modal:'=galleryModal'},  
			link: function (scope, element,attr) {	console.info(scope);
				 
				galleryModal($(element),scope,opt);
			}
		}
	})
	
	