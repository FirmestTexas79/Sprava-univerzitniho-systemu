-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sprava_univerzitniho_systemu
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `zapis`
--

DROP TABLE IF EXISTS `zapis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zapis` (
  `idzapis` int NOT NULL AUTO_INCREMENT,
  `idstudent` int NOT NULL,
  `idpredmet` int NOT NULL,
  PRIMARY KEY (`idzapis`),
  KEY `id_student_idx` (`idstudent`),
  KEY `id_predmet_idx` (`idpredmet`),
  CONSTRAINT `id_predmet` FOREIGN KEY (`idpredmet`) REFERENCES `predmet` (`idpredmet`),
  CONSTRAINT `id_student` FOREIGN KEY (`idstudent`) REFERENCES `student` (`idStudent`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zapis`
--

LOCK TABLES `zapis` WRITE;
/*!40000 ALTER TABLE `zapis` DISABLE KEYS */;
INSERT INTO `zapis` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,12),(8,1,8),(9,2,1),(10,2,2),(11,2,3),(12,2,4),(13,2,7),(14,2,9),(15,2,10),(16,2,12),(17,3,1),(18,3,2),(19,3,3),(20,3,4),(21,3,11),(22,3,6),(23,3,7),(24,3,15),(25,4,1),(26,4,14),(27,4,13),(28,4,4),(29,4,14),(30,4,6),(31,4,7),(32,4,8),(33,5,2),(34,5,4),(35,5,3),(36,5,14),(37,5,10),(38,5,6),(39,5,7),(40,5,15),(41,6,5),(42,6,12),(43,6,10),(44,6,4),(45,6,1),(46,6,11),(47,6,9),(48,6,3),(49,7,8),(50,7,6),(51,7,2),(52,7,14),(53,7,10),(54,7,12),(55,7,3),(56,7,5),(57,8,7),(58,8,11),(59,8,9),(60,8,5),(61,8,2),(62,8,8),(63,8,6),(64,8,15),(65,9,1),(66,9,14),(67,9,10),(68,9,13),(69,9,12),(70,9,7),(71,9,2),(72,9,4),(73,10,3),(74,10,8),(75,10,1),(76,10,6),(77,10,15),(78,10,13),(79,10,9),(80,10,12),(81,11,3),(82,11,8),(83,11,1),(84,11,6),(85,11,15),(86,11,13),(87,11,9),(88,11,12),(89,12,7),(90,12,11),(91,12,9),(92,12,5),(93,12,2),(94,12,8),(95,12,6),(96,12,15),(97,13,1),(98,13,14),(99,13,10),(100,13,13),(101,13,12),(102,13,7),(103,13,2),(104,13,4),(105,14,3),(106,14,8),(107,14,1),(108,14,6),(109,14,15),(110,14,13),(111,14,9),(112,14,12),(113,15,5),(114,15,12),(115,15,10),(116,15,4),(117,15,1),(118,15,11),(119,15,9),(120,15,3),(121,16,8),(122,16,6),(123,16,2),(124,16,14),(125,16,10),(126,16,12),(127,16,3),(128,16,5),(129,17,7),(130,17,11),(131,17,9),(132,17,5),(133,17,2),(134,17,8),(135,17,6),(136,17,15),(137,18,1),(138,18,14),(139,18,10),(140,18,13),(141,18,12),(142,18,7),(143,18,2),(144,18,4),(145,19,3),(146,19,8),(147,19,1),(148,19,6),(149,19,15),(150,19,13),(151,19,9),(152,19,12),(153,20,5),(154,20,12),(155,20,10),(156,20,4),(157,20,1),(158,20,11),(159,20,9),(160,20,3);
/*!40000 ALTER TABLE `zapis` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-06 22:36:05
