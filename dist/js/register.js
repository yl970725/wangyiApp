var check = {
    email(val) {
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return reg.test(val);
    },
    telephone(val) {
        const reg = /^1[35789]\d{9}$/;
        return reg.test(val);
    },
    username(val) {
        const reg = /^[a-zA-Z_]{6,18}$/;
        return reg.test(val);
    },
    name(val) {
        const reg = /^[\u4e00-\u9fa5]+$/
        return reg.test(val);
    },
    age(val) {
        if (12 <= val && val <= 50) {
            const reg = /^[1-9]\d*$/;
            return reg.test(val);
        }
        else { return false }
    },
    password(val) {
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,18}$/
        return reg.test(val);
    }
}

var getRandom = function () {
    var str = '';
    //随机大写英文
    var arr = [];
    var i = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    var j = String.fromCharCode(Math.floor(Math.random() * 26 + 97));
    var z = Math.floor(Math.random() * 10);
    arr.push(String.fromCharCode(Math.floor(Math.random() * 26 + 65)), String.fromCharCode(Math.floor(Math.random() * 26 + 97)), Math.floor(Math.random() * 10), i, j, z);
    for (let i = 0; i < 6; i++) {
        str += arr[Math.floor(Math.random() * 6)];
    }
    $('#random-register').html(str);
};

var register = (function () {
    let $form, $btn, $inputAll;
    return {

        init() {
            $form = $('form');
            $btn = $('button');
            $inputAll = $('input')
            this.event();
        },
        event() {
            const self = this;
            for (let i = 0; i < $inputAll.length - 2; i++) {
                $inputAll[i].oninput = function () {
                    self.tip(this);
                }
            }
            //判断用户名是否重复
             $inputAll[0].onblur=function(){
                const $span = $inputAll[0].nextElementSibling;
                if($span.innerHTML=='验证成功'){
                    console.log(1);
                    var  obj= {
                        username: $("input[name='username']").val(),
                    }
                    $.post('http://localhost:7777/Wy_server/registerUser.php',
                obj ,function(data){
                        data = JSON.parse(data);
                        if(data.code=="0"){
                            $span.innerHTML='用户名重复';
                            $span.className = 'bg-error';
                        }else if(data.code=='200'){ 
                            $span.innerHTML='验证成功';
                            $span.className = 'bg-success';
                        }
                    })
                }
            }
            //判断密码框
            $inputAll[6].onblur = function () {
                const $span = $inputAll[6].nextElementSibling;
                if ($inputAll[6].value != '') {

                    if ($inputAll[6].value == $inputAll[5].value) {
                        $span.innerHTML = '验证成功';
                        $span.className = 'bg-success'
                    }
                    else {
                        $span.innerHTML = $inputAll[6].getAttribute('placeholder')
                        $span.className = 'bg-error'
                    }
                }
            }
            $inputAll[7].onblur = function () {
                const $span = $inputAll[7].nextElementSibling;
                if ($inputAll[7].value != '') {
                    if ($inputAll[7].value == $('#random-register').text()) {
                        $span.innerHTML = '验证成功';
                        $span.className = 'bg-success'
                    }
                    else {
                        $span.innerHTML = $inputAll[7].getAttribute('placeholder')
                        $span.className = 'bg-error'
                    }
                }
            }
            $('.get-random').on("click", function () {
                $('#random-register').html('');
                getRandom();
            })
            $btn.on('click', function () {
                for (let i = 0; i < $inputAll.length; i++) {
                    const $input = $inputAll[i];
                    const $p = $input.nextElementSibling;
                    if ($p.className != 'bg-success') {
                        $input.focus();
                        return false;
                    }
                }
                var  obj= {
                    username: $("input[name='username']").val(),
                    name:$("input[name='name']").val(),
                    email:$("input[name='email']").val(),
                    telephone: $("input[name='telephone']").val(),
                    age: $("input[name='age']").val(),
                    password: $("input[name='password']").val(),
                    sex: $("select").val()
                }
                $.post('http://localhost:7777/Wy_server/register.php',
                obj ,function(data){
                        data = JSON.parse(data);
                        if(data.code=="0"){
                            location.href="../register.html"
                        }else if(data.code=='200'){ 
                            alert('所有表单验证成功');
                            location.href="../login.html"
                        }
                    })
              
            })


        }
        ,
        tip($input) {
            const $span = $input.nextElementSibling;
            if (check[$input.name]($input.value)) {
                $span.innerHTML = '验证成功';
                $span.className = 'bg-success';
            }
            else {
                $span.innerHTML = $input.getAttribute('placeholder')
                $span.className = 'bg-error';
            }
        }
    }
}
    ());
getRandom();