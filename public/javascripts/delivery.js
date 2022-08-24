$(document).ready(function(){ 
	$("#ajax-delivery-form").submit(function(){		
		var str = $(this).serialize(); 
		$.ajax( { type: "POST", url: "delivery.php", data: str, success: function(msg){ 
				if(msg == 'OK') // Message Sent? Show the 'Thank You' message and hide the form
					{ result = '<div class="notification_ok">Your order has been sent. Thank you!<br> <a href="#" onclick="freset();return false;">send another order</a></div>'; $("#fields-delivery").hide(); } 							
				else
					{ result = msg; } 
				$("#note-delivery").html(result); 
			} 
		}); 
		return false; 
	}); 
});
				
function freset(){ 	
	$("#note-delivery").html('');
	document.getElementById('ajax-delivery-form').reset();
	$("#fields-delivery").show();
};