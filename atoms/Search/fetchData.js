const fetch = ({ query } = {}) =>
  new Promise((resolve, reject) => {
    const data = [
      { value: "master" },
      { value: "blaster" },
      { value: "stroke" },
      { value: "bat" },
      { value: "foot" },
    ];
    if (query && typeof query !== "string") {
      reject(new Error("Param [query] must be a string."));
    }
    if (query) {
      setTimeout(
        resolve,
        500,
        data.filter((item, index) => {
          return item.value.includes(query);
        })
      );
    } else {
      setTimeout(resolve, 500, data);
    }
  });

export default fetch;
