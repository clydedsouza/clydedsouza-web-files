function speakingViewPageLoad() {
    projectRepeaterViewPreSwitchTemplate("https://api.clydedsouza.net/allspeaking.json", "speakingPartial");
    searchControlViewPreSwitchTemplate();
}


function speakingViewPreSwitchTemplate() {
    switchTemplate("speakingPartial", {});
}

