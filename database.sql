CREATE TABLE "todo" 
	(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (100) NOT NULL,
	"notes" VARCHAR (200),
	"completion" BOOLEAN
	)