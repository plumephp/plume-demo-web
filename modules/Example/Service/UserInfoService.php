<?php

namespace Example\Service;

use Example\Dao\UserInfoDao;
use Plume\Core\Service;
use Plume\Core\Dao;

class UserInfoService extends Service{

    public function __construct($app) {
    	//使用自定义DAO
        parent::__construct($app, new UserInfoDao($app));
        //使用默认DAO
        // parent::__construct($app, new Dao($app, 'user_info', 'id'));
    }
}


