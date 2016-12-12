<?php

namespace Example\Tests;

use Plume\Application;
use Example\Controller\IndexController;

class ApplicationTest extends \PHPUnit_Framework_TestCase{

    private $app = null;

    private $route = null;

    private $render = null;

   	/*
	********** RenderAction **********
	*/

	public function testRenderActionDefault(){
    	$data = $this->getDataByPath('/example/index');
        $this->assertEquals(10, sizeof($data['data']['users']));
        $data = $this->getDataByPath('/example/index/index');
        $this->assertEquals(10, sizeof($data['data']['users']));
        $this->assertEquals('光头强', $data['data']['users'][0]['username']);
    }

    public function testRenderActionEditAdd(){
        $data = $this->getDataByPath('/example/index/edit');
        $this->assertEquals(0, sizeof($data['data']));
    }


    public function testRenderActionEditUpdate(){
        $_REQUEST['id'] = 'id0';
        $data = $this->getDataByPath('/example/index/edit');
        $this->assertEquals(1, sizeof($data['data']));
        $this->assertEquals('光头强', $data['data']['user_info']['username']);
    }

    public function testRenderActionDeleteIsPost(){
        $_REQUEST['id'] = 'nothing';
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $data = $this->getDataByPath('/example/index/delete');
        $this->assertEquals(true, $data['api']);
        $this->assertEquals('{"code":5008,"msg":"非法请求"}', $data['data']);
    }

    public function testRenderActionDeleteNoting(){
        $_REQUEST['id'] = 'nothing';
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $data = $this->getDataByPath('/example/index/delete');
        $this->assertEquals(true, $data['api']);
        $this->assertEquals('{"code":5001,"msg":"删除失败"}', $data['data']);
    }

    /**
     * @expectedException        Exception
     * @expectedExceptionMessage Controller is not found
     */
    public function testRenderAction404(){
        $data = $this->getDataByPath('/example/what/index');
    }

    public function testRenderActionMock(){
        $stub = $this->createMock(IndexController::class);
        $stub->method('indexAction')
             ->willReturn('foo');
        $this->assertEquals('foo', $stub->indexAction());
    }

    private function getDataByPath($path){
        $this->app['plume.request.path'] = $path;
        $route = $this->route->handleRoute();
        return $this->render->renderAction($route);
    }

    /**
     * @before
     */
    public function setupPlume(){
        $this->app = new Application('dev');
        $this->route = $this->app->provider('route');
        $this->render = $this->app->provider('render');
        $this->app['plume.root.path'] = __DIR__.'/../../../';
    }
}