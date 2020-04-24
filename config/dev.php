<?php

return array(
    //数据库配置信息
	'db' => array(
        'driver' => 'mysql',
        'host' => 'localhost',
        'username'=>'root',
        'password'=>'',
        'database'=>'plume',
        'port' => '3306',
        'charset'=>'utf8'
	),
    'redis' => array(
        'host' => '127.0.0.1',
        'port' => '6379'
    ),
    'redis_slave' => array(
        'host' => '127.0.0.1',
        'port' => '6379'
    ),
    'log' => array(
        'project_name' => 'plume-demo-web',
        'server' => array('127.0.0.1' => 4730)
    ),
    'plume_access' => array(
        'project_name' => 'plume_demo_web',
        'redis' => array(
            'host' => '127.0.0.1',
            'port' => '6379',
            'database' => '0'
        )
    ),

);