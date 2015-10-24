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

-- Dumping database structure for baranggo_api
CREATE DATABASE IF NOT EXISTS `baranggo_api` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `baranggo_api`;


-- Dumping structure for table baranggo_api.barangays
CREATE TABLE IF NOT EXISTS `barangays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barangay` varchar(50) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `barangays_city_id_to_cities_id` (`city_id`),
  CONSTRAINT `barangays_city_id_to_cities_id` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_api.barangays: ~1 rows (approximately)
/*!40000 ALTER TABLE `barangays` DISABLE KEYS */;
INSERT INTO `barangays` (`id`, `barangay`, `city_id`, `code`) VALUES
	(1, 'Binicuil', 1, NULL);
/*!40000 ALTER TABLE `barangays` ENABLE KEYS */;


-- Dumping structure for table baranggo_api.barangay_business_clearances
CREATE TABLE IF NOT EXISTS `barangay_business_clearances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) DEFAULT NULL,
  `business_name` varchar(50) DEFAULT NULL,
  `business_address` varchar(50) DEFAULT NULL,
  `business_type` varchar(50) DEFAULT NULL,
  `date_issued` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `barangay_business_clearances_person_id_to_persons_id` (`person_id`),
  CONSTRAINT `barangay_business_clearances_person_id_to_persons_id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_api.barangay_business_clearances: ~0 rows (approximately)
/*!40000 ALTER TABLE `barangay_business_clearances` DISABLE KEYS */;
/*!40000 ALTER TABLE `barangay_business_clearances` ENABLE KEYS */;


-- Dumping structure for table baranggo_api.barangay_clearances
CREATE TABLE IF NOT EXISTS `barangay_clearances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) DEFAULT NULL,
  `reason` varchar(50) DEFAULT NULL,
  `remarks` varchar(50) DEFAULT NULL,
  `date_issued` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `barangay_clearances_person_id_to_persons_id` (`person_id`),
  CONSTRAINT `barangay_clearances_person_id_to_persons_id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_api.barangay_clearances: ~0 rows (approximately)
/*!40000 ALTER TABLE `barangay_clearances` DISABLE KEYS */;
/*!40000 ALTER TABLE `barangay_clearances` ENABLE KEYS */;


-- Dumping structure for table baranggo_api.certificates_of_closure
CREATE TABLE IF NOT EXISTS `certificates_of_closure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) DEFAULT NULL,
  `business_name` varchar(50) DEFAULT NULL,
  `business_address` varchar(50) DEFAULT NULL,
  `date_closed` date DEFAULT NULL,
  `date_issued` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `certificates_of_closure_person_id_to_persons_id` (`person_id`),
  CONSTRAINT `certificates_of_closure_person_id_to_persons_id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_api.certificates_of_closure: ~0 rows (approximately)
/*!40000 ALTER TABLE `certificates_of_closure` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificates_of_closure` ENABLE KEYS */;


-- Dumping structure for table baranggo_api.children
CREATE TABLE IF NOT EXISTS `children` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `children_person_id_to_persons_id` (`person_id`),
  CONSTRAINT `children_person_id_to_persons_id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_api.children: ~15 rows (approximately)
/*!40000 ALTER TABLE `children` DISABLE KEYS */;
INSERT INTO `children` (`id`, `person_id`, `last_name`, `first_name`, `middle_name`, `gender`, `date_of_birth`) VALUES
	(1, 74, NULL, NULL, NULL, NULL, NULL),
	(2, 75, NULL, NULL, NULL, NULL, NULL),
	(3, 76, NULL, NULL, NULL, NULL, NULL),
	(4, 77, NULL, NULL, NULL, NULL, NULL),
	(5, 78, NULL, NULL, NULL, NULL, NULL),
	(6, 79, NULL, NULL, NULL, NULL, NULL),
	(7, 80, NULL, NULL, NULL, NULL, NULL),
	(8, 82, NULL, NULL, NULL, NULL, NULL),
	(9, 83, NULL, NULL, NULL, NULL, NULL),
	(10, 84, 'lastName', 'firstName', 'middleName', 'gender', '1992-10-07 00:00:00'),
	(11, 85, 'lastName', 'firstName', 'middleName', 'gender', '1992-10-07 00:00:00'),
	(12, 86, 'lastName', 'firstName', 'middleName', 'gender', '1992-10-07 00:00:00'),
	(13, 87, 'lastName', 'firstName', 'middleName', 'gender', '1992-10-07 00:00:00'),
	(14, 88, 'lastName', 'firstName', 'middleName', 'gender', '1992-10-07 00:00:00'),
	(15, 89, 'lastName', 'firstName', 'middleName', 'gender', '1992-10-07 00:00:00');
/*!40000 ALTER TABLE `children` ENABLE KEYS */;


-- Dumping structure for table baranggo_api.cities
CREATE TABLE IF NOT EXISTS `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(50) DEFAULT NULL,
  `province_id` int(11) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cities_province_id_to_province_id` (`province_id`),
  CONSTRAINT `cities_province_id_to_province_id` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_api.cities: ~1 rows (approximately)
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` (`id`, `city`, `province_id`, `code`) VALUES
	(1, 'Kabankalan City', 1, NULL);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;


-- Dumping structure for table baranggo_api.persons
CREATE TABLE IF NOT EXISTS `persons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `place_of_birth` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `mother_last_name` varchar(50) DEFAULT NULL,
  `mother_first_name` varchar(50) DEFAULT NULL,
  `mother_middle_name` varchar(50) DEFAULT NULL,
  `mother_date_of_birth` datetime DEFAULT NULL,
  `father_last_name` varchar(50) DEFAULT NULL,
  `father_first_name` varchar(50) DEFAULT NULL,
  `father_middle_name` varchar(50) DEFAULT NULL,
  `father_date_of_birth` datetime DEFAULT NULL,
  `contact_no` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_api.persons: ~16 rows (approximately)
/*!40000 ALTER TABLE `persons` DISABLE KEYS */;
INSERT INTO `persons` (`id`, `last_name`, `first_name`, `middle_name`, `date_of_birth`, `place_of_birth`, `gender`, `mother_last_name`, `mother_first_name`, `mother_middle_name`, `mother_date_of_birth`, `father_last_name`, `father_first_name`, `father_middle_name`, `father_date_of_birth`, `contact_no`, `email`, `created_at`, `updated_at`) VALUES
	(74, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 09:58:43', '2015-10-22 09:58:43'),
	(75, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 09:58:47', '2015-10-22 09:58:47'),
	(76, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 09:59:12', '2015-10-22 09:59:12'),
	(77, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 10:00:06', '2015-10-22 10:00:06'),
	(78, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 10:04:49', '2015-10-22 10:04:49'),
	(79, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 10:05:21', '2015-10-22 10:05:21'),
	(80, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 10:05:59', '2015-10-22 10:05:59'),
	(81, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 10:07:43', '2015-10-22 10:07:43'),
	(82, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 10:28:28', '2015-10-22 10:28:28'),
	(83, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 12:24:17', '2015-10-22 12:24:17'),
	(84, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 12:25:01', '2015-10-22 12:25:01'),
	(85, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 12:25:25', '2015-10-22 12:25:25'),
	(86, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-22 12:25:41', '2015-10-22 12:25:41'),
	(87, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-23 09:54:01', '2015-10-23 09:54:01'),
	(88, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-23 09:54:07', '2015-10-23 09:54:07'),
	(89, 'lastName', 'firstName', 'middleName', '1992-10-07', 'placeOfBirth', 'gender', 'motherLastName', 'motherFirstName', 'motherMiddleName', '1992-10-07 00:00:00', 'fatherLastName', 'fatherFirstName', 'fatherMiddleName', '1992-10-07 00:00:00', 'contactNo', 'email', '2015-10-23 10:05:29', '2015-10-23 10:05:29');
/*!40000 ALTER TABLE `persons` ENABLE KEYS */;


-- Dumping structure for table baranggo_api.provinces
CREATE TABLE IF NOT EXISTS `provinces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `province` varchar(50) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_api.provinces: ~1 rows (approximately)
/*!40000 ALTER TABLE `provinces` DISABLE KEYS */;
INSERT INTO `provinces` (`id`, `province`, `code`) VALUES
	(1, 'Negros Occidental', NULL);
/*!40000 ALTER TABLE `provinces` ENABLE KEYS */;


-- Dumping structure for table baranggo_api.residences
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
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `residences_barangay_id_to_barangays_id` (`barangay_id`),
  CONSTRAINT `residences_barangay_id_to_barangays_id` FOREIGN KEY (`barangay_id`) REFERENCES `barangays` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_api.residences: ~1 rows (approximately)
/*!40000 ALTER TABLE `residences` DISABLE KEYS */;
INSERT INTO `residences` (`id`, `block_no`, `lot_no`, `street`, `purok`, `latitude`, `longitude`, `barangay_id`, `code`, `created_at`) VALUES
	(00000000001, 7, 7, 'Rose', '1', 100, 200, 1, NULL, NULL);
/*!40000 ALTER TABLE `residences` ENABLE KEYS */;


-- Dumping structure for table baranggo_api.siblings
CREATE TABLE IF NOT EXISTS `siblings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `siblings_person_id_to_persons_id` (`person_id`),
  CONSTRAINT `siblings_person_id_to_persons_id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_api.siblings: ~6 rows (approximately)
/*!40000 ALTER TABLE `siblings` DISABLE KEYS */;
INSERT INTO `siblings` (`id`, `person_id`, `last_name`, `first_name`, `middle_name`, `gender`, `date_of_birth`) VALUES
	(10, 84, 'lastName', 'firstName', 'middleName', 'gender', '1992-10-07 00:00:00'),
	(11, 85, 'lastName', 'firstName', 'middleName', 'gender', '1992-10-07 00:00:00'),
	(12, 86, 'lastName', 'firstName', 'middleName', 'gender', '1992-10-07 00:00:00'),
	(13, 87, 'lastName', 'firstName', 'middleName', 'gender', '1992-10-07 00:00:00'),
	(14, 88, 'lastName', 'firstName', 'middleName', 'gender', '1992-10-07 00:00:00'),
	(15, 89, 'lastName', 'firstName', 'middleName', 'gender', '1992-10-07 00:00:00');
/*!40000 ALTER TABLE `siblings` ENABLE KEYS */;


-- Dumping structure for table baranggo_api.temp_person_infos
CREATE TABLE IF NOT EXISTS `temp_person_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `civil_status` varchar(50) DEFAULT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `annual_income` double DEFAULT NULL,
  `educational_attainment` varchar(50) DEFAULT NULL,
  `is_employed` tinyint(4) DEFAULT NULL,
  `is_voter` tinyint(4) DEFAULT NULL,
  `is_deceased` tinyint(4) DEFAULT NULL,
  `with_philhealth` tinyint(4) DEFAULT NULL,
  `with_sss` tinyint(4) DEFAULT NULL,
  `with_electricity` tinyint(4) DEFAULT NULL,
  `with_water` tinyint(4) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  `residence_id` int(11) unsigned zerofill DEFAULT NULL,
  `spouse_last_name` varchar(50) DEFAULT NULL,
  `spouse_first_name` varchar(50) DEFAULT NULL,
  `spouse_middle_name` varchar(50) DEFAULT NULL,
  `spouse_date_of_birth` varchar(50) DEFAULT NULL,
  `spouse_gender` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `temporary_persons_info_person_id_to_persons_id` (`person_id`),
  KEY `temp_person_infos_residence_id_to_residences_id` (`residence_id`),
  CONSTRAINT `temp_person_infos_person_id_to_persons_id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `temp_person_infos_residence_id_to_residences_id` FOREIGN KEY (`residence_id`) REFERENCES `residences` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;

-- Dumping data for table baranggo_api.temp_person_infos: ~23 rows (approximately)
/*!40000 ALTER TABLE `temp_person_infos` DISABLE KEYS */;
INSERT INTO `temp_person_infos` (`id`, `civil_status`, `religion`, `annual_income`, `educational_attainment`, `is_employed`, `is_voter`, `is_deceased`, `with_philhealth`, `with_sss`, `with_electricity`, `with_water`, `person_id`, `residence_id`, `spouse_last_name`, `spouse_first_name`, `spouse_middle_name`, `spouse_date_of_birth`, `spouse_gender`, `created_at`) VALUES
	(51, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, NULL, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-21 11:14:07'),
	(53, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, NULL, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-21 11:15:27'),
	(55, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, NULL, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-21 11:16:13'),
	(58, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, NULL, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-21 11:16:35'),
	(59, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, NULL, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-21 11:17:31'),
	(61, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, NULL, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-21 11:18:16'),
	(65, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, NULL, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-21 11:20:09'),
	(80, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 74, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 09:58:43'),
	(81, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 75, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 09:58:47'),
	(83, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 76, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 09:59:12'),
	(85, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 77, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 10:00:06'),
	(87, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 78, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 10:04:49'),
	(90, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 79, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 10:05:21'),
	(92, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 80, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 10:05:59'),
	(93, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 81, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 10:07:43'),
	(96, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 82, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 10:28:28'),
	(97, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 83, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 12:24:17'),
	(99, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 84, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 12:25:01'),
	(102, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 85, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 12:25:25'),
	(103, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 86, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-22 12:25:41'),
	(106, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 87, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-23 09:54:02'),
	(107, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 88, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-23 09:54:07'),
	(110, 'civilStatus', 'religion', 100000, 'College', 1, 1, 0, 1, 1, 1, 1, 89, 00000000001, 'spouseLastName', 'spouseFirstName', 'spouseMiddleName', '1992-10-07', 'spouseGender', '2015-10-23 10:05:29');
/*!40000 ALTER TABLE `temp_person_infos` ENABLE KEYS */;


-- Dumping structure for table baranggo_api.users
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

-- Dumping data for table baranggo_api.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `last_name`, `first_name`, `middle_name`, `barangay_id`) VALUES
	(1, '123', '202cb962ac59075b964b07152d234b70', 'Felipe', 'Jan Ryan', 'Malicay', NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
