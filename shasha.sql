SET NAMES UTF8;

#����һ����
DROP DATABASE IF EXISTS shasha;
CREATE DATABASE shasha CHARSET=UTF8;
USE shasha;

#����һ����
CREATE TABLE shasha_productList(
pid INT PRIMARY KEY AUTO_INCREMENT,
pname VARCHAR(256),
price FLOAT(6,1),
pic VARCHAR(64)
);

#���������
INSERT INTO shasha_productList VALUES
(NULL,'精华面膜系列   水钻美白保湿面膜','256.1','images/b51af1443a55045d97c4eff4dfce24cd834e4f54.jpg'),
(NULL,'深层卸妆毛孔洁肤油   美白保湿面膜','658.0','images/da3cffe37d3b3c8ea9561d471441d50eb90164a9.jpg'),
(NULL,'护肤三部曲   卓越润肤乳(天才黄油+)','987.5','images/40ace4050aa401d16ca33790d39ee1aec36f2456.jpg'),
(NULL,'ANR修护系列   肌初赋活原生液(微精华原生液)','123.2','images/cc2dab72a2966891155e79cbd2f4837b711326bd.jpg'),
(NULL,'保湿锁水系列   全日极保湿面膜','987.5','images/e6db22c4c630109d3b763844838d44ed001b508e.jpg'),
(NULL,'保湿锁水系列   玻尿酸复合原液面膜','456.5','images/d3cd9141f44b6493c0c99373272be69b9e8b7a45.jpg'),
(NULL,'舒缓调理喷雾','325.3','images/d3f579d54efdaf752692a6e2976afb88f10affbe.jpg'),
(NULL,'保湿锁水系列   全日极保湿面膜','987.5','images/e6db22c4c630109d3b763844838d44ed001b508e.jpg'),
(NULL,'奇迹马油霜','123.4','images/b51af1443a55045d97c4eff4dfce24cd834e4f54.jpg'),
(NULL,'黄金羊胎素再生精华','585.3','images/a54426bc0c9d26ef9141dc9266a6cd36741295fe.jpg'),
(NULL,'雪肌精美白化妆水套装 (4 件装)','652.4','images/b77efcdf9019d301c4912d31abe2b2dcfacd07aa.jpg'),
(NULL,'黄金羊胎素再生精华','553.8','images/9088347c58e10ad30165a9ff9fe0b8029e1ba226.jpg'),
(NULL,'保湿锁水系列   全日极保湿面膜','987.5','images/e6db22c4c630109d3b763844838d44ed001b508e.jpg'),
(NULL,'舒妍修护系列   舒妍多效洁肤液','654.7','images/87f78ce0434afa21716efe6695255742d813d702.jpg'),
(NULL,'黄金羊胎素再生精华','585.3','images/a54426bc0c9d26ef9141dc9266a6cd36741295fe.jpg'),
(NULL,'护肤精华露(神仙水) 小样','983.9','images/4e815ad0bbaf4531fe948928ae61674b16df4482.jpg'),
(NULL,'黑钻透白冻膜 莎莎独家增量版','543.6','images/1e537a256436d67a74764c74393d48e613aea157.jpg'),
(NULL,'清滢嫩肤水(蓝水)','953.5','images/b51af1443a55045d97c4eff4dfce24cd834e4f54.jpg'),
(NULL,'黄金羊胎素再生精华','585.3','images/a54426bc0c9d26ef9141dc9266a6cd36741295fe.jpg'),
(NULL,'黑钻透白冻膜 莎莎独家增量版','153.3','images/4e815ad0bbaf4531fe948928ae61674b16df4482.jpg'),
(NULL,'护理天使美丽自然','165.4','images/8a5037be487bc15989b3c20b464ec687da4277b2.jpg'),
(NULL,'护理天使美丽自然','323.8','images/25e66916ea4821e42934b86ac117a3375b5d5977.jpg');

CREATE TABLE shasha_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32)
);
INSERT INTO shasha_user VALUES

(1, 'zhangjun@qq.com', '123456');

#添加购物车
CREATE TABLE shasha_cart(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  userId INT
);
INSERT INTO shasha_cart VALUES( 100,  1 );


CREATE TABLE shasha_cart_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  cartId INT ,
  productId INT ,
  count INT
);
INSERT INTO shasha_cart_detail VALUES
(1, 100, 5, 3),
(2, 100, 7, 1),
(3, 100, 8, 2);

#订单信息表
CREATE TABLE shasha_order(
  oid INT PRIMARY KEY AUTO_INCREMENT,
  rcvName VARCHAR(32),
  addr VARCHAR(128),
  payment INT,   #付款方式 1-货到付款  2-支付宝支付  3-京东支付  4-在线支付
  price FLOAT(10,2),
  orderTime BIGINT,
  status INT,  #订单状态 1-等待付款  2-派货中  3-运输中  4-订单完成  5-订单取消
  userId INT
);
INSERT INTO shasha_order VALUES
(1000000000,'张俊','太原大马',1,1000,1471459354649,1,1),
(NULL,'小俊','太原大马',1,1000,1472459354649,2,1),
(NULL,'小林','太原大马',2,1800,1473459354649,3,1),
(NULL,'小俊爸','太原大马',3,1600,1474459354649,4,1),
(NULL,'小俊哥','太原大马',4,1800,1475459354649,5,1),
(NULL,'小俊弟','太原大马',2,2100,1477459354649,2,1);

#订单详情表
CREATE TABLE shasha_order_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  orderId INT,    #订单编号
  productId INT,  #商品编号
  count INT       #购买数量
);
INSERT INTO shasha_order_detail VALUES
(NULL, 1000000000, 1, 2),
(NULL, 1000000000, 2, 1),
(NULL, 1000000000, 3, 3),
(NULL, 1000000001, 4, 2),
(NULL, 1000000001, 5, 3),
(NULL, 1000000002, 6, 5),
(NULL, 1000000002, 7, 8),
(NULL, 1000000002, 8, 4),
(NULL, 1000000003, 9, 1),
(NULL, 1000000004, 10, 9),
(NULL, 1000000004, 11, 1),
(NULL, 1000000004, 12, 3),
(NULL, 1000000004, 13, 4),
(NULL, 1000000005, 14, 2),
(NULL, 1000000005, 15, 1);

CREATE TABLE shasha_fangdajing(
    fid INT PRIMARY KEY AUTO_INCREMENT,
    img_mid1 VARCHAR(128),
    img_mid2 VARCHAR(128),
    img_mid3 VARCHAR(128),
    img_mid4 VARCHAR(128),
    img_mid5 VARCHAR(128),
    img_small1 VARCHAR(128),
    img_small2 VARCHAR(128),
    img_small3 VARCHAR(128),
    img_small4 VARCHAR(128),
    img_small5 VARCHAR(128)
);
INSERT INTO shasha_fangdajing VALUES
(1,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(2,'mid/21.jpg','mid/22.jpg','mid/23.jpg','mid/24.jpg','mid/25.jpg','small/21.jpg','small/22.jpg','small/23.jpg','small/24.jpg','small/25.jpg'),
(NULL,'mid/31.jpg','mid/32.jpg','mid/33.jpg','mid/34.jpg','mid/35.jpg','small/31.jpg','small/32.jpg','small/33.jpg','small/34.jpg','small/35.jpg'),
(NULL,'mid/41.jpg','mid/42.jpg','mid/43.jpg','mid/44.jpg','mid/45.jpg','small/41.jpg','small/42.jpg','small/43.jpg','small/44.jpg','small/45.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg'),
(NULL,'mid/11.jpg','mid/12.jpg','mid/13.jpg','mid/14.jpg','mid/15.jpg','small/11.jpg','small/12.jpg','small/13.jpg','small/14.jpg','small/15.jpg');
