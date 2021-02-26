$(function ($) {
    let login = $('.login');
    let email = $('.user');
    let pass = $('.pass')

    login.on('click', function () {

        $.ajax({
            url: '../api/login.php',
            type: 'post',
            data: ({
                email: email.val(),
                password: pass.val(),
            }),
            success: function (data) {

                data = JSON.parse(data);

                if (data.code == 1) {
                    alert('登录成功');
                    // setCookie('login', email.val());
                    localStorage.setItem('username', email.val())
                    let url = localStorage.getItem('url');
                    if (url) {
                        location.href = url;
                        localStorage.removeItem('url');
                    } else {
                        location.href = '../index.html';
                    }
                } else if (data.code == 0) {
                    alert('电子邮件地址与密码不匹配');
                    email.val('');
                    pass.val('')
                    email.focus();
                }
            }
        })
    })

})