
function storeDataLocally(dataKey, dataValue) {
    window.localStorage.setItem(dataKey, JSON.stringify(dataValue));
}

function getLocalData(dataKey) {
    var localdata = window.localStorage.getItem(dataKey);
    if (localdata === "" || localdata === null) {
        return "";
    }
    localdata = JSON.parse(localdata);
    if (localdata.expiresOn < new Date().getTime()) {
        return "";
    }
    return localdata;
}

function getExpiryTime() {
    var newdate = new Date();
    newdate.setDate(newdate.getDate() + 3);
    return newdate.getTime();
}