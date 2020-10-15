function pinnedViewPageLoad() {
}

function pinnedViewPreSwitchTemplate() {
    loadPinnedItems();
}

function loadPinnedItems() {
    var localValue = getLocalData("pinnedPartial");
    if (localValue !== "" && localValue !== null) {
        localValue.projects = localValue.projects.slice(0, 4);
        switchTemplate("projectsRepeaterPartial", localValue);
        return; 
    }
    $.get("https://api.clydedsouza.net/allpinned.json", function (data) {
        getProjectItems(data.fileMap, "pinnedPartial");
    });  
} 
 

