-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 23, 2018 at 11:04 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studygroupfinder`
--

DROP TABLE IF EXISTS `studygroupfinder`;
CREATE TABLE `studygroupfinder`;
USE `studygroupfinder`;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(10) unsigned NOT NULL,
  `author_id` int(10) unsigned NOT NULL,
  `name` varchar(40) NOT NULL,
  `location` varchar(40) NOT NULL,
  `subject` varchar(30) NOT NULL,
  `course` varchar(30) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `max_group_size` int(10) unsigned NOT NULL,
  `current_group_size` int(10) unsigned NOT NULL,
  `description` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `author_id`, `name`, `location`, `subject`, `course`, `start_time`, `end_time`, `max_group_size`, `current_group_size`, `description`) VALUES
(1, 1, 'the awesome group', 'conference room 202', 'ENG', '202', '2018-11-16 06:00:00', '2018-11-16 07:00:00', 4, 3, 'Preparing for upcoming exam.'),
(2, 1, 'the best group', 'conference room 201', 'BIO', '101', '2018-11-17 06:00:00', '2018-11-17 07:00:00', 10, 4, 'Preparing to become a doctor.'),
(3, 3, 'the second best group', 'Random Hall 104', 'ECON', '101', '2018-11-18 06:00:00', '2018-11-18 08:00:00', 15, 0, 'Preparing for economic depression.'),
(9, 0, '', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, ''),
(10, 0, '', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `group_members`
--

CREATE TABLE IF NOT EXISTS `group_members` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `group_members`
--

INSERT INTO `group_members` (`id`, `group_id`, `user_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 1, 3),
(6, 2, 3),
(7, 3, 1),
(11, 1, 29),
(12, 1, 31),
(13, 1, 33),
(14, 1, 33),
(15, 1, 33),
(16, 1, 33),
(17, 1, 33),
(18, 1, 33),
(19, 1, 33),
(20, 1, 33),
(21, 1, 33),
(22, 1, 33),
(23, 1, 33),
(24, 1, 33),
(25, 1, 33),
(26, 1, 39),
(27, 1, 39),
(28, 1, 44),
(29, 1, 47);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(10) unsigned NOT NULL,
  `token` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `token`, `user_id`) VALUES
(4, 'novu3loye2', 1),
(5, 'rwu0aop8tlm', 19),
(10, 'nm2srmicpk', 29),
(19, '942pbdllew', 44),
(21, 'citp58l33', 47);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL,
  `google_id` varchar(30) NOT NULL,
  `username` varchar(100) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `google_id`, `username`, `firstname`, `lastname`, `email`, `password`) VALUES
(1, 'a1b2', 'johndoe2000', 'john', 'doe', 'johndoe@gmail.com', '123'),
(3, 'd5a5adkj', 'janedoe', 'jane', 'doe', 'janedoe@gmail.com', ''),
(20, 'abcd', 'Hapachino', 'Hapa', 'Chino', 'lfz@gmail.com', ''),
(29, 'a', 'b', 'king', 'james', 'kingjames@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef'),
(30, 'a', 'b', 'king', 'james', 'gg@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_members`
--
ALTER TABLE `group_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `group_members`
--
ALTER TABLE `group_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
