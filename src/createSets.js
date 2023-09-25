import { addSets } from "./features/globalSlice";
import axios from "axios";

export const createSets = async (dispatch) => {
  try {
    const [luminami, avitross, arapaigo] = await Promise.all([
      axios.get("/sets/luminami.json"),
      axios.get("/sets/avitross.json"),
      axios.get("/sets/arapaigo.json"),
    ]);
    dispatch(addSets(luminami.data));
    dispatch(addSets(avitross.data));
    dispatch(addSets(arapaigo.data));

    return { luminami };
  } catch (error) {
    console.log(error);
  }
};
