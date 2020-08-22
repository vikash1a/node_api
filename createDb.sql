create database casedb;

use casedb;

create table user(
    id int primary key auto_increment,
    firstname varchar(40) not null,
    lastname varchar(40),
    email varchar  (255) unique, -- used as username
    password varchar(255) -- stored in MD5 format; try with bcrypt as assignment
);

-- insert into user values (1,'Vikash','Sinha','vikash1a2b3c@gmail.com','vikash123');
-- delete from user where id=1;


create table questionBank(
    id int primary key auto_increment,
    name varchar(255) not null,
    userId int not null,
    FOREIGN KEY (userId) REFERENCES user(id)
);

-- insert into questionBank values (1,'qb1',1);
-- insert into questionBank values (2,'qb2',1);


create table questionPaper(
    id int primary key auto_increment,
    name varchar(255) not null,
    userId int not null,
    FOREIGN KEY (userId) REFERENCES user(id)
);

create table question(
    id int primary key auto_increment,
    questionText varchar(255) not null,
    answer varchar(255) not null,
    optoinA varchar(255) not null,
    optionB varchar(255) not null,
    optionC varchar(255) not null,
    optionD varchar(255) not null,
    questionBankId int not null,
    questionPaperId int,
    FOREIGN KEY (questionBankId) REFERENCES questionBank(id),
    FOREIGN KEY (questionPaperId) REFERENCES questionPaper(id)
);


-- create table choice(
--     id int primary key auto_increment,
--     A varchar(255) not null,
--     B varchar(255) not null,
--     C varchar(255) not null,
--     D varchar(255) not null,
--     questionId int not null,
--     FOREIGN KEY (questionId) REFERENCES question(id)
-- );








