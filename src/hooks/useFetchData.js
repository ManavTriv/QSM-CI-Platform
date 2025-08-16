import { initializeParse } from "../api/parseConfig";

const fetchData = async () => {
  const Parse = initializeParse();

  const ImageClass = Parse.Object.extend("Images");
  const query = new Parse.Query(ImageClass);

  try {
    const results = await query.find();
    return results.map((image) => ({
      id: image.id,
      ...image.toJSON(),
    }));
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

export default fetchData;
