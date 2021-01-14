--innodb-use-native-aio=0
CREATE DATABASE IF NOT EXISTS nodedb;
use nodedb;
CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id));