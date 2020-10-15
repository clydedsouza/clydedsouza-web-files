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
            searchControlViewPreSwitchTemplate();
        });
    }
    else {
        var filter = { searchText: "", showInactive: false };
        localValue = applySearchFilter(filter, localValue);
        switchTemplate("projectsRepeaterPartial", localValue);
        searchControlViewPreSwitchTemplate();
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
    switchTemplate("projectsRepeaterPartial", allProjectData);
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

    var applyCategoryFilter = function (currentProject) {
        var isTechOptionsEmpty = searchFilter.techOptions === null || searchFilter.techOptions === undefined || searchFilter.techOptions.length === 0;
        var isCategoryOptionsEmpty = searchFilter.categoryOptions === null || searchFilter.categoryOptions === undefined || searchFilter.categoryOptions.length === 0;

        if (isTechOptionsEmpty && isCategoryOptionsEmpty) {
            // If the search filters are empty, we want to show the project item
            return true;
        }

        var projectMeetsTechOptionsFilter = function () {
            if (isTechOptionsEmpty) return true;
            for (var to = 0; to < currentProject.madeUsing.length; to++) {
                if (searchFilter.techOptions.includes(currentProject.madeUsing[to])) {
                    return true;
                }
            }
            return false;
        };
        var projectMeetsCategoryOptionsFilter = function () {
            if (isCategoryOptionsEmpty) return true; 
            return searchFilter.categoryOptions.includes(currentProject.category);
        }; 
        return projectMeetsTechOptionsFilter() && projectMeetsCategoryOptionsFilter();
    };

    for (var i = 0; i < projectItemData.projects.length; i++) {

        if (projectItemData.projects[i].title.toLowerCase().indexOf(searchFilter.searchText) > -1) {
            var inactiveSearchFilter = searchFilter.showInactive || projectItemData.projects[i].isActive === undefined || projectItemData.projects[i].isActive;
            
            if (inactiveSearchFilter) { 
                if (!applyCategoryFilter(projectItemData.projects[i])) {
                    continue;
                } 
                allProjectData.projects.push(projectItemData.projects[i]);
            }      
        }
    }

    return allProjectData;
}

function redirectToProjectDetails(projectID, relativeURL, projectTitle) {
    var projectURL = doesProjectIDContainPin(projectID) ? projectID.replace(".pin.md", "") : projectID.replace(".md", "");
    var projectDetailsOutput = {
        data: "https://raw.githubusercontent.com/clydedsouza/clydedsouza-web-api/gh-pages" + relativeURL,
        projectTitle: projectTitle
    };
    switchTemplate("projectDetailsPartial",  projectDetailsOutput );
    window.location.href = "/#/portfolio/" + projectURL; 
}

function doesProjectIDContainPin(projectID) {
    return projectID.indexOf(".pin") > 0;
}