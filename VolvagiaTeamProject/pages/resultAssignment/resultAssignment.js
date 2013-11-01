// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/resultAssignment/resultAssignment.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var currentCategoryIndex = options.indexInCategoriesList;
            var currentTeamIndex = options.indexInTeamsList;
            var currentAssignmentIndex = options.indexInAssignmentsList;
            ResultAssignmentCodeBehind.indexInCategoriesList = currentCategoryIndex;
            ResultAssignmentCodeBehind.indexInTeamsList = currentTeamIndex;
            ResultAssignmentCodeBehind.indexInAssignmentsList = currentAssignmentIndex;
            var currCategory = ViewModels.Categories.categories.getAt(currentCategoryIndex);
            WinJS.Binding.processAll(element, currCategory);
            var currTeam = ViewModels.Teams.teams.getAt(currentTeamIndex);
            WinJS.Binding.processAll(element, currTeam);
            var currAssignment = ViewModels.Assignments.assignments.getAt(currentAssignmentIndex);
            WinJS.Binding.processAll(element, currAssignment);

            var submitButton = document.getElementById("submitResult");
            submitButton.addEventListener("click", function () {
                var evaluationInput = document.getElementById("evaluation");
                var evaluation = evaluationInput.value;

                ViewModels.Results.addResult(currTeam.id, currAssignment.id, evaluation, currentAssignmentIndex).then(function () {

                    //var q = currentTeamIndex;
                    //var c = currentCategoryIndex;
                    //var o = currentAssignmentIndex;

                    //WinJS.Navigation.navigate("/pages/teamsAssignments/teamsAssignments.html", {
                    //    indexInCategoriesList: currentCategoryIndex,
                    //    indexInTeamsList: currentTeamIndex,
                    //    indexInAssignmentsList: currentAssignmentIndex
                    //});
                   // ResultAssignmentCodeBehind.gotoTeamsAssignments();
                    WinJS.Navigation.back()
                    
                }, function (error) {
                });
            });
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
