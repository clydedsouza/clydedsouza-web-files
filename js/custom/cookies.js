
function showCookieNotice() {
    var cookieAccepted = getCookie("cookie-accepted");
    if (!cookieAccepted) return false;
    $(".cookie-notice").hide();
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(document).ready(function () {
    $(".cookie-notice a:first-child").on('click', function () {
        document.cookie = "cookie-accepted=true";
        $(".cookie-notice").hide();
    }); 
});
