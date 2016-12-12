<?php

namespace Example\Dao;

use Plume\Core\Dao;

class UserInfoDao extends Dao{

    public function __construct($app) {
        parent::__construct($app, 'user_info', 'id');
    }
}