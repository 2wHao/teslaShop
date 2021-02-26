<?php
    $name = $_POST['name'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $con = mysqli_connect('localhost','tesla','123456','tesla');

    $sql_1 = "SELECT *  FROM `user` WHERE `email` = '$email'";

    $res_1 = mysqli_query($con,$sql_1);

    if(!$res_1){
        die('数据库链接错误' . mysqli_error($con));
    }

    $row = mysqli_fetch_assoc($res_1);

    if($row){

        $arr = array('code'=>'0','msg'=>'添加失败');
        print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
      
    }else if(!$row){

        $sql = "INSERT INTO `user` VALUES('$name','$lastName','$email','$password')";

        $res = mysqli_query($con,$sql);
    
        if(!$res){
            die('数据库链接失败' . mysqli_error($con));
        }

        $arr = array('code'=>$res,'msg'=>'添加成功');
        print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
      
    }
?>