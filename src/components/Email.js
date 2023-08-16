export const Email = {
  send: function (a) {
    return new Promise(function (resolve, reject) {
      a.nocache = Math.floor(1e6 * Math.random() + 1);
      a.Action = "Send";
      var t = JSON.stringify(a);
      Email.ajaxPost(
        "https://smtpjs.com/v3/smtpjs.aspx?",
        t,
        function (response) {
          resolve(response);
        }
      );
    });
  },
  ajaxPost: function (url, data, callback) {
    var xhr = Email.createCORSRequest("POST", url);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      var response = xhr.responseText;
      if (callback) {
        callback(response);
      }
    };
    xhr.send(data);
  },
  ajax: function (url, callback) {
    var xhr = Email.createCORSRequest("GET", url);
    xhr.onload = function () {
      var response = xhr.responseText;
      if (callback) {
        callback(response);
      }
    };
    xhr.send();
  },
  createCORSRequest: function (method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      xhr.open(method, url, true);
    } else if (typeof window.XDomainRequest !== "undefined") {
      xhr = new XMLHttpRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    return xhr;
  },
};
