-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 02 月 24 日 19:29
-- 服务器版本: 5.5.47
-- PHP 版本: 5.3.29

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `baidu_news`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `news_id` int(11) NOT NULL AUTO_INCREMENT,
  `news_title` varchar(100) NOT NULL,
  `news_img` varchar(200) NOT NULL,
  `news_content` text NOT NULL,
  `add_time` datetime NOT NULL,
  `news_type` varchar(10) NOT NULL,
  PRIMARY KEY (`news_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='新闻表' AUTO_INCREMENT=22 ;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`news_id`, `news_title`, `news_img`, `news_content`, `add_time`, `news_type`) VALUES
(1, '推荐新闻1', 'img/1.jpg', '推荐新闻1的内容', '2016-02-24 17:59:18', '推荐'),
(2, '科技新闻1', 'img/5.jpg', '科技新闻1的内容', '2016-02-24 17:59:35', '科技'),
(3, '军事新闻1', 'img/3.jpg', '军事新闻1的内容', '2016-02-24 17:59:51', '军事'),
(4, '社会新闻1', 'img/10.jpg', '社会新闻1的内容', '2016-02-24 18:00:06', '社会'),
(5, '社会新闻2', 'img/3.jpg', '社会新闻2的内容', '2016-02-24 18:00:30', '社会'),
(6, '教育新闻1', 'img/11.jpg', '教育新闻1的内容', '2016-02-24 18:00:53', '教育'),
(7, '教育新闻2', 'img/5.jpg', '教育新闻2的内容', '2016-02-24 18:01:55', '教育'),
(8, '娱乐新闻1', 'img/9.jpg', '娱乐新闻1的内容', '2016-02-24 18:02:10', '娱乐'),
(9, '推荐新闻2', 'img/6.jpg', '推荐新闻2的内容', '2016-02-24 18:17:30', '推荐'),
(10, '推荐新闻3', 'img/1.jpg', '推荐新闻3的内容', '2016-02-24 18:18:04', '推荐'),
(11, '推荐新闻4', 'img/6.jpg', '推荐新闻4的内容', '2016-02-24 18:18:31', '推荐'),
(12, '推荐新闻5', 'img/8.jpg', '推荐新闻5的内容', '2016-02-24 18:20:30', '推荐'),
(13, '科技新闻2', 'img/8.jpg', '科技新闻2', '2016-02-24 18:20:59', '科技'),
(14, '科技新闻3', 'img/2.jpg', '科技新闻', '2016-02-24 18:21:16', '科技'),
(15, '军事新闻2', 'img/4.jpg', '军事新闻', '2016-02-24 18:21:37', '军事'),
(16, '军事新闻3', 'img/3.jpg', '军事新闻3', '2016-02-24 18:21:49', '军事'),
(17, '社会新闻3', 'img/6.jpg', '社会新闻3', '2016-02-24 18:22:06', '社会'),
(18, '教育新闻3', 'img/11.jpg', '教育新闻3', '2016-02-24 18:22:31', '教育'),
(19, '娱乐新闻2', 'img/2.jpg', '娱乐新闻2', '2016-02-24 18:22:50', '娱乐'),
(20, '娱乐新闻3', 'img/9.jpg', '娱乐新闻3', '2016-02-24 18:28:22', '娱乐'),
(21, '推荐新闻6', 'img/7.jpg', '推荐新闻6', '2016-02-24 18:32:15', '推荐');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
