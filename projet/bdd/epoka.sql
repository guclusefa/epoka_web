-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql-epoka.alwaysdata.net
-- Generation Time: Apr 22, 2022 at 02:01 PM
-- Server version: 10.6.5-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `epoka_db`
--
CREATE DATABASE IF NOT EXISTS `epoka_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `epoka_db`;

-- --------------------------------------------------------

--
-- Table structure for table `agences`
--

CREATE TABLE `agences` (
  `age_id` int(11) NOT NULL,
  `age_idCom` int(11) NOT NULL,
  `age_nom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `communes`
--

CREATE TABLE `communes` (
  `com_id` int(11) NOT NULL,
  `com_nom` varchar(50) NOT NULL,
  `com_cp` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `distances`
--

CREATE TABLE `distances` (
  `dis_id` int(11) NOT NULL,
  `dis_idComA` int(11) NOT NULL,
  `dis_idComB` int(11) NOT NULL,
  `dis_km` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `missions`
--

CREATE TABLE `missions` (
  `mis_id` int(11) NOT NULL,
  `mis_idSal` int(11) NOT NULL,
  `mis_idSalCom` int(11) NOT NULL,
  `mis_idCom` int(11) NOT NULL,
  `mis_debut` date NOT NULL,
  `mis_fin` date NOT NULL,
  `mis_validee` tinyint(1) NOT NULL,
  `mis_payee` tinyint(1) NOT NULL,
  `mis_montant` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `parametres`
--

CREATE TABLE `parametres` (
  `indemnite` double NOT NULL,
  `taux` double NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `salaries`
--

CREATE TABLE `salaries` (
  `sal_id` int(11) NOT NULL,
  `sal_idAgence` int(11) NOT NULL,
  `sal_idResponsable` int(11) DEFAULT NULL,
  `sal_nom` varchar(50) NOT NULL,
  `sal_prenom` varchar(50) NOT NULL,
  `sal_mdp` varchar(200) NOT NULL,
  `sal_isResponsable` tinyint(1) NOT NULL DEFAULT 0,
  `sal_isPersonnel` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agences`
--
ALTER TABLE `agences`
  ADD PRIMARY KEY (`age_id`),
  ADD KEY `age_idCom` (`age_idCom`);

--
-- Indexes for table `communes`
--
ALTER TABLE `communes`
  ADD PRIMARY KEY (`com_id`);

--
-- Indexes for table `distances`
--
ALTER TABLE `distances`
  ADD PRIMARY KEY (`dis_id`),
  ADD KEY `dis_idComA` (`dis_idComA`),
  ADD KEY `dis_idComB` (`dis_idComB`);

--
-- Indexes for table `missions`
--
ALTER TABLE `missions`
  ADD PRIMARY KEY (`mis_id`),
  ADD KEY `mis_idCom` (`mis_idCom`),
  ADD KEY `mis_idSal` (`mis_idSal`),
  ADD KEY `mis_idSalCom` (`mis_idSalCom`);

--
-- Indexes for table `salaries`
--
ALTER TABLE `salaries`
  ADD PRIMARY KEY (`sal_id`),
  ADD KEY `sal_idAgence` (`sal_idAgence`),
  ADD KEY `sal_idResponsable` (`sal_idResponsable`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agences`
--
ALTER TABLE `agences`
  MODIFY `age_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `communes`
--
ALTER TABLE `communes`
  MODIFY `com_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `distances`
--
ALTER TABLE `distances`
  MODIFY `dis_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `missions`
--
ALTER TABLE `missions`
  MODIFY `mis_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `salaries`
--
ALTER TABLE `salaries`
  MODIFY `sal_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agences`
--
ALTER TABLE `agences`
  ADD CONSTRAINT `agences_ibfk_1` FOREIGN KEY (`age_idCom`) REFERENCES `communes` (`com_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `distances`
--
ALTER TABLE `distances`
  ADD CONSTRAINT `distances_ibfk_1` FOREIGN KEY (`dis_idComA`) REFERENCES `communes` (`com_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `distances_ibfk_2` FOREIGN KEY (`dis_idComB`) REFERENCES `communes` (`com_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `missions`
--
ALTER TABLE `missions`
  ADD CONSTRAINT `missions_ibfk_1` FOREIGN KEY (`mis_idCom`) REFERENCES `communes` (`com_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `missions_ibfk_2` FOREIGN KEY (`mis_idSal`) REFERENCES `salaries` (`sal_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `missions_ibfk_3` FOREIGN KEY (`mis_idSalCom`) REFERENCES `communes` (`com_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `salaries`
--
ALTER TABLE `salaries`
  ADD CONSTRAINT `salaries_ibfk_1` FOREIGN KEY (`sal_idAgence`) REFERENCES `agences` (`age_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `salaries_ibfk_2` FOREIGN KEY (`sal_idResponsable`) REFERENCES `salaries` (`sal_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
