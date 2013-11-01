(function () {
    //var submitUser = function () {
    //  // var computerNameInput = document.getElementById("computer-name-input");
    //  //     var computerName = computerNameInput.value;

    //    var usernameInput = document.getElementById("username-reg-input");
    //    var username = usernameInput.value;

    //    var displaynameInput = document.getElementById("displayname-reg-input");
    //    var displayName = displaynameInput.value;

    //    var passInput = document.getElementById("pass-reg-input");
    //    var password = passInput.value;
    //    var authCode = CryptoJS.SHA1(username + password).toString();

    // //   var loggedUser = "";
    //    ViewModels.registerUser(username, displayName, authCode).then(function (success) {
    //        WinJS.Navigation.navigate("/pages/createteamspage/createteamspage.html");
    //    }, function (error) {
    //        var messageDialog = new Windows.UI.Popups.MessageDialog("The user is not registered!");
    //        messageDialog.showAsync().done(function () {
    //            error("Try again");
    //        });
    //    }//, function () {//TODO: delete
    //     //   WinJS.Navigation.navigate("/pages/createteamspage/createteamspage.html");
    //     //  }
    //    );   //.then(function (returnedValue) {
    //  //      loggedUser = returnedValue;
    //   // });
    //}

    //var goToCreateTeamsProjectPage = function (invokeEvent) {
    //    WinJS.Navigation.navigate("/pages/createteamspage/createteamspage.html", {
    //        itemUser:invokeEvent.detail.itemIndex
    //    });
    //}

    //WinJS.Utilities.markSupportedForProcessing(submitUser);
    //WinJS.Utilities.markSupportedForProcessing(goToCreateTeamsProjectPage);

    var register = function () {
        var username = document.getElementById("username-reg-input").value;
        var nickname = document.getElementById("displayname-reg-input").value;
        var password = document.getElementById("pass-reg-input").value;
        var authCode = Crypto.sha1(password);
        ViewModels.Users.register(username, nickname, authCode).then(function () {
            var vault = Windows.Security.Credentials.PasswordVault();
            var credential = Windows.Security.Credentials.PasswordCredential("teamsEvaluation", username, authCode);
            vault.add(credential);
            var messageDialog = new Windows.UI.Popups.MessageDialog("User created and logged in successfully!");
            messageDialog.showAsync().then(goBackToHomePage);
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
        //HomeCodeBehind.callLoadProfiles();
        WinJS.Navigation.back(2).then(function () {
           // if (ViewModels.Profiles.profiles.dataSource.list.length == 0) {
                document.getElementById("no-layout-responsive-message").style.display = "block";
           // }
        });
    }


    WinJS.Namespace.define("RegisterCodeBehind", {
        register: register
     //   goToCreateTeamsPage: goToCreateTeamsProjectPage
    });

})()