export const login = async () => {
  return await fetch("/login")
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
