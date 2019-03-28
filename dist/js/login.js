var login = (function () {
    let $changeInp;
    return {
        init() {
            this.event();
            $changeInp = $('.changeInp');
        },
        event() {
            $('.weixin').on('click', function (e) {
                e = e || window.event;
                e.preventDefault();
                $('.login-box').css("display", "block")
                $('.login-box').css("background-color", " rgb(51, 51, 51)")
                $('.box-title').html('微信登录');
                $('.login-img').removeAttr("src").attr("src", "images/weixin.jpg");
                $('.box-tipone').html('请使用微信扫描二维码')
            })
            $('.weibo').on('click', function (e) {
                e = e || window.event;
                e.preventDefault();
                $('.login-box').css("display", "block");
                $('.login-box').css("background-color", " rgb(51, 51, 51)")
                $('.box-title').html('微博登录');
                $('.login-img').removeAttr("src").attr("src", "images/weibo.jpg");
                $('.box-tipone').html('请使用微博扫描二维码')
            })
            $('.login-box').on('click', function () {
                $('.login-box').css("display", "none")
            })

            $('#lg-btn').on('click', function () {
                if ($(".lg-frame-logo").html().trim() == '网易账户登录') {
                    var obj = {
                        username: $("input[name='username']").val(),
                        password: $("input[name='password']").val()
                    }
                    $.post('http://localhost:7777/Wy_server/login.php', obj, function (data) {
                        data = JSON.parse(data);
                        if (data.code == '0') {     
                            $('.login-sucess').html(data.message)                      
                            //location.href = "login.html";
                        } else if (data.code == "200") {
                            document.cookie = `username=${data.username}; path=/`;
                            location.href = "index.html";
                        }
                    })
                }
                else {
                    var obj = {
                        telephone: $("input[name='telephone']").val(),
                        password: $("input[name='password']").val()
                    }
                    $.post('http://localhost:7777/Wy_server/loginPhone.php', obj, function (data) {
                        data = JSON.parse(data);
                        if (data.code == '0') {
                            $('.login-sucess').html(data.message)
                            //location.href = "login.html";

                        } else if (data.code == "200") {  
                            document.cookie = `username=${data.username}; path=/`; 
                            location.href = "index.html";
                        }
                    })
                }
            })

            $('.sj').on('click', function () {
                console.log($(".lg-frame-logo").html().trim() == '网易账户登录')
                if ($(".lg-frame-logo").html().trim() == '网易账户登录') {
                    $changeInp.removeAttr('name').removeAttr('placeholder').attr("name", "telephone").attr("placeholder", "请输入手机号")
                    $(".lg-frame-logo").html('手机号登录');
                    $('.sjname').html('用户名登录');
                    console.log($('.sjname').prev())
                    $('.sjname').prev().css({ 'background-position': '-111px -1px' })


                }
                else {
                    $changeInp.removeAttr('name').removeAttr('placeholder').attr("name", "username").attr("placeholder", "请输入仅由大小英文及下划线组成的用户名");
                    $(".lg-frame-logo").html('网易账户登录');
                    $('.sjname').html('手机号');
                    $('.sjname').prev().css({ 'background-position': "-141px -1px" })
                }

            })
        }
    }
}())