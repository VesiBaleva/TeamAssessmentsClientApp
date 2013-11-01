// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/addTeam/addTeam.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            var submitButton = document.getElementById("create-team-button");
            submitButton.addEventListener("click", function () {
                var members1 = document.getElementById("members1-input").value;
                var members2 = document.getElementById("members2-input").value;
                var teamnames = document.getElementById("teams-input").value;

                if (members1 === undefined) {
                    members1 = "";
                }

                if (members2 === undefined) {
                    members2 = "";
                }

                if (teamnames === undefined) {
                    teamnames = "";
                }

                ViewModels.Teams.addTeam(members1, members2, teamnames).then(function () {
                    AddTeamCodeBehind.goToHomePage();
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
