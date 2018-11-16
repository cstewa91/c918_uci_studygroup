-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 16, 2018 at 02:48 AM
-- Server version: 5.6.34-log
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studygroupfinder`
--

-- --------------------------------------------------------

--
-- Table structure for table `study_groups`
--

CREATE TABLE `study_groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `author_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(40) NOT NULL,
  `location` varchar(40) NOT NULL,
  `subject` varchar(30) NOT NULL,
  `course` varchar(30) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `max_group_size` int(10) UNSIGNED NOT NULL,
  `current_group_size` int(10) UNSIGNED NOT NULL,
  `description` varchar(150) NOT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `study_groups`
--

INSERT INTO `study_groups` (`id`, `author_id`, `name`, `location`, `subject`, `course`, `start_time`, `end_time`, `max_group_size`, `current_group_size`, `description`, `date_created`) VALUES
(1, 1, 'the awesome group', 'conference room 202', 'ENG', '202', '2018-11-16 06:00:00', '2018-11-16 07:00:00', 4, 3, 'Preparing for upcoming exam.', '2018-11-15 14:00:00'),
(2, 1, 'the best group', 'conference room 201', 'BIO', '101', '2018-11-17 06:00:00', '2018-11-17 07:00:00', 10, 4, 'Preparing to become a doctor.', '2018-11-15 12:00:00'),
(3, 3, 'the second best group', 'Random Hall 104', 'ECON', '101', '2018-11-18 06:00:00', '2018-11-18 08:00:00', 15, 0, 'Preparing for economic depression.', '2018-11-12 11:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `study_groups`
--
ALTER TABLE `study_groups`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `study_groups`
--
ALTER TABLE `study_groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
