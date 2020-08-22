module.exports = {
  dialect: 'postgres',
  host: 'db_postgres',
  username: 'docker',
  // password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
