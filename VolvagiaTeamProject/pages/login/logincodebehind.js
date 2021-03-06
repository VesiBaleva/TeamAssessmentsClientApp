﻿(function () {
    var login = function () {
        var username = document.getElementById("username-login-input").value;
        var password = document.getElementById("pass-login-input").value;        
        var authCode = Crypto.sha1(password);
        ViewModels.Users.login(username, authCode).then(function () {
            var vault = Windows.Security.Credentials.PasswordVault();
            var credential = Windows.Security.Credentials.PasswordCredential("teamsEvaluation", username, authCode);
            vault.add(credential);
            goBackToHomePage();
        }, function (error) {
            if (error.responseText) {
                var object = JSON.parse(error.responseText);
                var messageDialog = new Windows.UI.Popups.MessageDialog(object.Message);
                messageDialog.showAsync();
            }
            else {
                var message = new Windows.UI.Popups.MessageDialog("Unable to get data. Check your internet connection.");
                message.showAsync();
            }
        });
    }

    var goBackToHomePage = function () {
        WinJS.Navigation.back().then(function () {
         //   var progressRing = document.getElementById("progressRing");
         //   progressRing.style.display = "block";
            //    HomeCodeBehind.callLoadProfiles().then(function () {
            //        progressRing.style.display = "none";
            //        if (ViewModels.Profiles.profiles.dataSource.list.length == 0) {
            //            document.getElementById("no-layout-responsive-message").style.display = "block";
            //        }
            //}, function () {
            //    var message = new Windows.UI.Popups.MessageDialog("Unable to get data. Check your internet connection.");
            //    message.showAsync();
            //    });
        });
    }

    var goToRegisterPage = function () {
        WinJS.Navigation.navigate("/pages/register/register.html");
    }

    WinJS.Utilities.markSupportedForProcessing(goToRegisterPage);

    WinJS.Namespace.define("LoginCodeBehind", {
        login: login,
        goToRegisterPage: goToRegisterPage
    });
})();