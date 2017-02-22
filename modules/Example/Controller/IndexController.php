<?php

namespace Example\Controller;

use Example\Service\UserInfoService;
use Plume\Core\Controller;
use Plume\Core\Service;
use Plume\Core\Dao;
use Example\Dao\UserInfoDao;

class IndexController extends Controller{

    public function __construct($app) {
        //使用自定义Service
        // parent::__construct($app, new UserInfoService($app));
        //使用默认Service和自定义DAO
        parent::__construct($app, new Service($app, new UserInfoDao($app)));
        //使用默认Service和默认DAO
        // parent::__construct($app, new Service($app, new Dao($app, 'user_info')));
    }

    public function insertsAction(){
        $this->api();
        $users = Array(
             Array ("id" => $this->id(),
                "username" => "admin1",
                "password" => "John1",
                "tel" => 'Doe1'
             ),
             Array ("id" => $this->id(),
                "username" => "admin2",
                "password" => "John2",
                "tel" => 'Doe2'
             ),             
             Array ("id" => $this->id(),
                "username" => "admin3",
                "password" => "John3",
                "tel" => 'Doe3'
             ),
        );
        $ids = $this->service->insertMulti($users);
        return $this->msg(200, $ids)->response();
    }

    public function insertAction(){
        $this->api();
        $user = array(
            "id" => $this->id(),
            "username" => "admin",
            "password" => "John",
            "tel" => 'Doe'
        );
        $insertRet = $this->service->insert($user);
        return $this->msg(200, $insertRet)->response();
    }

	public function indexAction() {
	    // try {
            $usersInfo = $this->service->fetchAll();
            // throw new \Exception('异常测试');
            return $this->result(array('users' => $usersInfo))->response();
        // } catch (\Exception $e) {
            // 记录日志，自定义异常,链式操作，JSON格式化
            // return $this->log(获取会员信息异常', $e->getMessage())->result(array('获取会员信息异常', $e->getMessage()))->json()->error()->response();
        // }
	}

    public function editAction() {
        $id = $this->getParamValue('id');
        if (!empty($id)) {
            $userInfoArr = $this->service->fetchById($id);
            if (!empty($userInfoArr)) {
                return $this->result(array('user_info'=>$userInfoArr[0]))->response();
            }
            //记录日志，系统处理异常
            $this->log('该条记录不存在', array('data'=>$id));
            //返回正常数据
            return $this->result(array('user_error' => '用户'.$id.'不存在'))->response();
        }
        return $this->result(array())->response();
        
    }

    public function deleteAction(){
        $this->api();
        // //API请求，判断请求类型
        if (!$this->api()->isPost()) {
            //返回JSON消息
            return $this->msg(5008, '非法请求')->response();
        }
        $id = $this->getParamValue('id');
        if (empty($id)) {
            return $this->msg(5009, '用户ID不存在')->response();  
        }
        $result = $this->service->deleteById($id);
        if ($result) {
            $this->msg(5000, "删除成功");
        }else{
            $this->msg(5001, "删除失败");
        }
        //分解链式操作，统一返回
        return $this->response();
    }

    public function saveAction() {
        //TODO:统一对非法请求处理？否则将会演变为routes api
        if (!$this->api()->isPost()) {
            return $this->msg(5008, '非法请求')->response();
        }
        $id = $this->getParamValue('id');
        $userName = $this->getParamValue('username');
        $password = $this->getParamValue('password');
        if (empty($userName) || empty($password)) {
            return $this->msg(5007, "参数为空")->response();
        }
        //添加
        if (empty($id)) {
            $id = $this->id();
            $where = array('username' => $userName);
            $existsUser = $this->service->exists($where);
            if ($existsUser) {
                return $this->msg(5006, "该用户名已经存在")->response();
            }
            $insertData = array(
                'id' => $id,
                'username' => $userName,
                'password' => $password
            );
            $insertRet = $this->service->insert($insertData);    
            if (!$insertRet) {
                return $this->msg(5000, "新增失败")->response();
            }
            return $this->msg(0, "新增成功")->response();
        } else {
            //更新
            $updateRet = $this->service->update(array('password' => $password), array('id' => $id));
            if (!$updateRet) {
                return $this->msg(5000, "更新失败")->response();
            }
            return $this->msg(0, "更新成功")->response();
        }
    }

    public function sysAction(){
        $this->api();
        return $this->result($this->plume())->json()->response();
    }

    public function viewAction(){
        return $this->result('redirect to empty')->view('empty')->response();
    }

    public function setSessionAction(){
        $this->api();
        $this->provider('session')->setSessionValue('plume.TestSession','welcome to plume');
        return $this->msg(200,'ok')->response();
    }

    public function getSessionAction(){
        $this->api();
        return $this->msg(200,$this->provider('session')->getSessionValue('plume.TestSession'))->response();
    }

    public function exceptionAction(){
        return $this->result('redirect to exception view')->view_exception('exception')->response();
    }

    public function redisAction(){
        $this->api();
        $redisCon = $this->provider('redis')->connect_slave();
        $key = 'plume.TestRedis';
        if($redisCon->get($key)){
            $redisCon->set($key,'正');
            $redisCon->expireAt($key, time()+1);
            $data =  $redisCon->get($key);
        }else{
            $redisCon->set($key,'反');
            $redisCon->expireAt($key, time()+1);
            $data = $redisCon->get($key);    
        }
        $redisCon->close();
        return $this->msg(200,$data)->response();
    }

    public function pageAction(){
        $this->api();
        $total = $this->service->fetchCount();
        $config = $this->getConfigValue('page', array('index' => 2,'size' => 2));
        $paramArray = array();
        $userList = $this->service->fetchAll();
        $page = array('total' => $total, 'index' => $config['index'], 'size' => $config['size']);
        return $this->result($userList)->json()->response();
    }
}