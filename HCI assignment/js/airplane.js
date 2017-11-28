// JavaScript File
$(document).ready(function() {

    // var availableSearch = [
    // "Vestin Residence Myeongdong",
    // "Hilton Tokyo"
    // ];
    // $("#search-product").autocomplete({
    //     source: availableSearch
    // });

    /*
        search function
    */

    // search
    jQuery.expr[":"].casecontains = function(a, i, m) {
        return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    $("#search-product").keyup(function() {
        $('.product-container').hide();
        $(".full-product").hide().filter(":casecontains('" + ($(this).val()) + "')").show();
        $('.product-container').stop(true, true).effect('slide', {
            direction: "down"
        }, 500);
    });


    //sort
    $('#sortlist').on('change', function() {
        $('.product-container').hide();

        if ($(this).val() == "star") {
            var star_array = [];
            $('.full-product').each(function() {
                star_array.push($(this).find('.product-star').text());
            });

            star_array.sort();

            $.each(star_array, function(index) {
                var starNumber = star_array[index];
                $.each($('.full-product'), function() {
                    if ($(this).find('.product-star').text() == starNumber) {
                        $(this).insertAfter($('#inser-after'));
                    }
                });
            });

        }
        else if ($(this).val() == "rating") {
            var rating = [];
            $('.full-product').each(function() {
                rating.push($(this).find('.product-rating').text());
            });

            rating.sort();

            $.each(rating, function(index) {
                var currentRating = rating[index];
                $.each($('.full-product'), function() {
                    if ($(this).find('.product-rating').text() == currentRating) {
                        $(this).insertAfter($('#inser-after'));
                    }
                });
            });
        }
        else if ($(this).val() == "lPrice") {
            var price_array = [];
            $('.full-product').each(function() {
                price_array.push($(this).find('.product-price').text());
            });

            price_array.sort(function(a,b){
                return a - b
            });

            $.each(price_array, function(index) {
                var currentPrice = price_array[index];
                $.each($('.full-product'), function() {
                    if ($(this).find('.product-price').text() == currentPrice) {
                        $(this).insertBefore($('#inser-after'));
                    }
                });
            });
        }

        $('.product-container').stop(true, true).effect('slide', {
            direction: "down"
        }, 500);

    });


    //categories
    $('input:checkbox[name="categories"]').on('change', function() {
        $('.product-container').hide();
        $(".full-product").hide();
        $('input:checkbox[name="categories"]:checked').each(function() {
            var t = this.value;
            $("." + t).show();
        });
        $('.product-container').stop(true, true).effect('slide', {
            direction: "down"
        }, 500);
    });
    
    if ($.urlParam('category') == null || $.urlParam('category') == "all") {
        $('input:checkbox[name="categories"]').attr('checked', true).change();
    } else {
        $('input:checkbox[name="categories"][value="' + $.urlParam('category') + '"]').attr('checked', true).change();
    }


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
        width:700,
        buttons: {
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    });

    $(".product-info").on("click", function() {
        var code = $(this).find('.product-code').text();
        $("#product-dialog-" + code).dialog("open");
        $(".detailsTable").css("display","inline")
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
        $(this).find('button').stop(true, true).css('background', "#b4bf04 none repeat scroll 0 0");
        $(this).find('button').stop(true, true).effect('slide', 500).text("Click To View Details");
    }, function() {
        $(this).find('button').stop(true, true).text(original_text);
        $(this).find('button').stop(true, true).css('background', "#444 none repeat scroll 0 0");
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
