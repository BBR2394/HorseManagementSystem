DELETE FROM horses WHERE horse_id = X;

SELECT name, lastname, firstname FROM horses hrs 
INNER JOIN owner ownr ON ownr.id = hrs.current_owner   ;

SELECT hrs.horse_name, size, lastname, firstname, color_name FROM horses hrs 
INNER JOIN horse_owner ownr ON ownr.owner_id = hrs.current_owner
INNER JOIN coat ct ON ct.id = hrs.coat;