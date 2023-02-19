const { sequelize } = require("./db");
const { Band, Musician, Song } = require("./index");

describe("Band and Musician Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Band", async () => {
    // TODO - test creating a band
    const band1 = new Band({ name: "HeavyMetal", genre: "Rock" });
    expect(band1.name).toBe("HeavyMetal");
    expect(band1.genre).toBe("Rock");
  });

  test("can create a Musician", async () => {
    // TODO - test creating a musician
    const musician1 = new Musician({ name: "Jonny", instrument: "Drum" });
    expect(musician1.name).toBe("Jonny");
    expect(musician1.instrument).toBe("Drum");
  });
});

describe("Association test", () => {
  test("Band can have many Musicians", async () => {
    await sequelize.sync({ force: true }); // recreate db
    let band1 = await Band.create({ name: "band1", genre: "Rock" });
    let musician1 = await Musician.create({
      name: "m1",
      instrument: "Voice",
    });
    let musician2 = await Musician.create({
      name: "m2",
      instrument: "Voice",
    });

    await band1.addMusician(musician1);
    await band1.addMusician(musician2);

    const musicians = await band1.getMusicians();

    expect(musicians.length).toBe(2);
    expect(musicians[0] instanceof Musician).toBeTruthy;
  });
});

describe("integrity chacks for Song", () => {
  test("newSong can be created", async () => {
    await sequelize.sync({ force: true });
    let song1 = await Song.create({ title: "winter Touch", year: 2023 });

    expect(song1.title).toBe("winter Touch");
    expect(song1.year).toBe(2023);
  });
});
describe("Association test", () => {
  test("Band can have many songs", async () => {
    await sequelize.sync({ force: true }); // recreate db
    let band1 = await Band.create({ name: "band1", genre: "Rock" });
    let band2 = await Band.create({ name: "band2", genre: "Pop" });

    let song1 = await Song.create({ title: "song1", year: 2023 });
    let song2 = await Song.create({ title: "song2", year: 2024 });

    await band1.addSong(song1);
    await band1.addSong(song2);

    const songs = await band1.getSongs();
    expect(songs.length).toBe(2);
  });
  test("Multiple bands can have the same Song", async () => {
    await sequelize.sync({ force: true }); // recreate db
    let band1 = await Band.create({ name: "band1", genre: "Rock" });
    let band2 = await Band.create({ name: "band2", genre: "Pop" });

    let song1 = await Song.create({ title: "song1", year: 2023 });

    await band1.addSong(song1);
    await band2.addSong(song1);

    expect(band1[0] === band2[0]).toBe(true);
  });
});

describe("Eager Loading", () => {
  test("musician model can be found with Band when findAll() is called", async () => {
    await sequelize.sync({ force: true });
    let band1 = await Band.create({ name: "band1", genre: "Rock" });
    let band2 = await Band.create({ name: "band2", genre: "Pop" });
    let musician1 = await Musician.create({
      name: "m1",
      instrument: "Voice",
    });

    bands = Band.findAll({
      include: [{ model: Musician }],
    });

    expect.arrayContaining(Musician);
  });

  test("Song model can be found with Band when findAll() is called", async () => {
    await sequelize.sync({ force: true });
    let band2 = await Band.create({ name: "band2", genre: "Pop" });
    let song1 = await Song.create({ title: "song1", year: 2023 });
    let song2 = await Song.create({ title: "song2", year: 2023 });

    bands = Band.findAll({
      include: [{ model: Song }],
    });

    expect.arrayContaining(Song);
  });
});

// const someBand = await Band.findAll();
// // const BandMusicians = await someBand.getMusician();
// await someBand.addMusician();
// console.log(someBand);
// expect(someBand.musician1.name).toBe("Jonny");
