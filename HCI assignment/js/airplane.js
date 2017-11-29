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
        $('.airplane-container').hide();
        $(".airplane").hide().filter(":casecontains('" + ($(this).val()) + "')").show();
        $('.airplane-container').stop(true, true).effect('slide', {
            direction: "down"
        }, 500);
    });


    //sort
    $('#sortlist').on('change', function() {
        $('.airplane-container').hide();

        if ($(this).val() == "Date") {
            var date_array = [];
            $('.airplane').each(function() {
                date_array.push($(this).find('.Date').text());
            });

            date_array.sort(function(a,b){
                return a - b
            });

            date_array.reverse();


            $.each(date_array, function(index) {

                var starNumber = date_array[index];
                $.each($('.airplane'), function() {
                    if ($(this).find('.Date').text() == starNumber) {
                        $(this).insertBefore($('#inser-after'));
                    }
                });
            });

        }
        else if ($(this).val() == "Rating") {
            var rating_array = [];
            $('.airplane').each(function() {
                rating_array.push($(this).find('.Rating').text());
            });

            rating_array.sort(function(a,b){
                return a - b
            });

            rating_array.reverse();


            $.each(rating_array, function(index) {

                var rateNumber = rating_array[index];
                $.each($('.airplane'), function() {
                    if ($(this).find('.Rating').text() == rateNumber) {
                        $(this).insertBefore($('#inser-after'));
                    }
                });
            });

        }
        // else if ($(this).val() == "lPrice") {
        //     var price_array = [];
        //     $('.full-product').each(function() {
        //         price_array.push($(this).find('.product-price').text());
        //     });
        //
        //     price_array.sort(function(a,b){
        //         return a - b
        //     });
        //
        //     $.each(price_array, function(index) {
        //         var currentPrice = price_array[index];
        //         $.each($('.full-product'), function() {
        //             if ($(this).find('.product-price').text() == currentPrice) {
        //                 $(this).insertBefore($('#inser-after'));
        //             }
        //         });
        //     });
        // }

        $('.airplane-container').stop(true, true).effect('slide', {
            direction: "down"
        }, 500);

    });


    //categories
    $('input:checkbox[name="categories"]').on('change', function() {
        $('.airplane-container').hide();
        $('.airplane').hide();
        $('input:checkbox[name="categories"]:checked').each(function() {
            var t = this.value;
            $("." + t).show();
        });
        $('.airplane-container').stop(true, true).effect('slide', {
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
        var code = $(this).val();
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
    $(".airplane").hover(function() {
        original_text = $(this).find('button').text();
        $(this).find('button').stop(true, true).css('background', "#b4bf04 none repeat scroll 0 0");
       // $(this).find('button').stop(true, true).effect('slide', 300).text("Click To View Details");
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
