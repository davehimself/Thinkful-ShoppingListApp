$(document).ready(function() {

/* Sortable and Droppable for Items */
	
	$('#sortable').sortable({
		connectWith: '#trash'
	}).disableSelection();
	
	$('#trash').droppable({
		accept: '#sortable li',
		hoverClass: "ui-state-hover",
		drop: function(event, ui){
			ui.draggable.remove();
		}		
	});
	
	/* Alphabetical Sort */
	$('form#sort').submit(function(event){		
		event.preventDefault();		
		$('ul#sortable li').sort(function(a, b){
			return ($(b).text().toLowerCase()) < ($(a).text().toLowerCase());	
		}).appendTo('ul#sortable');	
	});
	
	/* Use to sort items in order they were added */
	/* --I didn't implement this since users I tested 
	on did not find this important or useful 	
	
	$('form#main-form').submit(function(event){
		event.preventDefault();
		$( "#sortable" ).sortable('cancel');
	});
	*/	
	
/*Checkbox Strikethrough Item Text */
	$('input.check').change(function(){
		$(this).siblings('.item').toggleClass('strike');
		
		/* This pushes checked items to the bottom of the list */
		/* --This feature was removed since users found it 
		jarring when the item they were looking at moved
		
		if($(this).siblings('.item').hasClass('strike')){
			$(this).closest('li').appendTo('ul#sortable');
		}
		*/
	});
	
/* Removing Checked Items */
	$('form#remove-check').submit(function(event){		
		event.preventDefault();
		$('ul#sortable li').each(function(){			
			if($(this).find('.item').hasClass('strike')){
				$(this).remove();
			}
		});
	});
	

/* Text editing with double-click */
/* --Not using contenteditable=true to have more control */
	$('span.item').dblclick(function(){		
		$(this).hide().after('<textarea class="edit" maxlength="140"></textarea>');
		$('textarea.edit').focus();
		
		/* handles pressing enter in text area */
		$('textarea.edit').keypress(function(event){
			if(event.which == 13){
				event.preventDefault();
				$('span.item').show();
				
				/* this tests if no text or whitespace was entered */
				if(!$.trim($(this).val())){			
					$('textarea.edit').remove();				
				} else {					
					$(this).siblings('span').html($(this).val());
					$('textarea.edit').remove();
				}
			}			
		});
		
		/* handles clicking outside text area */
		$(document).click(function(event){
			$('span.item').show();
			
			/* this tests if no text or whitespace was entered */
			if(!$.trim($('textarea.edit').val())){			
				$('textarea.edit').remove();				
			} else {					
				$('textarea.edit').siblings('span').html($('textarea.edit').val());
				$('textarea.edit').remove();
			}
			
		});
		
		/* handles escaping out of text area */
		/* --also handles vertical resizing */
		$('textarea.edit').keyup(function(event){			
			$(this).height($(this).prop('scrollHeight'));			
			if(event.which == 27){
				event.preventDefault();
				$('span.item').show();
				$('textarea.edit').remove();			
			}
		});
		
	});
	
	
	
/* Adding Items */
	$('input#add').keypress(function(event){
		
		if(event.which == 13){
			event.preventDefault();
			
			/* this tests if no text or whitespace was entered */
			if(!$.trim($(this).val())){
				$('input#add').val('Item');
			}
			
			$('li#base').clone(true).appendTo('#sortable').removeAttr('id').removeClass('hidden');
			$('ul#sortable>li:last>form>span').text($('input#add').val());
			$('input#add').val("");

			var doc_height = $(document).height();
			var win_height = $(window).height();
			
			if(doc_height > win_height){				
				$('div#container').css('height', 'auto');
			}			
		}
	});
});