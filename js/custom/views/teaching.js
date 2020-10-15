function teachingViewPageLoad() {
    projectRepeaterViewPreSwitchTemplate("https://api.clydedsouza.net/allteaching.json", "teachingPartial");
    searchControlViewPreSwitchTemplate();
}


function teachingViewPreSwitchTemplate() {
    switchTemplate("teachingPartial", {});
}

