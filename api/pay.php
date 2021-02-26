<?php

    $email = $_POST['email'];

    $con = mysqli_connect('localhost','tesla','123456','tesla');

    $sql = "DELETE FROM `carts` WHERE `email` = '$email'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die( '数据库链接错误' . mysqli_error($con) );
    }

    print_r(json_encode(array('code'=>$res,'msg'=>'结算成功'),JSON_UNESCAPED_UNICODE))

?>