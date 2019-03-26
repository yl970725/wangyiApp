<?php
 header('Access-Control-Allow-Origin: *');
 $username = $_POST['username'];
 $name=$_POST['name'];
 $email=$_POST['email'];
 $telephone=$_POST['telephone'];
 $age=$_POST['age'];
 $password=$_POST['password'];
 $sex=$_POST['sex'];

$sql="INSERT INTO USER (`username`,`name`,`email`,`telephone`,`age`,`password`,`sex`) VALUE('$username','$name','$email','$telephone',$age,'$password','$sex')";

$coon=new Mysqli('localhost','root','','admin',3306);
$coon->query("SET CHARACTER SET 'utf8'");//读库   
    $coon->query("SET NAMES 'utf8'");//写库 

$result=$coon->query($sql);
if($result){
    $arr = array('code' => '200','message' => '恭喜你注册成功');
    echo json_encode($arr);
    
}
else{
    $arr=array('code' => '0','message' => '恭喜你注册失败');
    echo json_encode($arr);
}
?>