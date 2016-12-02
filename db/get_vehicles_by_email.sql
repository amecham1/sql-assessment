SELECT *, Users.email
FROM Vehicles
JOIN Users on Vehicles.ownerId = Users.id
WHERE Users.email = $1
