-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.5.27 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for baranggo_app
CREATE DATABASE IF NOT EXISTS `baranggo_app` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `baranggo_app`;


-- Dumping structure for table baranggo_app.censuses
CREATE TABLE IF NOT EXISTS `censuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `civil_status` varchar(50) DEFAULT NULL,
  `is_employed` varchar(50) DEFAULT NULL,
  `educational_attainment_id` int(11) DEFAULT NULL,
  `is_voter` tinyint(4) DEFAULT NULL,
  `length_of_stay` int(11) DEFAULT NULL,
  `length_of_stay_unit` varchar(50) DEFAULT NULL,
  `source_of_water_id` int(11) DEFAULT NULL,
  `with_electricity` tinyint(4) DEFAULT NULL,
  `with_toilet` tinyint(4) DEFAULT NULL,
  `with_handicap` tinyint(4) DEFAULT NULL,
  `with_sss` tinyint(4) DEFAULT NULL,
  `with_philhealth` tinyint(4) DEFAULT NULL,
  `remarks` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `censuses_educational_attainment_id_to_educational_attainments_id` (`educational_attainment_id`),
  KEY `censuses_source_of_water_id_to_sources_of_water_id` (`source_of_water_id`),
  KEY `censuses_user_id_to_users_id` (`user_id`),
  CONSTRAINT `censuses_user_id_to_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `censuses_educational_attainment_id_to_educational_attainments_id` FOREIGN KEY (`educational_attainment_id`) REFERENCES `educational_attainments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `censuses_source_of_water_id_to_sources_of_water_id` FOREIGN KEY (`source_of_water_id`) REFERENCES `sources_of_water` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.censuses: ~0 rows (approximately)
/*!40000 ALTER TABLE `censuses` DISABLE KEYS */;
/*!40000 ALTER TABLE `censuses` ENABLE KEYS */;


-- Dumping structure for table baranggo_app.educational_attainments
CREATE TABLE IF NOT EXISTS `educational_attainments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `educational_attainment` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.educational_attainments: ~4 rows (approximately)
/*!40000 ALTER TABLE `educational_attainments` DISABLE KEYS */;
INSERT INTO `educational_attainments` (`id`, `educational_attainment`) VALUES
	(1, 'None'),
	(2, 'Elementary'),
	(3, 'High School'),
	(4, 'College');
/*!40000 ALTER TABLE `educational_attainments` ENABLE KEYS */;


-- Dumping structure for table baranggo_app.sources_of_water
CREATE TABLE IF NOT EXISTS `sources_of_water` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_of_water` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.sources_of_water: ~3 rows (approximately)
/*!40000 ALTER TABLE `sources_of_water` DISABLE KEYS */;
INSERT INTO `sources_of_water` (`id`, `source_of_water`) VALUES
	(1, 'None'),
	(2, 'Deep Well'),
	(3, 'KCWD');
/*!40000 ALTER TABLE `sources_of_water` ENABLE KEYS */;


-- Dumping structure for table baranggo_app.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `last_name`, `first_name`, `middle_name`) VALUES
	(1, '123', '202cb962ac59075b964b07152d234b70', 'Felipe', 'Jan Ryan', 'Malicay');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
