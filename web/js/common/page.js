/**
 * 分页
 * @param totalNum   内容总条数
 * @param pageSize   每页显示多少条信息
 * @param pageBox  分页的box
 */
function page(totalNum, pageSize, pageBox) {
	var container = $(pageBox);//分页盒子
	var curPage = parseInt(getQueryString('page') || 1);//当前页
	var totalPage = Math.ceil(totalNum / pageSize);//总共多少页
	var i;
	var pageHtml = '';
	//当总的页数大于等于1时候显示
	if (totalPage >= 1) {
		// pageHtml += "<a class='first' data-page='"+ 1 +"'>首页</a>";
		pageHtml += "<a class='previous' data-page='" + (curPage - 1) + "'> < </a>"
	} else {
		pageHtml = "";
	}
	// 当页数在10页之间的显示
	if (totalPage <= 10) {
		for (i = 1; i < curPage; i++) {
			pageHtml += "<a data-page='" + i + "'>" + i + "</a>";
		}
		pageHtml += "<a class='curPage' data-page='" + curPage + "'>" + curPage + "</a>";
		for (i = curPage + 1; i <= totalPage; i++) {
			pageHtml += "<a data-page='" + i + "'>" + i + "</a>";
		}
	}
	//当页数大于10页时候的显示
	if (totalPage > 10) {
		// num...
		if ((curPage < 5 && (totalPage - 7) >= 4) || curPage == 5) {
			for (i = 1; i < curPage; i++) {
				pageHtml += "<a data-page='" + i + "'>" + i + "</a>";
			}
			pageHtml += "<a class='curPage' data-page='" + curPage + "'>" + curPage + "</a>";
			for (i = curPage + 1; i <= 7; i++) {
				pageHtml += "<a data-page='" + i + "'>" + i + "</a>";
			}
			for (i = 8; i <= totalPage - 1; i++) {
				pageHtml += "<a style='display: none;' data-page='" + i + "'>" + i + "</a>";
			}
			pageHtml += "<span>...</span>";
			pageHtml += "<a data-page='" + totalPage + "'>" + totalPage + "</a>";
		}
		//...num
		else if (curPage > 5 && (totalPage - curPage) <= 4) {
			i = 1;
			pageHtml += "<a data-page='" + i + "'>" + i + "</a>";
			pageHtml += "<span>...</span>";
			for (i = 2; i < totalPage - 7; i++) {
				pageHtml += "<a style='display: none;' data-page='" + i + "'>" + i + "</a>";
			}
			for (i = totalPage - 7; i < curPage; i++) {
				pageHtml += "<a data-page='" + i + "'>" + i + "</a>";
			}
			pageHtml += "<a class='curPage' data-page='" + curPage + "'>" + curPage + "</a>";
			for (i = curPage + 1; i <= totalPage - 1; i++) {
				pageHtml += "<a data-page='" + i + "'>" + i + "</a>";
			}
			if (curPage !== totalPage) {
				pageHtml += "<a data-page='" + totalPage + "'>" + totalPage + "</a>";
			}
		}

		//...num...
		else if (curPage > 5 && (totalPage - curPage) >= 5) {
			i = 1;
			pageHtml += "<a data-page='" + i + "'>" + i + "</a>";
			pageHtml += "<span>...</span>";
			for (i = 2; i < curPage - 3; i++) {
				pageHtml += "<a style='display: none;' data-page='" + i + "'>" + i + "</a>";
			}
			for (i = curPage - 3; i < curPage; i++) {
				pageHtml += "<a data-page='" + i + "'>" + i + "</a>";
			}
			pageHtml += "<a class='curPage' data-page='" + curPage + "'>" + curPage + "</a>";
			for (i = curPage + 1; i <= curPage + 3; i++) {
				pageHtml += "<a data-page='" + i + "'>" + i + "</a>";
			}
			for (i = curPage + 4; i <= totalPage - 1; i++) {
				pageHtml += "<a style='display: none;' data-page='" + i + "'>" + i + "</a>";
			}
			pageHtml += "<span>...</span>";
			pageHtml += "<a data-page='" + totalPage + "'>" + totalPage + "</a>";
		}
	}
	pageHtml += "<a class='next' data-page='" + (curPage + 1) + "'> > </a>";
	// pageHtml += "<a class='last' data-page='"+ totalPage +"'>尾页</a>";
	pageHtml += "<span class='pageInfo'>跳转至：</span>";
	pageHtml += "<input type='text' class='pageInp'>";
	pageHtml += "<a class='goBtn'>GO</a>";
	container.html(pageHtml);
	//上一页和下一页的点击状态
	if (curPage == 1) {
		$("#pages a.previous").addClass('disabled');
	}
	if (curPage == totalPage || totalPage == 1) {
		$("#pages a.next").addClass('disabled');
	}
	//点击分页
	$("#pages a:not('.goBtn, .next, .previous')").unbind('click').click(function () {
		var indexPage = $(this).attr('data-page');
		repUrl(indexPage);
	});
	//点击上一页
	$("#pages a.previous").unbind('click').click(function () {
		var indexPage = $(this).attr('data-page');
		if (indexPage == 0) {//当跳转到第一页的时候，上一页停止点击
			$("#pages a.previous").addClass('disabled');
			return;
		}
		$("#pages a.previous").removeClass('disabled');
		repUrl(indexPage);
	});
	//点击下一页
	$("#pages a.next").unbind('click').click(function () {
		var indexPage = $(this).attr('data-page');
		if ((indexPage - totalPage) == 1) {//当跳转到最后一页的时候，下一页停止点击
			$("#pages a.next").addClass('disabled');
			return;
		}
		$("#pages a.next").removeClass('disabled');
		repUrl(indexPage);
	});
	//点击go按钮
	$("#pages a.goBtn").unbind('click').click(function () {
		var indexPage = parseInt($(".pageInp").val());
		if (indexPage > totalPage || isNaN(indexPage) || indexPage <= 0) {//当输入的页码大于总共码或者非数字或者小于等于零，则返回
			$(".pageInp").val('');
			return;
		}
		repUrl(indexPage);
	});

	//获取当前页面,改变分页点击时所跳转的页面
	function repUrl(rel) {
		var url = window.location.href;
		if (url.indexOf("?") > 0) {
			if (url.indexOf("?page") > 0) {
				url = url.substr(0, url.indexOf("?page")) + "?page=";
			} else {
				if (url.indexOf("&page") > 0) {
					url = url.substr(0, url.indexOf("&page")) + "&page=";
				} else {
					url = url + "&page=";
				}
			}
		} else {
			url = url + "?page=";
		}
		window.location.href = url + rel;//拼接地址
	}

	//获取页面参数的值
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return decodeURI(r[2]);
		} else {
			return null;
		}
	}
}