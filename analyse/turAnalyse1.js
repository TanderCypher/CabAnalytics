async function tellTurerPerSone(turData) {
  const soneTelling = {};

  // hopp over evt header-rad hvis den finnes
  const rows = turData[0][0] === "Tur" ? turData.slice(1) : turData;

  for (const tur of rows) {
    const fraSone = tur[9];
    const tilSone = tur[10];

    if (fraSone) {
      soneTelling[fraSone] = (soneTelling[fraSone] || 0) + 1;
    }

    if (tilSone) {
      soneTelling[tilSone] = (soneTelling[tilSone] || 0) + 1;
    }
  }

  return soneTelling;
}

module.exports = tellTurerPerSone;