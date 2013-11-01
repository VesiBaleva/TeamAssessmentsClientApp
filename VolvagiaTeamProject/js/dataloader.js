/// <reference path="models.js" />
(function () {

    var login = function (username, authCode) {
        return WinJS.xhr({
            url: "http://teamassessmentwebapi.apphb.com/api/users/login",
            type: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "username": username,
                "authCode": authCode
            })
        });
    }

    var logout = function () {
        return WinJS.xhr({
            url: "http://teamassessmentwebapi.apphb.com/api/users/logout",
            type: "PUT",
            headers: {
                "sessionKey": UserLoginData.getData().sessionKey
            }
        });
    }

    var register = function (username, nickname, authCode) {
        return WinJS.xhr({
            url: "http://teamassessmentwebapi.apphb.com/api/users/register",
            type: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "username": username,
                "displayName": nickname,
                "authCode": authCode
            })
        });
    }

    var getTeams = function () {
        var sessionKey = UserLoginData.getData().sessionKey;
        return WinJS.xhr({
            url: "http://teamassessmentwebapi.apphb.com/api/teams",
            type: "GET",
            headers: {
                "sessionKey": sessionKey
            }
        });
    }

    var getTeamById = function (id) {
        var sessionKey = UserLoginData.getData().sessionKey;
        return WinJS.xhr({
            url: "http://teamassessmentwebapi.apphb.com/api/teams?teamId="+id,
            type: "GET",
            headers: {
                "sessionKey": sessionKey
            }
        });
    }

    var addTeam = function (generateTeamsModel) {
        return WinJS.xhr({
            url: "http://teamassessmentwebapi.apphb.com/api/teams",
            type: "POST",
            headers: {
                "sessionKey": UserLoginData.getData().sessionKey,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "members1": generateTeamsModel.members1,
                "members2": generateTeamsModel.members2,
                "teamnames": generateTeamsModel.teamnames
            })
        });
    }

    var getCategories = function () {
        var sessionKey = UserLoginData.getData().sessionKey;
        return WinJS.xhr({
            url: "http://teamassessmentwebapi.apphb.com/api/categories",
            type: "GET",
            headers: {
                "sessionKey": sessionKey
            }
        });
    }

    var addCategory = function (categoryWithAssignmentsModel) {
        return WinJS.xhr({
            url: "http://teamassessmentwebapi.apphb.com/api/categories",
            type: "POST",
            headers: {
                "sessionKey": UserLoginData.getData().sessionKey,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "categoryName": categoryWithAssignmentsModel.categoryName,
                "assignments": categoryWithAssignmentsModel.assignments
                //"assignments": [{
                //    "name": categoryWithAssignmentsModel.assignments.name,
                //    "maxValue": categoryWithAssignmentsModel.assignments.maxValue
                //}]
            })
        });
    }

    var getAssignments = function (id) {
        return WinJS.xhr({
            url: "http://teamassessmentwebapi.apphb.com/api/assignments?categoryId=" + id,
            type: "GET",
            headers: {
                "sessionKey": UserLoginData.getData().sessionKey,
            },
        });
    }

    var addResult = function (ResultModel) {
        return WinJS.xhr({
            url: "http://teamassessmentwebapi.apphb.com/api/teams/" + ResultModel.teamId + "/result?assignmentId=" + ResultModel.assignmentId,
            type: "POST",
            headers: {
                "sessionKey": UserLoginData.getData().sessionKey,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "assignmentResult": ResultModel.result
            })
        });
    }

    var getResults = function (teamId) {
        var sessionKey = UserLoginData.getData().sessionKey;
        return WinJS.xhr({
            url: "http://teamassessmentwebapi.apphb.com/api/teams/" + teamId +"/result",
            type: "GET",
            headers: {
                "sessionKey": sessionKey
            }
        });
    }

    WinJS.Namespace.define("Loader");

    WinJS.Namespace.defineWithParent(Loader, "Users", {
        login: login,
        register: register,
        logout: logout
    });

    WinJS.Namespace.defineWithParent(Loader, "Teams", {
        getTeams: getTeams,
        addTeam: addTeam,
        getTeamById: getTeamById
    });

    WinJS.Namespace.defineWithParent(Loader, "Categories", {
        getCategories: getCategories,
        addCategory: addCategory
    });

    WinJS.Namespace.defineWithParent(Loader, "Assignments", {
        getAssignments: getAssignments
    });

    WinJS.Namespace.defineWithParent(Loader, "Result", {
        addResult: addResult,
        getResults: getResults
    });
})();