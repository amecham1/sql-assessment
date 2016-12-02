SELECT firstname, lastname, year
FROM Vehicles
JOIN Users on Vehicles.ownerid = Users.id
WHERE year > 2000
ORDER BY year desc
