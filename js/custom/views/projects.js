function projectViewPageLoad() { 
    projectRepeaterViewPreSwitchTemplate("https://api.clydedsouza.net/allprojects.json", "projectsPartial");
}

function projectViewPreSwitchTemplate() {
    switchTemplate("projectsPartial", {});
}

