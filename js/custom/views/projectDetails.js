function projectDetailsViewPageLoad() {
    var projectURL = $("#projectDetailsContainer").attr('data-project-url');
    loadProjectDetailsContent(projectURL);
}

function projectDetailsViewPreSwitchTemplate(url) { 
    var doesURLEndWithSlash = url[url.length - 1] === "/";
    if (doesURLEndWithSlash) {
        url = url.substring(0, url.length - 1);
    }
    var projectID = url.substr(url.lastIndexOf('/') + 1);

    var findAndProcessPortfolioItems = function (portfolioItems) {
        for (var i = 0; i < portfolioItems.projects.length; i++) {
            var sourceBase = portfolioItems.projects[i].sourceBase; 
            var basename = doesProjectIDContainPin(sourceBase) ? sourceBase.replace(".pin.md", "") : sourceBase.replace(".md", "");
            if (projectID === basename) {
                redirectToProjectDetails(projectID, portfolioItems.projects[i].relativeURL, encodeURI(portfolioItems.projects[i].title));
                break;
            } 
        }
    };

    var localValue = getLocalData("projectDetailsPartial");
    if (localValue !== "" && localValue !== null) {
        findAndProcessPortfolioItems(localValue);
        return;
    }

    $.get("https://api.clydedsouza.net/allportfolio.json", function (data) {
        var allProjectData = { projects: [] };
        for (var i = 0; i < Object.keys(data.fileMap).length; i++) {
            allProjectData.projects.push(data.fileMap[Object.keys(data.fileMap)[i]]);
        }
        allProjectData.expiresOn = getExpiryTime();
        storeDataLocally("projectDetailsPartial", allProjectData);
        findAndProcessPortfolioItems(allProjectData);
    });
}

function loadProjectDetailsContent(url) {
    var localValue = getLocalData(url);
    var isLocalValueEmpty = localValue === "" || localValue === null;
    var projectDetailsLoadingInProgress = getLocalData("loadProjectDetailsContent");

    if (isLocalValueEmpty && !projectDetailsLoadingInProgress) {
        storeDataLocally("loadProjectDetailsContent", true); 
        $.get(url, function (data) {
            var parsedYaml = yamlFront.loadFront(data);
            var parsedYamlHtml = marked(parsedYaml.__content); 
            var projectDetailsObject = {
                projectDetails: parsedYamlHtml,
                expiresOn: getExpiryTime()
            };
            storeDataLocally(url, projectDetailsObject); 
            $("#projectDetailsContainer").html(parsedYamlHtml);
            storeDataLocally("loadProjectDetailsContent", false); 
        });  
    }
    else {
        $("#projectDetailsContainer").html(localValue.projectDetails);
        storeDataLocally("loadProjectDetailsContent", false); 
    }
    
} 
 

