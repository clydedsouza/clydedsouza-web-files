window.onload = (function () {
    return function () {
        document.getElementsByClassName('website-body')[0].style.display = 'block'; //Shows the website body section
        setTimeout(function () {
            document.getElementsByClassName('website-loading')[0].style.display = 'none'; //Hides the website loading panel
            document.getElementsByClassName('fb-msg-button')[0].style.display = 'block'; //Shows the messenger FAB button
            document.getElementsByTagName('body')[0].style.overflowY = 'auto'; //Resets the body overflow setting
            setTimeout(loadBody, 500); //Fade in the body content including about and projects page
        }, 2000);
    }
})(window.onload);