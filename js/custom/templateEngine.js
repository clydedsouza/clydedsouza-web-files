function getCacheInvalidationDate() {
    return "?v=" + appVersion;
}

// A collection of valid templates with its views, its content source, and
// load and preload methods.
var templates = {
    "introPartial": {
        "container": "#templateHolder",
        "contents": "partials/intro.html" + getCacheInvalidationDate() + " #introPartial",
        "view": "#view",
        "cache": "",
        "initView": function () {
            activateNavigationMenuItem("introPartial");
            introViewPageLoad();
        },
        "preSwitchTemplate": function () {
            introViewPreSwitchTemplate();
        }
    }, 
    "projectsPartial": {
        "container": "#templateHolder",
        "contents": "partials/projects.html" + getCacheInvalidationDate() + " #projectsPartial",
        "view": "#view",
        "cache": "",
        "initView": function () { 
            activateNavigationMenuItem("projectsPartial"); 
            projectViewPageLoad();
        },
        "preSwitchTemplate": function () {
            projectViewPreSwitchTemplate();
        }
    },
    "projectsRepeaterPartial": {
        "container": "#projectsPartialTemplateHolder",
        "contents": "partials/projectsRepeater.html" + getCacheInvalidationDate() + " #projectsRepeaterPartial",
        "view": "#projectsPartialView",
        "cache": "",
        "initView": function () {
            projectRepeaterViewPageLoad();
        },
        "preSwitchTemplate": function () {
        }
    },
    "speakingPartial": {
        "container": "#templateHolder",
        "contents": "partials/speaking.html" + getCacheInvalidationDate() + " #speakingPartial",
        "view": "#view",
        "cache": "",
        "initView": function () {
            activateNavigationMenuItem("speakingPartial");
            speakingViewPageLoad();
        },
        "preSwitchTemplate": function () {
            speakingViewPreSwitchTemplate();
        }
    },
    "teachingPartial": {
        "container": "#templateHolder",
        "contents": "partials/teaching.html" + getCacheInvalidationDate() + " #teachingPartial",
        "view": "#view",
        "cache": "",
        "initView": function () {
            activateNavigationMenuItem("teachingPartial");
            teachingViewPageLoad();
        },
        "preSwitchTemplate": function () {
            teachingViewPreSwitchTemplate();
        }
    },
    "booksPartial": {
        "container": "#templateHolder",
        "contents": "partials/books.html" + getCacheInvalidationDate() + " #booksPartial",
        "view": "#view",
        "cache": "",
        "initView": function () {
            activateNavigationMenuItem("booksPartial");
            booksViewPageLoad();
        },
        "preSwitchTemplate": function () {
            booksViewPreSwitchTemplate();
        }
    },
    "searchControlPartial": {
        "container": "#searchControlPartialTemplateHolder",
        "contents": "partials/searchControl.html" + getCacheInvalidationDate() + " #searchControlPartial",
        "view": "#searchControlPartialView",
        "cache": "",
        "initView": function () { 
            searchControlViewPageLoad();
        },
        "preSwitchTemplate": function () { 
        }
    },
    "projectDetailsPartial": {
        "container": "#templateHolder",
        "contents": "partials/projectDetails.html" + getCacheInvalidationDate() + " #projectDetailsPartial",
        "view": "#view",
        "cache": "",
        "initView": function () { 
            deactivateAllNavigationMenuItems();
            projectDetailsViewPageLoad();
        },
        "preSwitchTemplate": function () {
            projectDetailsViewPreSwitchTemplate(window.location.href);
        }
    }
};

function getTemplateProperties(templateName) { 
    return templates[templateName];
}

function activateNavigationMenuItem(templateName) {
    deactivateAllNavigationMenuItems();
    $("nav a[data-partialview='" + templateName+"']").addClass('active');
}

function deactivateAllNavigationMenuItems() {
    $("nav a").removeClass('active');
}

function renderTemplateToView(htmlViewID, htmlTemplate, jsData) {
    /// <summary>Helper method to cache partial views and not request again.</summary>

    var output = Mustache.render(htmlTemplate, jsData);
    $(htmlViewID).html(output);
}

function switchTemplate(templateName, templateData) {
    /// <summary>Method to switch to a different template.</summary>
    /// <param name="templateName" type="string">The template to be loaded.</param> 

    var template = getTemplateProperties(templateName);

    if (template.cache !== "" && template.cache !== null) {
        renderTemplateToView(template.view, template.cache, templateData);
        template.initView();
        return; 
    }

    $(template.container).load(template.contents, function () {
        if (document.getElementById(templateName) === null) {
            return;
        }
        template.cache = document.getElementById(templateName).innerHTML;
        renderTemplateToView(template.view, template.cache, templateData);
        template.initView();
    });
}


 