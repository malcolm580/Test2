$(document).ready(function() {
    var x ='';
    var username = $.session.get('username');
    console.log(username);
    if(username) {
        $('#step0').hide();
        $('#step2').hide();
        $('#step3').hide();
    }else{
        $('#step1').hide();
        $('#step2').hide();
        $('#step3').hide();
    }

    $('#cont1').hide();
    $('#cont2').hide();
    $('#cont3').hide();
    $('.cc').css('opacity', '0.4');
    $(".datepicker").datepicker();
        
    var p = $.session.get('productList');
    $('#productList').append(p);

    
    $('.shipping').on('change', function(){
        $('#sub_ship').text($(":checked").val());
        // $('#calculated_total').text((parseInt($(":checked").val())+parseInt($('#sub_price').text())));
    });
    
    $('.datepicker').on('click', function(value){
        $('#cont1').show();
    });
    
    $('#ccv').keypress(function(e) {
        if(e.keyCode == 13) {
            $('#cont2').show();
        }
        return;
    })
    
    $('#cont0').on("click", function(){
        $('#step1').show();
    })
    
    $('#cont1').on("click", function(){
        $('#step2').show();
    })
    
    $('#cont2').on("click", function(){
        //alert('Credit card format valid!')
        $('#step3').show();
    })
    
    $('.cc').mouseover(function(){
        $(this).css('opacity', '1');
    })
    
    $('.cc').mouseleave(function(){
        if($(this).is(x)){
        }else{
            $(this).css('opacity', '0.4');
        }
    })
    
    $('.cc').click(function(){
        $('.cc').css('opacity', '0.4');
        $(this).css('opacity', '1');
        x = $(this);
    })
    
    $('#card_number').keyup(function(){
        $('#ccn').text($(this).val());
    })
    
    $('#complete').click(function(){
        if($('#card_number').val() != "abc"){
            $.session.set('bonusPoints', '1598');
            $( "#dialog-message-success" ).dialog( "open" );
		} else {
			$( "#dialog-message-fail" ).dialog( "open" );
		}
        // window.location.href = "index.html";
    })
    
    $( "#dialog-message-success" ).dialog({
    	autoOpen: false,
	      show: {
	        effect: "blind",
	        duration: 1000
	      },
	      hide: {
	        effect: "explode",
	        duration: 1000
	      },
	      width: 400,
	      resizable: false,
	      height: "auto",
      modal: true,
      buttons: {
        Finish: function() {
          $( this ).dialog( window.location.href = "index.html" );
        }
      }
    });

    $( "#dialog-message-fail" ).dialog({
    	autoOpen: false,
	      show: {
	        effect: "blind",
	        duration: 1000
	      },
	      hide: {
	        effect: "explode",
	        duration: 1000
	      },
	      width: 400,
	      resizable: false,
	      height: "auto",
      modal: true,
      buttons: {
        Close: function() {
          $( this ).dialog( "close" );
        }
      }
    });
    
    $('.login').on('click', function(){
        window.location.href = "login.html";
    })
    
    $('.create').on('click', function(){
        window.location.href = "signup.html";
    })

});
