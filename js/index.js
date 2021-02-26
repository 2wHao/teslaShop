$(function ($) {

    let top = $('#top');
    let top_logo = $('#top_logo');
    let top_mid = $('#top_mid');
    let top_login = $('#top_login');
    let list = document.querySelector('.list');
    let wrapper = document.querySelector('#wrapper');
    let opencarts = $('#opencarts');
    let carts = $('#carts');
    let carts_in = $('#carts_in');
    let a = document.querySelector('.a');

    getData();

    let login = localStorage.getItem('username');

    if (login) {
        cartsGetdata(login);
    }

    let login_user = document.querySelector('#login_user')

    if (login) {
        login_user.innerHTML = `<a href="#" style="display:inline-block;" class="loginID">${login}</a><a href='#' id="quit" style="margin-left:5px;display:inline-block;" >[ 退出 ]</a>`
    }

    let quit = document.querySelector('#quit');

    if (quit) {
        quit.onclick = function () {
            localStorage.clear();
            location.href = 'http://tesla.io/shop/index.html';
        }
    }

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

    document.onscroll = function () {

        if (scrollY >= 40) {
            top.css({
                'backgroundColor': '#fff',
                'z-index': '2',
            });
            top_logo.find('a').css('color', '#000')
            top_mid.find('a').css('color', '#000')
            top_login.find('a').css('color', '#000')
            top_login.find('span').css('color', '#000')
            top.find('img').attr("src", "./images/logo_2.png")

        } else if (scrollY <= 40) {
            top.css({
                'background': 'none',
            });
            top_logo.find('a').css('color', '#fff')
            top_mid.find('a').css('color', '#fff')
            top_login.find('a').css('color', '#fff')
            top_login.find('span').css('color', '#fff')
            top.find('img').attr("src", "./images/logo_1.png")
        }
    }

    top.hover(function () {
        top.css({
            'backgroundColor': '#fff'
        });
        $(this).find('img').attr("src", "./images/logo_2.png")
        top_logo.find('a').css('color', '#000')
        top_mid.find('a').css('color', '#000')
        top_login.find('a').css('color', '#000')
        top_login.find('span').css('color', '#000')

    }, function () {

        if (top.css('backgroundColor') == 'rgb(255, 255, 255)' && scrollY == 0) {
            top.css({
                'background': 'none',
            });
            $(this).find('img').attr("src", "./images/logo_1.png")
            top_logo.find('a').css('color', '#fff')
            top_mid.find('a').css('color', '#fff')
            top_login.find('a').css('color', '#fff')
            top_login.find('span').css('color', '#fff')

        } else {
            return;
        }
    })

    async function getData() {
        let data = await pAjax({
            url: './json/index.json'
        })

        let res = JSON.parse(data)

        res.Top.forEach(item => {

            let str = '';

            for (var i = 0; i <= item.length; i++) {
                str += `<a href="#"><li>${item[i].label}</li></a>`
            }
            list.innerHTML = str;
        })

        res.List.forEach(item => {
            let str = '';
            for (var i = 0; i < item.length; i++) {

                str +=
                    `
                <div class="swiper-slide">
                <a href="./html/detail.html?id=${item[i].id}">
                <img src="${item[i].img}">
                <h4>${item[i].label}</h4>
                </a>
                </div>
                `
            }
            wrapper.innerHTML = str;
        })

        res.ad.forEach(item => {

            let str =
                `
             <a href="./html/detail.html?id=${item.Model3_parts[0].id}" style="background-image: url(${item.Model3_parts[0].img});">
            <h3>${item.Model3_parts[0].label}</h3>
            </a>
            `

            $('#box1_left').html(str);

            let str1 =
                `
            <a href="./html/detail.html?id=${item.ModelX_parts[0].id}" style="background-image: url(${item.ModelX_parts[0].img});">
           <h3>${item.ModelX_parts[0].label}</h3>
           </a>
           `
            $('#box1_right').html(str1);

            let str2 = `<a href="./html/detail.html?id=${item.ModelS_parts[0].id}" style="background-image: url(${item.ModelS_parts[0].img});">
            <div>
            <h3>${item.ModelS_parts[0].label}</h3>
            </div>
           </a>
           `

            $('#box2').html(str2);

            let str3 = `<a href="./html/detail.html?id=${item.Charge_service[0].id}" style="background-image: url(${item.Charge_service[0].img});">
            <h3>${item.Charge_service[0].label}</h3>
           </a>
           `
            $('#box3_left').html(str3);

            let str4 =
                `
            <div id="box3_right_1" style="background-image: url(${item.male[0].img});">
            <a href="./html/detail.html?id=${item.male[0].id}" >
            <h3>${item.male[0].label}</h3>
           </a>
           </div>
           
           <div id="box3_right_2"  style="background-image: url(${item.female[0].img});">
           <a href="./html/detail.html?id=${item.female[0].id}">
            <h3>${item.female[0].label}</h3>
           </a>
           </div>
           `
            $('#box3_right').html(str4);

        })

        var aa = window.innerWidth

        if (window.innerWidth < 796) {
            var swiper = new Swiper('.swiper-container', {
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
                    clickable: true,
                },

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });

            $('.swiper-container').hover(function () {
                swiper.autoplay.stop();
            }, function () {
                swiper.autoplay.start();
            });

        } else {
            var swiper = new Swiper('.swiper-container', {
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
                    clickable: true,
                },

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });

            $('.swiper-container').hover(function () {
                swiper.autoplay.stop();
            }, function () {
                swiper.autoplay.start();
            });
        }
    }



    function cartsGetdata(login) {

        $.ajax({
            url: './api/getcartsData.php',
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
                        url: './api/pay.php',
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
                        url: './api/updataCarts.php',
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
                        url: './api/updataCarts.php',
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
                        url: './api/delCarts.php',
                        type: 'post',
                        data: {
                            'id': id,
                            'email': login,
                        },
                        success: function (res) {

                            res = JSON.parse(res);

                            console.log(res);

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