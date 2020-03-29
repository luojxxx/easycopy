import Url from "../model/Url";

const clearDb = async () => {
  const result = await Url.deleteMany({
    url: { $ne: "" }
  });

  console.log(result);
};

// clearDb();
