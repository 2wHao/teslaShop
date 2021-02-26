"use strict";

$(function ($) {
  var top = $('#top');
  var top_logo = $('#top_logo');
  var top_mid = $('#top_mid');
  var top_login = $('#top_login');
  var list = document.querySelector('.list');
  var wrapper = document.querySelector('#wrapper');
  var opencarts = $('#opencarts');
  var carts = $('#carts');
  var carts_in = $('#carts_in');
  var a = document.querySelector('.a');
  getData();
  var login = localStorage.getItem('username');

  if (login) {
    cartsGetdata(login);
  }

  var login_user = document.querySelector('#login_user');

  if (login) {
    login_user.innerHTML = "<a href=\"#\" style=\"display:inline-block;\" class=\"loginID\">".concat(login, "</a><a href='#' id=\"quit\" style=\"margin-left:5px;display:inline-block;\" >[ \u9000\u51FA ]</a>");
  }

  var quit = document.querySelector('#quit');

  if (quit) {
    quit.onclick = function () {
      localStorage.clear();
      location.href = 'http://tesla.io/shop/index.html';
    };
  }

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

  document.onscroll = function () {
    if (scrollY >= 40) {
      top.css({
        'backgroundColor': '#fff',
        'z-index': '2'
      });
      top_logo.find('a').css('color', '#000');
      top_mid.find('a').css('color', '#000');
      top_login.find('a').css('color', '#000');
      top_login.find('span').css('color', '#000');
      top.find('img').attr("src", "./images/logo_2.png");
    } else if (scrollY <= 40) {
      top.css({
        'background': 'none'
      });
      top_logo.find('a').css('color', '#fff');
      top_mid.find('a').css('color', '#fff');
      top_login.find('a').css('color', '#fff');
      top_login.find('span').css('color', '#fff');
      top.find('img').attr("src", "./images/logo_1.png");
    }
  };

  top.hover(function () {
    top.css({
      'backgroundColor': '#fff'
    });
    $(this).find('img').attr("src", "./images/logo_2.png");
    top_logo.find('a').css('color', '#000');
    top_mid.find('a').css('color', '#000');
    top_login.find('a').css('color', '#000');
    top_login.find('span').css('color', '#000');
  }, function () {
    if (top.css('backgroundColor') == 'rgb(255, 255, 255)' && scrollY == 0) {
      top.css({
        'background': 'none'
      });
      $(this).find('img').attr("src", "./images/logo_1.png");
      top_logo.find('a').css('color', '#fff');
      top_mid.find('a').css('color', '#fff');
      top_login.find('a').css('color', '#fff');
      top_login.find('span').css('color', '#fff');
    } else {
      return;
    }
  });

  function getData() {
    var data, res, aa, swiper;
    return regeneratorRuntime.async(function getData$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(pAjax({
              url: './json/index.json'
            }));

          case 2:
            data = _context.sent;
            res = JSON.parse(data);
            res.Top.forEach(function (item) {
              var str = '';

              for (var i = 0; i <= item.length; i++) {
                str += "<a href=\"#\"><li>".concat(item[i].label, "</li></a>");
              }

              list.innerHTML = str;
            });
            res.List.forEach(function (item) {
              var str = '';

              for (var i = 0; i < item.length; i++) {
                str += "\n                <div class=\"swiper-slide\">\n                <a href=\"./html/detail.html?id=".concat(item[i].id, "\">\n                <img src=\"").concat(item[i].img, "\">\n                <h4>").concat(item[i].label, "</h4>\n                </a>\n                </div>\n                ");
              }

              wrapper.innerHTML = str;
            });
            res.ad.forEach(function (item) {
              var str = "\n             <a href=\"./html/detail.html?id=".concat(item.Model3_parts[0].id, "\" style=\"background-image: url(").concat(item.Model3_parts[0].img, ");\">\n            <h3>").concat(item.Model3_parts[0].label, "</h3>\n            </a>\n            ");
              $('#box1_left').html(str);
              var str1 = "\n            <a href=\"./html/detail.html?id=".concat(item.ModelX_parts[0].id, "\" style=\"background-image: url(").concat(item.ModelX_parts[0].img, ");\">\n           <h3>").concat(item.ModelX_parts[0].label, "</h3>\n           </a>\n           ");
              $('#box1_right').html(str1);
              var str2 = "<a href=\"./html/detail.html?id=".concat(item.ModelS_parts[0].id, "\" style=\"background-image: url(").concat(item.ModelS_parts[0].img, ");\">\n            <div>\n            <h3>").concat(item.ModelS_parts[0].label, "</h3>\n            </div>\n           </a>\n           ");
              $('#box2').html(str2);
              var str3 = "<a href=\"./html/detail.html?id=".concat(item.Charge_service[0].id, "\" style=\"background-image: url(").concat(item.Charge_service[0].img, ");\">\n            <h3>").concat(item.Charge_service[0].label, "</h3>\n           </a>\n           ");
              $('#box3_left').html(str3);
              var str4 = "\n            <div id=\"box3_right_1\" style=\"background-image: url(".concat(item.male[0].img, ");\">\n            <a href=\"./html/detail.html?id=").concat(item.male[0].id, "\" >\n            <h3>").concat(item.male[0].label, "</h3>\n           </a>\n           </div>\n           \n           <div id=\"box3_right_2\"  style=\"background-image: url(").concat(item.female[0].img, ");\">\n           <a href=\"./html/detail.html?id=").concat(item.female[0].id, "\">\n            <h3>").concat(item.female[0].label, "</h3>\n           </a>\n           </div>\n           ");
              $('#box3_right').html(str4);
            });
            aa = window.innerWidth;

            if (window.innerWidth < 796) {
              swiper = new Swiper('.swiper-container', {
                loop: true,
                autoplay: true,
                loopAdditionalSlides: 1,
                initialSlide: 0,
                centedSlides: true,
                grabCursor: true,
                slidesPerView: 1,
                spaceBetween: 30,
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true
                },
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev'
                }
              });
              $('.swiper-container').hover(function () {
                swiper.autoplay.stop();
              }, function () {
                swiper.autoplay.start();
              });
            } else {
              swiper = new Swiper('.swiper-container', {
                loop: true,
                autoplay: true,
                loopAdditionalSlides: 1,
                initialSlide: 0,
                centedSlides: true,
                grabCursor: true,
                slidesPerView: 3,
                spaceBetween: 30,
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true
                },
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev'
                }
              });
              $('.swiper-container').hover(function () {
                swiper.autoplay.stop();
              }, function () {
                swiper.autoplay.start();
              });
            }

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  function cartsGetdata(login) {
    $.ajax({
      url: './api/getcartsData.php',
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
            url: './api/pay.php',
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
            url: './api/updataCarts.php',
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
            url: './api/updataCarts.php',
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
            url: './api/delCarts.php',
            type: 'post',
            data: {
              'id': id,
              'email': login
            },
            success: function success(res) {
              res = JSON.parse(res);
              console.log(res);

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