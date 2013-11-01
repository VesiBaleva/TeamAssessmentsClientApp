(function () {
    var indexInTeamsList = 0;

    var indexInCategoriesList = 0;

    var indexInAssignmentsList = 0;

    var gotoTeamsAssignments = function () {
        WinJS.Navigation.navigate("/pages/teamsAssignments/teamsAssignments.html", {
            indexInCategoriesList: indexInCategoriesList,
            indexInTeamsList: indexInTeamsList,
            indexInAssignmentsList: indexInAssignmentsList
        });
    }

  //  WinJS.Utilities.markSupportedForProcessing(gotoTeamsAssignments);

    WinJS.Namespace.define("ResultAssignmentCodeBehind", {
        indexInCategoriesList: indexInCategoriesList,
        indexInTeamsList: indexInTeamsList,
        indexInAssignmentsList: indexInAssignmentsList,
        gotoTeamsAssignments: gotoTeamsAssignments

    })
})();