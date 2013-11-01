/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var loadCategories = function () {
        ViewModels.Categories.loadCategories();
    }

    var currentTeamIndex = currentTeamIndex || -1;

    var goToTeamsAssignmentsPage = function (invokeEvent) {
        var vault = new Windows.Security.Credentials.PasswordVault();
        try {
            var credential = vault.findAllByResource("teamsEvaluation");
            WinJS.Navigation.navigate("/pages/teamsAssignments/teamsAssignments.html", {
                indexInCategoriesList: invokeEvent.detail.itemIndex
            });
        } catch (WinRTError) {
            var messageDialog = new Windows.UI.Popups.MessageDialog("You are currently logged out. Please login first!");
            messageDialog.showAsync();
            WinJS.Navigation.navigate("/pages/login/login.html");
        }
    }


    var loadTeamById = function (id) {
        ViewModels.Teams.loadTeamDetails(id);
    }

    WinJS.Utilities.markSupportedForProcessing(goToTeamsAssignmentsPage);


    WinJS.Namespace.define("DetailsTeamsCodeBehind", {
        loadCategories: loadCategories,
        loadTeamById: loadTeamById,
        currentTeamIndex: currentTeamIndex,
        goToTeamsAssignmentsPage:goToTeamsAssignmentsPage
    });
})();