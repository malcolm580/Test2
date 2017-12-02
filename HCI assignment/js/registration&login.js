$(document).ready(function () {
    var isValidEmail = false;
    var isValidPhone = false;
    var isValidPassword = false;
    var isPasswordMatch = false;
    var isValidStuID = false;
    var isValidUsername = false;

    // To count number of individual terms
    var characters = 0;
    var capitalletters = 0;
    var loweletters = 0;
    var number = 0;
    var special = 0;

    //Upper Characters
    var upper = new RegExp('[A-Z]');
    //Lower Characters
    var lower = new RegExp('[a-z]');
    //Numbers
    var numbers = new RegExp('[0-9]');
    //Special char
    var specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');

    $("#stuid").hide();
    $("#chcampus").hide();
    $("#id_cb").on('change', function () { // on change of state
        if (this.checked) // if changed state is "CHECKED"
        {
            $("#stuid").show();
            $("#chcampus").show();
        } else {
            $("#stuid").hide();
            $("#chcampus").hide();
        }
    });

    $("#forgot_pw").hide();
    $("#forgot_cb").on('change', function () { // on change of state
        if (this.checked) // if changed state is "CHECKED"
        {
            $("#forgot_pw").show();
        } else {
            $("#forgot_pw").hide();
        }
    });

    // $.urlParam = function(name, url) {
    //     if (!url) {
    //      url = window.location.href;
    //     }
    //     var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    //     if (!results) {
    //         return undefined;
    //     }
    //     return results[1] || undefined;
    // }

    // if($.urlParam('action') == "login"){
    // $("#pic").hide().show( 2000 );
    // }

    $("#password").keyup(function () {
        var passStr = $("#password").val();
        var val = $("#password").val().length * 5;

        var strength = check_strength(passStr);

        if (passStr.length < 8 || strength < 4) {
            isValidPassword = false;
            val = val > 30 ? 30 : val;
            $("#password_strength").animate({value: val}, 400);
            $("#ps_msg").html("Password Strength: Week").css("color", "red");
        } else if (passStr.length >= 8 && passStr.length < 12) {
            isValidPassword = false;
            val = val > 60 ? 60 : val;
            $("#password_strength").animate({value: val}, 400);
            $("#ps_msg").html("Password Strength: Good").css("color", "green");
        } else {
            $("#password_strength").animate({value: val}, 400);
            isValidPassword = true;
        }
    }).focusout(function (event) {
        var passStr = $("#password").val();
        var username = $("#firstname").val();
        if (passStr == username) {
            isValidPassword = false;
            $("#ps_msg").html("Password same as Username").css("color", "red");
        }
        if (passStr.length == 0) {
            $("#pass1_indicator").removeClass().addClass("icon into");
            $("#ps_msg").html("");
        } else {
            isValidPassword = true;
            $("#pass1_indicator").removeClass().addClass("icon ticker");
        }
    }).keydown(function (event) {
        if (event.which == 13) {
            event.preventDefault();
        }
    });

    $("#confirm_password").focusout(function () {
        var passStr = $("#confirm_password").val();
        var passLen = $("#confirm_password").val().length;

        var val = $("#password").val();
        var len = $("#password").val().length;

        if (passLen == len) {
            if (passStr == val) {
                isPasswordMatch = true;
                $("#pass_indicator").removeClass().addClass("icon ticker");
                $("#cp_msg").html("Password match").css("color", "green");
            } else {
                isPasswordMatch = false;
                $("#pass_indicator").removeClass().addClass("icon into");
                $("#cp_msg").html("Password not match").css("color", "red");
            }
        } else {
            isPasswordMatch = false;
            $("#pass_indicator").removeClass().addClass("icon into");
            $("#cp_msg").html("Password not match").css("color", "red");
        }
    }).focusin(function () {
        $("#pass_indicator").removeClass();
    });

    function check_strength(thisval) {
        if (thisval.length > 7) {
            characters = 1;
        } else {
            characters = -1;
        }
        ;
        if (thisval.match(upper)) {
            capitalletters = 1
        } else {
            capitalletters = 0;
        }
        ;
        if (thisval.match(lower)) {
            loweletters = 1
        } else {
            loweletters = 0;
        }
        ;
        if (thisval.match(numbers)) {
            number = 1
        } else {
            number = 0;
        }
        ;
        if (thisval.match(special)) {
            special = 1
        } else {
            special = 0;
        }
        ;

        var total = characters + capitalletters + loweletters + number + special;

        if (!thisval.length) {
            total = -1;
        }

        return total;
    }

    $("#stuid").focusout(function () {
        var stuidStr = $("#stuid").val();
        if (stuidStr.length == 9) {
            isValidStuID = true;
            $("#stuid_indicator").removeClass().addClass("icon ticker");
        } else {
            isValidStuID = false;
            $("#stuid_indicator").removeClass().addClass("icon into");
        }
    }).focusin(function () {
        $("#stuid_indicator").removeClass();
    });

    // $("#stuid").attr("maxlength", 9);

    $("#username").focusout(function () {
        var usernameStr = $("#username").val();
        if (usernameStr.length > 0) {
            isValidUsername = true;
            $("#username_indicator").removeClass().addClass("icon ticker");
        } else {
            isValidUsername = false;
            $("#username_indicator").removeClass().addClass("icon into");
        }
    }).focusin(function () {
        $("#username_indicator").removeClass();
    });

    $("#email").focusout(function () {
        var emailStr = $("#email").val();
        if (emailStr == "abc@gmail.com") {
            isValidEmail = true;
            $("#email_indicator").removeClass().addClass("icon ticker");
        } else {
            isValidEmail = false;
            $("#email_indicator").removeClass().addClass("icon into");
        }
    }).focusin(function () {
        $("#email_indicator").removeClass();
    });

    $("#phone").focusout(function () {
        var phoneStr = $("#phone").val();
        var len = $("#phone").val().length;

        if (len == 8) {
            if (isNaN(phoneStr)) {
                isValidPhone = false;
                $("#phone_indicator").removeClass().addClass("icon into");
            } else {
                isValidPhone = true;
                $("#phone_indicator").removeClass().addClass("icon ticker");
            }
        } else {
            isValidPhone = false;
            $("#phone_indicator").removeClass().addClass("icon into");
        }
    }).focusin(function () {
        $("#phone_indicator").removeClass();
    });

    $("#submit").click(function () {
        if (isValidPassword && isPasswordMatch && isValidEmail && isValidPhone && isValidUsername) {
            $.session.set('username', $("#username").val());
            $.session.set('password', $("#password").val());
            $.session.set('telephone', $("#phone").val());
            $.session.set('email', $("#email").val());
            $.session.set('studentID', $("#stuid").val());
            $.session.set('bonusPoints', "0");

            swal({
                title: "Congratulations",
                text: "You have successfully registered and subscribed to the service!!",
                icon: "success",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                if(willDelete) {
                    window.location = 'signupSurvey.html';
                }else{
                    $("#username").val('');
            $("#password").val('');
            $("#confirm_password").val('');
            $("#phone").val('');
            $("#email").val('');
            $("#stuid").val('');
            window.location = 'signup.html';

        }
        });

        } else {
            swal({
                title: "Sorry",
                text: "You have not entered proper information. Kindly re-submit the form!!",
                icon: "warning",
                button: "OK"
            });
        }
    });

    $("#SurveyComplete").click(function () {

        swal({
            title: "Confirmation",
            text: "Are you want to submit?",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
            if(willDelete) {
                window.location = 'index.html';
            }else{

            }

        })


    });


    $(window).click(function (e) {
        // alert(e.target.id);
        if (e.target.id == "") {
            $("#dialog-message-success").dialog("close");
            $("#dialog-message-fail").dialog("close");
        }
    });

    $("#dialog-message-success").dialog({
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
            Login: function () {
                $(this).dialog(window.location.href = "index.html");
            }
        }
    });

    $("#dialog-message-fail").dialog({
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
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#login_btn").click(function () {

        $.getJSON("accounts.json", function (acc) {
            for (i in acc.username) {
                if (acc.username[i] == $("#login_id").val()) {
                    $.session.set('username', acc.username[i]);
                    $.session.set('password', acc.password[i]);
                    $.session.set('telephone', acc.telephone[i]);
                    $.session.set('email', acc.email[i]);
                    $.session.set('studentID', acc.studentID[i]);
                    $.session.set('bonusPoints', acc.bonusPoints[i]);
                    window.location.href = "index.html";
                    return;
                }
            }

            $("#login_msg").html("Incorrect id or password !").css("color", "red");

        });

    });
});