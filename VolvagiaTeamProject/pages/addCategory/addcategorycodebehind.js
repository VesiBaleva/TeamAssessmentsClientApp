/// <reference path="../../js/viewmodels.js" />

(function () {
    var goToHomePage = function () {
        WinJS.Navigation.navigate("/pages/home/home.html");
    }

    WinJS.Utilities.markSupportedForProcessing(goToHomePage);

    WinJS.Namespace.define("AddCategoryCodeBehind", {
        goToHomePage: goToHomePage
    })
})();