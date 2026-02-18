async function tellTurerPerSone(turData) {
  const soneTelling = {
    fra: {},
    til: {},
  };

  // hopp over evt header-rad hvis den finnes
  const rows = turData[0][0] === "Tur" ? turData.slice(1) : turData;
  // console.log(turData); viser hele excel arket som object
  /* console.log(turData); */

  for (const tur of rows) {
    const fraSone = tur[9];
    const tilSone = tur[10];

    if (fraSone) {
      soneTelling.fra[fraSone] = (soneTelling.fra[fraSone] || 0) + 1;
    }

    if (tilSone) {
      soneTelling.til[tilSone] = (soneTelling.til[tilSone] || 0) + 1;
    }
  }

  /* console.log(soneTelling.til);
  console.log(soneTelling.fra); */

  return soneTelling;
}

async function matrixMaker(turData) {
  const matrix = {
    from: {},
  };

  const rows = turData[0][0] === "Tur" ? turData.slice(1) : turData;

  for (const trip of rows) {
    const fromZone = trip[9];
    const toZone = trip[10];

    if (!fromZone || !toZone) continue;

    // Create origin object if missing
    if (!matrix.from[fromZone]) {
      matrix.from[fromZone] = {};
    }

    // Create destination entry if missing
    if (!matrix.from[fromZone][toZone]) {
      matrix.from[fromZone][toZone] = 0;
    }

    // Increment counter
    matrix.from[fromZone][toZone] += 1;
  }

  return matrix;
}

/* function addTrip(turData) {
  const matrix = {}
  matrix.from[fraSone] ??= {};
  matrix.from[fraSone][tilSone] ??= 0;
  matrix.from[fraSone][tilSone] += count;

  return matrix;
} */

/* async function percentParts(turData, soneTelling) {
  //calc % trips compaired to all the trips
  console.log("hello from percentParts");

  //get turData
  const trips = turData[0][0] === "Tur" ? turData.slice(1) : turData;

  //divide the trips in the sone by all trips done
  for (const trip in trips) {
    const percentageSone = soneTelling.fra[trip].key / trips;
    return percentageSone[trip];
  }
} */

module.exports = { tellTurerPerSone, matrixMaker };
