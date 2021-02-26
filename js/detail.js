$(function ($) {

    let opencarts = $('#opencarts');
    let carts = $('#carts');
    let carts_in = $('#carts_in');
    let a = document.querySelector('.a');

    opencarts.click(function () {
        let h = window.innerHeight;
        let w = window.innerWidth;

        carts.css({
            'width': w,
            'height': h
        });
        carts_in.css({
            'height': h
        });

        carts.fadeToggle('fast', 'linear');

        carts_in.finish().animate({
            width: '40%',
        }, 200)

        $('body').css({
            "overflow-x": "hidden",
            "overflow-y": "hidden"
        });
    })

    a.onclick = function (e) {

        if (e.target.className == 'a' || e.target.id == 'out') {

            carts.fadeToggle('fast', 'linear');

            carts_in.finish().animate({
                width: '0%'
            }, 200)

            $('body').css({
                "overflow-x": "auto",
                "overflow-y": "auto"
            });
        }

    }

    let reg = /id=(\d+)/;

    if (!reg.test(location.search)) {
        location.href = '../index.html'
    }

    let id = reg.exec(location.search)[1];

    let login_user = document.querySelector('#login_user')

    let us = localStorage.getItem('username');

    if (us) {
        login_user.innerHTML = `<a href="#" style="margin-right: 15px;">${us}</a><a href='#' id="quit">[ 退出 ]</a>`
    }
    let quit = document.querySelector('#quit');

    if (quit) {
        quit.onclick = function () {
            localStorage.clear();
            location.href = 'http://tesla.io/shop/';
        }
    }

    let list = document.querySelector('.list');
    let img_1 = document.querySelector('#img_1');
    let img_2 = document.querySelector('#img_2');
    let img_3 = document.querySelector('#img_3');
    let img_4 = document.querySelector('#img_4');
    let detail = document.querySelector('#detail');

    getData();

    $.ajax({
        url: '../json/index.json',
        success: function (res) {

            res.Top.forEach(item => {

                let str = '';

                for (var i = 0; i <= item.length; i++) {
                    str += `<a href="#"><li>${item[i].label}</li></a>`
                }
                list.innerHTML = str;
            })
        }
    })

    let login = localStorage.getItem('username');

    if (login) {
        cartsGetdata(login)
    }

    function getData() {

        $.ajax({
            url: '../api/detail.php',
            type: 'post',
            data: ({
                id
            }),
            success: function (data) {

                data = JSON.parse(data);

                document.title = `${data.detail.label}`

                let str1 = '';
                str1 = `<img src="${data.detail.images_1}"
                alt="">`;
                img_1.innerHTML = str1;

                let str2 = '';
                str2 = `<img src="${data.detail.images_2}"
                alt="">`
                img_2.innerHTML = str2;

                if (data.detail.images_3) {
                    let str3 = '';
                    str3 = `<img src="${data.detail.images_3}"
                    alt="">`
                    img_3.innerHTML = str3;
                }

                if (data.detail.images_4) {
                    let str4 = '';
                    str4 = `<img src="${data.detail.images_4}"
                    alt="">`
                    img_4.innerHTML = str4;
                }


                let str5 = '';

                str5 = `<h2>${data.detail.label}</h2>
                <p class="price">￥${data.detail.price}</p>
                <button class="add">添加到购物车</button>
                <p><a href="#">需要帮助?</a></p>
                <div class="help">
                    <p>添加 Tesla 服务号咨询</p>
                    <img src="https://www.tesla.cn/ns_videos/commerce/content/dam/tesla/misc/WechatIMG2.png" alt="">
                </div>
                <p>商品描述</p>
                <p>${data.detail.details}</p>`

                detail.innerHTML = str5;

                let add = document.querySelector('.add');

                add.onclick = function () {

                    let login = localStorage.getItem('username');

                    if (!login) {
                        alert('请登陆后操作');
                        localStorage.setItem('url', location.href);
                        location.href = '../html/login.html';
                        return
                    }

                    $.ajax({
                        url: '../api/add.php',
                        type: 'post',
                        data: {
                            'id': id,
                            'email': login
                        },
                        success: function () {

                            let h = window.innerHeight;
                            let w = window.innerWidth;

                            carts.css({
                                'width': w,
                                'height': h
                            });
                            carts_in.css({
                                'height': h
                            });

                            carts.fadeToggle('fast', 'linear');

                            carts_in.finish().animate({
                                width: '40%',
                            }, 200)

                            $('body').css({
                                "overflow-x": "hidden",
                                "overflow-y": "hidden"
                            });

                            cartsGetdata(login)
                        }
                    })
                }
            }
        })
    }

    function cartsGetdata(login) {

        $.ajax({
            url: '../api/getcartsData.php',
            type: 'post',
            data: {
                'email': login
            },
            success: function (res) {

                res = JSON.parse(res)

                let carts_in = $('#carts_in')

                if (res == '') {

                    let strr = ''
                    strr =
                        ` 
                    <div id="carts_intop">
                        <h5>您的购物车<span>（0）</span></h5>
                        <span class="glyphicon glyphicon-remove-circle" id="out"></span>
                    </div>
                    <div id="carts_in_1">
                        <div id="text">
                            <p>您的购物车是空的。</p>
                        </div>
                    </div>
                    <div id="carts_footer">
                        <p>购物车总额：￥0.00</p>
                        <button class="pay" disabled>结账</button>
                        <p class="free">所有订单均可享受免费配送。</p>
                    </div>
                    `
                    carts_in.html(strr);

                    return
                }

                let str = ''
                let str1 = ''
                let str2 = ''
                let length = res.length;
                let total = 0

                res.forEach(function (item) {

                    str =
                        `
                <div id="carts_intop">
                  <h5>您的购物车<span>（${length}）</span></h5>
                  <span class="glyphicon glyphicon-remove-circle" id="out"></span>
                </div>
                  `

                    str1 +=
                        `
                            <div id="carts_inbox" listId="${item.id}">
                            <div id="img">
                                <img src="${item.images_1}"
                                    alt="">
                            </div>
                            <div id="cont">
                                <p>${item.label}</p>
                                <p>￥${item.price}</p>
                            </div>
                            <div id="btn">
                                <button class="reduce">-</button>
                                <button>${item.num}</button>
                                <button class="increase">+</button>
                            </div>
                            <div id="foot">
                                <p id="total">￥${item.price*item.num}</p>
                                <button class="del">x</button>
                            </div>
                        </div>
                        `
                    total += `${item.price*item.num}` * 1

                    str2 =
                        `
                        <div id="carts_footer">
                        <p>购物车总额：￥${total}</p>
                        <button class="pay">结账</button>
                        <p class="free">所有订单均可享受免费配送。</p>
                        </div>
                        `
                })

                carts_in.html(str + str1 + str2);

                let pay = $('.pay')

                pay.css({
                    'disable': 'none',
                    'backgroundColor': ' #3e6ae1',
                    'cursor': 'pointer'
                })

                pay.click(function () {

                    $.ajax({
                        url: '../api/pay.php',
                        type: 'post',
                        data: {
                            'email': login,
                        },
                        success: function (res) {

                            res = JSON.parse(res);

                            if (res) {

                                alert('结算成功');
                                cartsGetdata(login);
                            }

                        }
                    })
                })

                let reduceBtn = $('.reduce')

                reduceBtn.click(function () {

                    let id = $(this).parents('#carts_inbox').attr('listId');

                    let num = $(this).next().text();

                    reduce(id, num);

                });

                function reduce(id, num) {

                    if (num <= 1) {
                        alert('商品数量最小为 1 件');
                        return
                    }

                    $.ajax({
                        url: '../api/updataCarts.php',
                        type: 'post',
                        data: {
                            'id': id,
                            'num': --num,
                            'email': login,
                        },
                        success: function (res) {

                            res = JSON.parse(res);

                            if (res.code) {

                                cartsGetdata(login)

                            }
                        }
                    })
                }

                let increaseBtn = $('.increase');

                increaseBtn.click(function () {

                    let id = $(this).parents('#carts_inbox').attr('listId');

                    let num = $(this).prev().text();

                    increase(id, num)
                })

                function increase(id, num) {
                    $.ajax({
                        url: '../api/updataCarts.php',
                        type: 'post',
                        data: {
                            'id': id,
                            'num': ++num,
                            'email': login,
                        },
                        success: function (res) {

                            res = JSON.parse(res);

                            if (res.code) {

                                cartsGetdata(login)

                            }
                        }
                    })
                }

                let delBtn = $('.del');
                delBtn.click(function () {

                    let id = $(this).parents('#carts_inbox').attr('listId');

                    $.ajax({
                        url: '../api/delCarts.php',
                        type: 'post',
                        data: {
                            'id': id,
                            'email': login,
                        },
                        success: function (res) {

                            res = JSON.parse(res);

                            if (res.code) {

                                cartsGetdata(login)

                            }
                        }
                    })
                })
            }
        })
    }
})