var did_modal_pop = false;
var powerEmail = "";

(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var strength = $("#strengthLevel").val();
            var flavor = $("#flavorshot").find(":selected").val();
            var size = $("input[name=size]:checked").val();
            if (strength > 66 && flavor != '' && size === 'bfc' && did_modal_pop === false) {
                //HANDLE MODAL
                console.log('Modal should be showing now');
                did_modal_pop = true;
                $("#myModal").modal('show');
            } else {
                var data = {};
                $(this).serializeArray().forEach(function(item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
                did_modal_pop = false;
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);

$("#strengthLevel").change(function(event) {
    var label = document.getElementById("['range-label']");
    $("#range-label").empty();
    $("#range-label").append('Caffeine Rating: ' + this.value);
    if (this.value <= 33) {
        $("#range-label").css("color", "green");
    } else if (this.value > 33 && this.value <= 66) {
        $("#range-label").css("color", "yellow");
    } else {
        $("#range-label").css("color", "red");
    }
})

$("#claim-bonus").on("click", function() {
    $("#myModal").modal('hide');
    $("#powerBar").show();
})

$("#no-bonus").on("click", function() {
    $("#myModal").modal('hide');
})
