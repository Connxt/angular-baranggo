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


-- Dumping structure for table baranggo_app.barangays
CREATE TABLE IF NOT EXISTS `barangays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barangay` varchar(50) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `barangays_city_id_to_cities_id` (`city_id`),
  CONSTRAINT `barangays_city_id_to_cities_id` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.barangays: ~1 rows (approximately)
/*!40000 ALTER TABLE `barangays` DISABLE KEYS */;
INSERT INTO `barangays` (`id`, `barangay`, `city_id`, `code`) VALUES
	(1, 'Binicuil', 1, NULL);
/*!40000 ALTER TABLE `barangays` ENABLE KEYS */;


-- Dumping structure for table baranggo_app.children
CREATE TABLE IF NOT EXISTS `children` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) DEFAULT NULL,
  `child_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `children_person_id_to_persons_id` (`person_id`),
  KEY `children_child_id_to_persons_id` (`child_id`),
  CONSTRAINT `children_child_id_to_persons_id` FOREIGN KEY (`child_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `children_person_id_to_persons_id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.children: ~0 rows (approximately)
/*!40000 ALTER TABLE `children` DISABLE KEYS */;
/*!40000 ALTER TABLE `children` ENABLE KEYS */;


-- Dumping structure for table baranggo_app.cities
CREATE TABLE IF NOT EXISTS `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(50) DEFAULT NULL,
  `province_id` int(11) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cities_province_id_to_province_id` (`province_id`),
  CONSTRAINT `cities_province_id_to_province_id` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.cities: ~1 rows (approximately)
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` (`id`, `city`, `province_id`, `code`) VALUES
	(1, 'Kabankalan City', 1, NULL);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;


-- Dumping structure for table baranggo_app.personal_info
CREATE TABLE IF NOT EXISTS `personal_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `civil_status` varchar(50) DEFAULT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `occupation` varchar(50) DEFAULT NULL,
  `annual_income` varchar(50) DEFAULT NULL,
  `educational_attainment` varchar(50) DEFAULT NULL,
  `is_voter` tinyint(4) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  `residence_id` int(11) unsigned zerofill DEFAULT NULL,
  `spouse_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `temporary_persons_info_person_id_to_persons_id` (`person_id`),
  KEY `temporary_persons_info_spouse_id_to_persons_id` (`spouse_id`),
  KEY `personal_info_residence_id_to_residences_id` (`residence_id`),
  CONSTRAINT `personal_info_person_id_to_persons_id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `personal_info_residence_id_to_residences_id` FOREIGN KEY (`residence_id`) REFERENCES `residences` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `personal_info_spouse_id_to_persons_id` FOREIGN KEY (`spouse_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.personal_info: ~6 rows (approximately)
/*!40000 ALTER TABLE `personal_info` DISABLE KEYS */;
INSERT INTO `personal_info` (`id`, `last_name`, `first_name`, `middle_name`, `civil_status`, `religion`, `occupation`, `annual_income`, `educational_attainment`, `is_voter`, `person_id`, `residence_id`, `spouse_id`, `created_at`) VALUES
	(1, 'Felipe', 'Jan Ryan', 'Malicay', 'Single', 'Catholic', 'Software Developer', '1000000', 'College', 1, 1, 00000000001, NULL, '2015-09-03 18:47:08'),
	(2, 'Felipe', 'Benjamin', 'Javier', 'Married', 'Catholic', 'Municipal Officer', '999999', 'College', 1, 2, 00000000001, 3, '2015-09-03 18:47:12'),
	(3, 'Malicay', 'Charlie', 'Sumalpong', 'Married', 'Catholic', 'Manager', '999999', 'College', 1, 3, 00000000001, 2, '2015-09-03 18:47:13'),
	(4, 'Felipe', 'Jan Richard', 'Malicay', 'Single', 'Catholic', 'Ewan', '999999', 'College', 1, 4, 00000000001, NULL, '2015-09-03 18:47:14'),
	(5, 'Felipe', 'Janelle Rose', 'Malicay', 'Single', 'Catholic', 'Ewan', '999999', 'College', 1, 5, 00000000001, NULL, '2015-09-03 18:47:15'),
	(6, 'Felipe', 'Jan Ryan', 'Malicay', 'Married', 'Catholic', 'Software Yeah', '1000000', 'Masters', 1, 1, 00000000001, NULL, '2015-09-03 18:49:16');
/*!40000 ALTER TABLE `personal_info` ENABLE KEYS */;


-- Dumping structure for table baranggo_app.persons
CREATE TABLE IF NOT EXISTS `persons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_of_birth` datetime DEFAULT NULL,
  `place_of_birth` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `mother_id` int(11) DEFAULT NULL,
  `father_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.persons: ~5 rows (approximately)
/*!40000 ALTER TABLE `persons` DISABLE KEYS */;
INSERT INTO `persons` (`id`, `date_of_birth`, `place_of_birth`, `gender`, `mother_id`, `father_id`) VALUES
	(1, '1992-10-07 00:00:00', 'Paranaque', 'Male', 2, 3),
	(2, '1951-07-27 00:00:00', 'Bulacan', 'Male', NULL, NULL),
	(3, '1961-09-13 00:00:00', 'Siquijor', 'Female', NULL, NULL),
	(4, '1986-10-02 00:00:00', 'Paranaque', 'Male', 2, 3),
	(5, '1994-05-02 00:00:00', 'Paranaque', 'Female', 2, 3);
/*!40000 ALTER TABLE `persons` ENABLE KEYS */;


-- Dumping structure for table baranggo_app.provinces
CREATE TABLE IF NOT EXISTS `provinces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `province` varchar(50) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.provinces: ~1 rows (approximately)
/*!40000 ALTER TABLE `provinces` DISABLE KEYS */;
INSERT INTO `provinces` (`id`, `province`, `code`) VALUES
	(1, 'Negros Occidental', NULL);
/*!40000 ALTER TABLE `provinces` ENABLE KEYS */;


-- Dumping structure for table baranggo_app.residences
CREATE TABLE IF NOT EXISTS `residences` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `block_no` int(11) DEFAULT NULL,
  `lot_no` int(11) DEFAULT NULL,
  `street` varchar(50) DEFAULT NULL,
  `purok` varchar(50) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `barangay_id` int(11) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `residences_barangay_id_to_barangays_id` (`barangay_id`),
  CONSTRAINT `residences_barangay_id_to_barangays_id` FOREIGN KEY (`barangay_id`) REFERENCES `barangays` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.residences: ~1 rows (approximately)
/*!40000 ALTER TABLE `residences` DISABLE KEYS */;
INSERT INTO `residences` (`id`, `block_no`, `lot_no`, `street`, `purok`, `latitude`, `longitude`, `barangay_id`, `code`) VALUES
	(00000000001, 7, 7, 'Rose', '1', 100, 200, 1, NULL);
/*!40000 ALTER TABLE `residences` ENABLE KEYS */;


-- Dumping structure for table baranggo_app.siblings
CREATE TABLE IF NOT EXISTS `siblings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) DEFAULT NULL,
  `sibling_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `siblings_person_id_to_persons_id` (`person_id`),
  KEY `siblings_sibling_id_to_persons_id` (`sibling_id`),
  CONSTRAINT `siblings_person_id_to_persons_id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `siblings_sibling_id_to_persons_id` FOREIGN KEY (`sibling_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.siblings: ~6 rows (approximately)
/*!40000 ALTER TABLE `siblings` DISABLE KEYS */;
INSERT INTO `siblings` (`id`, `person_id`, `sibling_id`) VALUES
	(1, 1, 4),
	(2, 1, 5),
	(3, 4, 1),
	(4, 4, 5),
	(5, 5, 1),
	(6, 5, 4);
/*!40000 ALTER TABLE `siblings` ENABLE KEYS */;


-- Dumping structure for table baranggo_app.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `barangay_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_barangay_id_to_barangays_id` (`barangay_id`),
  CONSTRAINT `users_barangay_id_to_barangays_id` FOREIGN KEY (`barangay_id`) REFERENCES `barangays` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_app.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `last_name`, `first_name`, `middle_name`, `barangay_id`) VALUES
	(1, '123', '202cb962ac59075b964b07152d234b70', 'Felipe', 'Jan Ryan', 'Malicay', NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
