-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nftback
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `order_status` int DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `seller_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `buyer_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `order_amount` int DEFAULT NULL,
  PRIMARY KEY (`order_id`) USING BTREE,
  KEY `product_id` (`product_id`) USING BTREE,
  KEY `seller_id` (`seller_id`) USING BTREE,
  KEY `buyer_id` (`buyer_id`) USING BTREE,
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES ('1',1,'2023-11-02 16:08:52','0714efe2-61e6-47ae-a5f0-f724e7786b6c','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('10',1,'2023-11-02 16:09:03','c2b9cd34-48ff-47b4-b20f-c17f45f08942','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('11',1,'2023-11-02 16:09:04','e7be6a03-a8b0-4f4e-b777-d0900e3abc02','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('12',1,'2023-11-02 16:09:05','edf4ee9a-25ec-4ef2-9b84-dc9e4f8044d5','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('13',1,'2023-11-02 16:10:01','12202c88-325f-47b0-acca-0334d9923aa3','5257aad1-3ebe-4b0d-a436-e2f28731c051',NULL,1),('14',1,'2023-11-02 16:10:03','1f9489e4-9921-4455-b1e4-0c77d298c58d','5257aad1-3ebe-4b0d-a436-e2f28731c051',NULL,1),('15',1,'2023-11-02 16:10:04','59e45674-ab37-45b4-8605-c1a93d89b9ee','5257aad1-3ebe-4b0d-a436-e2f28731c051',NULL,1),('16',1,'2023-11-02 16:10:05','b9ab37ba-6e5c-4f25-93bf-9b412529f28d','5257aad1-3ebe-4b0d-a436-e2f28731c051',NULL,1),('17',1,'2023-11-06 10:16:30','6eb2a0a3-3e40-470a-bf03-70def50256ba','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('18',1,'2023-11-06 10:24:30','1e659bda-e5fd-404c-b43a-8a92667d50b0','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('19',1,'2023-11-06 10:25:48','a1ddd0c4-6775-4c05-bbf4-a333a154d56b','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('2',1,'2023-11-02 16:08:54','22af5d07-361c-4cdb-8310-128f96536d59','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('3',1,'2023-11-02 16:08:55','31d54f7d-bb9b-415c-a018-2b04da2f8e23','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('4',1,'2023-11-02 16:08:56','4326e2db-fc86-435b-91cf-86fff857b207','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('5',1,'2023-11-02 16:08:56','4d9e481c-a8a8-4898-8cdc-934b6d6ab964','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('6',1,'2023-11-02 16:08:57','79c007ab-a097-42a5-bd43-d8cfdd00e662','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('7',1,'2023-11-02 16:09:00','7a9edee5-4aa1-4191-83ee-450aa54079ea','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('8',1,'2023-11-02 16:09:00','96fc6478-b7f2-442c-b8ab-bde31c594c59','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1),('9',1,'2023-11-02 16:09:01','a0ac4fb7-4c79-4480-b777-7a66014fe949','20e35f7c-e6c5-4da0-845e-29a86878957c',NULL,1);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nft_identifier` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `product_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `product_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `metaData_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `owner_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `coverImage_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`) USING BTREE,
  UNIQUE KEY `nft_identifier` (`nft_identifier`,`metaData_url`) USING BTREE,
  KEY `owner_id` (`owner_id`) USING BTREE,
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('0714efe2-61e6-47ae-a5f0-f724e7786b6c','9e33b195-8af3-488f-ab79-b667df903882','nft-dog1','万圣节小狗图片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmVKzCUkqLTzts1oRtBj4kgLJodcK8wjknwhKe2pzXmgLf','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/autumncontest-8311751_1280.jpg'),('12202c88-325f-47b0-acca-0334d9923aa3','14ffd27c-5c8e-41d7-ba5f-85975952feb2','nft-garden','一张花园的图片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmWeRBwWk3XnicuC96sstiVWhbKhJGfRa1MMJJ8tVZnag1','5257aad1-3ebe-4b0d-a436-e2f28731c051','/covers/garden-7833569_1280.jpg'),('1e659bda-e5fd-404c-b43a-8a92667d50b0','bd3ac788-8e27-4901-b0a5-df029933a06d','video-test1','一段动画~','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmSNgevwRQeJWeXKn9KxRb1rmqh6KoWjPTK5Gbn2kGx3CA','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/8e8f171fccb53bfe2fb5a85f7c14452c7ab83d8a.jpg'),('1f9489e4-9921-4455-b1e4-0c77d298c58d','e432a4d5-7182-467d-a551-279b12d941fe','nft-cake','一张人物吃蛋糕的图片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmctM9YhbZjSghXPRJbFGi2QbW7srqEBaHA5sk8BqEnRyh','5257aad1-3ebe-4b0d-a436-e2f28731c051','/covers/birthday-7833618_1280.jpg'),('22af5d07-361c-4cdb-8310-128f96536d59','893973fc-3aae-4f64-8ca7-673b254d686a','nft-facebook','一张脸书的照片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmfQqgz7TauWsYJq7GfBV5Z56bKFXRSbFV8xhgducabKub','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/facebook-2429746_1280.png'),('31d54f7d-bb9b-415c-a018-2b04da2f8e23','3245f360-3e20-463d-9e00-fd844ccf9e28','nft-Halloween','万圣节图片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmRkKcMwWjycxfJLzirpsvpPE2WirsevKQ95LeiME8BHZH','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/pumpkin-8329917_1280.jpg'),('4326e2db-fc86-435b-91cf-86fff857b207','d7320a1c-e769-453c-8d26-87d426ffb51a','nft-dog2','万圣节小狗图片2','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmSqcnAy66m92DD1YmzyJ1H2k1o4B4eL6z76DhzjhnqzyL','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/dachshund-8285220_1280.jpg'),('4d9e481c-a8a8-4898-8cdc-934b6d6ab964','6f2b9df4-625f-4fb2-b70d-381d0909ca69','nft-dog4','一只贵妇小狗的照片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmZyNmbGm115Xi6nu1ezcXgSpf4CndmeRXmsNYgxFakLj3','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/dog-8347906_1280.jpg'),('59e45674-ab37-45b4-8605-c1a93d89b9ee','c65e033e-d6e6-4325-a1de-963db6f30317','nft-hamburger','一张汉堡的图片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmaSb5NtL12tVK1mrB8mUTTE3JhHs2tQUREfWudea6Ei2G','5257aad1-3ebe-4b0d-a436-e2f28731c051','/covers/hamburger-8214829_1280.jpg'),('6eb2a0a3-3e40-470a-bf03-70def50256ba','fde8629c-8977-45fe-8e0b-3032a2b368b9','music-test','一段音频','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmNo936NtVjoCT3RGdNSnYRFZbE1MDKW9KYgnXB1JFTAMJ','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/å±å¹æªå¾ 2023-11-06 101140.png'),('79c007ab-a097-42a5-bd43-d8cfdd00e662','3aa95564-c7df-44c2-b456-dcbda5c75f5c','nft-monkey1','一只猴子的照片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmeW1K14TkZzi2HujbhEvWQWfKkF5Hz9zLtiynnVP4Qbbi','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/cover1.png'),('7a9edee5-4aa1-4191-83ee-450aa54079ea','1b0b4fd1-d275-4649-91de-85ff9121ee45','nft-dog3','一只小狗的图片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmUvK9BFAhvxE9n8ZEpfsv2VvGUBmCSKianduCB4H8Vg5Q','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/dog-8323458_1280.jpg'),('96fc6478-b7f2-442c-b8ab-bde31c594c59','a51e61e9-6f66-4bb2-b669-05208be325ac','nft-monkey2','一张猴子的照片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmXndPhsBzxZm2vKDsZZCjPo9yFP94essRxbU91tUewHEh','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/cover3.png'),('a0ac4fb7-4c79-4480-b777-7a66014fe949','06a81248-2618-4742-ad08-ac7b47ede9e7','nft-gift1','礼物小狗图片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmPVH3141njGy31SHUk7pkkiQTmzJmZvvm7nw3VffjNgLD','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/christmas-7632906_1280.jpg'),('a1ddd0c4-6775-4c05-bbf4-a333a154d56b','ebc09d7e-1980-4ce7-a57e-4b20cdcf4180','video-test2','一段动画','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmdyBdAVGbFog6PqfvHbj4CK48JNKBketWmzEicvrC71VL','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/dafce999600274ac07e9506c8ebbfbfdd254cbdf.jpg'),('b9ab37ba-6e5c-4f25-93bf-9b412529f28d','833a3439-2eaa-435b-adf0-2080203049fb','nft-beach','一张海滩的图片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmaizD7CXH4FYFANrFYhJGyHMZSstvs1rFVToJfSHR5xmg','5257aad1-3ebe-4b0d-a436-e2f28731c051','/covers/beach-8136911_1280.png'),('c2b9cd34-48ff-47b4-b20f-c17f45f08942','51676565-9b5c-477d-9a82-a6eb075c4558','nft-present','一张礼物的图片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmafAWaMVUSyh3WncmWsM7siRaFuYjfZT2zCuYgbRUQHgD','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/presents-1893642_1280.jpg'),('d464fc81-1933-464a-89f7-5bab6bd04dea','b3428ba8-7fcd-4e99-905d-a3c81fd80fe0','burger','汉堡','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmaSb5NtL12tVK1mrB8mUTTE3JhHs2tQUREfWudea6Ei2G','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/hamburger-8214829_1280.jpg'),('e7be6a03-a8b0-4f4e-b777-d0900e3abc02','a0bed794-c3a4-45aa-a59c-468e6ae0b859','nft-human1','一个人类的图片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmVjz5WCvaJMMxvtzLgWSCRb8TGaTx4cvMe4cUmGihcBKb','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/cover2.png'),('edf4ee9a-25ec-4ef2-9b84-dc9e4f8044d5','f112e45f-a323-4bdf-b256-1656172e29e0','nft-fox','一只小狐狸的图片','https://scarlet-defensive-swallow-675.mypinata.cloud/ipfs/QmdikLRvhuoVpWo978kXV4Pw27RUBfymNRMqd1kE3pcYCP','20e35f7c-e6c5-4da0-845e-29a86878957c','/covers/fox-8345424_1280.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `currency` int DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('20e35f7c-e6c5-4da0-845e-29a86878957c','cai','$2a$10$ftIaBWnNMoM9mcwW5m4qleE0Yg42u.e5XiCrz54nN0bG16b6rN2L2',0),('5257aad1-3ebe-4b0d-a436-e2f28731c051','tom','$2a$10$fefc0m5rvHsojQRqbRGLt.oBwkQVEuaZg4oZ16lREmqtxTek61Rdm',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-06 13:34:10

DROP TABLE IF EXISTS `nft`;
CREATE TABLE `nft` (
  `nft_id` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `uri` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`nft_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `nft_own`;
CREATE TABLE `nft_own` (
  `id` INTEGER AUTO_INCREMENT NOT NULL,
  `nft_id` VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `owner_id` CHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `nft_owner` (`nft_id`,`owner_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

DROP TABLE IF EXISTS `nft_log`;
CREATE TABLE `nft_log` (
  `id` INTEGER AUTO_INCREMENT NOT NULL,
  `nft_id` VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `from_id` CHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `to_id` CHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 自动获取当前时间
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;