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
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `idStudent` int NOT NULL AUTO_INCREMENT,
  `jmeno` varchar(45) NOT NULL,
  `prijmeni` varchar(45) NOT NULL,
  `adresa` varchar(45) NOT NULL,
  `kontakt` varchar(45) NOT NULL,
  `datumNarozeni` date NOT NULL,
  PRIMARY KEY (`idStudent`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Anna','Novakova','Praha 5, Novakova 123','anna.novakova@email.com','2000-05-15'),(2,'Pavel','Svoboda','Brno, Svoboda 456','pavel.svoboda@email.com','1999-10-22'),(3,'Eva','Kralova','Olomouc, Kralova 789','eva.kralova@email.com','2001-02-28'),(4,'Martin','Novotny','Liberec, Novotny 1011','martin.novotny@email.com','2000-07-12'),(5,'Lucie','Dvorakova','Ostrava, Dvorakova 1213','lucie.dvorakova@email.com','1999-09-05'),(6,'Jan','Novak','Plzen, Novakova 14','jan.novak@email.com','2000-03-10'),(7,'Petra','Svobodova','Ceske Budejovice, Svobodova 32','petra.svobodova@email.com','2001-06-18'),(8,'Martin','Kratky','Kladno, Kratka 54','martin.kratky@email.com','1999-12-02'),(9,'Klara','Pospisilova','Hradec Kralove, Pospisilova 76','klara.pospisilova@email.com','2000-09-30'),(10,'Tomas','Cerny','Zlin, Cerna 89','tomas.cerny@email.com','2001-01-25'),(11,'Jana','Mala','Jihlava, Mala 110','jana.mala@email.com','2000-07-08'),(12,'Josef','Novy','Usti nad Labem, Novy 212','josef.novy@email.com','2001-04-14'),(13,'Elena','Bartosova','Teplice, Bartosova 45','elena.bartosova@email.com','1999-11-20'),(14,'Adam','Prochazka','Pardubice, Prochazka 67','adam.prochazka@email.com','2000-08-05'),(15,'Veronika','Horackova','Karvina, Horackova 98','veronika.horackova@email.com','2001-03-19'),(16,'Petr','Nemec','Ceska Lipa, Nemec 123','petr.nemec@email.com','2000-10-12'),(17,'Karolina','Krizova','Most, Krizova 76','karolina.krizova@email.com','1999-05-27'),(18,'Daniel','Simunek','Opava, Simunkova 54','daniel.simunek@email.com','2001-09-02'),(19,'Katerina','Nova','Bruntal, Nova 32','katerina.nova@email.com','2000-02-14'),(20,'Michal','Pospichal','Cesky Tesin, Pospichalova 78','michal.pospichal@email.com','1999-08-28');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
