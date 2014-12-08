-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 08, 2014 at 03:23 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;

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
(17, 5, '52', 1),
(18, 6, '100', 1),
(19, 7, 'Ischaemic heart disease', 1),
(20, 7, 'Chronic obstructive pulmonary disease', 0),
(21, 7, 'Lung Cancer', 0),
(22, 7, 'Acute lower respiratory disease', 0),
(23, 8, 'North America', 0),
(24, 8, 'Europe', 0),
(25, 8, 'Russia', 0),
(26, 8, 'China', 1),
(27, 9, '93', 1),
(28, 10, 'Illinois', 0),
(29, 10, 'Kentucy', 1),
(30, 10, 'Tennessee', 0),
(31, 10, 'Michigan', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
