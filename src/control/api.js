export const login = async (query) => {
  return await fetch("/login" + query)
    // .then((r) => r.json())
    .catch((error) => {
      console.log(error);
    });
};

export const auth = async () => {
  let res;
  try {
    res = await fetch("/auth").then((res) => res.json());
    // res = await res.json();
    console.log(res);
  } catch (error) {
    throw error;
  }
  return res.result;
};
