import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isDarkTheme: false,
  isLoading: true,
  genres: [],
  genre: 'veils of shadow',
  loomians: [],
  backup_loomains: [],
  loomiansSort: 'none',
  loomiansSort2: 'none',
  loomiansCategory: 'all',
  loomiansType: 'all',
  loomiansType2: 'all',
  filtered_loomians: [],
  filterTypesLooms: {},
  filterTypesLoomsBackup: {},
  text: '',
  moves: [],
  backup_moves: [],
  filtered_moves: [],
  filterCategory: {},
  filterCategoryBackup: {},
  filterTypes: {},
  filterTypesBackup: {},
  filterTypeCategory: {},
  filterTypeCategoryBackup: {},
  sorted_moves: [],
  abilities: [],
  filtered_abilities: [],
  items: [],
  filtered_items: [],
  types: [],
  movesSort: 'name (a-z)',
  category: 'all',
  type: 'all',
  cachedLoomians: {},
  cachedMoves: {},
  cachedAbilities: {},
  cachedItems: {},
  cachedTypes: {},
  cachedMovesLoomians: {},
  cachedAbilitiesLoomians: {},
  sets: [],
  movesLooms: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    openLinks: (state, action) => {
      state.isOpen = true;
    },
    closeLinks: (state, action) => {
      state.isOpen = false;
    },
    darkTheme: (state, action) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setLoomians: (state, action) => {
      state.loomians = action.payload;
      state.filtered_loomians = action.payload;
    },
    setBackupLoomians: (state, action) => {
      state.backup_loomians = action.payload;
    },
    setFilteredLoomians: (state, action) => {
      state.filtered_loomians = action.payload;
    },
    setMoves: (state, action) => {
      state.moves = action.payload;
      state.filtered_moves = action.payload;
      state.sorted_moves = action.payload;
    },
    setBackupMoves: (state, action) => {
      state.backup_moves = action.payload;
    },
    setAbilities: (state, action) => {
      state.abilities = action.payload;
      state.filtered_abilities = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
      state.filtered_items = action.payload;
    },
    setTypes: (state, action) => {
      state.types = action.payload;
    },
    setFilterTypesLoomians: (state, action) => {
      state.filterTypesLooms = action.payload;
    },
    setFilterTypesLoomiansBackup: (state, action) => {
      state.filterTypesLoomsBackup = action.payload;
    },
    setFilterTypes: (state, action) => {
      state.filterTypes = action.payload;
    },
    setFilterTypesBackup: (state, action) => {
      state.filterTypesBackup = action.payload;
    },
    setFilterCategories: (state, action) => {
      state.filterCategory = action.payload;
    },
    setFilterCategoriesBackup: (state, action) => {
      state.filterCategoryBackup = action.payload;
    },
    setFilterTypeCategories: (state, action) => {
      state.filterTypeCategory = action.payload;
    },
    setFilterTypeCategoriesBackup: (state, action) => {
      state.filterTypeCategoryBackup = action.payload;
    },
    addSets: (state, action) => {
      state.sets.push(action.payload);
    },
    setLoomiansSort: (state, action) => {
      const { sort, sort2, loomiansType, loomiansType2 } = action.payload;
      const { loomians, filtered_loomians, text } = state;
      let sortedLoomians = [...filtered_loomians];

      if (loomiansType === 'all' && loomiansType2 === 'all') {
        sortedLoomians = [...loomians];
      }

      if (text) {
        sortedLoomians = sortedLoomians.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        });
      }

      if (!Array.isArray(sortedLoomians)) {
        sortedLoomians = []; // Initialize as an empty array if undefined
      }

      if (
        sort !== 'none' &&
        sort2 !== 'none' &&
        sort !== undefined &&
        sort2 !== undefined
      ) {
        sortedLoomians = sortedLoomians.sort(
          (a, b) =>
            b.stats[sort] + b.stats[sort2] - (a.stats[sort] + a.stats[sort2])
        );
      } else if (sort !== 'none' && sort !== undefined) {
        sortedLoomians = sortedLoomians.sort(
          (a, b) => b.stats[sort] - a.stats[sort]
        );
      } else if (sort2 !== 'none' && sort2 !== undefined) {
        sortedLoomians = sortedLoomians.sort(
          (a, b) => b.stats[sort2] - a.stats[sort2]
        );
      }

      if (sort === 'none' && sort2 === 'none') {
        sortedLoomians = sortedLoomians.sort((a, b) => a['id'] - b['id']);
      }

      state.filtered_loomians = sortedLoomians;
      state.loomiansSort = sort;
      state.loomiansSort2 = sort2;
    },
    setLoomiansFilter: (state, action) => {
      const { type, type2, sort, sort2, text } = action.payload;
      const { loomians, filterTypesLooms } = state;
      let filteredLoomians = [...loomians];
      let filteredType = { ...filterTypesLooms };

      if (type === 'all' && type2 === 'all') {
        filteredLoomians = [...loomians];
      }

      if (type !== 'all' && type2 !== 'all') {
        if (type === type2) {
          filteredLoomians = filteredType[type.toLowerCase()];
        } else {
          let filteredLoomians1 =
            filteredType[`${type.toLowerCase()}-${type2.toLowerCase()}`];
          let filteredLoomians2 =
            filteredType[`${type2.toLowerCase()}-${type.toLowerCase()}`];
          if (!Array.isArray(filteredLoomians1)) {
            filteredLoomians1 = [];
          }
          if (!Array.isArray(filteredLoomians2)) {
            filteredLoomians2 = [];
          }
          filteredLoomians = [...filteredLoomians1, ...filteredLoomians2];
        }
      } else if (type !== 'all') {
        filteredLoomians = filteredType[type.toLowerCase()];
      } else if (type2 !== 'all') {
        filteredLoomians = filteredType[type2.toLowerCase()];
      }

      if (!Array.isArray(filteredLoomians)) {
        filteredLoomians = []; // Initialize as an empty array if undefined
      }

      if (text) {
        filteredLoomians = filteredLoomians.filter((item) => {
          return (
            (item.sName &&
              item.sName.toLowerCase().includes(text.toLowerCase())) ||
            (item.name && item.name.toLowerCase().includes(text.toLowerCase()))
          );
        });
      }

      if (
        sort !== 'none' &&
        sort2 !== 'none' &&
        sort !== undefined &&
        sort2 !== undefined
      ) {
        filteredLoomians = filteredLoomians.sort(
          (a, b) =>
            b.stats[sort] + b.stats[sort2] - (a.stats[sort] + a.stats[sort2])
        );
      } else if (sort !== 'none') {
        filteredLoomians = filteredLoomians.sort(
          (a, b) => b.stats[sort] - a.stats[sort]
        );
      } else if (sort2 !== 'none') {
        filteredLoomians = filteredLoomians.sort(
          (a, b) => b.stats[sort2] - a.stats[sort2]
        );
      }

      if (sort === 'none' && sort2 === 'none') {
        filteredLoomians = filteredLoomians.sort((a, b) => a['id'] - b['id']);
      }

      state.filtered_loomians = filteredLoomians;
      state.loomiansType = type;
      state.loomiansType2 = type2;
      state.loomiansSort = sort;
      state.loomiansSort2 = sort2;
      state.text = text;
    },
    setMovesSort: (state, action) => {
      const { filtered_moves } = state;
      const { select } = action.payload;

      let sortedMoves = [...filtered_moves];

      if (select === 'strength') {
        sortedMoves = sortedMoves.sort((a, b) => b.strength - a.strength);
      } else if (select === 'name-a') {
        sortedMoves = sortedMoves.sort((a, b) => a.name.localeCompare(b.name));
      } else if (select === 'name-z') {
        sortedMoves = sortedMoves.sort((a, b) => b.name.localeCompare(a.name));
      } else if (select === 'accuracy') {
        sortedMoves = sortedMoves.sort((a, b) => {
          if (a.accuracy === 'Sure Hit' && b.accuracy !== 'Sure Hit') {
            return -1;
          } else if (a.accuracy !== 'Sure Hit' && b.accuracy === 'Sure Hit') {
            return 1;
          } else {
            return b.accuracy - a.accuracy;
          }
        });
      } else if (select === 'energy') {
        sortedMoves = sortedMoves.sort((a, b) => b.energyCost - a.energyCost);
      }

      if (!Array.isArray(sortedMoves)) {
        sortedMoves = []; // Initialize as an empty array if undefined
      }

      state.filtered_moves = sortedMoves;
      state.movesSort = select;
    },
    setMovesFilter: (state, action) => {
      let { category, type, text } = action.payload;
      if (text === undefined) {
        text = '';
      }
      const {
        movesSort,
        moves,
        filterCategory,
        filterTypes,
        filterTypeCategory,
      } = state;
      let filteredMoves = [...moves];
      let filteredCategory = { ...filterCategory };
      let filteredType = { ...filterTypes };
      // Create a new array to avoid mutating the original

      if (category !== 'all' && type !== 'all') {
        filteredMoves =
          filterTypeCategory[type.toLowerCase() + '-' + category.toLowerCase()];

        if (filteredMoves === undefined) {
          filteredMoves = [];
        }

        if (
          filteredCategory['melee / ranged'] !== null &&
          category.toLowerCase() !== 'support'
        ) {
          filteredMoves = filteredMoves.concat(
            filteredCategory['melee / ranged']
          );
        }
      } else if (category !== 'all') {
        filteredMoves = filteredCategory[category.toLowerCase()];
        if (
          filteredCategory['melee / ranged'] !== null &&
          category.toLowerCase() !== 'support'
        ) {
          filteredMoves = filteredMoves.concat(
            filteredCategory['melee / ranged']
          );
        }
      } else if (type !== 'all') {
        filteredMoves = filteredType[type.toLowerCase()];
      }

      if (category === 'all' && type === 'all') {
        filteredMoves = [...state.moves];
      }

      if (!Array.isArray(filteredMoves)) {
        filteredMoves = []; // Initialize as an empty array if undefined
      }

      if (text) {
        filteredMoves = filteredMoves.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        });
      }

      if (movesSort === 'strength') {
        filteredMoves = filteredMoves.sort((a, b) => b.strength - a.strength);
      } else if (movesSort === 'name-a') {
        filteredMoves = filteredMoves.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (movesSort === 'name-z') {
        filteredMoves = filteredMoves.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      } else if (movesSort === 'accuracy') {
        filteredMoves = filteredMoves.sort((a, b) => {
          if (a.accuracy === 'Sure Hit' && b.accuracy !== 'Sure Hit') {
            return -1;
          } else if (a.accuracy !== 'Sure Hit' && b.accuracy === 'Sure Hit') {
            return 1;
          } else {
            return b.accuracy - a.accuracy;
          }
        });
      } else if (movesSort === 'energy') {
        filteredMoves = filteredMoves.sort(
          (a, b) => b.energyCost - a.energyCost
        );
      }
      // Update the state with the filtered moves, category, and type
      state.filtered_moves = filteredMoves;
      state.category = category;
      state.type = type;
      state.movesSort = movesSort;
      state.text = text;
    },
    setAbilitiesFilter: (state, action) => {
      let { text } = action.payload;
      if (text === undefined) {
        text = '';
      }
      const { abilities } = state;
      let filteredAbilities = [...abilities];

      if (text) {
        filteredAbilities = filteredAbilities.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        });
      }

      state.filtered_abilities = filteredAbilities;
      state.text = text;
    },
    setItemsFilter: (state, action) => {
      let { text } = action.payload;
      if (text === undefined) {
        text = '';
      }
      const { items } = state;
      let filteredItems = [...items];

      if (text) {
        filteredItems = filteredItems.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        });
      }

      state.filtered_items = filteredItems;
      state.text = text;
    },
    setCachedLoomians: (state, action) => {
      state.cachedLoomians = action.payload;
    },
    setCachedMoves: (state, action) => {
      state.cachedMoves = action.payload;
    },
    setCachedAbilities: (state, action) => {
      state.cachedAbilities = action.payload;
    },
    setCachedItems: (state, action) => {
      state.cachedItems = action.payload;
    },
    setCachedTypes: (state, action) => {
      state.cachedTypes = action.payload;
    },
    setCachedMovesLoomians: (state, action) => {
      state.cachedMovesLoomians = action.payload;
    },
    setCachedAbilitiesLoomians: (state, action) => {
      state.cachedAbilitiesLoomians = action.payload;
    },
  },
});

export const {
  openLinks,
  closeLinks,
  darkTheme,
  setLoading,
  setGenres,
  setGenre,
  setLoomians,
  setBackupLoomians,
  setFilteredLoomians,
  setMoves,
  setBackupMoves,
  setAbilities,
  setItems,
  setTypes,
  setFilterTypesLoomians,
  setFilterTypesLoomiansBackup,
  setFilterCategories,
  setFilterCategoriesBackup,
  setFilterTypes,
  setFilterTypesBackup,
  setFilterTypeCategories,
  setFilterTypeCategoriesBackup,
  setLoomiansSort,
  setLoomiansFilter,
  setMovesSort,
  setMovesFilter,
  setAbilitiesFilter,
  setItemsFilter,
  setCachedAbilities,
  setCachedLoomians,
  setCachedMoves,
  setCachedItems,
  setCachedTypes,
  setCachedAbilitiesLoomians,
  setCachedMovesLoomians,
  addSets,
} = globalSlice.actions;

export default globalSlice.reducer;
