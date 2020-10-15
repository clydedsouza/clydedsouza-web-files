function searchControlViewPageLoad() {
    initSearchControls(); 
}


function searchControlViewPreSwitchTemplate() {
    switchTemplate("searchControlPartial", {});
}


function initSearchControls() {
    var searchControlParentView = $("nav a.active").attr('data-partialview');

    initMultiselect(searchControlParentView);

    $("#searchBtn").on("click", function () { 
        var filter = {
            searchText: $("#searchTxt").val(),
            showInactive: $("#includeInactive").is(":checked")
        };
        filterAndDisplayProjectItems(filter, searchControlParentView);
    });

    $("#searchTxt").on("keyup", function () {
        var searchInput = $("#searchTxt").val(); 
        if (searchInput.length > 0 && searchInput.length < 3) {
            return;
        }
        var filter = {
            searchText: searchInput,
            showInactive: $("#includeInactive").is(":checked")
        };
        filterAndDisplayProjectItems(filter, searchControlParentView);
    });
    $("#includeInactive").change(function () { 
        var filter = {
            searchText: $("#searchTxt").val(),
            showInactive: this.checked
        }; 
        filterAndDisplayProjectItems(filter, searchControlParentView); 
    });
}

function initMultiselect(key) {
    var projectItemsData = getLocalData(key);
    if (projectItemsData === "" || projectItemsData === null) {
        $('#techMultiselect').hide();
        $('#categoriesMultiselect').hide();
        return;
    }

    var multiselectData = {categories : [], madeUsing: []};

    for (var i = 0; i < projectItemsData.projects.length; i++) {

        if (key === "projectsPartial") {
            for (var j = 0; j < projectItemsData.projects[i].madeUsing.length; j++) {
                multiselectData.madeUsing.push(projectItemsData.projects[i].madeUsing[j]); 
            } 
        }

        multiselectData.categories.push(projectItemsData.projects[i].category);
        
    } 

    var refinedMultiselectData = { categories: [], madeUsing: [] };
    var searchControlParentView = $("nav a.active").attr('data-partialview');

    $.each(multiselectData.categories, function (i, el) { 
        var targetData = refinedMultiselectData.categories.map(function (a) { return a.label; }); 
        if ($.inArray(el, targetData) === -1) {
            refinedMultiselectData.categories.push({
                label: el, title: el, value: el
            }); 
        }
    });     

    if (key === "projectsPartial") {
        $.each(multiselectData.madeUsing, function (i, el) {
            var targetData = refinedMultiselectData.madeUsing.map(function (a) { return a.label; });
            if ($.inArray(el, targetData) === -1) {
                refinedMultiselectData.madeUsing.push({
                    label: el, title: el, value: el
                });
            }
        });
        $('#techMultiselect').multiselect({
            enableFiltering: true,
            maxHeight: 200,
            nonSelectedText: 'Filter by tech',
            enableCaseInsensitiveFiltering: true,
            templates: {
                filter: '<li class="multiselect-item multiselect-filter"><div class="input-group"><span class="input-group-addon"><i class="fas fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="fas fa-times"></i></button></span>'
            },
            onChange: function (element, checked) {
                var filter = {
                    searchText: $("#searchTxt").val(),
                    showInactive: $("#techMultiselect").is(":checked"),
                    techOptions: getSearchMultiselectOptions($('#techMultiselect option:selected')),
                    categoryOptions: getSearchMultiselectOptions($('#categoriesMultiselect option:selected'))
                }; 
                filterAndDisplayProjectItems(filter, searchControlParentView);
            }
        });
        $('#techMultiselect').multiselect('dataprovider', refinedMultiselectData.madeUsing);
    }
    else {
        $('#techMultiselect').hide();
    }

    if (key === "speakingPartial" || key === "teachingPartial") {
        $("#includeInactiveContainer").hide();
    }


    $('#categoriesMultiselect').multiselect({
        enableFiltering: true,
        maxHeight: 200,
        nonSelectedText: 'Filter by category',
        enableCaseInsensitiveFiltering: true,
        templates: {
            filter: '<li class="multiselect-item multiselect-filter"><div class="input-group"><span class="input-group-addon"><i class="fas fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
            filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="fas fa-times"></i></button></span>'
        },
        onChange: function (element, checked) {
            var filter = {
                searchText: $("#searchTxt").val(),
                showInactive: $("#techMultiselect").is(":checked"),
                techOptions: getSearchMultiselectOptions($('#techMultiselect option:selected')),
                categoryOptions: getSearchMultiselectOptions($('#categoriesMultiselect option:selected'))
            };
            filterAndDisplayProjectItems(filter, searchControlParentView);
        }
    });
    $('#categoriesMultiselect').multiselect('dataprovider', refinedMultiselectData.categories);
}

function getSearchMultiselectOptions(searchMultiselectSelectedOptions) {
    var selectedOptions = [];
    for (var so = 0; so < searchMultiselectSelectedOptions.length; so++) {
        selectedOptions.push(searchMultiselectSelectedOptions[so].label);
    }
    return selectedOptions;
}
