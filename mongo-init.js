db = db.getSiblingDB("calculator_db");

db.createUser({
  user: "appuser",
  pwd: "app123",
  roles: [
    { role: "readWrite", db: "calculator_db" }
  ]
});
