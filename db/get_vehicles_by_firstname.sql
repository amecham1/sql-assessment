
SELECT *
FROM Vehicles
JOIN Users on Vehicles.ownerId = Users.id
WHERE Users.firstname ILIKE concat($1::TEXT, '%')
