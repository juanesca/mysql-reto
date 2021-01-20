CREATE DATABASE semillero_sas;

DROP TABLE IF EXISTS vehiculos;
CREATE TABLE vehiculos(
    nro_placa VARCHAR(10) NOT NULL PRIMARY KEY,
    id_linea INT(6) NOT NULL,
    modelo ENUM('2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021') NULL,
    fecha_ven_seguro DATETIME NOT NULL,
    fecha_ven_tecnomecanica DATETIME NOT NULL,
    fecha_ven_contratodo DATETIME NULL, -- NO SE SABE SI POSEE UN CONTRATO 
    KEY id_linea (id_linea)
);

DROP TABLE IF EXISTS tipo_linea;
CREATE TABLE tipo_linea (
    id_linea INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    desc_linea TEXT NULL,
    id_marca INT(6) NOT NULL,
    activo ENUM('S','N') NOT NULL,
    KEY id_marca (id_marca)
);

DROP TABLE IF EXISTS tipo_marca;
CREATE TABLE tipo_marca(
    id_marca INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    desc_marca TEXT NULL,
    activo ENUM('S','N') NOT NULL
);

ALTER TABLE vehiculos
ADD CONSTRAINT fk_id_linea FOREIGN KEY (id_linea) REFERENCES tipo_linea (id_linea) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE tipo_linea
ADD CONSTRAINT fk_id_marca FOREIGN KEY (id_marca) REFERENCES tipo_marca(id_marca) ON DELETE RESTRICT ON UPDATE CASCADE;
