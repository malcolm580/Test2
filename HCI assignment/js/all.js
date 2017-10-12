// JavaScript File

$(document).ready(function() {
    $('header').load('header.html',function() {
        
        var active = $('#active-page').text();
        if(active == null || active == "")
            active = "xnoting will contain thatx"
        console.log(active)
        $('#header-nav-bar-finder').find('li:contains("'+active+'")').addClass('active-item');
        
        var username = $.session.get('username');
        if(username) {
            
            $('.header-account').empty().html('<div class="s-6" style="margin-left:20px;">' +
                  '<h5><strong>Hello, <span style="color:red;">' + username + '</span></strong><p>'+$.session.get('bonusPoints')+' Bonus Points</p></h5>' +
                  '</div>'+
                  '<form class="customform s-4" onsubmit="logout(); return false;" style="margin-left:20px;">'+
                    '<p class="right s-12"><strong><button type="submit" class="logout" style="background: #007CCC;">Sign Out</button></strong></p>'+
                  '</form>');
            
        }
            
        var availableQuestion = [
            "How to buy products",
            "How to register an account",
            "When will my ordered items arrive",
            "How can I get discount",
            "Does BuyBestProduct Ltd. disclose the personal information of their customers to third party",
        ];
        $("#header-search").autocomplete({
            source: availableQuestion
        });
        
    });
    
    $('footer').load('footer.html');
    
});

function logout() {
   $.session.clear();
   window.location.href = "index.html";
}

/*
    Get url paramenter function
*/
$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results != null)
		return (results[1] || 0);
}

// example.com?param1=name&param2=&id=6
//$.urlParam('param1'); // name
//$.urlParam('id');        // 6
//$.urlParam('param2');   // null

//example params with spaces
//http://www.jquery4u.com?city=Gold Coast
//console.log($.urlParam('city'));  
//output: Gold%20Coast

//console.log(decodeURIComponent($.urlParam('city')));  
//output: Gold Coast