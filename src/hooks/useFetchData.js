import Parse from "../api/parseConfig";

const fetchData = async () => {
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
    return [];
  }
};

export default fetchData;
