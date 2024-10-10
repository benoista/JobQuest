-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.31 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour jobboard
CREATE DATABASE IF NOT EXISTS `jobboard` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `jobboard`;

-- Listage de la structure de la table jobboard. advertisements
CREATE TABLE IF NOT EXISTS `advertisements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `short_description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `company` int NOT NULL,
  `localization` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `salary` int NOT NULL,
  `contract_type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `working_time` int NOT NULL,
  `id_sector` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_companies` (`company`),
  KEY `id_sector` (`id_sector`),
  CONSTRAINT `fk_companies` FOREIGN KEY (`company`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_sector` FOREIGN KEY (`id_sector`) REFERENCES `sector` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Listage des données de la table jobboard.advertisements : ~4 rows (environ)
DELETE FROM `advertisements`;
INSERT INTO `advertisements` (`id`, `title`, `short_description`, `description`, `company`, `localization`, `salary`, `contract_type`, `date`, `working_time`, `id_sector`) VALUES
	(1, 'DATA Title', 'Data short_description', 'Data description whahwannaz', 1, 'Paris', 1900, 'CDD', '2003-09-10', 35, 3),
	(2, 'DATA Title', 'Data short_description', 'Data description whahwannaz', 1, 'Nantes', 2000, 'CDI', '2003-09-09', 35, 3),
	(3, 'DEV Title', 'Data short_description', 'Data description whahwannaz', 1, 'Nantes', 3000, 'CDI', '2003-09-09', 35, 3),
	(4, 'DEV Title', 'Data short_description', 'Data description whahwannaz', 1, 'Paris', 3000, 'CDI', '2003-09-09', 35, 3);

-- Listage de la structure de la table jobboard. applications
CREATE TABLE IF NOT EXISTS `applications` (
  `id_ads` int NOT NULL,
  `id_people` int NOT NULL,
  `message` text COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id_ads`,`id_people`),
  KEY `id_ads` (`id_ads`),
  KEY `id_people` (`id_people`),
  CONSTRAINT `fk_ads` FOREIGN KEY (`id_ads`) REFERENCES `advertisements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_people` FOREIGN KEY (`id_people`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Listage des données de la table jobboard.applications : ~0 rows (environ)
DELETE FROM `applications`;

-- Listage de la structure de la table jobboard. companies
CREATE TABLE IF NOT EXISTS `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `website` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Listage des données de la table jobboard.companies : ~1 rows (environ)
DELETE FROM `companies`;
INSERT INTO `companies` (`id`, `name`, `website`) VALUES
	(1, 'SNCF', 'https://www.sncf-connect.com/');

-- Listage de la structure de la table jobboard. people
CREATE TABLE IF NOT EXISTS `people` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `is_user` tinyint(1) NOT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Listage des données de la table jobboard.people : ~3 rows (environ)
DELETE FROM `people`;
INSERT INTO `people` (`id`, `is_admin`, `is_user`, `name`, `firstname`, `email`, `password`) VALUES
	(6, 0, 1, 'Benoist', 'Alexandre', 'alexandre.benoist@epitech.eu', '4135aa9dc1b842a653dea846903ddb95bfb8c5a10c504a7fa16e10bc31d1fdf0'),
	(8, 0, 1, 'ben', 'alex', 'alex@gmail.com', '4135aa9dc1b842a653dea846903ddb95bfb8c5a10c504a7fa16e10bc31d1fdf0'),
	(9, 0, 1, 'test', 'bhsenjf', 'alex@gmail.com', 'e75a6cd43a16c2f31d1a3c17700af64d3658a380c49d65b20cc75b1f7c0e001b'),
	(10, 0, 1, 'Ddaad', '', 'abe@gmail.com', '4992c28d439e1effa100ef3dac5213ffc83b18e2186661f1f4f0a97c8c811a1e'),
	(11, 0, 1, 'sas', 'Alexandre', 'pro.abenoist@gmail.com', '18ecab6d9bc68181642517d655c6dbf9e2db227294c89491a45a3be02a6232df'),
	(12, 0, 1, 'dfagh', 'dadadza', 'pro.abenoist@gmail.comda', '2c01011444b686dee813ea1d4d39a0bf2764e59bcca04fecde441d6614e016c3'),
	(13, 0, 1, 'dfaghzdadadza', 'dadadzaededz', 'pro.abenoist@gmail.comda', '2c01011444b686dee813ea1d4d39a0bf2764e59bcca04fecde441d6614e016c3'),
	(14, 0, 1, 'sasasSA', 'daADad', 'pro.abenoist@gmail.com', '8bb603890bad5939c2fd3139220bcc16438083ccbba09234acf60cf8dc9b97d9');

-- Listage de la structure de la table jobboard. sector
CREATE TABLE IF NOT EXISTS `sector` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Listage des données de la table jobboard.sector : ~1 rows (environ)
DELETE FROM `sector`;
INSERT INTO `sector` (`id`, `name`) VALUES
	(3, 'Data');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
