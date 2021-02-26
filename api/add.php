<?php
    $id = $_POST['id'];
    $email = $_POST['email'];
    print_r($id);
    print_r($eamil);

    $con = mysqli_connect('localhost','tesla','123456','tesla');

    $sql = "SELECT *  FROM `carts` WHERE `email` = '$email' AND `id` = '$id'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);

    if(!$row){

        $addSql = "INSERT INTO `carts` VALUES ('$email','$id', '1')";

        $addRes = mysqli_query($con,$addSql);
        if(!$addRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$addRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
    }else{
        $num = ++$row['num'];
        $updat = "UPDATE `carts` SET `num` = '$num' WHERE `email` = '$email' AND `id` = '$id'";

        $updataRes = mysqli_query($con,$updat);

         if(!$updataRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$updataRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
    }
?>