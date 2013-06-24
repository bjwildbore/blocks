;(function($){ 
	'use strict';		
	
	var methods = {
		init : function( options ){
			var $this = $(this);								
				$this.data('opts', $.extend({}, $.fn.blocks.defaults, options));	
				
			$this.data('eventsCache', []);
			$this.data('calendarID' , $this.data('opts').fullCalendarID);	
			
            if (typeof $this.data('opts').afterInit === 'function') {
                if (!$this.data('opts').afterInit.call(this, $this)) {
                    return false;
                }
            }
			_private_func($this);
			
		},		
	};

	
	


	function _private_func($this){

	}	

	$.fn.blocks = function(method) { 
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on plugin' );
		}
	};
	
	// plugin defaults - added as a property on our plugin function
	$.fn.blocks.defaults = {	

		
		
	};	

})(jQuery);



