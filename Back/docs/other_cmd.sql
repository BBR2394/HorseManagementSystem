DELETE FROM horses WHERE horse_id = X;

SELECT name, lastname, firstname FROM horses hrs 
INNER JOIN owner ownr ON ownr.id = hrs.current_owner   ;

SELECT hrs.horse_name, size, lastname, firstname, color_name FROM horses hrs 
INNER JOIN horse_owner ownr ON ownr.owner_id = hrs.current_owner
INNER JOIN coat ct ON ct.id = hrs.coat;

SELECT type_medic_name, mi.note, horse_name, lastname, firstname FROM medical_intervention mi
INNER JOIN type_medic_intervention tp ON tp.id = type_intervention
INNER JOIN horses hrs ON hrs.horse_id = mi.horse_id
INNER JOIN veterinarian vet ON vet.vet_id = mi.vet_id

ci dessous marche pas, faut faire un COUNT
SELECT stable_id, stable_name, nb_addr, address, postcode, city, place_available, place_taken FROM stables s INNER JOIN horses hrs ON hrs.horse_id = s.stable_id

