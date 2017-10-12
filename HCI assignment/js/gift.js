// JavaScript File
$(document).ready(function() {

    var availableSearch = [
        "Sandisk",
        "ADATA",
        "Kingston",
        "Logitech",
        "Razer",
        "Steelseries",
        "GIGABYTE",
        "COBOL",
        "Sandisk Ultra",
        "Sandisk SDCZ43 Ultra",
        "ADATA DashDrive Elite",
        "Logitech MX Master",
        "Razer DeathAdder Elite",
        "Steelseries Rival 500",
        "GIGABYTE M7800E",
        "32GB",
        "64GB",
        "128GB",
        "Wireless",
        "Wired"
    ];
    $("#search-product").autocomplete({
        source: availableSearch
    });

    /*
        search function
    */

    // search
    jQuery.expr[":"].casecontains = function(a, i, m) {
        return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    $("#search-product").keyup(function() {
        $('.product-container').hide();
        $(".product").hide().filter(":casecontains('" + ($(this).val()) + "')").show();
        $('.product-container').stop(true, true).effect('slide', {
            direction: "down"
        }, 500);
    });


    //sort
    $('#sortlist').on('change', function() {
        $('.product-container').hide();

        if ($(this).val() == "new") {
            var date_array = [];
            $('.product').each(function() {
                date_array.push($(this).find('.product-date').text().replace('-', ''));
            });

            date_array.sort();

            $.each(date_array, function(index) {
                var currentDate = date_array[index];
                $.each($('.product'), function() {
                    if ($(this).find('.product-date').text().replace('-', '') == currentDate) {
                        $(this).insertAfter($('#inser-after'));
                    }
                });
            });

        }
        else if ($(this).val() == "popular") {
            var popular_array = [];
            $('.product').each(function() {
                popular_array.push($(this).find('.product-rating').text());
            });

            popular_array.sort();

            $.each(popular_array, function(index) {
                var currentRating = popular_array[index];
                $.each($('.product'), function() {
                    if ($(this).find('.product-rating').text() == currentRating) {
                        $(this).insertAfter($('#inser-after'));
                    }
                });
            });
        }
        else if ($(this).val() == "lPrice") {
            var price_array = [];
            $('.product').each(function() {
                price_array.push(parseInt($(this).find('.product-price').text()));
            });
            
            price_array.sort(sortNumber);
            
            console.log(price_array)
            $.each(price_array, function(index) {
                var currentPrice = price_array[index];
                $.each($('.product'), function() {
                    if (parseInt($(this).find('.product-price').text()) == parseInt(currentPrice)) {
                        $(this).insertBefore($('#inser-after'));
                    }
                });
            });
        }
        
        function sortNumber(a, b)
        {
            return a - b
        }
        
        $('.product-container').stop(true, true).effect('slide', {
            direction: "down"
        }, 500);
    });


    /*
        dialog
    */
    $(".product-dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 500
        },
        hide: {
            effect: "explode",
            duration: 500
        },
        modal: true,
        resizable: false,
        width: 600,
        buttons: {
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    });

    $(".product-info").on("click", function() {
        var code = $(this).find('.product-code').text();
        $("#product-dialog-" + code).dialog("open");
    });
    
    //opean a dialog has parameter 
    if ($.urlParam('product') != null) {
        $('.product-code:contains("'+$.urlParam('product')+'")').parent('.product-info').click();
    }

    /*
        mouse enter effect
    */

    //mouse enter product
    var original_text = "";
    $(".product").hover(function() {
        original_text = $(this).find('button').text();
        if($.session.get('bonusPoints') == null) {
            $(this).find('button').stop(true, true).css('background', "#efa63f none repeat scroll 0 0");
            $(this).find('button').stop(true, true).effect('slide',{direction :"right"}, 500).text("Sign In");
            $(this).find('button').attr("disabled", true);
        } else if(parseInt($.session.get('bonusPoints')) < parseInt($(this).find('.product-price').text())) {
            $(this).find('button').stop(true, true).css('background', "#efa63f none repeat scroll 0 0");
            $(this).find('button').stop(true, true).effect('slide',{direction :"right"}, 500).text("Not Enough");
            $(this).find('button').attr("disabled", true);
        } else {
            $(this).find('button').stop(true, true).css('background', "#4ccf4b none repeat scroll 0 0");
            $(this).find('button').stop(true, true).effect('slide',{direction :"right"}, 500).text("Add to Cart");
            $(this).find('button').attr("disabled", false);
        }
    }, function() {
        $(this).find('button').stop(true, true).text(original_text);
        $(this).find('button').stop(true, true).css('background', "#4ebbdb none repeat scroll 0 0");
    });

    // $("aside .customform label").hover(function() {

    // } ,function() {

    // });

    // enter show the tips
    $(".product-info").tooltip({
        track: true,
        show: {
            effect: "slideDown",
            delay: 250
        }
    });

    // zoom in picture
    $('.dialog-img').zoom();
});
