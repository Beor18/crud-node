create database nodeapp;
use nodeapp;

create table person(
id int not null auto_increment primary key,
nombre varchar(100),
apellido varchar(100),
telefono varchar(100),
created_at datetime
);

