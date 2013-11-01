﻿/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    //var goToAddBabyEventPage = function () {
    //    var appBar = document.getElementById("detail-profile-app-bar").winControl;
    //    if (appBar) {
    //        appBar.hide();
    //    }
    //    WinJS.Navigation.navigate("/pages/addEvent/addEvent.html", {
    //        currentProfileIndex: DetailProfileCodeBehind.currentProfileIndex
    //    });
    //}

    var loadAssignments = function (indexInCategoriesArray) {
        ViewModels.Assignments.loadAssignments(indexInCategoriesArray);
    }

    //var goToEventDetailsPage = function (invokeEvent) {
    //    WinJS.Navigation.navigate("/pages/detailBabyEvent/detailBabyEventl.html", {
    //        indexInProfilesList: currentProfileIndex,
    //        indexInEventsList: invokeEvent.detail.itemIndex
    //    });
    //}

    var currentCategoryIndex = currentCategoryIndex || -1;

    //var goToUpdateBabyProfilePage = function () {
    //    var appBar = document.getElementById("detail-profile-app-bar").winControl;
    //    if (appBar) {
    //        appBar.hide();
    //    }
    //    WinJS.Navigation.navigate("/pages/updateBabyProfile/updateBabyProfile.html", {
    //        currentProfileIndex: DetailProfileCodeBehind.currentProfileIndex
    //    });
    //}

    //WinJS.Utilities.markSupportedForProcessing(goToAddBabyEventPage);
    //WinJS.Utilities.markSupportedForProcessing(goToUpdateBabyProfilePage);
    //WinJS.Utilities.markSupportedForProcessing(goToEventDetailsPage);

    WinJS.Namespace.define("DetailsCategoryCodeBehind", {
        loadAssignments: loadAssignments,
        currentCategoryIndex: currentCategoryIndex
    });
})();