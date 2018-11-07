CREATE TABLE dbo.CITAS
(
	cita_id BIGINT NOT NULL AUTO_INCREMENT,
    cita_usuario INT NOT NULL,
    cita_placa VARCHAR(6) NOT NULL,
    cita_descripcion VARCHAR(200) CHARACTER SET UTF8,
    cita_fecha DATETIME NOT NULL,
    PRIMARY KEY (cita_id),
    CONSTRAINT FK_CITA_AUTO FOREIGN KEY (cita_placa) REFERENCES dbo.AUTO (auto_placa)
);

CREATE TABLE dbo.AUTO
(
    auto_placa VARCHAR(6) NOT NULL,
    auto_usuario INT NOT NULL,
    auto_marca VARCHAR(60) NOT NULL,
    auto_modelo VARCHAR(60) NOT NULL,
    auto_annio INT NOT NULL,
    auto_kilometros INT NOT NULL,
    auto_millas INT NOT NULL,
    auto_cilindrada INT NOT NULL,
    auto_combustible VARCHAR(1),
    PRIMARY KEY (auto_placa)
)

INSERT INTO DBO.AUTO (auto_placa, auto_usuario,auto_marca, auto_modelo, auto_annio, auto_kilometros, auto_millas, auto_cilindrada, auto_combustible)  
VALUES('298175', 1,'TOYOTA', '4RUNNER', 1997, 0,184000, 3400,'G');

INSERT INTO DBO.AUTO (auto_placa, auto_usuario,auto_marca, auto_modelo, auto_annio, auto_kilometros, auto_millas, auto_cilindrada, auto_combustible)  
VALUES('275771', 1,'TOYOTA', 'HILUX', 2015, 55000,0, 2500,'D');

INSERT INTO DBO.AUTO (auto_placa, auto_usuario,auto_marca, auto_modelo, auto_annio, auto_kilometros, auto_millas, auto_cilindrada, auto_combustible)  
VALUES('297830', 1,'TOYOTA', 'YARIS', 2017, 215000,0, 1500,'G');