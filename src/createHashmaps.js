import {
  setCachedAbilities,
  setCachedMoves,
  setCachedMovesLoomians,
  setCachedAbilitiesLoomians,
  setFilterCategories,
  setFilterTypes,
  setFilterTypeCategories,
  setFilterTypesLoomians,
  setCachedItems,
  setCachedTypes,
  setCachedLoomians,
  setFilterTypesBackup,
  setFilterCategoriesBackup,
  setFilterTypeCategoriesBackup,
  setFilterTypesLoomiansBackup,
} from "./features/globalSlice";

export const createHashmaps = (
  loomians,
  abilities,
  moves,
  types,
  items,
  dispatch
) => {
  const typesToLoomiansMap = {};

  loomians.forEach((loomian) => {
    const types = loomian.types;

    types.forEach((type) => {
      const lowercaseType = type.toLowerCase();

      if (!typesToLoomiansMap[lowercaseType]) {
        typesToLoomiansMap[lowercaseType] = [];
      }

      //  if (
      //    !typesToLoomiansMap[lowercaseType].some(
      //      (loom) => loom.id === loomian.id
      //    )
      //  ) {
      //    typesToLoomiansMap[lowercaseType].push(loomian);
      //  }

      typesToLoomiansMap[lowercaseType].push(loomian);
    });

    // Create a key for the combined types
    const combinedKey = types
      .map((type) => type.toLowerCase())
      .sort()
      .join("-");

    if (!typesToLoomiansMap[combinedKey]) {
      typesToLoomiansMap[combinedKey] = [];
    }

    // Push the Loomian into the array for the combined types
    if (
      !typesToLoomiansMap[combinedKey].some((loom) => loom.id === loomian.id)
    ) {
      typesToLoomiansMap[combinedKey].push(loomian);
    }
  });

  const movesToLoomiansMap = {};

  loomians.forEach((loomian) => {
    loomian.moves.forEach((move) => {
      if (!movesToLoomiansMap[move.toLowerCase()]) {
        movesToLoomiansMap[move.toLowerCase()] = [];
      }
      movesToLoomiansMap[move.toLowerCase()].push(loomian);
    });
  });

  const loomiansHashmap = {};

  loomians.forEach((loomian) => {
    let lowercaseName = loomian.name.toLowerCase();
    const soulburst = "soulburst ";

    lowercaseName = lowercaseName.replace(soulburst, "");

    if (lowercaseName)
      if (!loomiansHashmap[lowercaseName]) {
        // If the key doesn't exist in the hashmap, create it and initialize it as an array.
        loomiansHashmap[lowercaseName] = [];
      }

    // Add the current Loomian to the array associated with the name.
    loomiansHashmap[lowercaseName].push(loomian);
  });

  const movesHashmap = {};

  moves.forEach((move) => {
    movesHashmap[move.name.toLowerCase()] = move;
  });

  const abilitiesHashmap = {};

  abilities.forEach((ability) => {
    abilitiesHashmap[ability.name.toLowerCase()] = ability;
  });

  const itemsHashmap = {};

  items.forEach((item) => {
    itemsHashmap[item.name.toLowerCase()] = item;
  });

  const typesHashmap = {};

  types.forEach((item) => {
    typesHashmap[item.name.toLowerCase()] = item;
  });

  const abilityHashmap = {};

  loomians.forEach((loomian) => {
    loomian.abilities.forEach((ability) => {
      if (!abilityHashmap[ability.toLowerCase()]) {
        abilityHashmap[ability.toLowerCase()] = [];
      }
      abilityHashmap[ability.toLowerCase()].push(loomian);
    });
  });

  const specialAbilitiesHashmap = {};

  loomians.forEach((loomian) => {
    loomian.sAbility.forEach((ability) => {
      if (!specialAbilitiesHashmap[ability.toLowerCase()]) {
        specialAbilitiesHashmap[ability.toLowerCase()] = [];
      }
      specialAbilitiesHashmap[ability.toLowerCase()].push(loomian);
    });
  });

  const abilHashmap = {};

  Object.keys(abilityHashmap).forEach((ability) => {
    abilHashmap[ability] = abilityHashmap[ability].sort((a, b) => a.id - b.id);
  });

  Object.keys(specialAbilitiesHashmap).forEach((specialAbility) => {
    if (!abilHashmap[specialAbility]) {
      abilHashmap[specialAbility] = [];
    }
    abilHashmap[specialAbility] = abilHashmap[specialAbility]
      .concat(specialAbilitiesHashmap[specialAbility])
      .sort((a, b) => a.id - b.id);
  });

  const movesByCategory = {};
  moves.forEach((move) => {
    const category = move.category.toLowerCase();
    if (!movesByCategory[category]) {
      movesByCategory[category] = [];
    }
    movesByCategory[category].push(move);
  });

  const movesByTypes = {};

  moves.forEach((move) => {
    const type = move.type.toLowerCase();
    if (!movesByTypes[type]) {
      movesByTypes[type] = [];
    }
    movesByTypes[type].push(move);
  });

  const movesByTypeCategory = {};

  moves.forEach((move) => {
    const category = move.category.toLowerCase();
    const type = move.type.toLowerCase();

    const key = `${type}-${category}`;

    if (!movesByTypeCategory[key]) {
      movesByTypeCategory[key] = [];
    }

    movesByTypeCategory[key].push(move);
  });

  console.log(movesByCategory);

  dispatch(setCachedMovesLoomians(movesToLoomiansMap));
  dispatch(setCachedLoomians(loomiansHashmap));
  dispatch(setCachedMoves(movesHashmap));
  dispatch(setCachedAbilities(abilitiesHashmap));
  dispatch(setCachedItems(itemsHashmap));
  dispatch(setCachedTypes(typesHashmap));
  dispatch(setCachedAbilitiesLoomians(abilHashmap));
  dispatch(setFilterTypesLoomians(typesToLoomiansMap));
  dispatch(setFilterTypesLoomiansBackup(typesToLoomiansMap));
  dispatch(setFilterCategories(movesByCategory));
  dispatch(setFilterCategoriesBackup(movesByCategory));
  dispatch(setFilterTypes(movesByTypes));
  dispatch(setFilterTypesBackup(movesByTypes));
  dispatch(setFilterTypeCategories(movesByTypeCategory));
  dispatch(setFilterTypeCategoriesBackup(movesByTypeCategory));
};
