export const login = async (query) => {
  return await fetch('/api/login' + query)
    // .then((r) => r.json())
    .catch((error) => {
      console.log(error);
    });
};

export const auth = async () => {
  let res;

  res = await fetch('/api/auth').then((res) => res.json());
  // res = await res.json();
  console.log(res);

  return res.result;
};
