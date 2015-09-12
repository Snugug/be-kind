'use strict';

var issue = document.getElementById('issue_body'),
    comment = document.getElementById('new_comment_field'),
    issueSubmit = document.querySelector('.form-actions [type="submit"]'),
    commentSubmit = document.querySelector('.js-new-comment-form .form-actions [type="submit"]');

var debounce = function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

var analyze = function analyze(text, cb) {
  var http = new XMLHttpRequest();

  http.open('GET', 'http://be-kind.mybluemix.net/analyze?text=' + encodeURIComponent(text));

  http.onreadystatechange = function () {
    cb(JSON.parse(http.responseText));
  };

  http.send();
};

var testText = debounce(function (e) {
  var input = e.target.value;

  analyze(input, function (response) {
    var submit;

    console.log(response);

    if (commentSubmit) {
      submit = commentSubmit;
    } else {
      submit = issueSubmit;
    }

    if (response.negative >= 0.5) {
      submit.className = 'btn btn-danger';
    } else {
      submit.className = 'btn btn-primary';
    }
    if (response.anger >= 0.5) {
      submit.setAttribute('disabled', 'disabled');
    } else {
      submit.removeAttribute('disabled');
    }
  });
}, 250);

if (issue) {
  issue.addEventListener('input', testText);
}

if (comment) {
  comment.addEventListener('input', testText);
}
//# sourceMappingURL=contentscript.js.map
