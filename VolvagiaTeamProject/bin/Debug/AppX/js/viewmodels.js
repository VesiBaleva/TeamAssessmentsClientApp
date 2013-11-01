/// <reference path="models.js" />
(function () {
  
    //var user = { username: "", key: "" };

    //var bindableUser = WinJS.Binding.as(user);

    //var teamsList = new WinJS.Binding.List([]);

    //var getallTeams = function () {
    //    Data.getTeams().then(function (result) {
    //        var teamsDTOs = result;
    //        var currentCount = teamsList.dataSource.list.length;
    //        teamsList.dataSource.list.splice(0, currentCount);
    //        for (var i = 0; i < teamsDTOs.length; i++) {
    //            var newModel = new Models.TeamsListModel(
    //                teamsDTOs[i].id,
    //                teamsDTOs[i].teamname);

    //            teamsList.push(newModel);
    //        }
    //    });
    //}

    //var categoriesList = new WinJS.Binding.List([]);
    //var getallCategories = function () {
    //    Data.getCategories().then(function (result) {
    //        var catsDTOs = result;
    //        var currentCount = categoriesList.dataSource.list.length;
    //        categoriesList.dataSource.list.splice(0, currentCount);
    //        for (var i = 0; i < catsDTOs.length; i++) {
    //            var newModel = new Models.CategoryWithAssignmentsModel(
    //                catsDTOs[i].id,
    //                catsDTOs[i].name,
    //                catsDTOs[i].assignments.name,
    //                catsDTOs[i].assignments.maxValue);

    //            categoriesList.push(newModel);
    //        }
    //    });
    //}

    //WinJS.Namespace.define("ViewModels", {
    // //   loadComputers: loadComputers,
    //    //   computers: computersList,
    //    user: bindableUser,
    //    registerUser: function (username, displayName, authCode) {
    //        var registeredUser = "";
    //        return Data.registerUser(new Models.CreateUserModel(username, displayName, authCode)).then(function (result) {
    //            registeredUser = result;
    //            bindableUser.username = result.displayName;
    //            bindableUser.key = result.sessionKey;
    //        }, function (error) {
    //            var messageDialog = new Windows.UI.Popups.MessageDialog("The user is not registered!");
    //            messageDialog.showAsync().done(function () {
    //                error("Try again");
    //            });
    //        });
    //        //     RegisterCodeBehind.goToCreateTeamsPage(event);
    //    },
    //    teamsList:teamsList,
    //    generateTeams: function (members1, members2, teams) {
    //        return Data.generateTeams(new Models.GenerateTeamsModel(members1, members2, teams)).then(function (result) {
    //            for (var i = 0; i < result.length; i++) {
    //                teamsList.push(result[i]);
    //            }
                
    //        });
    //    },
    //    getallTeams: getallTeams,
    //    addCategoryWithAssignment: function (category, assignments) {
    //        return Data.addCategoryWithAssignment(new Models.CategoryWithAssignmentsModel(category, assignments)).then(function (result) {
    //            return result;
    //        });
    //    },
    //    categoriesList:categoriesList,
    //    getallCategories:getallCategories
    //});

    // user func
    var login = function (username, authCode) {
        return new WinJS.Promise(function (complete, error) {
            Data.Users.login(username, authCode).then(function (request) {
                var user = JSON.parse(request.responseText);
                UserLoginData.setData(new Models.UserLoggedModel(user.displayName, user.sessionKey));
                complete();
            }, function (innerError) {
                error(innerError);
            });
        });
    }

    var register = function (username, displayName, authCode) {
        return new WinJS.Promise(function (complete, error) {
            Data.Users.register(username, displayName, authCode).then(function (request) {
                var user = JSON.parse(request.responseText);
                UserLoginData.setData(new Models.UserLoggedModel(user.displayName, user.sessionKey));
                complete();
            }, function (innerError) {
                error(innerError);
            });
        });
    }

    var logout = function () {
        return Data.Users.logout();
    }

    //teams func
    var currentTeamsIndex;

    var teams = new WinJS.Binding.List([]);


    var loadTeams = function() {
        if (teams.length != 0) {
            while (teams.length > 0) {
                teams.pop();
            }
        }

        return Data.Teams.getTeams().then(function (request) {
            var object = JSON.parse(request.responseText);
            var teamDTOs = object;
            var currentCount = teams.dataSource.list.length
            teams.dataSource.list.splice(0, currentCount);

            for (var i = 0; i < teamDTOs.length; i++) {
                var sumOfResults = 0;
                var members = [];
                members.push(teamDTOs[i].members[0]);
                members.push(teamDTOs[i].members[1]);
                for (var j = 0; j < teamDTOs[i].results.length; j++) {
                    sumOfResults += teamDTOs[i].results[j].value;
                }
                var newModel = new Models.TeamsListModel(
                    teamDTOs[i].id,
                    teamDTOs[i].teamname,
                    members,sumOfResults);

                teams.push(newModel);
            }

        }, function (error) {
        });
    }

    var addTeam = function (members1, members2, teamnames) {
        return new WinJS.Promise(function (complete, error) {
            var model = new Models.GenerateTeamsModel(members1, members2, teamnames);
            Data.Teams.addTeam(model).then(function (request) {
                var result = JSON.parse(request.response);
                for (var i = 0; i < result.length; i++) {
                    teams.push(result[i]);
                }

             //   model.id = JSON.parse(request.responseText);
             //   addToProfilesBindingArray(model);
                var messageDialog = new Windows.UI.Popups.MessageDialog("The teams are successfully registered.");
                messageDialog.showAsync().done(function () {
                    complete();
                });
            }, function (error) {
                var messageDialog = new Windows.UI.Popups.MessageDialog("The teams is not registered.");
                messageDialog.showAsync();
            });
        });
    }

    //categories func
    var currentCategoriesIndex;

    var categories = new WinJS.Binding.List([]);


    var loadCategories = function () {
        if (categories.length != 0) {
            while (categories.length > 0) {
                categories.pop();
            }
        }

        return Data.Categories.getCategories().then(function (request) {
            var object = JSON.parse(request.responseText);
            var categoryDTOs = object;
            var currentCount = categories.dataSource.list.length
            categories.dataSource.list.splice(0, currentCount);

            for (var i = 0; i < categoryDTOs.length; i++) {

                var newModel = new Models.CategoryWithAssignmentsModel(
                    categoryDTOs[i].id,
                    categoryDTOs[i].name);

                categories.push(newModel);
            }

        }, function (error) {
        });
    }

    var addCategory = function (category, assignments) {
        return new WinJS.Promise(function (complete, error) {
            var model = new Models.CategoryWithAssignmentsModel("",category, assignments);
            Data.Categories.addCategory(model).then(function (request) {
                var result = JSON.parse(request.response);
              //  for (var i = 0; i < result.length; i++) {
                categories.push(result);
              //  }

                //   model.id = JSON.parse(request.responseText);
                //   addToProfilesBindingArray(model);
                var messageDialog = new Windows.UI.Popups.MessageDialog("The category is successfully registered.");
                messageDialog.showAsync().done(function () {
                    complete();
                });
            }, function (error) {
                var messageDialog = new Windows.UI.Popups.MessageDialog("The category is not registered.");
                messageDialog.showAsync();
            });
        });
    }

    var currentAssignmentsIndex;

    var assignments = new WinJS.Binding.List([]);


    var loadAssignments = function (indexInCategoriesArray) {
        if (assignments.length != 0) {
            while (assignments.length > 0) {
                assignments.pop();
            }
        }

        return Data.Assignments.getAssignments(categories.dataSource.list.getAt(indexInCategoriesArray).id)
            .then(function (request) {
                var object = JSON.parse(request.responseText);
                var assignmentDTOs = object;
                var currentCount = assignments.dataSource.list.length
                assignments.dataSource.list.splice(0, currentCount);

                for (var i = 0; i < assignmentDTOs.length; i++) {

                    var newModel = new Models.AssignmentModel(
                        assignmentDTOs[i].id,
                        assignmentDTOs[i].name,
                        assignmentDTOs[i].maxValue,"");

                    assignments.push(newModel);
                }

        }, function (error) {
        });
    }

    var members = new WinJS.Binding.List([]);

    var loadTeamDetails = function (id) {
        if (members.length != 0) {
            while (members.length > 0) {
                members.pop();
            }
        }

        return Data.Teams.getTeamById(id)
            .then(function (request) {
                var object = JSON.parse(request.responseText);
                var teamDTOs = object;
                var currentCount = members.dataSource.list.length
                members.dataSource.list.splice(0, currentCount);

                for (var i = 0; i < teamDTOs[0].members.length; i++) {
                    var model = new Models.MembersModel(teamDTOs[0].members[i]);
                    members.push(model);
                }                                                  

            }, function (error) {
            });
    }

    var results = new WinJS.Binding.List([]);

    var loadResults = function (indexInTeamsArray) {
        if (results.length != 0) {
            while (results.length > 0) {
                results.pop();
            }
        }

        return Data.Result.getResults(teams.dataSource.list.getAt(indexInTeamsArray).id)
            .then(function (request) {
                var object = JSON.parse(request.responseText);
                var resultDTOs = object;
                var currentCount = results.dataSource.list.length
                results.dataSource.list.splice(0, currentCount);

                for (var i = 0; i < resultDTOs.length; i++) {

                   // var newModel = new Models.ResultModel(
                   //      resultDTOs[i].id,resultDTOs[i].assignmentId,resultDTOs[i].value);

                    // results.push(newModel);
                    for (var j = 0; j < assignments.dataSource.list.length; j++) {
                        var assignmentModel = assignments.dataSource.list.getAt(j)
                        if (assignmentModel.id == resultDTOs[i].assignmentId) {
                            assignmentModel.value = resultDTOs[i].value
                            assignments.dataSource.list.setAt(j, assignmentModel);
                        }
                    }
                    
                }

            }, function (error) {
            });
    }

    var assignmentsResults = new WinJS.Binding.List([]);


    var loadAssignmentsResults = function (indexInCategoriesArray,indexInTeamsArray) {
        if (assignmentsResults.length != 0) {
            while (assignmentsResults.length > 0) {
                assignmentsResults.pop();
            }
        }

        var assignmentsres = [];

        return Data.Assignments.getAssignments(categories.dataSource.list.getAt(indexInCategoriesArray).id)
            .then(function (request) {
                var object = JSON.parse(request.responseText);
                var assignmentDTOs = object;

                for (var i = 0; i < assignmentDTOs.length; i++) {

                    var newModel = new Models.AssignmentResultModel(
                        assignmentDTOs[i].id,
                        assignmentDTOs[i].name,
                        assignmentDTOs[i].maxValue,"");

                    assignmentsres.push(newModel);
                }

            }, function (error) {
            });

            
        return Data.Result.getResults(teams.dataSource.list.getAt(indexInTeamsArray).id)
        .then(function (request) {
            var object = JSON.parse(request.responseText);
            var resultDTOs = object;
           

            for (var i = 0; i < resultDTOs.length; i++) {

                for (var j = 0; j < assignmentsres.length; j++) {

                    var newResModel = new Models.ResultModel(
                     resultDTOs[i].id, resultDTOs[i].assignmentId, resultDTOs[i].value);

                    if (newResModel.assignmentId == assignmentsres[j].id) {
                        assignmentsres[j].value=newResModel.value
                    }
                }
                
            }

            for (var i = 0; i < assignmentsres.length; i++) {
                assignmentsResults.push(assignmentsres[i]);
            }

        }, function (error) {
        });

    }


    var addAssignment = function (category, assignments) {
        //return new WinJS.Promise(function (complete, error) {
        //    var model = new Models.CategoryWithAssignmentsModel(category, assignments);
        //    Data.Categories.addCategory(model).then(function (request) {
        //        var result = JSON.parse(request.response);
        //        //  for (var i = 0; i < result.length; i++) {
        //        categories.push(result);
        //        //  }

        //        //   model.id = JSON.parse(request.responseText);
        //        //   addToProfilesBindingArray(model);
        //        var messageDialog = new Windows.UI.Popups.MessageDialog("The category is successfully registered.");
        //        messageDialog.showAsync().done(function () {
        //            complete();
        //        });
        //    }, function (error) {
        //        var messageDialog = new Windows.UI.Popups.MessageDialog("The category is not registered.");
        //        messageDialog.showAsync();
        //    });
        //});
    }

    var addResult = function (teamId, assignmentId, result, indexInAssignmentsArray) {
        return new WinJS.Promise(function (complete, error) {
            var model = new Models.ResultModel(teamId, assignmentId, result);
            Data.Result.addResult(model).then(function (request) {
                //var result = JSON.parse(request.response);
                //for (var i = 0; i < result.length; i++) {
                //    teams.push(result[i]);
                //}

             //   model.id = JSON.parse(request.responseText);
                //   addToProfilesBindingArray(model);

                var newAssignmentModel = assignments.dataSource.list.getAt(indexInAssignmentsArray);
                newAssignmentModel.value = result;
                assignments.dataSource.list.setAt(indexInAssignmentsArray, newAssignmentModel);
                var messageDialog = new Windows.UI.Popups.MessageDialog("The value is successfully added.");
                messageDialog.showAsync().done(function () {
                    complete();
                });
            }, function (error) {
                var messageDialog = new Windows.UI.Popups.MessageDialog("The value is not added.");
                messageDialog.showAsync();
            });
        });
    }

    // namespaces
    WinJS.Namespace.define("ViewModels");
    WinJS.Namespace.defineWithParent(ViewModels, "Users", {
        login: login,
        register: register,
        logout: logout
    })
    WinJS.Namespace.defineWithParent(ViewModels, "Teams", {
        loadTeams: loadTeams,
        loadTeamDetails: loadTeamDetails,
        teams: teams,
        members:members,
        currentTeamsIndex: currentTeamsIndex,
        addTeam: addTeam,
    })
    WinJS.Namespace.defineWithParent(ViewModels, "Categories", {
        loadCategories: loadCategories,
        categories: categories,
        currentCategoriesIndex: currentCategoriesIndex,
        addCategory: addCategory,
    })
    WinJS.Namespace.defineWithParent(ViewModels, "Assignments", {
        loadAssignments: loadAssignments,
        assignments: assignments,
        currentAssignmentsIndex: currentAssignmentsIndex,
        addAssignment: addAssignment,
    })
    WinJS.Namespace.defineWithParent(ViewModels, "Results", {
        addResult: addResult,
        loadResults: loadResults,
        results:results
    })
    WinJS.Namespace.defineWithParent(ViewModels, "AssignmentsResults", {
        loadAssignmentsResults: loadAssignmentsResults,
        assignmentsResults: assignmentsResults
    })
})();