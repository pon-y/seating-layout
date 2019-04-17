DROP DATABASE IF EXISTS diagrams;

CREATE DATABASE diagrams;

USE diagrams;

CREATE TABLE savedfloorplans (
 ID serial NOT NULL PRIMARY KEY,
 floorplan json NOT NULL

);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
