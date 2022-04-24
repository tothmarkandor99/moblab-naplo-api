import {RowDataPacket} from 'mysql2'

export interface BejegyzesDb extends RowDataPacket {
  azonosito: number
  felhasznaloAzonosito: string
  datum: string
  tartalom: string
}

/*
CREATE TABLE `bejegyzes` (
	`azonosito` INT NOT NULL AUTO_INCREMENT,
	`felhasznaloAzonosito` VARCHAR(100) NOT NULL,
	`datum` DATE NOT NULL,
	`tartalom` MEDIUMTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY (`azonosito`)
) ENGINE=InnoDB;
*/
