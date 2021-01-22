CREATE TABLE horses ( horse_id SERIAL PRIMARY KEY, 
horse_name VARCHAR(255) NOT NULL , 
size INTEGER, 
coat NUMERIC, 
father NUMERIC, 
mother NUMERIC, 
sex NUMERIC, 
current_owner NUMERIC, 
added_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE horse_owner (owner_id SERIAL PRIMARY KEY,
lastname VARCHAR(255) NOT NULL ,
firstname VARCHAR(255) NOT NULL ,
contact_details_owner SERIAL,
added_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE coat ( ID SERIAL PRIMARY KEY, color_name VARCHAR(56));
INSERT INTO coat (color_name) VALUES ('Noir');
INSERT INTO coat (color_name) VALUES ('Alezan');
INSERT INTO coat (color_name) VALUES ('Isabelle');
INSERT INTO coat (color_name) VALUES ('Gris');
INSERT INTO coat (color_name) VALUES ('Baie');

CREATE TABLE sex ( ID SERIAL PRIMARY KEY, sex_name VARCHAR(56));
INSERT INTO sex (sex_name) VALUES ('Male');
INSERT INTO sex (sex_name) VALUES ('Female');
INSERT INTO sex (sex_name) VALUES ('Gelding');

CREATE TABLE type_medic_intervention ( ID SERIAL PRIMARY KEY, type_medic_name VARCHAR(56));
INSERT INTO type_medic_intervention (type_medic_name) VALUES ('Vaccine');
INSERT INTO type_medic_intervention (type_medic_name) VALUES ('Check-up');
INSERT INTO type_medic_intervention (type_medic_name) VALUES ('Dewormer');
INSERT INTO type_medic_intervention (type_medic_name) VALUES ('Surgery');
INSERT INTO type_medic_intervention (type_medic_name) VALUES ('Other');

CREATE TABLE medical_intervention (intervention_id SERIAL PRIMARY KEY,
note TEXT,
date TIMESTAMP WITH TIME ZONE,
type_intervention INTEGER,
horse_id INTEGER,
vet_id INTEGER,
added_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE veterinarian (vet_id SERIAL PRIMARY KEY,
lastname VARCHAR(255) NOT NULL ,
firstname VARCHAR(255) NOT NULL ,
contact_details_vet VARCHAR(10),
added_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE stables (
	stable_id SERIAL PRIMARY KEY,
	stable_name VARCHAR(255),
	nb_addr INTEGER,
	address VARCHAR(255),
	postcode VARCHAR(5),
	city VARCHAR(255),
	added_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);

