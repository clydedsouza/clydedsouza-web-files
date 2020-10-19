function searchControlViewPageLoad() {
    initSearchControls(); 
}

function searchControlViewPreSwitchTemplate(searchControls) {
    switchTemplate("searchControlPartial", searchControls);
}

function getSearchFilter() {
    var searchText = $("#searchTxt").val() == undefined || $("#searchTxt").val() == null ? "" : $("#searchTxt").val();
    return {
        searchText: searchText,
        showInactive: $("#includeInactive") ? $("#includeInactive").is(":checked") : true
    }; 
}

function isSearchTextFilterInvalid() {
    var searchInput = $("#searchTxt").val();
    if (searchInput == "") return false;
    return searchInput ? searchInput.length > 0 && searchInput.length < 3 : true;        
}

function initSearchControls() {
    var searchControlParentView = $("nav a.active").attr('data-partialview');
    $("#searchTxt").on("keyup", function () {
        if (isSearchTextFilterInvalid()) return;
        var filter = getSearchFilter();
        filterAndDisplayProjectItems(filter, searchControlParentView);
    });
    $("#includeInactive").change(function () { 
        var filter = getSearchFilter();
        filterAndDisplayProjectItems(filter, searchControlParentView); 
    });
}

function getSearchMultiselectOptions(searchMultiselectSelectedOptions) {
    var selectedOptions = [];
    for (var so = 0; so < searchMultiselectSelectedOptions.length; so++) {
        selectedOptions.push(searchMultiselectSelectedOptions[so].label);
    }
    return selectedOptions;
}
