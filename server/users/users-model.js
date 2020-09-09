const db = require("../../data/config")

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}

function findById(id) {
	return db("users")
		.select("id", "username")
		.where({ id })
		.first()
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password", "department")
		.where(filter)
}

function find() {
	return db("users").select("id", "username", "department")
}

module.exports = {
    add,
    findById,
    findBy,
    find
}