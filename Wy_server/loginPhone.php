<?php
    header('Access-Control-Allow-Origin: *');
    $telephone = $_POST['telephone'];
    $password=$_POST['password'];
    $sql = "select * from user where telephone='$telephone' and password='$password'";
    $coon=new Mysqli('localhost','root','','admin',3306);
    $coon->query("SET CHARACTER SET 'utf8'");//读库   
    $coon->query("SET NAMES 'utf8'");//写库

    $result=$coon->query($sql);
    $result=$result -> fetch_object();

    if($result){
        $arr = array('code' => '200','message' => '恭喜你登录成功');
        echo json_encode($arr);
        
    }
    else{
        $arr=array('code' => '0','message' => '手机号码或者密码输入错误');
        echo json_encode($arr);}
?>