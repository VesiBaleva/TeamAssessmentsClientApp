// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/addCategory/addCategory.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var btnAddAssignmentMaxValue = document.getElementById("btnAddAssignmentMaxValue");
            btnAddAssignmentMaxValue.addEventListener("click", function () {
                var txtAssignment = document.getElementById("assignment-input").value;
                var txtMaxValue = document.getElementById("maxvalue-input").value;
                var container = document.getElementById("container");
                var assignment = document.createElement("div");
                container.appendChild(assignment);
                assignment.innerText = txtAssignment + "-";
                var maxvalue = document.createElement("span");
                assignment.appendChild(maxvalue);
                maxvalue.innerText = txtMaxValue;
                document.getElementById("assignment-input").innerText = "";
                document.getElementById("maxvalue-input").innerText="";
            })
            var submitButton = document.getElementById("submitCategory");
            submitButton.addEventListener("click", function () {
                var categoryInput = document.getElementById("category-input");
                var category = categoryInput.value;

                var assignments = [];
                var catAssignments = document.getElementById("container").children;
                for (var i = 0; i < catAssignments.length; i++) {
                    var myarray = catAssignments[i].innerText.split("-");
                    var newAssignmentModel = {
                        "name": myarray[0],
                        "maxValue": myarray[1]
                    };
                    assignments.push(newAssignmentModel);
                }

                if (category === undefined) {
                    category = "";
                }
                
                    ViewModels.Categories.addCategory(category, assignments).then(function () {

                        HomeCodeBehind.callLoadCategories();

                        AddCategoryCodeBehind.goToHomePage();
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
