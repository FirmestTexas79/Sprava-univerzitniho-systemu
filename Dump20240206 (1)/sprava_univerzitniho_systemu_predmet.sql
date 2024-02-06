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
-- Table structure for table `predmet`
--

DROP TABLE IF EXISTS `predmet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `predmet` (
  `idpredmet` int NOT NULL AUTO_INCREMENT,
  `nazev` varchar(250) NOT NULL,
  `idkategorie` int NOT NULL,
  `kod` varchar(5) NOT NULL,
  PRIMARY KEY (`idpredmet`),
  KEY `id_kategorie_predmet_idx` (`idkategorie`),
  CONSTRAINT `id_kategorie_predmet` FOREIGN KEY (`idkategorie`) REFERENCES `kategorie` (`idkategorie`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predmet`
--

LOCK TABLES `predmet` WRITE;
/*!40000 ALTER TABLE `predmet` DISABLE KEYS */;
INSERT INTO `predmet` VALUES (1,'Odborna anglictina 1',2,'OA1'),(2,'Databazove systemy',3,'DBS'),(3,'Pocitacova grafika',3,'POG'),(4,'Programovani',3,'PRO'),(5,'Technologie pro publikovani webu',3,'TPW'),(6,'Uvody do umele inteligence',3,'UMI'),(7,'Pocitacove site',3,'PCS'),(8,'Pokrocila algoritmizace',3,'POA'),(9,'Operacni systemy',3,'OPS'),(10,'Systemove pristupy',3,'SYS'),(11,'Mikroekonomie',4,'MIK'),(12,'Makroekonomie',4,'MAK'),(13,'Zaklady ucetnictvi',4,'ZUC'),(14,'Odborna anglictina 2',2,'OA2'),(15,'Uvody do objektoveho modelovani',3,'UOM');
/*!40000 ALTER TABLE `predmet` ENABLE KEYS */;
UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
