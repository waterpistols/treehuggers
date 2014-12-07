-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 07, 2014 at 09:11 AM
-- Server version: 5.5.40
-- PHP Version: 5.3.10-1ubuntu3.15

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `treehuggers`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
CREATE TABLE IF NOT EXISTS `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(8) NOT NULL,
  `text` text NOT NULL,
  `correct` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `text`, `correct`) VALUES
(1, 1, 'Yes', 1),
(2, 1, 'No', 0),
(3, 2, '125', 1),
(4, 3, 'NO', 0),
(5, 3, 'Maybe', 0);

-- --------------------------------------------------------

--
-- Table structure for table `islands`
--

DROP TABLE IF EXISTS `islands`;
CREATE TABLE IF NOT EXISTS `islands` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `players` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `islands`
--

INSERT INTO `islands` (`id`, `name`, `players`) VALUES
(1, 'Serenity', 4),
(2, 'Serenity', 4),
(3, 'Serenity', 1);

-- --------------------------------------------------------

--
-- Table structure for table `islands_users`
--

DROP TABLE IF EXISTS `islands_users`;
CREATE TABLE IF NOT EXISTS `islands_users` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) NOT NULL,
  `island_id` int(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `islands_users`
--

INSERT INTO `islands_users` (`id`, `user_id`, `island_id`) VALUES
(1, '1', 1),
(2, '2', 1),
(3, '3', 1),
(4, '4', 1),
(5, '5', 2),
(6, '6', 2),
(7, '7', 2),
(8, '1', 2),
(9, '1', 3);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `info` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `text`, `type`, `info`) VALUES
(1, 'Did you sign him with a pen or his cock?', 'Dropdown', 'Entourage! Ari Gold to Lizzie Grant'),
(2, 'huh?', 'Input', 'info'),
(3, 'Wha?', 'Radio', 'no info');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `token` varchar(64) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  `last_used` datetime NOT NULL,
  `expires` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `token`, `user_id`, `last_used`, `expires`) VALUES
(1, '0.IbjnAvNlaPA', '2', '2014-12-07 09:00:29', '2014-12-07 10:00:29'),
(2, '0.IbjnAvNlaPA', '3', '2014-12-07 09:00:47', '2014-12-07 10:00:47'),
(3, '0.IbjnAvNlaPA', '4', '2014-12-07 09:00:47', '2014-12-07 10:00:47'),
(4, '0.IbjnAvNlaPA', '5', '2014-12-07 09:00:47', '2014-12-07 10:00:47'),
(5, '0.IbjnAvNlaPA', '6', '2014-12-07 09:00:47', '2014-12-07 10:00:47'),
(6, '0.IbjnAvNlaPA', '7', '2014-12-07 09:00:48', '2014-12-07 10:00:48'),
(7, '0.IbjnAvNlaPA', '1', '2014-12-07 09:06:51', '2014-12-07 10:06:51'),
(8, '0.IbjnAvNlaPA', '1', '2014-12-07 09:09:38', '2014-12-07 10:09:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `api_id` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `first_login` tinyint(1) NOT NULL,
  `avatar` varchar(64) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `api_id`, `email`, `first_name`, `last_name`, `first_login`, `avatar`, `created`, `modified`) VALUES
(1, '948413618521507', 'undemian@gmail.com', 'Andrei', 'Demian', 0, 'https://www.facebook.com/app_scoped_user_id/948413618521507/', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users_answers`
--

DROP TABLE IF EXISTS `users_answers`;
CREATE TABLE IF NOT EXISTS `users_answers` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `question_id` int(8) NOT NULL,
  `answer_id` int(8) NOT NULL,
  `answer_text` varchar(32) NOT NULL,
  `correct` tinyint(1) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
