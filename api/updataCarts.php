<?php
    $id = $_POST['id'];
    $num = $_POST['num'];
    $email = $_POST['email'];

    $con = mysqli_connect('localhost','tesla','123456','tesla');

    $sql = "UPDATE `carts` SET `num` = '$num' WHERE `email`= '$email' AND `id` = '$id'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接失败'  . mysqli_error($con));
    }
    
    print_r(json_encode(array('code'=>$res,'msg'=>'修改成功'),JSON_UNESCAPED_UNICODE));

?>