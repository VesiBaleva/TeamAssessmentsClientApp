/// <reference path="models.js" />
(function () {
    var loggedUser = {};

    var setData = function (value) {
        loggedUser = value;
    }

    var getData = function () {
        return loggedUser;
    }

    WinJS.Namespace.define("UserLoginData", {
        getData: getData,
        setData: setData
    });
})();