
(function () {
    var CreateUserModel = WinJS.Class.define(function (username, displayName, authCode) {
        this.username = username;
        this.displayName = displayName;
        this.authCode = authCode;
    }, {
        username: "",
        displayName: "",
        authCode: ""
    })

    var GenerateTeamsModel = WinJS.Class.define(function (members1, members2, teamnames) {
        this.members1 = members1;
        this.members2 = members2;
        this.teamnames = teamnames;
    }, {
        members1: "",
        members2: "",
        teamnames: ""
    })

    var TeamsListModel = WinJS.Class.define(function (id,teamname,members,sumOfValues) {
        this.id = id;
        this.teamname = teamname;
        this.members = members;
        this.sumOfValues = sumOfValues;
    }, {
        id: "",
        teamname: "",
        members: [],
        sumOfValues:0
    })

    var CategoryWithAssignmentsModel = WinJS.Class.define(function (id,categoryName, assignments) {
        this.id = id;
        this.categoryName = categoryName;
        this.assignments = assignments;
    }, {
        id: "",
        categoryName: "",
        assignments: [{
            "name": "",
            "maxValue":0
        }]
    })

    var UserLoggedModel = WinJS.Class.define(function (displayName, sessionKey) {        
        this.displayName = displayName;
        this.sessionKey = sessionKey;
    }, {
        displayName: "",
        sessionKey: ""
    })

    var AssignmentModel = WinJS.Class.define(function (id, name, maxValue, value) {
        this.id = id;
        this.name = name;
        this.maxValue = maxValue;
        this.value = value;
    }, {
        id: "",
        name: "",
        maxValue: "",
        value: "",
    })

    var MembersModel = WinJS.Class.define(function (member) {
        this.member = member;
    }, {
        member: ""
    })

    var ResultModel = WinJS.Class.define(function (teamId, assignmentId, result) {
        this.teamId=teamId,
        this.assignmentId = assignmentId,
        this.result = result
    }, {
        teamId: "",
        assignmentId: "",
        result: ""
    })

    var AssignmentResultModel = WinJS.Class.define(function (id, name, maxValue,value) {
        this.id = id;
        this.name = name;
        this.maxValue = maxValue;
        this.value = value
    }, {
        id: "",
        name: "",
        maxValue: "",
        value:""
    })

    WinJS.Namespace.define("Models", {
        CreateUserModel: CreateUserModel,
        GenerateTeamsModel: GenerateTeamsModel,
        TeamsListModel: TeamsListModel,
        UserLoggedModel: UserLoggedModel,
        CategoryWithAssignmentsModel: CategoryWithAssignmentsModel,
        AssignmentModel: AssignmentModel,
        MembersModel: MembersModel,
        ResultModel: ResultModel,
        AssignmentResultModel: AssignmentResultModel
    })
})()