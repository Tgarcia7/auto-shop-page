/*Esta tabla contiene los horarios en los que se pueden atender citas*/
CREATE TABLE `horario_disponible` (
`id`  int(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
`horario`  time NOT NULL ,
`estado`  enum('0','1') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '1' ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=latin1 COLLATE=latin1_swedish_ci
AUTO_INCREMENT=11
ROW_FORMAT=DYNAMIC
;

/*Horarios disponibles actualmente*/
INSERT INTO `horario_disponible` VALUES (1, '08:00:00', '1');
INSERT INTO `horario_disponible` VALUES (2, '09:00:00', '1');
INSERT INTO `horario_disponible` VALUES (3, '10:00:00', '1');
INSERT INTO `horario_disponible` VALUES (4, '11:00:00', '1');
INSERT INTO `horario_disponible` VALUES (5, '12:00:00', '1');
INSERT INTO `horario_disponible` VALUES (6, '13:00:00', '1');
INSERT INTO `horario_disponible` VALUES (7, '14:00:00', '1');
INSERT INTO `horario_disponible` VALUES (8, '15:00:00', '1');
INSERT INTO `horario_disponible` VALUES (9, '16:00:00', '1');
INSERT INTO `horario_disponible` VALUES (10, '17:00:00', '1');
INSERT INTO `horario_disponible` VALUES (11, '00:00:19', '0');

/*Algunas citas para pruebas*/
INSERT INTO `citas` VALUES (2, 1, '298175', 'Prueba 2', '2018-11-16 15:00:00');
INSERT INTO `citas` VALUES (3, 1, '275771', 'Ajuste de frenos', '2018-11-16 09:00:00');
INSERT INTO `citas` VALUES (4, 1, '275771', 'Revisión general', '2018-11-16 11:00:00');
INSERT INTO `citas` VALUES (5, 1, '275771', 'Tramado', '2018-11-16 12:00:00');
INSERT INTO `citas` VALUES (6, 1, '275771', 'Reparación de caja de cambios', '2018-11-16 13:00:00');