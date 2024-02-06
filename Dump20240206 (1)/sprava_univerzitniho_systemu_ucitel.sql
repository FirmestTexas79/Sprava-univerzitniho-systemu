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
-- Table structure for table `ucitel`
--

DROP TABLE IF EXISTS `ucitel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ucitel` (
  `iducitel` int NOT NULL AUTO_INCREMENT,
  `jmeno` varchar(45) NOT NULL,
  `prijmeni` varchar(45) NOT NULL,
  `specializace` varchar(250) NOT NULL,
  `kontakt` int NOT NULL,
  PRIMARY KEY (`iducitel`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ucitel`
--

LOCK TABLES `ucitel` WRITE;
/*!40000 ALTER TABLE `ucitel` DISABLE KEYS */;
INSERT INTO `ucitel` VALUES (1,'Pavel','Sopta','docent',756928461),(2,'Marie','Nováková','profesorka',467812345),(3,'Jakub','Veselý','asistent',674523189),(4,'Jana','Králová','profesorka',641237895),(5,'Petr','Novotný','docent',746892135),(6,'Eva','Svobodová','profesorka',687912345),(7,'Marek','Dvořák','docent',467823159),(8,'Lucie','Procházková','asistentka',674521389),(9,'Tomáš','Hájek','docent',476821359),(10,'Veronika','Malá','asistentka',764231895),(11,'Martin','Beneš','profesor',674312589);
/*!40000 ALTER TABLE `ucitel` ENABLE KEYS */;
UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
