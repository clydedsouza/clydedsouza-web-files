function booksViewPageLoad() {
    projectRepeaterViewPreSwitchTemplate("https://api.clydedsouza.net/allbooks.json", "booksPartial");
    searchControlViewPreSwitchTemplate();
}


function booksViewPreSwitchTemplate() {
    switchTemplate("booksPartial", {});
}

