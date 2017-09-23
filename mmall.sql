-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2017-09-23 15:02:35
-- 服务器版本： 10.1.10-MariaDB
-- PHP Version: 7.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mmall`
--

-- --------------------------------------------------------

--
-- 表的结构 `address`
--

CREATE TABLE `address` (
  `addressId` int(255) NOT NULL,
  `userId` int(255) NOT NULL,
  `addressprov` varchar(255) COLLATE utf8_bin NOT NULL,
  `addressshi` varchar(255) COLLATE utf8_bin NOT NULL,
  `addressaccute` varchar(255) COLLATE utf8_bin NOT NULL,
  `phone` int(11) NOT NULL,
  `pd` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `address`
--

INSERT INTO `address` (`addressId`, `userId`, `addressprov`, `addressshi`, `addressaccute`, `phone`, `pd`) VALUES
(2, 10003, '陕西', '西安', '建大', 134, 0),
(4, 10003, '陕西', '西安', '西工大', 111, 0);

-- --------------------------------------------------------

--
-- 表的结构 `cart`
--

CREATE TABLE `cart` (
  `cartId` int(255) NOT NULL,
  `userId` int(255) NOT NULL,
  `productId` int(11) NOT NULL,
  `productName` varchar(255) COLLATE utf8_bin NOT NULL,
  `salePrice` int(11) NOT NULL,
  `productImage` varchar(255) COLLATE utf8_bin NOT NULL,
  `productNum` int(11) NOT NULL,
  `isChecked` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `cart`
--

INSERT INTO `cart` (`cartId`, `userId`, `productId`, `productName`, `salePrice`, `productImage`, `productNum`, `isChecked`) VALUES
(10001, 999999, 0, '车站', 123, '1.jpg', 11, 0),
(10015, 10004, 201710005, '智能插线板', 59, '6.jpg', 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `confrimList`
--

CREATE TABLE `confrimList` (
  `comId` int(255) NOT NULL,
  `userId` int(255) NOT NULL,
  `productName` varchar(255) COLLATE utf8_bin NOT NULL,
  `productImage` varchar(255) COLLATE utf8_bin NOT NULL,
  `productPrice` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `confrimList`
--

INSERT INTO `confrimList` (`comId`, `userId`, `productName`, `productImage`, `productPrice`) VALUES
(1, 10003, '头戴式耳机-3', '2.jpg', 160),
(2, 10003, '平衡车', 'pingheng.jpg', 1999),
(3, 10003, '小米笔记本', 'note.jpg', 7098),
(4, 10003, '小米6', 'mi6.jpg', 2499),
(5, 10003, '头戴式耳机-3', '2.jpg', 160),
(6, 10003, '平衡车', 'pingheng.jpg', 1999),
(7, 10003, '小米笔记本', 'note.jpg', 7098),
(8, 10003, '小米6', 'mi6.jpg', 2499),
(9, 10003, '头戴式耳机-3', '2.jpg', 80),
(10, 10003, '小米笔记本', 'note.jpg', 3549),
(11, 10003, '小米笔记本', 'note.jpg', 3549),
(12, 10003, '小米笔记本', 'note.jpg', 3549),
(13, 10003, '小米笔记本', 'note.jpg', 3549),
(14, 10003, '平衡车', 'pingheng.jpg', 1999),
(15, 10003, '小米笔记本', 'note.jpg', 3549),
(16, 10003, '头戴式耳机-3', '2.jpg', 80),
(17, 10003, '头戴式耳机-3', '2.jpg', 80),
(18, 10003, '智能摄像机', 'photo.jpg', 389),
(19, 10003, '小米6', 'mi6.jpg', 2499),
(20, 10003, '平衡车', 'pingheng.jpg', 1999),
(21, 10003, 'IH 电饭煲', '9.jpg', 4995),
(22, 10003, '平衡车', 'pingheng.jpg', 3998),
(23, 10003, '头戴式耳机-3', '2.jpg', 80);

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

CREATE TABLE `goods` (
  `productId` int(11) NOT NULL,
  `productName` varchar(255) COLLATE utf8_bin NOT NULL,
  `salePrice` int(255) NOT NULL,
  `productImage` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`productId`, `productName`, `salePrice`, `productImage`) VALUES
(201710001, '平衡车', 1999, 'pingheng.jpg'),
(201710002, '头戴式耳机-3', 80, '2.jpg'),
(201710003, '小米笔记本', 3549, 'note.jpg'),
(201710004, '小米6', 2499, 'mi6.jpg'),
(201710005, '智能插线板', 59, '6.jpg'),
(201710006, '自拍杆', 39, 'zipai.jpg'),
(201710007, '小米净水器', 1999, '8.jpg'),
(201710009, 'IH 电饭煲', 999, '9.jpg'),
(201710010, '小米电视4A', 2099, '10.jpg'),
(201710011, 'Ear1000', 1000, '11.jpg'),
(201710012, 'Ear1100', 1100, '12.jpg'),
(201710013, 'Ear2000', 2000, '13.jpg'),
(201710014, 'Ear1600', 1600, '14.jpg'),
(201710015, 'Ear1200', 1200, '15.jpg'),
(201710016, 'Ear700', 700, '16.jpg'),
(201710017, '小钢炮蓝牙音箱', 129, '1.jpg'),
(201710018, '智能摄像机', 389, 'photo.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `userInfo`
--

CREATE TABLE `userInfo` (
  `userId` int(255) NOT NULL,
  `userName` varchar(255) COLLATE utf8_bin NOT NULL,
  `userPwd` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `userInfo`
--

INSERT INTO `userInfo` (`userId`, `userName`, `userPwd`) VALUES
(10001, 'admin', '123456'),
(10002, 'admin1', '1234'),
(10003, 'ssd', '123'),
(10004, 'wmn', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addressId`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartId`);

--
-- Indexes for table `confrimList`
--
ALTER TABLE `confrimList`
  ADD PRIMARY KEY (`comId`);

--
-- Indexes for table `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `userInfo`
--
ALTER TABLE `userInfo`
  ADD PRIMARY KEY (`userId`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `address`
--
ALTER TABLE `address`
  MODIFY `addressId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `cart`
--
ALTER TABLE `cart`
  MODIFY `cartId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10031;
--
-- 使用表AUTO_INCREMENT `confrimList`
--
ALTER TABLE `confrimList`
  MODIFY `comId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- 使用表AUTO_INCREMENT `goods`
--
ALTER TABLE `goods`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201710019;
--
-- 使用表AUTO_INCREMENT `userInfo`
--
ALTER TABLE `userInfo`
  MODIFY `userId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10005;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
