-- MySQL Script generated by MySQL Workbench
-- 03/07/18 10:49:37
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema MemberCardServerDB
-- -----------------------------------------------------
-- 4S店CRM系统数据库

-- -----------------------------------------------------
-- Schema MemberCardServerDB
--
-- 4S店CRM系统数据库
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `MemberCardServerDB` DEFAULT CHARACTER SET utf8 ;
USE `MemberCardServerDB` ;

-- -----------------------------------------------------
-- Table `MemberCardServerDB`.`serviceRecords`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MemberCardServerDB`.`serviceRecords` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(45) NULL,
  `memberCardUUID` VARCHAR(45) NULL COMMENT '会员卡UUID.',
  `serviceUUID` VARCHAR(45) NULL COMMENT '操作内容。',
  `recordType` VARCHAR(45) NULL COMMENT '记录类型，如 buyService:购买服务，consumerService:消费服务。',
  `tradeValue` INT NULL COMMENT '交易值。',
  `leftValue` INT NULL COMMENT '剩余值。',
  `recordAt` TIMESTAMP(0) NULL COMMENT '记录时间。',
  `operator` VARCHAR(45) NULL COMMENT '操作人。',
  `recordSource` VARCHAR(200) NULL COMMENT '记录来源，是指来源于哪个商品订单。',
  `createdAt` TIMESTAMP(0) NULL COMMENT '创建时间。',
  `modifiedAt` TIMESTAMP(0) NULL COMMENT '修改时间。',
  PRIMARY KEY (`id`),
  INDEX `operatorRecordCardUUIDIdx_idx` (`memberCardUUID` ASC),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC))
ENGINE = InnoDB
COMMENT = '会员卡服务的交易记录。';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;