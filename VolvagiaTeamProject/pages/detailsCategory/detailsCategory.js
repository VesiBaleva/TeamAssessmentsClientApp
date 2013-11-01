// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/detailsCategory/detailsCategory.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var currentCategoryIndex = options.indexInCategoriesList;
            DetailsCategoryCodeBehind.currentCategoryIndex = currentCategoryIndex;
            var currCategory = ViewModels.Categories.categories.getAt(currentCategoryIndex);
            WinJS.Binding.processAll(element, currCategory);
            DetailsCategoryCodeBehind.loadAssignments(currentCategoryIndex);
            var assignments = ViewModels.Assignments.assignments;
            WinJS.Binding.processAll(document.getElementById("assignmentsListView"), assignments);

            var listView = document.getElementById("assignmentsListView").winControl;
            //listView.oniteminvoked = function (invokeEvent) {
            //    WinJS.Navigation.navigate("/pages/detailBabyEvent/detailBabyEventl.html", {
            //        indexInProfilesList: currentProfileIndex,
            //        indexInEventsList: invokeEvent.detail.itemIndex
            //    });
            //}
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
