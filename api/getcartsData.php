<?php
    $email = $_POST['email'];

    // x先去获取car中这个用户所有的goods_id 
    // 循环获取的结果 然后执行SELECT * FROM `goods` WHERER `goods_id` = id

    $con = mysqli_connect('localhost','tesla','123456','tesla');

    $sql = "SELECT * FROM `goodlist` WHERE `id` in (SELECT `id` FROM `carts` WHERE `email` = '$email')";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }

    $arr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    
    // 获取购物车表这个用户所有的数据
    $carSql = "SELECT * FROM `carts` WHERE `email` = '$email'";
    $carRes = mysqli_query($con,$carSql);
    if(!$carRes){
        die('数据路链接错误' . mysqli_error($con));
    }
    $car = array();
    $carRow = mysqli_fetch_assoc($carRes);
    while($carRow){
        array_push($car,$carRow);
         $carRow = mysqli_fetch_assoc($carRes);
    }

    // 需要给返回的数据添加 goods_num
    for($i = 0;$i <count($arr);$i++){
        for($j = 0;$j< count($car);$j++){
            if($arr[$i]['id'] == $car[$j]['id']){
                $arr[$i]['num'] = $car[$j]['num'];
            }
        }
    }
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>