/*
 *	User Info JS
 *	@deps JQuery
 *	@author zhangbaitong
 */

$(function () {
	var userInfo = new UserInfo();
	$('#save').click(userInfo.save);
	$('[name="delete"]').click(userInfo.delete);
	$('#reset').click(userInfo.reset);
	$('#cancel').click(userInfo.home);
});

function UserInfo(){
	var self = this;
	this.save = function(){
        var data = {
            'id': 		$('#userid').val(),
            'username': $('#username').val(),
            'password': $('#password').val()
        };
        self.ajax('/example/index/save',data,function(data){
        	alert(data.msg);
        	self.home();
        });
	}

	this.delete = function(){
        var data = {
            'id':$(this).attr("userid"),
        };
        self.ajax('/example/index/delete',data,function(data){
        	alert(data['msg']);
        	self.home();
        });
	}

	this.reset = function(){
		var id = $('#userid').val();
        if (id) {
            $('#password').val('');
        } else {
            $('#password').val('');
            $('#username').val('');
        }
	}

	this.home = function(){
		window.location.href = '/example/index/index';
	}

	this.ajax = function(url, data, callback){
		$.ajax({
	        url : url,
	        type : "post",
	        async : true,
	        cache : false,
	        data : data,
	        dataType : "json",
	        success : function(recData){
	            callback(recData);
	        },
	        error : function(e){
	            alert(e);
	            console.log('error:', e);
	        }
    	});
	}
}