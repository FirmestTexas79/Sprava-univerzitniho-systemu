-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sprava_univerzitniho_systemu
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aktivity`
--

DROP TABLE IF EXISTS `aktivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aktivity` (
  `idaktivity` int NOT NULL AUTO_INCREMENT,
  `nazev` varchar(45) NOT NULL,
  `popis` varchar(250) NOT NULL,
  PRIMARY KEY (`idaktivity`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aktivity`
--

LOCK TABLES `aktivity` WRITE;
/*!40000 ALTER TABLE `aktivity` DISABLE KEYS */;
INSERT INTO `aktivity` VALUES (1,'Sebeobrana','Cely semestr se budete snazit lidi zmrzacit, ale nezabit, noveho partaka nedostanete'),(2,'Potapeni','Pojedes nekam dopric a budes rad, když se neutopis, snad ti za to ty kredity stojej'),(3,'Fitko','Fitness lvl nekonecno, 3krat se tam ukazes a jsi nejvic fit'),(4,'Vikendovka','Sice prijdes o obe nohy, ale to nejak rozchodis'),(5,'Behani','Nikoho nezajima, ze venku padaji trakare a ze sis zlomit treti nohu, ale tenhle tyden jeste nemas treti beh');
/*!40000 ALTER TABLE `aktivity` ENABLE KEYS */;
UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
