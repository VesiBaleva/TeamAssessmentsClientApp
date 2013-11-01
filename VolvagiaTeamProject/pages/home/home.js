(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            var vault = new Windows.Security.Credentials.PasswordVault();

            var username, authCode;

            try {
                var credential = vault.findAllByResource("teamsEvaluation").first();
                if (credential != null) {
                    var loginFormBtn = document.getElementById("login-button");
                    loginFormBtn.style.display = "none";
                    // Retrieves the actual userName and password.
                    username = credential.current.userName;
                    authCode = vault.retrieve("teamsEvaluation", username).password;

                    var data = UserLoginData.getData();
                    if (!data.sessionKey) {
                        ViewModels.Users.login(username, authCode).then(function () {
                            var progressRing = document.getElementById("progressRing");
                            progressRing.style.display = "block";
                            HomeCodeBehind.callLoadTeams().then(function () {
                                progressRing.style.display = "none";
                                if (ViewModels.Teams.teams.dataSource.list.length == 0) {
                                    document.getElementById("no-layout-responsive-message").style.display = "block";
                                    var appBar = document.getElementById("home-app-bar").winControl;
                                    if (appBar) {
                                        appBar.show();
                                    }
                                }
                            }, function (error) {
                                var message = new Windows.UI.Popups.MessageDialog("Unable to get data. Check your internet connection.");
                                message.showAsync();
                            })

                            HomeCodeBehind.callLoadCategories().then(function () {
                                progressRing.style.display = "none";
                                if (ViewModels.Categories.categories.dataSource.list.length == 0) {
                                    document.getElementById("no-layout-responsive-message").style.display = "block";
                                    var appBar = document.getElementById("home-app-bar").winControl;
                                    if (appBar) {
                                        appBar.show();
                                    }
                                }
                            }, function (error) {
                                var message = new Windows.UI.Popups.MessageDialog("Unable to get data. Check your internet connection.");
                                message.showAsync();
                            })
                        }, function () {
                            var message = new Windows.UI.Popups.MessageDialog("Unable to get data. Check your internet connection.");
                            message.showAsync();
                        });
                    }
                    else {
                        HomeCodeBehind.callLoadTeams().then(function () {
                        //    progressRing.style.display = "none";
                            if (ViewModels.Teams.teams.dataSource.list.length == 0) {
                                document.getElementById("no-layout-responsive-message").style.display = "block";
                                var appBar = document.getElementById("home-app-bar").winControl;
                                if (appBar) {
                                    appBar.show();
                                }
                            }
                        }, function (error) {
                            var message = new Windows.UI.Popups.MessageDialog("Unable to get data. Check your internet connection.");
                            message.showAsync();
                        })
                    }

                    if (ViewModels.Teams.teams.dataSource.list.length === 0) {
                        var message = document.getElementById("no-layout-responsive-container");
                        message.style.display = "block";
                    }
                }
            } catch (WinRTError) {
                var logoutBtn = document.getElementById("log-out-button");
                logoutBtn.style.display = "none";

                var progressRing = document.getElementById("progressRing");
                progressRing.style.display = "none";

                HomeCodeBehind.goToLoginPage();
            }

            var logOutBtn = document.getElementById("log-out-button");
            logOutBtn.addEventListener("click", function () {
                ViewModels.Users.logout().then(function () {
                    var appBar = document.getElementById("home-app-bar").winControl;
                    if (appBar) {
                        appBar.hide();
                    }

                    var vault = Windows.Security.Credentials.PasswordVault();
                    var credetential = vault.retrieve("teamsEvaluation", username);
                    vault.remove(credetential);
                    WinJS.Navigation.navigate("/pages/login/login.html");
                }, function (error) {
                    var object = JSON.parse(error.responseText);
                    var messageDialog = new Windows.UI.Popups.MessageDialog(object.Message);
                    messageDialog.showAsync();
                });
            });

        }
    });
})();
