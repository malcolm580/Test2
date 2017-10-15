// JavaScript File
$(document).ready(function() {
    
    $(".accordion").accordion({ header: "h3", collapsible: true, active: false });
    
    var availableQuestion = [
        "How to buy products",
        "How to register an account",
        "When will my ordered items arrive",
        "How can I get discount",
        "Does Happy Travel disclose the personal information of their customers to third party",
    ];
    $("#search-question").autocomplete({
        source: availableQuestion
    });
    
    
    // search
    jQuery.expr[":"].casecontains = function(a, i, m) {
        return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    $("#search-question").keyup(function() {
        var searchVal = "xx!Noting will contains that!xx";
        
        if($(this).val() != null && $(this).val() != "")
            searchVal = $(this).val();
        
        $(".accordion").accordion({active: false});
        $(".accordion").filter(":casecontains('" + (searchVal) + "')").accordion({active: 0});
    });
    
    var keyword = $.urlParam('question');
    if (keyword != null && keyword != "") {
        keyword = $.urlParam('question').replace(/\++/g, ' ');
        $(".accordion").filter(":casecontains('" + (keyword) + "')").accordion({active: 0});
    }
    
});