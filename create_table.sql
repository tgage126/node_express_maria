create table patient(
    patient_id int auto_increment,
    name_last varchar(255),
    name_first varchar(255),
    dob date,
    primary key(patient_id)
)
create table practitioner(
    practitioner_id int auto_increment,
    name_last varchar(255),
    name_first varchar(255),
    primary key (practitioner_id)
)
create table appointment(
    appointment_id int auto_increment,
    patient_id int,
    practitioner_id int,
    day date,
    start_time time,
    end_time time,
    notes varchar(255),
    primary key (appointment_id),
    constraint fk_patient
    foreign key(patient_id) 
        references patient(patient_id),
    constraint fk_practitioner
    foreign key(practitioner_id) 
        references practitioner(practitioner_id)
)

insert into patient(name_last,name_first,dob) VALUES ('Archer','Sterling','1968-01-22'),('Simpson','Homer','1974-08-12'),('Cartman','Eric','1994-05-02');
    
insert into practitioner(name_last,name_first) VALUES ('Hibbert','Julius'),('Riviera','Nick'),('Strange','Stephen');

insert into appointment(patient_id,practitioner_id,day,start_time,end_time,notes) values (1,2,'2022-11-15','10:30','11:30','yearly check-up'),(3,3,'2022-11-15','08:30','09:00','yearly check-up'),(2,1,'2022-11-15','09:30','10:00','patient experiencing accute lower back pain')

