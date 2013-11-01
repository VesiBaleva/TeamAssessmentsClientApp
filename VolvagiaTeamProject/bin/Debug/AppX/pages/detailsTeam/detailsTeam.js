// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/detailsTeam/detailsTeam.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var currentTeamIndex = options.indexInTeamsList;
            DetailsTeamsCodeBehind.currentTeamIndex = currentTeamIndex;
            var currTeam = ViewModels.Teams.teams.getAt(currentTeamIndex);
            WinJS.Binding.processAll(element, currTeam);

            
       //     var currCategory = ViewModels.Categories.categories.getAt(currentCategoryIndex);
            //WinJS.Binding.processAll(element, currCategory);
            DetailsTeamsCodeBehind.loadTeamById(currTeam.id);
            var members = ViewModels.Teams.members;
            WinJS.Binding.processAll(document.getElementById("membersListView"), members);

            var listView = document.getElementById("categoriesListView").winControl;
            listView.oniteminvoked = function (invokeEvent) {
                TeamAssignmentsCodeBehind.loadAssignments(currentTeamIndex, invokeEvent.detail.itemIndex);
                WinJS.Navigation.navigate("/pages/teamsAssignments/teamsAssignments.html", {
                    indexInTeamsList: currentTeamIndex,
                    indexInCategoriesList: invokeEvent.detail.itemIndex
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
