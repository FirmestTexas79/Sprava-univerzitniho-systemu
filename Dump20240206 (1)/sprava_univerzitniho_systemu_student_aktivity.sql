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
-- Table structure for table `student_aktivity`
--

DROP TABLE IF EXISTS `student_aktivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_aktivity` (
  `idstudent` int NOT NULL,
  `idaktivity` int NOT NULL,
  PRIMARY KEY (`idstudent`,`idaktivity`),
  KEY `id_student_idx` (`idstudent`),
  KEY `id_aktivity_idx` (`idaktivity`),
  CONSTRAINT `id_aktivity_student` FOREIGN KEY (`idaktivity`) REFERENCES `aktivity` (`idaktivity`),
  CONSTRAINT `id_student_aktivity` FOREIGN KEY (`idstudent`) REFERENCES `student` (`idStudent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_aktivity`
--

LOCK TABLES `student_aktivity` WRITE;
/*!40000 ALTER TABLE `student_aktivity` DISABLE KEYS */;
INSERT INTO `student_aktivity` VALUES (1,1),(2,2),(3,5),(4,4),(5,1),(6,2),(7,1),(8,5),(9,4),(10,5),(11,1),(12,1),(13,2),(14,3),(15,4),(16,5),(17,4),(18,4),(19,2),(20,1);
/*!40000 ALTER TABLE `student_aktivity` ENABLE KEYS */;
UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
