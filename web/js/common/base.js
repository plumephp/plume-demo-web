var BaseFun = {};
BaseFun = {
    /**
     * ajax请求函数
     * @param url
     * @param data
     * @param cb
     * @param errorCb
     * @param timeOutCb
     */
    myAjax: function (url, data, cb, errorCb, timeOutCb) {
        $.ajax({
            url : url,
            data: data,
            dataType: "json",
            type: "post",
            success: function (data) {
                if (cb) {
                    cb(data);
                }
            },
            error:function (e) {
                if(errorCb){
                    errorCb(e);
                }
            },
            timeout:function (e) {
                if(timeOutCb){
                    timeOutCb(e);
                }
            }
        });
    },
    /**
     * 按钮的单次提交处理
     * @param btn
     * @param url
     * @param data
     * @param cb
     * @param errorCb
     * @param timeOutCb
     */
    mySubmit: function(btn, url, data, cb, errorCb, timeOutCb) {
        var btnDom = $(btn);//获取要点击的对象
        //防重复提交
        if (btnDom.attr('_disabled') == 1) {//判断是否禁用
            return ;//重复提交直接return
        }
        //判断没有禁用，表示第一次提交
        btnDom.attr('_disabled',1);//在按钮提交之后和AJAX提交之前将按钮设置为禁用
        //Ajax请求
        $.ajax({
            url : url,
            data: data,
            dataType: "json",
            type: "post",
            success: function(data) {
                btnDom.attr('_disabled',0);//在提交成功之后重新启用该按钮
                if (cb) {
                    cb(data);
                }
            },
            error:function (e) {
                btnDom.attr('_disabled',0);//在提交失败之后重新启用该按钮
                if (errorCb) {
                    errorCb(e);
                }
            },
            timeout:function (e) {
                btnDom.attr('_disabled',0);//提交超时的时候重新启用按钮
                if (timeOutCb) {
                    timeOutCb(e);
                }
            }
        });
    },
    /**
     * 获取字符串的长度
     * @param str
     * @returns {string}
     */
    getStrLen: function (str) {
        var cArr = str.match(/[^\x00-\xff]/ig);
        var strLen = str.length;
        if (null != cArr) {
            strLen = strLen + cArr.length;
        }
        return strLen;
    },

    /**
     * 获取字符串长度
     * 包括中英文
     * @param val
     * @returns {number}
     */
    getByteLen: function (val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            } else {
                len += 1;
            }
        }
        return len;
    },
    /**
     * 获取固定长度的字符串
     * @param str
     * @param len
     * @returns {string}
     */
    getNewStr: function (str, len) {
        var cArr = str.match(/[^\x00-\xff]/ig);
        var newStr = '';
        if (cArr) {
            newStr = str.substring(0, len);
        } else {
            newStr = str.substring(0, len * 2);
        }
        return newStr;
    },
    /**
     * 检测是否为空
     * @param s
     * @returns {boolean}
     */
    checkEmpty: function (s) {
        if (s.length == 0) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 检验手机号是否合法
     * @param phone
     * @returns {boolean}
     */
    checkPhone: function (phone) {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (reg.test(phone) === false) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * 匹配Email地址
     * @param email
     * @returns {boolean}
     */
    checkEmail: function (email){
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (reg.test(email) === false) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * 检测是否为纯数字
     * @param num
     * @returns {boolean}
     */
    checkNum: function (num) {
        var reg = /^[0-9]*$/;
        if (reg.test(num) === false) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * 检验身份证号是否合法
     * @param card
     * @returns {boolean}
     */
    checkCardNo: function (card) {
        // 身份证号码为18位，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(card) === false) {
            return false;
        } else {
            return true;
        }
    },

    /**
     * 检验银行卡号是否合法
     * @param bankNo
     * @returns {boolean}
     */
    checkBankNo: function (bankNo) {
        if (bankNo.length < 16 || bankNo.length > 19) {
            return false;
        }
        var reg = /^\d*$/; //全数字
        if (reg.test(bankNo) === false) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * validate正则验证
     * @param value
     * @param type
     * @param regular
     * @returns {boolean}
     */
    myValidate: function (value, type, regular) {
        switch(type){
            case 'tel':
                this.checkPhone(value);
                break;
            case 'email':
                this.checkEmail(value);
                break;
            case 'num':
                this.checkNum(value);
                break;
            case 'card':
                this.checkCardNo(value);
                break;
            case 'bankNo':
                this.checkBankNo(value);
                break;
            default:
                return regular.test(value);//用传过来的正则进行判断
        }
    },
    /**
     * 获取url参数
     * @param name
     * @returns {*}
     * @constructor
     */
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        } else {
            return null;
        }
    },
    /**
     * 操作弹出框
     * @param  msg  提示信息
     * @param  sureFun 确认按钮返回的函数
     * @param  closeBtn 随意传一个值表是有关闭按钮 不传则没有关闭按钮
     * @param  closeFun 关闭弹窗返回的函数
     */
    alertBox: function (msg, sureFun, closeBtn, closeFun) {
        $(".alert-box").show();
        if (closeBtn){
            $(".closeIcon").html("&#xe654;");//添加关闭图标
        }else {
            $(".closeIcon").html("");//移除图标
        }
        $('.alert-box .closeIcon').unbind('click').click(function () {
            if (closeFun){
                closeFun();
            }
            $(".alert-box").hide();
        });
        $('.alert-info').html(msg);
        $('.alert-sure').unbind('click').click(function () {
            if (sureFun){
                sureFun();
            }
            $(".alert-box").hide();
        });
        $('.alert-bg').unbind('click').click(function () {
            $(".alert-box").hide();
        });
    },

    /**
     * confirm
     * @param  msg  提示信息
     * @param  sureFun 确认按钮返回的函数
     * @param  cancelFun 确认按钮返回的函数
     * @param  icon 提示icon
     * @param  iconColor 提示icon的颜色
     * @param  closeBtn 随意传一个值表是有关闭按钮 不传则没有关闭按钮
     * @param  closeFun 关闭弹窗返回的函数
     */
    confirmBox: function (msg, sureFun, cancelFun, icon, iconColor, closeBtn, closeFun) {
        $(".confirm-box").show();
        if (closeBtn){
            $(".closeIcon").html("&#xe654;");//添加关闭图标
        }else {
            $(".closeIcon").html("");//移除图标
        }
        $('.confirm-box .closeIcon').unbind('click').click(function () {
            if (closeFun){
                closeFun();
            }
            $(".confirm-box").hide();
            $('.confirm-icon').remove();//移除图标
        });
        if (icon){
            $('.confirm-info').prepend('<i class="iconfont confirm-icon" style="color: '+ iconColor +';">'+ icon +'</i>');//添加需要的图标
            $('.confirm-info').css('display','block');//改变显示方式
        }else {
            $('.confirm-icon').remove();//移除图标
            $('.confirm-info').css('display','flex');//改变显示方式
        }
        $('.confirm-info .info-cont').html(msg);
        $('.confirm-sure').unbind('click').click(function () {
            if (sureFun){
                sureFun();
            }
            $(".confirm-box").hide();
            $('.confirm-icon').remove();//移除图标
        });
        $('.confirm-cancel').unbind('click').click(function () {
            if (concelFun){
                concelFun();
            }
            $(".confirm-box").hide();
            $('.confirm-icon').remove();//移除图标
        });
        $('.confirm-bg').unbind('click').click(function () {
            $(".confirm-box").hide();
            $('.confirm-icon').remove();//移除图标
        });
    },


    /**
     * tip
     * @param  msg  提示信息
     * @param  time 关闭时间
     * @param  cb   关闭后返回的函数
     */
    tipBox: function (msg, time, cb) {
        $(".tip-box").show();
        $('.tip-cont .tip-info').html(msg);
        //设置关闭时间
        var timer = null;
        clearTimeout(timer);
        timer = setTimeout(function() {
            $(".tip-box").hide();
            if (cb) {
                cb();
            }
        }, time ? time : 2000)
    },

    /**
     * load
     * @param  msg  提示信息
     */
    loadBox: function (msg) {
        $(".load-box").show();
        $('.load-info span').html(msg);
    }

};