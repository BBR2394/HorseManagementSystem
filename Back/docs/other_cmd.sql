DELETE FROM horses WHERE horse_id = X;

SELECT name, lastname, firstname FROM horses hrs 
INNER JOIN owner ownr ON ownr.id = hrs.current_owner   ;