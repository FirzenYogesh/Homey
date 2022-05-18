const driver = process.env.DATABASE_DRIVER || "sqlite";

let databaseDriver;
console.info("Selected database driver", driver);
if (driver === "sqlite") {
	databaseDriver = require("./sqlite");
}



export default databaseDriver;
