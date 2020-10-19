function projectRepeaterViewPageLoad() {
}

function projectRepeaterViewPreSwitchTemplate(url, key) {
    loadProjectItems(url, key);
}


function loadProjectItems(url, key) {
    var localValue = getLocalData(key); 
    if (localValue === "" || localValue === null) {
        $.get(url, function (data) {
            getProjectItems(data.fileMap, key);
            searchControlViewPreSwitchTemplate({ showInactive: true });
        });
    }
    else {
        var filter = { searchText: "", showInactive: false };
        localValue = applySearchFilter(filter, localValue);
        switchTemplate("projectsRepeaterPartial", localValue);
        searchControlViewPreSwitchTemplate({ showInactive: true });
    }    
}

function getProjectItems(data, key) {
    var allProjectData = { projects: [] };
    for (var i = 0; i < Object.keys(data).length; i++) {
        allProjectData.projects.push(data[Object.keys(data)[i]]); 
    }
    allProjectData.projects = allProjectData.projects.reverse();
    allProjectData.expiresOn = getExpiryTime();
    storeDataLocally(key, allProjectData); 

    var filteredProjectItemData = applySearchFilter(getSearchFilter(), allProjectData); 
    switchTemplate("projectsRepeaterPartial", filteredProjectItemData);
}

function filterAndDisplayProjectItems(filter, searchControlParentView) {
    var projectItemData = getLocalData(searchControlParentView); 
    if (projectItemData === "" || projectItemData === null) {
        return;
    }

    projectItemData = applySearchFilter(filter, projectItemData); 
    switchTemplate("projectsRepeaterPartial", projectItemData);
}

function applySearchFilter(searchFilter, projectItemData) {
    var allProjectData = { projects: [] };

    for (var i = 0; i < projectItemData.projects.length; i++) {
        var currentProject = projectItemData.projects[i];
        var applyInactiveSearchFilter = searchFilter.showInactive
            || currentProject.isActive === undefined || currentProject.isActive;
        var applySearchTextFilter = isSearchTextFilterInvalid()
            || currentProject.title.toLowerCase().indexOf(searchFilter.searchText) > -1;

        //console.log(isSearchTextFilterInvalid(), applySearchTextFilter);

        if (applyInactiveSearchFilter && applySearchTextFilter) { 
            allProjectData.projects.push(projectItemData.projects[i]);
        } 
    }

    return allProjectData;
}

function redirectToProjectDetails(projectID, relativeURL, projectTitle) {
    var projectURL = doesProjectIDContainPin(projectID) ? projectID.replace(".pin.md", "") : projectID.replace(".md", "");
    var projectDetailsOutput = {
        data: "https://raw.githubusercontent.com/clydedsouza/clydedsouza-web-api/gh-pages" + relativeURL,
        projectTitle: decodeURI(projectTitle)
    };
    switchTemplate("projectDetailsPartial", projectDetailsOutput);
    window.location.href = "/#/portfolio/" + projectURL; 
}

function doesProjectIDContainPin(projectID) {
    return projectID.indexOf(".pin") > 0;
}