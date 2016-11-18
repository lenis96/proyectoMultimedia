create database SV;
create table users(
    user varchar(20) primary key,
    password varchar(20)
);
create table contacts(
    user varchar(20),
    contact varchar(20),
    foreign key (user) references users(user),
    foreign key (contact) references users(user),
    primary key(user, contact),
    check(user<>contact)
);
