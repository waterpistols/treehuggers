-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 07, 2014 at 07:48 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `text`, `correct`) VALUES
(1, 1, '500 000', 0),
(2, 1, '2 million', 0),
(3, 1, '4 million', 0),
(4, 1, '7 million', 1),
(5, 2, '22%', 1),
(6, 2, '3%', 0),
(7, 2, '35%', 0),
(8, 2, '10%', 0),
(9, 3, 'Michigan', 0),
(10, 3, 'Texas', 0),
(11, 3, 'California', 1),
(12, 3, 'Colorado', 0),
(13, 4, '30%-50%', 0),
(14, 4, '40%-60%', 0),
(15, 4, '70%-80%', 0),
(16, 4, '75%-95%', 1),
(17, 5, '52', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `islands`
--

INSERT INTO `islands` (`id`, `name`, `players`) VALUES
(1, 'Serenity', 4),
(2, 'Serenity', 2);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `islands_users`
--

INSERT INTO `islands_users` (`id`, `user_id`, `island_id`) VALUES
(1, '1', 1),
(2, '2', 1),
(3, '3', 1),
(4, '4', 1),
(5, '5', 2),
(6, '6', 2);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `points` int(8) NOT NULL,
  `info` text NOT NULL,
  `source` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `text`, `type`, `points`, `info`, `source`) VALUES
(1, 'How many deaths caused by air pollution you think ocurred in 2014?', 'Radio', 120, 'In 2013, more than 2 million deaths occured globally as a direct result of air pollution from human activity.', 'http://www.who.int/mediacentre/news/releases/2014/air-pollution/en/'),
(2, 'For every increase of 10 μg/m3 in PM10, the lung cancer rate rises:', 'Dropdown', 140, 'Atmospheric particulate matter with an aerodynamic diameter of 10 µm or less (PM10) – is microscopic solid or liquid matter suspended in the Earth''s atmosphere.', 'http://en.wikipedia.org/wiki/Particulates'),
(3, 'Which US State do you believe has the highest ozone readings?', 'Dropdown', 110, 'Ozone (O3) is defined by Webster as a "very reactive form of oxygen that is a bluish irritating gas of pungent odor, that is a major air pollutant in the lower atmosphere but a beneficial component of the upper atmosphere".', 'http://visual.ly/air-quality-usa'),
(4, 'How much do you think vehicle exhaust contributes to the level of Carbon Monoxide?', 'Radio', 230, 'Carbon Monoxide is defined as "a colorless odorless very toxic gass (CO)".', 'http://visual.ly/air-quality-usa'),
(5, 'What percentage has the carbon monoxide level decreased in the US from 2001 to 2010?', 'Input', 260, 'Carbon Monoxide is defined as "a colorless odorless very toxic gass (CO)".', 'http://visual.ly/air-quality-usa');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `token`, `user_id`, `last_used`, `expires`) VALUES
(1, '0.aDgqullcviM', '1', '2014-12-07 18:05:39', '2014-12-07 19:05:39'),
(2, '0.jAdCAr.mu1A', '2', '2014-12-07 19:44:29', '2014-12-07 20:44:29'),
(3, '0.SZZVfacEv3.', '3', '2014-12-07 17:11:06', '2014-12-07 18:11:06'),
(4, '0.TpQW53jQ9p.', '4', '2014-12-07 17:11:09', '2014-12-07 18:11:09'),
(5, '0.piRxONq3AeU', '5', '2014-12-07 17:12:04', '2014-12-07 18:12:04'),
(6, '0.rbC4AhdTCr6', '6', '2014-12-07 17:35:01', '2014-12-07 18:35:01');

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
  `avatar` text NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `api_id`, `email`, `first_name`, `last_name`, `first_login`, `avatar`, `created`, `modified`) VALUES
(1, '15', 'undemian@gmail.com', 'Andrei', 'Demian', 0, 'https://www.facebook.com/app_scoped_user_id/948413618521507/', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, '13', 'undemian@gmail.com', 'Andrei', 'Demian', 0, 'https://www.facebook.com/app_scoped_user_id/948413618521507/', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, '12', 'undemian@gmail.com', 'Andrei', 'Demian', 0, 'https://www.facebook.com/app_scoped_user_id/948413618521507/', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, '16', 'undemian@gmail.com', 'Andrei', 'Demian', 0, 'https://www.facebook.com/app_scoped_user_id/948413618521507/', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, '21', 'undemian@gmail.com', 'Andrei', 'Demian', 0, 'https://www.facebook.com/app_scoped_user_id/948413618521507/', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, '22', 'undemian@gmail.com', 'Andrei', 'Demian', 0, 'https://www.facebook.com/app_scoped_user_id/948413618521507/', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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

-- --------------------------------------------------------

--
-- Table structure for table `users_data`
--

DROP TABLE IF EXISTS `users_data`;
CREATE TABLE IF NOT EXISTS `users_data` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `user_id` int(8) NOT NULL,
  `pollution` int(8) NOT NULL,
  `points` double NOT NULL,
  `trees` int(8) NOT NULL,
  `asks` int(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `users_data`
--

INSERT INTO `users_data` (`id`, `user_id`, `pollution`, `points`, `trees`, `asks`) VALUES
(1, 1, 100, 0, 4, 3),
(2, 2, 100, 0, 4, 3),
(3, 3, 100, 0, 4, 3),
(4, 4, 100, 0, 4, 3),
(5, 5, 100, 0, 4, 3),
(6, 6, 100, 0, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users_relations`
--

DROP TABLE IF EXISTS `users_relations`;
CREATE TABLE IF NOT EXISTS `users_relations` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `island_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `neighbour_id` int(8) NOT NULL,
  `position` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users_relations`
--

INSERT INTO `users_relations` (`id`, `island_id`, `user_id`, `neighbour_id`, `position`) VALUES
(1, 1, 1, 2, 'west'),
(2, 1, 1, 3, 'north'),
(3, 1, 1, 4, 'east'),
(4, 2, 5, 6, 'west');

-- --------------------------------------------------------

--
-- Table structure for table `users_zones`
--

DROP TABLE IF EXISTS `users_zones`;
CREATE TABLE IF NOT EXISTS `users_zones` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `user_id` int(8) NOT NULL,
  `zone_id` int(8) NOT NULL,
  `degrading_state` int(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `users_zones`
--

INSERT INTO `users_zones` (`id`, `user_id`, `zone_id`, `degrading_state`) VALUES
(1, 1, 1, 0),
(2, 1, 2, 0),
(3, 1, 3, 0),
(4, 1, 4, 0),
(5, 1, 5, 0),
(6, 2, 1, 0),
(7, 2, 2, 0),
(8, 2, 3, 0),
(9, 2, 4, 0),
(10, 2, 5, 0),
(11, 3, 1, 0),
(12, 3, 2, 0),
(13, 3, 3, 0),
(14, 3, 4, 0),
(15, 3, 5, 0),
(16, 4, 1, 0),
(17, 4, 2, 0),
(18, 4, 3, 0),
(19, 4, 4, 0),
(20, 4, 5, 0),
(21, 5, 1, 0),
(22, 5, 2, 0),
(23, 5, 3, 0),
(24, 5, 4, 0),
(25, 5, 5, 0),
(26, 6, 1, 0),
(27, 6, 2, 0),
(28, 6, 3, 0),
(29, 6, 4, 0),
(30, 6, 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `zones`
--

DROP TABLE IF EXISTS `zones`;
CREATE TABLE IF NOT EXISTS `zones` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  `rank` int(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `zones`
--

INSERT INTO `zones` (`id`, `title`, `rank`) VALUES
(1, 'zone1', 3),
(2, 'zone2', 3),
(3, 'zone3', 3),
(4, 'zone4', 2),
(5, 'zone5', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
