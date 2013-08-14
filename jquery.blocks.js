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
			sRow += '<div class=" block col'+ i +'" data-coords="'+i+',datay" data-base="" data-owner="empty" data-power="0" data-grouped="0" "><div class="blockInner"></div></div>'
		}	
		
		for (i = 0; i < h; i++){	
			sGrid += '<div class=" row row'+ i +' ">'+sRow.replace(/datay/g,i)+'</div>';
		}
		sGrid += '</div>'
		
		$this.append(sGrid);
	}	

	function _addEventHandlers($this){	
		$this.on("click", "div.block", function(event){
			
			_blockClickHandler($this,$(this));			

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
	
	function _checkValidBlock($block,currentOwner,currentPlayer,currentX,currentY){

		return true;	
			
			
	}
	
	function _attackBlock($block){
		return true;			
	}	
	
	function _blockClickHandler($this,$block){	
		var aPlayers = $this.data('players'),
			currentPlayer = aPlayers[0],
			currentPower  = $block.attr('data-power'),
			currentOwner  = $block.attr('data-owner'),
			currentcoords  = $block.attr('data-coords'),
			currentX  = currentcoords.split(',')[0],
			currentY  = currentcoords.split(',')[1],
			validBlock = false;
			
		//if already own block reinforce
		if(currentPlayer.id === currentOwner ){
			if(currentPower < 10){
				$block.attr('data-power',Number(currentPower)+1);								
			}				
			return true;				
		}
		
		validBlock = _checkValidBlock($block,currentPlayer,currentX,currentY);
		
		if(!validBlock){
			return false
		}
		
		if( currentOwner == 'empty' ){
			$block.attr('data-owner',currentPlayer.id);
			$block.attr('data-power',Number(currentPower)+1);
		} else {			
			_attackBlock($block);			
		}					
		
		if(currentPlayer.turns == 0){
			//_changePlayerTurn($this);			
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



