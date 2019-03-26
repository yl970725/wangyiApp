<?php
    header('Access-Control-Allow-Origin: *');
    $username = $_POST['username'];
    $password=$_POST['password'];
    $sql = "select * from user where username='$username' and password='$password'";
    $coon=new Mysqli('localhost','root','','admin',3306);
    $coon->query("SET CHARACTER SET 'utf8'");//读库   
    $coon->query("SET NAMES 'utf8'");//写库

    $result=$coon->query($sql);
    $result=$result -> fetch_object();

    if($result){
        $arr = array('code' => '200','message' => '恭喜你登录成功','id'=>$result->id);
        
        echo json_encode($arr);
        
    }
    else{
        $arr=array('code' => '0','message' => '用户名或者密码输入错误');
        echo json_encode($arr);}
?>