"use strict";

$(function ($) {
  var form = $('#form');
  var check = $('#check');
  var create = $('.create');
  check.on('click', function () {
    if (!check.is(":checked")) {
      create.attr('disabled', 'disabled');
      create.css({
        'disabled': 'disabled',
        'background': '#ccc',
        'color': '#000',
        'cursor': 'not-allowed'
      });
    } else {
      create.removeAttr('disabled');
      create.css({
        'disabled': 'none',
        'background': '#3e6ae1',
        'color': '#fff',
        'cursor': 'pointer'
      });
    }
  });
  form.validate({
    rules: {
      firstname: "required",
      lastname: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 5
      }
    },
    messages: {
      firstname: "请输入您的名字",
      lastname: "请输入您的姓氏",
      email: "请输入一个正确的邮箱",
      password: {
        required: "请输入密码",
        minlength: "密码长度不能小于 5 个字符"
      }
    },
    submitHandler: function submitHandler(form) {
      var name = $('.name_1');
      var lastName = $('.lastname_1');
      var email = $('.email_1');
      var pass = $('.pass_1');
      $.ajax({
        url: '../api/create.php',
        type: 'post',
        data: {
          name: name.val(),
          lastName: lastName.val(),
          email: email.val(),
          password: pass.val()
        },
        success: function success(data) {
          data = JSON.parse(data);

          if (data.code == 1) {
            alert('账户创建成功');
            var url = localStorage.getItem('url');

            if (url) {
              location.href = url;
              localStorage.removeItem('url');
            } else {
              location.href = '../html/login.html';
            }
          } else if (data.code == 0) {
            alert('电子邮件地址已被注册');
          }
        }
      });
    }
  });
});