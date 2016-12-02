-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS vehicles;

-- ('Toyota', 'Camry', 1991, 1),
-- ('Honda', 'Civic', 1995, 1),
-- ('Ford', 'Focus', 2005, 1),
-- ('Ford', 'Taurus', 2003, 2),
-- ('VW', 'Bug', 2010, 2),
-- ('Mini', 'Coup', 2013, 3);


-- DROP TABLE IF EXISTS Vehicles;

CREATE TABLE Vehicles
(
  id SERIAL PRIMARY KEY,
  make TEXT,
  model TEXT,
	year INTEGER,
	ownerID INTEGER references Users(id)
);


INSERT INTO Vehicles
(make,model,year,ownerID)
values('Toyota', 'Camry', 1991 , 1);

INSERT INTO Vehicles
(make,model,year,ownerID)
values('Honda', 'Civic', 1995, 1);

INSERT INTO Vehicles
(make,model,year,ownerID)
values('Ford','Focus',2005,1);

INSERT INTO Vehicles
(make,model,year,ownerID)
values('Ford','Taurus',2003,2);

INSERT INTO Vehicles
(make,model,year,ownerID)
values('VW','Bug',2010,2);

INSERT INTO Vehicles
(make,model,year,ownerID)
values('Mini','Coup',2013,3);
