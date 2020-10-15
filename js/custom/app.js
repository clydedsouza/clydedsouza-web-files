var appVersion = 0.1;

// Start here
$(document).ready(function () {
    manageWebsiteRouting(window.location.href);
    
    $("nav a").on('click', function () {  
        activateNavigationMenuItem($(this).attr('data-partialview'));
        templates[$(this).attr('data-partialview')].preSwitchTemplate(); 
    }); 

    var browserURL = "";
    $(window).on('popstate', function (event) {
        // This handles the browser back and forward button.
        // The if..else is because when clicking read more to view project details
        // it seemed to go in a recursive loop maxing out call stack.
        if (browserURL === "") {
            browserURL = window.location.href;
            manageWebsiteRouting(window.location.href);
        }
        else {
            if (browserURL !== window.location.href) {
                browserURL = window.location.href;
                manageWebsiteRouting(window.location.href);
            }
        } 
    });

    // Loading spinner...
    setTimeout(function () {
        document.getElementById("loading").classList.add("animated");
        document.getElementById("loading").classList.add("fadeOut");
        setTimeout(function () {
            document.getElementById("loading").classList.remove("animated");
            document.getElementById("loading").classList.remove("fadeOut");
            document.getElementById("loading").style.display = "none";
        }, 800);
    }, 1500);
});