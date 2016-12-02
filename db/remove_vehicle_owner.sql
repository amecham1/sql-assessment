UPDATE Vehicles
SET ownerid = NULL
WHERE Vehicles.id = $1 AND ownerid = $2
