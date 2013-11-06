// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/teamsAssignments/teamsAssignments.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var currentCategoryIndex = options.indexInCategoriesList;
            var currentTeamIndex = options.indexInTeamsList;
            TeamAssignmentsCodeBehind.indexInCategoriesList =currentCategoryIndex;
            var currCategory = ViewModels.Categories.categories.getAt(currentCategoryIndex);
            WinJS.Binding.processAll(element, currCategory);

            TeamAssignmentsCodeBehind.indexInTeamsList = currentTeamIndex;
            var currTeam = ViewModels.Teams.teams.getAt(currentTeamIndex);
           // TeamAssignmentsCodeBehind.loadAssignments(currentCategoryIndex);

            //TeamAssignmentsCodeBehind.loadResults(currentTeamIndex);
            //TeamAssignmentsCodeBehind.loadAssignmentsResults(currentCategoryIndex,currentTeamIndex);
            var assignments = ViewModels.Assignments.assignments;
            //var results = ViewModels.Results.results;
            //var assignmentsresults = ViewModels.AssignmentsResults.assignmentsResults;
            WinJS.Binding.processAll(document.getElementById("assignmentsTeamListView"), assignments);
            var listView = document.getElementById("assignmentsTeamListView").winControl;
            listView.oniteminvoked = function (invokeEvent) {
                WinJS.Navigation.navigate("/pages/resultAssignment/resultAssignment.html", {
                    indexInCategoriesList: currentCategoryIndex,
                    indexInTeamsList: currentTeamIndex,
                    indexInAssignmentsList: invokeEvent.detail.itemIndex
                });
            }
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
