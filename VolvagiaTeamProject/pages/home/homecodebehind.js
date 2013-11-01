(function () {


    var goToLoginPage = function () {
        var goToLoginBtn = document.getElementById("login-button");
        goToLoginBtn.style.display = "block";
        goToLoginBtn.addEventListener("click", function () {
            WinJS.Navigation.navigate("/pages/login/login.html");
        })
    }

    var goToTeamDetailsPage = function (invokeEvent) {
        var vault = new Windows.Security.Credentials.PasswordVault();
        try {
            var credential = vault.findAllByResource("teamsEvaluation");
            WinJS.Navigation.navigate("/pages/detailsTeam/detailsTeam.html", {
                indexInTeamsList: invokeEvent.detail.itemIndex
            });
        } catch (WinRTError) {
            var messageDialog = new Windows.UI.Popups.MessageDialog("You are currently logged out. Please login first!");
            messageDialog.showAsync();
            WinJS.Navigation.navigate("/pages/login/login.html");
        }
    }

    var goToTeamAddPage = function () {
        var appBar = document.getElementById("home-app-bar").winControl;
        if (appBar) {
            appBar.hide();
        }
        WinJS.Navigation.navigate("/pages/addTeam/addTeam.html");
    }

    var goToCategoryAddPage = function () {
        var appBar = document.getElementById("home-app-bar").winControl;
        if (appBar) {
            appBar.hide();
        }
        WinJS.Navigation.navigate("/pages/addCategory/addCategory.html");
    }

    var goToCategoryDetailsPage = function (invokeEvent) {
        var vault = new Windows.Security.Credentials.PasswordVault();
        try {
            var credential = vault.findAllByResource("teamsEvaluation");
            WinJS.Navigation.navigate("/pages/detailsCategory/detailsCategory.html", {
                indexInCategoriesList: invokeEvent.detail.itemIndex
            });
        } catch (WinRTError) {
            var messageDialog = new Windows.UI.Popups.MessageDialog("You are currently logged out. Please login first!");
            messageDialog.showAsync();
            WinJS.Navigation.navigate("/pages/login/login.html");
        }
    }

    WinJS.Utilities.markSupportedForProcessing(goToTeamDetailsPage);
    WinJS.Utilities.markSupportedForProcessing(goToTeamAddPage);
    WinJS.Utilities.markSupportedForProcessing(goToCategoryAddPage);
    WinJS.Utilities.markSupportedForProcessing(goToCategoryDetailsPage);
    WinJS.Utilities.markSupportedForProcessing(goToLoginPage);
    WinJS.Utilities.requireSupportedForProcessing(goToLoginPage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadTeams: function () {
            return ViewModels.Teams.loadTeams();
        },
        callLoadCategories: function () {
            return ViewModels.Categories.loadCategories();
        },
        goToTeamDetailsPage: goToTeamDetailsPage,
        goToTeamAddPage: goToTeamAddPage,
        goToCategoryAddPage: goToCategoryAddPage,
        goToCategoryDetailsPage: goToCategoryDetailsPage,
        goToLoginPage: goToLoginPage
    })
})();