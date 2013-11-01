/// <reference path="models.js" />
/// <reference path="dataloader.js" />

(function () {

   // var httpRequest = new HttpRequester();

   //// var result="";

   // var registerUser = function (createUserModel) {
   //     return httpRequest.postJSON("http://teamassessmentwebapi.apphb.com/api/users/register", createUserModel).then(function (response) {
   //         //var result = JSON.parse(response);
   //         var result = JSON.parse(response);
   //         return result;
   //     }, function (error) {
            
   //             var messageDialog = new Windows.UI.Popups.MessageDialog("The user is not registered");
   //             messageDialog.showAsync().done(function () {
                    
   //             });
            
   //         console.log(error);
   //         return error;
   //     });
   // }

   // var generateTeams = function (GenerateTeamsModel) {
   //     return httpRequest.postJSON("http://teamassessmentwebapi.apphb.com/api/teams", GenerateTeamsModel, ViewModels.user.key).then(function (response) {
   //         //var result = JSON.parse(response);
   //         var result = JSON.parse(response);
   //         return result;
   //     }, function (error) {
   //         console.log(error);
   //         return error;
   //     });
   // }

   // var getTeams = function () {
   //     return httpRequest.getJSON("http://teamassessmentwebapi.apphb.com/api/teams", ViewModels.user.key).then(function (response) {
   //         //var result = JSON.parse(response);
   //         var result = JSON.parse(response);
   //         return result;
   //     }, function (error) {
   //         console.log(error);
   //         return error;
   //     });
   // }

   // var getCategories = function () {
   //     return httpRequest.getJSON("http://teamassessmentwebapi.apphb.com/api/categories", ViewModels.user.key).then(function (response) {
   //         //var result = JSON.parse(response);
   //         var result = JSON.parse(response);
   //         return result;
   //     }, function (error) {
   //         console.log(error);
   //         return error;
   //     });
   // }

   // var addCategoryWithAssignment = function (CategoryWithAssignmentsModel) {
   //     return httpRequest.postJSON("http://teamassessmentwebapi.apphb.com/api/categories", CategoryWithAssignmentsModel, ViewModels.user.key).then(function (response) {
   //         //var result = JSON.parse(response);
   //         var result = response;
   //         return result;
   //     }, function (error) {
   //         console.log(error);
   //         return error;
   //     });
   // }

   // WinJS.Namespace.define("Data", {
   //     registerUser: registerUser,
   //     generateTeams: generateTeams,
   //     getTeams: getTeams,
   //     addCategoryWithAssignment: addCategoryWithAssignment,
   //     getCategories: getCategories
    // });

    var login = function (username, authCode) {
        return Loader.Users.login(username, authCode);
    }

    var register = function (username, nickname, authCode) {
        return Loader.Users.register(username, nickname, authCode);
    }

    var logout = function () {
        return Loader.Users.logout();
    }


    var getTeams = function () {

        return Loader.Teams.getTeams();
    }

    var getTeamById = function (id) {

        return Loader.Teams.getTeamById(id);
    }

    var addTeam = function (generateTeamsModel) {
        //profiles.push(profileModel);

        return Loader.Teams.addTeam(generateTeamsModel);
    }


    var getCategories = function () {

        return Loader.Categories.getCategories();
    }

    var addCategory = function (CategoryWithAssignmentsModel) {
        //profiles.push(profileModel);

        return Loader.Categories.addCategory(CategoryWithAssignmentsModel);
    }

    var getAssignments = function (id) {
        return Loader.Assignments.getAssignments(id);
    }

    var addResult = function (ResultModel) {
        //profiles.push(profileModel);

        return Loader.Result.addResult(ResultModel);
    }

    var getResults = function (teamId) {
        //profiles.push(profileModel);

        return Loader.Result.getResults(teamId);
    }

    WinJS.Namespace.define("Data");

    WinJS.Namespace.defineWithParent(Data, "Users", {
        register: register,
        login: login,
        logout: logout
    });

    WinJS.Namespace.defineWithParent(Data, "Teams", {
        getTeams: getTeams,
        addTeam: addTeam,
        getTeamById: getTeamById
    });

    WinJS.Namespace.defineWithParent(Data, "Categories", {
        getCategories: getCategories,
        addCategory: addCategory
    });

    WinJS.Namespace.defineWithParent(Data, "Assignments", {
        getAssignments: getAssignments
    });

    WinJS.Namespace.defineWithParent(Data, "Result", {
        addResult: addResult,
        getResults: getResults
    });

})()