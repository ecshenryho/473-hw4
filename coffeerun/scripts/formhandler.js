(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log("Setting submit handler for form");
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + " is " + item.value);
      });
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };
  FormHandler.prototype.addValidateHandler = function() {
    console.log("Setting validate handler for form");
    this.$formElement.on("submit", function(event) {
      event.preventDefault();
      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + " is " + item.value);
      });
      console.log(data);
      var dataList = Object.values(data);
      var message;
      var i = 0;
      for (; i < dataList.length;i++) {
        if (dataList[i] == "") {
          message = "<p>Please fill all information</p>";
          $(message).modal();
          return;
        }
      }
      message = "<p>Thank you for your payment, " + data["title"] + " " + data["username"] + "</p>";
      $(message).modal({
        fadeDuration: 1000,
        fadeDelay: 1.50
      });

      this.reset();
      this.elements[0].focus();
    });
  };
  App.FormHandler = FormHandler;
  window.App = App;
})(window);
