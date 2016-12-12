CREATE DATABASE plume;
use plume;

DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` varchar(32) NOT NULL COMMENT '主键',
  `username` varchar(100) DEFAULT NULL COMMENT '名称',
  `password` varchar(100) DEFAULT NULL COMMENT '密码',
  `tel` varchar(14) DEFAULT NULL COMMENT '电话',
  `create_time` datetime DEFAULT NULL COMMENT '记录插入时间',
  `update_time` datetime DEFAULT NULL COMMENT '记录更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


insert into user_info (id,username,password,tel) values('id0','光头强',000,1340987657);
insert into user_info (id,username,password,tel) values('id1','熊大',111,1345121212);
insert into user_info (id,username,password,tel) values('id2','熊二',222,1345121121);
insert into user_info (id,username,password,tel) values('id3','张三',333,1314498334);
insert into user_info (id,username,password,tel) values('id4','李四',444,1724952948);
insert into user_info (id,username,password,tel) values('id5','王五',555,1818485638);
insert into user_info (id,username,password,tel) values('id6','赵六',666,1340987657);
insert into user_info (id,username,password,tel) values('id7','毛毛',777,1340902643);
insert into user_info (id,username,password,tel) values('id8','吉吉',888,1340982124);
insert into user_info (id,username,password,tel) values('id9','笨笨',999,1340212122);