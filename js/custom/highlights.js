function loadRandomHighlight() {
    $.get("https://api.clydedsouza.net/allhighlights.json", function (data) {
        var jsonData = data.fileMap;
        var randomSelection = Math.floor(Math.random() * Object.keys(jsonData).length);
        var highlightData = jsonData[Object.keys(jsonData)[randomSelection]];
        $(".footer-highlights a, .sidebar-highlights a")
            .attr("href", highlightData.website)
            .text(highlightData.text);        
    });  
}