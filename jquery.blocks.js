;(function($){ 
	'use strict';		
	
	var methods = {
		init : function( options ){
			var $this = $(this);								
				$this.data('opts', $.extend({}, $.fn.blocks.defaults, options));				
			
			_buildGrid( $this,$this.data('opts').gridw, $this.data('opts').gridh);
			_addEventHandlers($this);
			_initPlayers($this);
		}		
	};

	
	


	function _buildGrid($this,w,h){
		var i = 0,
		row = 0,
		sRow = '',
		sGrid = '<div class="grid">';
		
		for (i = 0; i < w; i++){	
			sRow += '<div class=" block col'+ i +'" data-base="" data-owner="empty" data-power="0" data-grouped="0" "></div>'
		}	
		
		for (i = 0; i < h; i++){	
			sGrid += '<div class=" row row'+ i +' ">'+sRow+'</div>';
		}
		sGrid += '</div>'
		
		$this.append(sGrid);
	}	

	function _addEventHandlers($this){	
		$this.on("click", "div.block", function(event){
			
			_performTurn($this,$(this));			

		});
	}
	
	function _changePlayerTurn($this){		
		var aPlayers = $this.data('players'),
			player = aPlayers.shift();	
			player = _calculatePlayerIncome(player);
			aPlayers.push(player);
		
		return true;
		
	}
	
	function _calculatePlayerIncome(player){
		player.turns = 10;
		return player;
	}	
	
	function _performTurn($this,$block){	
		var aPlayers = $this.data('players'),
			currentPlayer = aPlayers[0],
			currentPower  = $block.attr('data-power'),
			currentOwner  = $block.attr('data-owner');
		
			currentPlayer.turns = currentPlayer.turns - 1;
			console.log(aPlayers);
		//_changePlayerTurn($this);
		
		$block.attr('data-power',Number(currentPower)+1);
		$block.attr('data-owner',currentPlayer.id);			
		
		
		if(currentPlayer.turns == 0){
			_changePlayerTurn($this);			
		}
	
	
	}
	
	
	function _initPlayers($this){	
		var i=0,
			x=0,
			y=0,
			w=$this.data('opts').gridw,
			h=$this.data('opts').gridh,
			defaultPlayers = $this.data('opts').players,
			player = {},
			initiatedPlayers = [],
			numPlayers = defaultPlayers.length;			

			
		for (i = 0; i < numPlayers; i++){	
			x = Math.floor((Math.random()*w)+1);
			y = Math.floor((Math.random()*h)+1);
			if( $('.row'+y+' .col'+x).data('owner') != "empty"){
				i--;				
			} else {
				player = defaultPlayers[i];
				player.id = defaultPlayers[i].color;
				player.blocks = 1;
				player.units = 0;
				player.sectors = 0;
				player.turns = 4;
				initiatedPlayers.push(player);
				$('.row'+y+' .col'+x).attr('data-owner',defaultPlayers[i].color).attr('data-base',defaultPlayers[i].color).attr('data-power','3');
				
				//console.log($('.row'+y+' .col'+x).data('owner'));				
			}	
			$this.data('players',initiatedPlayers);				
		}		
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
		players:[	{color:'red'},{color:'blue'},{color:'green'}],
		gridw:30,
		gridh:30
		
		
	};	

})(jQuery);



