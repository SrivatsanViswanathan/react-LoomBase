import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setGenres,
  setAbilities,
  setLoomians,
  setMoves,
  setItems,
  setTypes,
  setBackupMoves,
  setBackupLoomians,
} from "./features/globalSlice";
import { useSelector } from "react-redux";
import axios from "axios";

import {
  HomePage,
  Loomians,
  SingleLoomian,
  Abilities,
  SingleAbility,
  Items,
  SingleItem,
  Moves,
  SingleMove,
  Types,
  SingleType,
  Error,
} from "./pages";

import { createHashmaps } from "./createHashmaps";
import { createSets } from "./createSets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    children: [
      { index: true, path: "/", element: <Loomians></Loomians> },
      { path: "loomians/:id", element: <SingleLoomian></SingleLoomian> },
      { path: "abilities", element: <Abilities></Abilities> },
      { path: "abilities/:id", element: <SingleAbility></SingleAbility> },
      { path: "items", element: <Items></Items> },
      { path: "items/:id", element: <SingleItem></SingleItem> },
      { path: "moves", element: <Moves></Moves> },
      { path: "moves/:id", element: <SingleMove></SingleMove> },
      { path: "types", element: <Types></Types> },
      { path: "types/:id", element: <SingleType></SingleType> },
      // { path: "contact", element: <Contact></Contact> },
    ],
  },
  {
    path: "/loomians",
    element: <HomePage></HomePage>,
    children: [
      { index: true, path: "/loomians", element: <Loomians></Loomians> },
    ],
  },
  {
    path: "*",
    element: <HomePage></HomePage>,
    children: [{ index: true, path: "*", element: <Error></Error> }],
  },
  {
    path: "/error",
    element: <HomePage></HomePage>,
    children: [{ index: true, path: "/error", element: <Error></Error> }],
  },
]);

function App() {
  const { genre } = useSelector((state) => state.global);

  const dispatch = useDispatch();

  const fetchData = async () => {
    if (genre === "veils of shadow") {
      try {
        // const response = await axios.get("/.netlify/functions/getData");
        // let { genres, loomians, moves, abilities, items, types } =
        //   response.data;

        let [genres, loomians, moves, abilities, items, types] =
          await Promise.all([
            axios.get("https://loombase.netlify.app/genres.json"),
            axios.get("https://loombase.netlify.app/loomians.json"),
            axios.get("https://loombase.netlify.app/moves.json"),
            axios.get("https://loombase.netlify.app/abilities.json"),
            axios.get("https://loombase.netlify.app/items.json"),
            axios.get("https://loombase.netlify.app/types.json"),
          ]);

        moves.data = [...moves.data].sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          return nameA.localeCompare(nameB);
        });

        dispatch(setGenres(genres.data));
        dispatch(setLoomians(loomians.data));
        dispatch(setBackupLoomians(loomians.data));
        dispatch(setMoves(moves.data));
        dispatch(setBackupMoves(moves.data));
        dispatch(setAbilities(abilities.data));
        dispatch(setItems(items.data));
        dispatch(setTypes(types.data));

        createHashmaps(
          loomians.data,
          abilities.data,
          moves.data,
          items.data,
          types.data,
          dispatch
        );

        createSets(dispatch);

        return { genres };
      } catch (error) {
        console.log(error);
      }
    } else {
      // load second set of data
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
