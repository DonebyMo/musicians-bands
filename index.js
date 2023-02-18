const { Band } = require("./Band");
const { Musician } = require("./Musician");
const { Song } = require("./Song.js");

Band.hasMany(Musician);
Musician.belongsTo(Band);

Song.hasMany(Band);
Band.hasMany(Song);

module.exports = {
  Band,
  Musician,
  Song,
};
