/// <reference path="../../js/viewmodels.js" />
(function () {
    var indexInTeamsList = 0;

    var indexInCategoriesList = 0;

    var loadAssignments = function (currentTeamIndex, currentCategoryIndex) {
        ViewModels.Assignments.loadAssignments(currentCategoryIndex).then(function () {
            ViewModels.Results.loadResults(currentTeamIndex);
        });
        
    }

    var loadResults = function (id) {
        ViewModels.Results.loadResults(id);
    }

    var loadAssignmentsResults = function (categoryIndex, teamIndex) {
        ViewModels.AssignmentsResults.loadAssignmentsResults(categoryIndex,teamIndex);
    }

    WinJS.Namespace.define("TeamAssignmentsCodeBehind", {
        indexInCategoriesList: indexInCategoriesList,
        indexInTeamsList: indexInTeamsList,
        loadAssignments: loadAssignments,
        loadResults: loadResults,
        loadAssignmentsResults: loadAssignmentsResults
    })
})();