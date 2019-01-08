-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 14, 2018 at 05:50 AM
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
  `course` varchar(30) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `max_group_size` int(10) unsigned NOT NULL,
  `description` varchar(150) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `user_id`, `name`, `location`, `subject`, `course`, `date`, `start_time`, `end_time`, `max_group_size`, `description`) VALUES
(1, 1, 'the awesome group', 'conference room 202', 'ENG', '202', NULL, '06:00:00', '07:00:00', 4, 'Preparing for upcoming exam.'),
(2, 1, 'the best group', 'conference room 201', 'BIO', '101', NULL, '06:00:00', '07:00:00', 10, 'Preparing to become a doctor.'),
(3, 1, 'the second best group', 'Random Hall 104', 'ECON', '101', NULL, '06:00:00', '08:00:00', 15, 'Preparing for economic depression.'),
(13, 0, 'We Study Long Time', 'Starbucks', 'coffee', '101', NULL, '00:00:00', '00:00:00', 10, 'we love coffee'),
(14, 89, 'the divines', 'heaven', 'theology', '9000', '0000-00-00', '06:00:00', '08:00:00', 1000, 'repent for you sins'),
(15, 89, 'the divines b', 'heaven', 'theology', '9000', '0000-00-00', '06:00:00', '08:00:00', 1000, 'repent for you sins'),
(17, 89, 'the divines c', 'heaven', 'theology', '9000', '0000-00-00', '06:00:00', '08:00:00', 1000, 'repent for you sins'),
(19, 89, 'hell', 'starbucks', 'sins', '101', '2019-01-01', '07:00:00', '12:00:00', 2, 'changed through put');

-- --------------------------------------------------------

--
-- Table structure for table `group_members`
--

CREATE TABLE IF NOT EXISTS `group_members` (
  `id` int(11) NOT NULL,
  `group_id` int(11) unsigned NOT NULL,
  `user_id` int(11) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `group_members`
--

INSERT INTO `group_members` (`id`, `group_id`, `user_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(7, 3, 1),
(33, 3, 38),
(34, 3, 90);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(10) unsigned NOT NULL,
  `token` varchar(20) NOT NULL,
  `user_id` int(11) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `token`, `user_id`) VALUES
(29, '6u5klr8ae8o', 31),
(31, '19vt81ibi1i', 1),
(32, 'fryijnng0e', 37),
(33, 'i05925mpvu', 38),
(35, 'x97cmnd2aha', 39),
(36, '7xslc33yfas', 41),
(39, 'bzn29umeulu', 83),
(40, 'vb3e4a2uakp', 84),
(41, 'vb8bo05zjrc', 90),
(42, 'i6r3vwl4gb', 89);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL,
  `google_id` varchar(30) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `firstname` varchar(30) DEFAULT NULL,
  `lastname` varchar(30) DEFAULT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(70) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `google_id`, `username`, `firstname`, `lastname`, `email`, `password`) VALUES
(1, 'a1b2', 'edmund', 'john', 'doe', 'johndoe@gmail.com', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'),
(20, 'abcd', 'Hapachino', 'Hapa', 'Chino', 'lfz@gmail.com', ''),
(30, 'a', 'b', 'king', 'james', 'gg@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef'),
(31, 'test', 'hellokitty', 'test', 'test', 'test@gmail.com', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'),
(34, 'test', 'testerbot3000', 'tester', 'bot', 'test@test.com', 'c4033bff94b567a190e33faa551f411caef444f2'),
(36, 'test', 'testerbot5000', 'tester', 'bot', 'test2@test.com', 'c4033bff94b567a190e33faa551f411caef444f2'),
(37, '{{google_id}}', 'testerbot16000', 'tester', 'bot', 'test7@test.com', '895df4f75b316de68d167ed2e83adb0bedbbde17'),
(38, '{{google_id}}', 'testerbot16001', 'tester', 'bot', 'test8@test.com', '895df4f75b316de68d167ed2e83adb0bedbbde17'),
(39, '{{google_id}}', 'testerbot16002', 'tester', 'bot', 'test9@test.com', '895df4f75b316de68d167ed2e83adb0bedbbde17'),
(41, '{{google_id}}', 'testerbot162', 'tester', 'bot', 'test10@test.com', '895df4f75b316de68d167ed2e83adb0bedbbde17'),
(44, '', 'testerbot163', '', '', 'test11@test.com', '895df4f75b316de68d167ed2e83adb0bedbbde17'),
(45, '', 'testerbot1666', '', '', 'test12@test.com', '895df4f75b316de68d167ed2e83adb0bedbbde17'),
(80, '', 'testerbot19', '', '', 'test19@test.com', '895df4f75b316de68d167ed2e83adb0bedbbde17'),
(82, '', 'testerbot23', '', '', 'test23@test.com', '$2b$10$iMshPDgIWXcx36azuLv5.uP9GUXl1VK2x'),
(83, '', 'testerbot24', '', '', 'test24@test.com', '$2b$10$82qtolSI4zWndHyz7D5vCuQPLmBpplSSaxWoXtowBrKc5xBs/BPMK'),
(84, '', 'testerbot25', '', '', 'test25@test.com', '$2b$10$s7qDeE4Sh3MpUWko1U/LduZkQh7mzjtJUzqGYrNUmB7TOJytJeKVW'),
(85, '', 'testerbot26', '', '', 'test26@test.com', '$2b$10$3r5Zzuq/OBaXvkcAARQEteEgFXJC0BvBZUUW1nlN.0klPYvZA9jaW'),
(87, '', 'testerbot27', '', '', 'test27@test.com', '$2b$10$OMRpeP//YeopAGrFQUzxr.YBM4BiRJGgbrqqkbcWJvLEc42P3uCrm'),
(89, '', 'testerbot28', '', '', 'test28@test.com', '$2b$10$e93cBrhsKShG/GonTFzqReteLS4L/mpqVRIx3dC6ci/01EKlXne0y'),
(90, '', 'testerbot29', '', '', 'test29@test.com', '$2b$10$3qQ9fGlSSM8gHnnJs3KcKO4O9pUNZ4PJK3Xk3p/UoQLkARkuOZijq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

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
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `group_members`
--
ALTER TABLE `group_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=91;
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
