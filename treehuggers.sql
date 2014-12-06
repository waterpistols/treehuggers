-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 06, 2014 at 05:55 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `text`, `correct`) VALUES
(1, 1, 'Yes', 1),
(2, 1, 'No', 0);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `islands`
--

INSERT INTO `islands` (`id`, `name`, `players`) VALUES
(1, 'Serenity', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `islands_users`
--

INSERT INTO `islands_users` (`id`, `user_id`, `island_id`) VALUES
(1, '9484136185215072', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `text`, `type`, `info`) VALUES
(1, 'Did you sign him with a pen or his cock?', 'Dropdown', 'Entourage! Ari Gold to Lizzie Grant');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `token`, `user_id`, `last_used`, `expires`) VALUES
(1, '0.pZlK9oFNB/.', '9484136185215072', '2014-12-06 17:52:18', '2014-12-06 18:52:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `gender` varchar(8) NOT NULL,
  `link` varchar(64) NOT NULL,
  `locale` varchar(32) NOT NULL,
  `timezone` int(4) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `gender`, `link`, `locale`, `timezone`, `created`, `modified`) VALUES
('9484136185215072', 'undemian@gmail.com', 'Andrei', 'Demian', 'male', 'https://www.facebook.com/app_scoped_user_id/948413618521507/', 'en_US', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users_answers`
--

DROP TABLE IF EXISTS `users_answers`;
CREATE TABLE IF NOT EXISTS `users_answers` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `question_id` int(8) NOT NULL,
  `answer_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
