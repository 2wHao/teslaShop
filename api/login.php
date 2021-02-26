<?php 

    $email = $_POST['email'];
    $password = $_POST['password'];

    $con = mysqli_connect('localhost','tesla','123456','tesla');
    
    $sql = "SELECT * FROM `user` WHERE `email` = '$email' AND `password` = '$password'";

    $res = mysqli_query($con,$sql);
    
    if (!$res) {
      die('数据库链接失败' . mysqli_error());
    }
  
    $row = mysqli_fetch_assoc($res);
  
    if (!$row) {

      echo json_encode(array(
        "code" => 0,
        "message" => "登录失败"
      ));
    } else {

      echo json_encode(array(
        "code" => 1,
        "message" => "登录成功"
      ));
    }
?>