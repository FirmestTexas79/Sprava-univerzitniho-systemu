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
-- Table structure for table `zkouska`
--

DROP TABLE IF EXISTS `zkouska`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zkouska` (
  `idzkouska` int NOT NULL AUTO_INCREMENT,
  `datum` date NOT NULL,
  `idpredmet` int NOT NULL,
  `typ_zkousky` varchar(25) NOT NULL,
  `mistnost` varchar(45) NOT NULL,
  `max_pocet_studentu` int NOT NULL,
  `iducitel` int NOT NULL,
  PRIMARY KEY (`idzkouska`),
  KEY `idpredmet_idx` (`idpredmet`),
  KEY `id_ucitel_idx` (`iducitel`),
  CONSTRAINT `id_ucitel` FOREIGN KEY (`iducitel`) REFERENCES `ucitel` (`iducitel`),
  CONSTRAINT `idpredmet` FOREIGN KEY (`idpredmet`) REFERENCES `predmet` (`idpredmet`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zkouska`
--

LOCK TABLES `zkouska` WRITE;
/*!40000 ALTER TABLE `zkouska` DISABLE KEYS */;
INSERT INTO `zkouska` VALUES (1,'2024-02-10',1,'pismena','J13',30,4),(2,'2024-02-15',4,'ustni','A4',20,3),(3,'2024-02-20',5,'prakticka','J11',10,1),(4,'2024-02-25',2,'pismena','J10',35,5),(5,'2024-03-02',7,'ustni','J1',15,6),(6,'2024-03-08',8,'pismena','J27',40,4),(7,'2024-03-15',2,'ustni','A10',25,1),(8,'2024-03-20',3,'prakticka','J27',10,7);
/*!40000 ALTER TABLE `zkouska` ENABLE KEYS */;
UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
