const { sequelize } = require("./db");
const { Band, Musician } = require("./index");

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
