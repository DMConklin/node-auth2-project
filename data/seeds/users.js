exports.seed = async function(knex) {
  await knex('users').truncate()
  await knex('users').insert([
      { username: "Darrell", password: "test", department: "grocery" },
      { username: "Marsha", password: "testy", department: "hardware" }
  ])
};
