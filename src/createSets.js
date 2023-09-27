import { addSets } from "./features/globalSlice";
import axios from "axios";

export const createSets = async (dispatch) => {
  try {
    const [
      luminami,
      avitross,
      arapaigo,
      obsidrugon,
      pyrolen,
      tahtab,
      tiklipse,
      tyrecks,
      stratusoar,
      zuelong,
      barblast,
      wabalisc,
      himbrr,
      vesperatu,
      ursoul,
      ursnac,
      wintrix,
      halvantic,
      fiscarna,
    ] = await Promise.all([
      axios.get("/sets/luminami.json"),
      axios.get("/sets/avitross.json"),
      axios.get("/sets/arapaigo.json"),
      axios.get("/sets/obsidrugon.json"),
      axios.get("/sets/pyrolen.json"),
      axios.get("/sets/tahtab.json"),
      axios.get("/sets/tiklipse.json"),
      axios.get("/sets/tyrecks.json"),
      axios.get("/sets/stratusoar.json"),
      axios.get("/sets/zuelong.json"),
      axios.get("/sets/barblast.json"),
      axios.get("/sets/wabalisc.json"),
      axios.get("/sets/himbrr.json"),
      axios.get("/sets/vesperatu.json"),
      axios.get("/sets/ursoul.json"),
      axios.get("/sets/ursnac.json"),
      axios.get("/sets/wintrix.json"),
      axios.get("/sets/halvantic.json"),
      axios.get("/sets/fiscarna.json"),
    ]);
    dispatch(addSets(luminami.data));
    dispatch(addSets(avitross.data));
    dispatch(addSets(arapaigo.data));
    dispatch(addSets(obsidrugon.data));
    dispatch(addSets(pyrolen.data));
    dispatch(addSets(tahtab.data));
    dispatch(addSets(tiklipse.data));
    dispatch(addSets(tyrecks.data));
    dispatch(addSets(stratusoar.data));
    dispatch(addSets(zuelong.data));
    dispatch(addSets(barblast.data));
    dispatch(addSets(wabalisc.data));
    dispatch(addSets(himbrr.data));
    dispatch(addSets(vesperatu.data));
    dispatch(addSets(ursoul.data));
    dispatch(addSets(ursnac.data));
    dispatch(addSets(wintrix.data));
    dispatch(addSets(halvantic.data));
    dispatch(addSets(fiscarna.data));

    return { luminami };
  } catch (error) {
    console.log(error);
  }
};
