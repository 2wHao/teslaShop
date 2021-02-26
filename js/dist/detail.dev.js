"use strict";

$(function ($) {
  var opencarts = $('#opencarts');
  var carts = $('#carts');
  var carts_in = $('#carts_in');
  var a = document.querySelector('.a');
  opencarts.click(function () {
    var h = window.innerHeight;
    var w = window.innerWidth;
    carts.css({
      'width': w,
      'height': h
    });
    carts_in.css({
      'height': h
    });
    carts.fadeToggle('fast', 'linear');
    carts_in.finish().animate({
      width: '40%'
    }, 200);
    $('body').css({
      "overflow-x": "hidden",
      "overflow-y": "hidden"
    });
  });

  a.onclick = function (e) {
    if (e.target.className == 'a' || e.target.id == 'out') {
      carts.fadeToggle('fast', 'linear');
      carts_in.finish().animate({
        width: '0%'
      }, 200);
      $('body').css({
        "overflow-x": "auto",
        "overflow-y": "auto"
      });
    }
  };

  var reg = /id=(\d+)/;

  if (!reg.test(location.search)) {
    location.href = '../index.html';
  }

  var id = reg.exec(location.search)[1];
  var login_user = document.querySelector('#login_user');
  var us = localStorage.getItem('username');

  if (us) {
    login_user.innerHTML = "<a href=\"#\" style=\"margin-right: 15px;\">".concat(us, "</a><a href='#' id=\"quit\">[ \u9000\u51FA ]</a>");
  }

  var quit = document.querySelector('#quit');

  if (quit) {
    quit.onclick = function () {
      localStorage.clear();
      location.href = 'http://tesla.io/shop/';
    };
  }

  var list = document.querySelector('.list');
  var img_1 = document.querySelector('#img_1');
  var img_2 = document.querySelector('#img_2');
  var img_3 = document.querySelector('#img_3');
  var img_4 = document.querySelector('#img_4');
  var detail = document.querySelector('#detail');
  getData();
  $.ajax({
    url: '../json/index.json',
    success: function success(res) {
      res.Top.forEach(function (item) {
        var str = '';

        for (var i = 0; i <= item.length; i++) {
          str += "<a href=\"#\"><li>".concat(item[i].label, "</li></a>");
        }

        list.innerHTML = str;
      });
    }
  });
  var login = localStorage.getItem('username');

  if (login) {
    cartsGetdata(login);
  }

  function getData() {
    $.ajax({
      url: '../api/detail.php',
      type: 'post',
      data: {
        id: id
      },
      success: function success(data) {
        data = JSON.parse(data);
        document.title = "".concat(data.detail.label);
        var str1 = '';
        str1 = "<img src=\"".concat(data.detail.images_1, "\"\n                alt=\"\">");
        img_1.innerHTML = str1;
        var str2 = '';
        str2 = "<img src=\"".concat(data.detail.images_2, "\"\n                alt=\"\">");
        img_2.innerHTML = str2;

        if (data.detail.images_3) {
          var str3 = '';
          str3 = "<img src=\"".concat(data.detail.images_3, "\"\n                    alt=\"\">");
          img_3.innerHTML = str3;
        }

        if (data.detail.images_4) {
          var str4 = '';
          str4 = "<img src=\"".concat(data.detail.images_4, "\"\n                    alt=\"\">");
          img_4.innerHTML = str4;
        }

        var str5 = '';
        str5 = "<h2>".concat(data.detail.label, "</h2>\n                <p class=\"price\">\uFFE5").concat(data.detail.price, "</p>\n                <button class=\"add\">\u6DFB\u52A0\u5230\u8D2D\u7269\u8F66</button>\n                <p><a href=\"#\">\u9700\u8981\u5E2E\u52A9?</a></p>\n                <div class=\"help\">\n                    <p>\u6DFB\u52A0 Tesla \u670D\u52A1\u53F7\u54A8\u8BE2</p>\n                    <img src=\"https://www.tesla.cn/ns_videos/commerce/content/dam/tesla/misc/WechatIMG2.png\" alt=\"\">\n                </div>\n                <p>\u5546\u54C1\u63CF\u8FF0</p>\n                <p>").concat(data.detail.details, "</p>");
        detail.innerHTML = str5;
        var add = document.querySelector('.add');

        add.onclick = function () {
          var login = localStorage.getItem('username');

          if (!login) {
            alert('请登陆后操作');
            localStorage.setItem('url', location.href);
            location.href = '../html/login.html';
            return;
          }

          $.ajax({
            url: '../api/add.php',
            type: 'post',
            data: {
              'id': id,
              'email': login
            },
            success: function success() {
              var h = window.innerHeight;
              var w = window.innerWidth;
              carts.css({
                'width': w,
                'height': h
              });
              carts_in.css({
                'height': h
              });
              carts.fadeToggle('fast', 'linear');
              carts_in.finish().animate({
                width: '40%'
              }, 200);
              $('body').css({
                "overflow-x": "hidden",
                "overflow-y": "hidden"
              });
              cartsGetdata(login);
            }
          });
        };
      }
    });
  }

  function cartsGetdata(login) {
    $.ajax({
      url: '../api/getcartsData.php',
      type: 'post',
      data: {
        'email': login
      },
      success: function success(res) {
        res = JSON.parse(res);
        var carts_in = $('#carts_in');

        if (res == '') {
          var strr = '';
          strr = " \n                    <div id=\"carts_intop\">\n                        <h5>\u60A8\u7684\u8D2D\u7269\u8F66<span>\uFF080\uFF09</span></h5>\n                        <span class=\"glyphicon glyphicon-remove-circle\" id=\"out\"></span>\n                    </div>\n                    <div id=\"carts_in_1\">\n                        <div id=\"text\">\n                            <p>\u60A8\u7684\u8D2D\u7269\u8F66\u662F\u7A7A\u7684\u3002</p>\n                        </div>\n                    </div>\n                    <div id=\"carts_footer\">\n                        <p>\u8D2D\u7269\u8F66\u603B\u989D\uFF1A\uFFE50.00</p>\n                        <button class=\"pay\" disabled>\u7ED3\u8D26</button>\n                        <p class=\"free\">\u6240\u6709\u8BA2\u5355\u5747\u53EF\u4EAB\u53D7\u514D\u8D39\u914D\u9001\u3002</p>\n                    </div>\n                    ";
          carts_in.html(strr);
          return;
        }

        var str = '';
        var str1 = '';
        var str2 = '';
        var length = res.length;
        var total = 0;
        res.forEach(function (item) {
          str = "\n                <div id=\"carts_intop\">\n                  <h5>\u60A8\u7684\u8D2D\u7269\u8F66<span>\uFF08".concat(length, "\uFF09</span></h5>\n                  <span class=\"glyphicon glyphicon-remove-circle\" id=\"out\"></span>\n                </div>\n                  ");
          str1 += "\n                            <div id=\"carts_inbox\" listId=\"".concat(item.id, "\">\n                            <div id=\"img\">\n                                <img src=\"").concat(item.images_1, "\"\n                                    alt=\"\">\n                            </div>\n                            <div id=\"cont\">\n                                <p>").concat(item.label, "</p>\n                                <p>\uFFE5").concat(item.price, "</p>\n                            </div>\n                            <div id=\"btn\">\n                                <button class=\"reduce\">-</button>\n                                <button>").concat(item.num, "</button>\n                                <button class=\"increase\">+</button>\n                            </div>\n                            <div id=\"foot\">\n                                <p id=\"total\">\uFFE5").concat(item.price * item.num, "</p>\n                                <button class=\"del\">x</button>\n                            </div>\n                        </div>\n                        ");
          total += "".concat(item.price * item.num) * 1;
          str2 = "\n                        <div id=\"carts_footer\">\n                        <p>\u8D2D\u7269\u8F66\u603B\u989D\uFF1A\uFFE5".concat(total, "</p>\n                        <button class=\"pay\">\u7ED3\u8D26</button>\n                        <p class=\"free\">\u6240\u6709\u8BA2\u5355\u5747\u53EF\u4EAB\u53D7\u514D\u8D39\u914D\u9001\u3002</p>\n                        </div>\n                        ");
        });
        carts_in.html(str + str1 + str2);
        var pay = $('.pay');
        pay.css({
          'disable': 'none',
          'backgroundColor': ' #3e6ae1',
          'cursor': 'pointer'
        });
        pay.click(function () {
          $.ajax({
            url: '../api/pay.php',
            type: 'post',
            data: {
              'email': login
            },
            success: function success(res) {
              res = JSON.parse(res);

              if (res) {
                alert('结算成功');
                cartsGetdata(login);
              }
            }
          });
        });
        var reduceBtn = $('.reduce');
        reduceBtn.click(function () {
          var id = $(this).parents('#carts_inbox').attr('listId');
          var num = $(this).next().text();
          reduce(id, num);
        });

        function reduce(id, num) {
          if (num <= 1) {
            alert('商品数量最小为 1 件');
            return;
          }

          $.ajax({
            url: '../api/updataCarts.php',
            type: 'post',
            data: {
              'id': id,
              'num': --num,
              'email': login
            },
            success: function success(res) {
              res = JSON.parse(res);

              if (res.code) {
                cartsGetdata(login);
              }
            }
          });
        }

        var increaseBtn = $('.increase');
        increaseBtn.click(function () {
          var id = $(this).parents('#carts_inbox').attr('listId');
          var num = $(this).prev().text();
          increase(id, num);
        });

        function increase(id, num) {
          $.ajax({
            url: '../api/updataCarts.php',
            type: 'post',
            data: {
              'id': id,
              'num': ++num,
              'email': login
            },
            success: function success(res) {
              res = JSON.parse(res);

              if (res.code) {
                cartsGetdata(login);
              }
            }
          });
        }

        var delBtn = $('.del');
        delBtn.click(function () {
          var id = $(this).parents('#carts_inbox').attr('listId');
          $.ajax({
            url: '../api/delCarts.php',
            type: 'post',
            data: {
              'id': id,
              'email': login
            },
            success: function success(res) {
              res = JSON.parse(res);

              if (res.code) {
                cartsGetdata(login);
              }
            }
          });
        });
      }
    });
  }
});