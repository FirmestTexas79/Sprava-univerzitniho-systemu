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

--
-- Table structure for table `hodnoceni`
--

DROP TABLE IF EXISTS `hodnoceni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hodnoceni` (
  `idhodnoceni` int NOT NULL AUTO_INCREMENT,
  `idstudent` int NOT NULL,
  `idzkouska` int NOT NULL,
  `hodnoceni` int NOT NULL,
  PRIMARY KEY (`idhodnoceni`),
  KEY `idstudent_idx` (`idstudent`),
  KEY `hodnoceni_idx` (`hodnoceni`),
  KEY `idpredmet_idx` (`idzkouska`),
  CONSTRAINT `hodnoceni` FOREIGN KEY (`hodnoceni`) REFERENCES `stupne` (`idstupne`),
  CONSTRAINT `idstudent` FOREIGN KEY (`idstudent`) REFERENCES `student` (`idStudent`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hodnoceni`
--

LOCK TABLES `hodnoceni` WRITE;
/*!40000 ALTER TABLE `hodnoceni` DISABLE KEYS */;
INSERT INTO `hodnoceni` VALUES (1,5,3,4),(2,10,7,2),(3,16,1,3),(4,8,5,1),(5,3,2,5),(6,12,4,3),(7,18,6,4),(8,1,8,2),(9,9,3,5),(10,7,7,1),(11,20,5,3),(12,6,2,4),(13,14,6,1),(14,2,4,5),(15,17,1,2),(16,11,8,4),(17,4,6,2),(18,15,3,5),(19,19,2,3),(20,13,7,1),(21,9,4,5),(22,14,8,2),(23,20,3,4),(24,3,5,1),(25,8,1,3),(26,6,6,2),(27,17,2,4),(28,12,7,5),(29,5,8,1),(30,1,4,3),(31,11,3,2),(32,18,5,4),(33,15,1,5),(34,10,6,3),(35,2,2,1),(36,7,7,4),(37,19,5,2),(38,4,3,5),(39,16,8,1),(40,13,4,3),(41,3,6,4),(42,5,1,2),(43,10,7,5),(44,18,2,3),(45,1,5,4),(46,7,8,1),(47,15,4,3),(48,2,6,5),(49,9,1,1),(50,14,2,4),(51,19,7,2),(52,12,3,3),(53,8,8,5),(54,6,4,1),(55,20,6,3),(56,4,5,2),(57,11,1,4),(58,13,6,5),(59,17,3,1),(60,3,7,3),(61,16,8,4),(62,5,2,5),(63,10,3,1),(64,18,4,3),(65,1,6,2),(66,7,1,4),(67,15,5,1),(68,2,7,3),(69,9,2,5),(70,14,3,2),(71,19,8,4),(72,12,4,5),(73,8,5,1),(74,6,6,3),(75,20,1,2),(76,4,7,4),(77,11,2,1),(78,13,5,3),(79,17,6,5),(80,3,8,2),(81,16,1,4),(82,5,3,5),(83,10,4,1),(84,18,7,3),(85,1,2,2),(86,7,5,4),(87,15,6,1),(88,2,1,3),(89,9,7,5),(90,14,8,2),(91,19,3,4),(92,12,4,1),(93,8,6,3),(94,6,7,5),(95,20,2,2),(96,4,1,4),(97,11,5,1),(98,13,6,3),(99,17,7,5),(100,3,2,2),(101,16,3,4),(102,5,4,5),(103,10,7,1),(104,18,8,3),(105,1,1,2),(106,7,6,4),(107,15,2,1),(108,2,3,3),(109,9,8,5),(110,14,1,2),(111,19,4,4),(112,12,5,1),(113,8,6,3),(114,6,7,5),(115,20,3,2),(116,4,1,4),(117,11,5,1),(118,13,6,3),(119,17,7,5),(120,3,2,2),(124,2,2,2),(126,1,2,1),(127,4,2,4),(128,4,2,5),(129,1,1,1),(130,20,5,1),(131,1,1,1),(132,1,1,1);
/*!40000 ALTER TABLE `hodnoceni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategorie`
--

DROP TABLE IF EXISTS `kategorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategorie` (
  `idkategorie` int NOT NULL AUTO_INCREMENT,
  `nazev` varchar(250) NOT NULL,
  PRIMARY KEY (`idkategorie`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategorie`
--

LOCK TABLES `kategorie` WRITE;
/*!40000 ALTER TABLE `kategorie` DISABLE KEYS */;
INSERT INTO `kategorie` VALUES (1,'Matematika'),(2,'Jazyky'),(3,'Počítače'),(4,'Účetnictví');
/*!40000 ALTER TABLE `kategorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obrazek`
--

DROP TABLE IF EXISTS `obrazek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obrazek` (
  `idobrazek` int NOT NULL AUTO_INCREMENT,
  `idstudent` int NOT NULL,
  `obrazek` blob,
  PRIMARY KEY (`idobrazek`),
  KEY `idstudent_idx` (`idstudent`),
  CONSTRAINT `idstudentobrazek` FOREIGN KEY (`idstudent`) REFERENCES `student` (`idStudent`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obrazek`
--

LOCK TABLES `obrazek` WRITE;
/*!40000 ALTER TABLE `obrazek` DISABLE KEYS */;
INSERT INTO `obrazek` VALUES (1,1,NULL),(2,2,NULL),(3,3,NULL),(4,4,NULL),(5,5,NULL),(6,6,NULL),(7,7,NULL),(8,8,NULL),(9,9,NULL),(10,10,NULL);
/*!40000 ALTER TABLE `obrazek` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predmet`
--

LOCK TABLES `predmet` WRITE;
/*!40000 ALTER TABLE `predmet` DISABLE KEYS */;
INSERT INTO `predmet` VALUES (1,'Databázové systémy 1',3,'DBS1'),(2,'Odborný anglický jazyk',2,'OA1'),(3,'Počítačová grafika',3,'PGRF1'),(4,'Počítačové sítě',3,'PSIT1'),(5,'Pokročilá algoritmizace',3,'PALG'),(6,'Programovací paradigmata',3,'PRPA'),(7,'Úvod do objektového modelování',3,'UOMO'),(8,'Základy matematiky pro informatiky 1',1,'ZMI1'),(9,'Databázové systémy 2',3,'DBS2'),(10,'Odborná angličtina 2',2,'OA2'),(11,'Principy počítačů',3,'PRIPO'),(12,'Systémové přístupy',3,'SYSP'),(13,'Úvody do programování',3,'UPROM'),(14,'Architektura počítačů',3,'ARCH'),(15,'Diskrétní matematika',1,'DIMA'),(16,'Základy účetnictví',4,'ZUCET'),(17,'Úvody do podnikové informatiky',4,'UPI');
/*!40000 ALTER TABLE `predmet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `prumerhodnocenistudentu`
--

DROP TABLE IF EXISTS `prumerhodnocenistudentu`;
/*!50001 DROP VIEW IF EXISTS `prumerhodnocenistudentu`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `prumerhodnocenistudentu` AS SELECT 
 1 AS `idStudent`,
 1 AS `prumer`*/;
SET character_set_client = @saved_cs_client;

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
  `adresa` varchar(250) NOT NULL,
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

--
-- Table structure for table `student_rozvrh`
--

DROP TABLE IF EXISTS `student_rozvrh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_rozvrh` (
  `idstudent` int NOT NULL,
  `idpredmet` int NOT NULL,
  PRIMARY KEY (`idstudent`,`idpredmet`),
  KEY `idpredmet` (`idpredmet`),
  CONSTRAINT `student_rozvrh_ibfk_1` FOREIGN KEY (`idstudent`) REFERENCES `student` (`idStudent`),
  CONSTRAINT `student_rozvrh_ibfk_2` FOREIGN KEY (`idpredmet`) REFERENCES `predmet` (`idpredmet`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_rozvrh`
--

LOCK TABLES `student_rozvrh` WRITE;
/*!40000 ALTER TABLE `student_rozvrh` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_rozvrh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stupne`
--

DROP TABLE IF EXISTS `stupne`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stupne` (
  `idstupne` int NOT NULL AUTO_INCREMENT,
  `nazev` varchar(10) NOT NULL,
  PRIMARY KEY (`idstupne`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stupne`
--

LOCK TABLES `stupne` WRITE;
/*!40000 ALTER TABLE `stupne` DISABLE KEYS */;
INSERT INTO `stupne` VALUES (1,'A'),(2,'B'),(3,'C'),(4,'E'),(5,'F');
/*!40000 ALTER TABLE `stupne` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `fk_zapis_predmet` FOREIGN KEY (`idpredmet`) REFERENCES `predmet` (`idpredmet`) ON DELETE CASCADE,
  CONSTRAINT `id_student` FOREIGN KEY (`idstudent`) REFERENCES `student` (`idStudent`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zapis`
--

LOCK TABLES `zapis` WRITE;
/*!40000 ALTER TABLE `zapis` DISABLE KEYS */;
/*!40000 ALTER TABLE `zapis` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `fk_zkouska_predmet` FOREIGN KEY (`idpredmet`) REFERENCES `predmet` (`idpredmet`) ON DELETE CASCADE,
  CONSTRAINT `id_ucitel` FOREIGN KEY (`iducitel`) REFERENCES `ucitel` (`iducitel`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zkouska`
--

LOCK TABLES `zkouska` WRITE;
/*!40000 ALTER TABLE `zkouska` DISABLE KEYS */;
/*!40000 ALTER TABLE `zkouska` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `prumerhodnocenistudentu`
--

/*!50001 DROP VIEW IF EXISTS `prumerhodnocenistudentu`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `prumerhodnocenistudentu` AS select `h`.`idstudent` AS `idStudent`,avg(`h`.`hodnoceni`) AS `prumer` from `hodnoceni` `h` group by `h`.`idstudent` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-13 20:36:42
