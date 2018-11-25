-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 25, 2018 at 01:42 AM
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

DROP DATABASE IF EXISTS `studygroupfinder`;
CREATE DATABASE `studygroupfinder`;
USE `studygroupfinder`;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) unsigned NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  `name` varchar(40) NOT NULL,
  `location` varchar(40) NOT NULL,
  `subject` varchar(30) NOT NULL,
  `course` varchar(30) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `max_group_size` int(10) unsigned NOT NULL,
  `current_group_size` int(10) unsigned NOT NULL,
  `description` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `user_id`, `name`, `location`, `subject`, `course`, `start_time`, `end_time`, `max_group_size`, `current_group_size`, `description`) VALUES
(1, 1, 'the awesome group', 'conference room 202', 'ENG', '202', '2018-11-30 06:00:00', '2018-11-30 07:00:00', 4, 1, 'Preparing for upcoming exam.'),
(2, 1, 'the best group', 'conference room 201', 'BIO', '101', '2018-11-17 06:00:00', '2018-11-17 07:00:00', 10, 4, 'Preparing to become a doctor.'),
(3, 3, 'the second best group', 'Random Hall 104', 'ECON', '101', '2018-11-18 06:00:00', '2018-11-18 08:00:00', 15, 0, 'Preparing for economic depression.'),
(9, 0, '', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, ''),
(10, 0, '', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, ''),
(11, 0, 'We Study Long Time', 'Starbucks', 'coffee', '101', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 10, 1, 'we love coffee'),
(12, 0, 'We Study Long Time', 'Starbucks', 'coffee', '101', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 10, 1, 'we love coffee'),
(13, 0, 'We Study Long Time', 'Starbucks', 'coffee', '101', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 10, 1, 'we love coffee'),
(16, 31, 'we study long time', 'Starbucks', 'coffee', '101', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 10, 0, 'we love coffee');

-- --------------------------------------------------------

--
-- Table structure for table `group_members`
--

CREATE TABLE IF NOT EXISTS `group_members` (
  `id` int(11) NOT NULL,
  `group_id` int(11) unsigned NOT NULL,
  `user_id` int(11) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `group_members`
--

INSERT INTO `group_members` (`id`, `group_id`, `user_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(6, 2, 3),
(37, 2, 31),
(7, 3, 1),
(39, 3, 31),
(32, 16, 31);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(10) unsigned NOT NULL,
  `token` varchar(20) NOT NULL,
  `user_id` int(11) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `token`, `user_id`) VALUES
(29, '6u5klr8ae8o', 31),
(31, '1trerr9an77h', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL,
  `google_id` varchar(30) NOT NULL,
  `username` varchar(100) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `google_id`, `username`, `firstname`, `lastname`, `email`, `password`) VALUES
(1, 'a1b2', 'johndoe2000', 'john', 'doe', 'johndoe@gmail.com', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'),
(3, 'd5a5adkj', 'janedoe', 'jane', 'doe', 'janedoe@gmail.com', ''),
(20, 'abcd', 'Hapachino', 'Hapa', 'Chino', 'lfz@gmail.com', ''),
(30, 'a', 'b', 'king', 'james', 'gg@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef'),
(31, 'test', 'hellokitty', 'test', 'test', 'test@gmail.com', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `group_id_2` (`group_id`,`user_id`),
  ADD KEY `group_id` (`group_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `group_members`
--
ALTER TABLE `group_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `group_members`
--
ALTER TABLE `group_members`
  ADD CONSTRAINT `group_members_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
