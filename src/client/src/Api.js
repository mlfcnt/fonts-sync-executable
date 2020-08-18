import ky from "ky";

export const getFonts = async () =>
  fetch("/font/local").then((res) => res.json());

export const createUser = async ({ username, email, password, setError }) => {
  try {
    const token = await ky.post("user/signup", {
      json: { username, email, password },
    });
    return localStorage.setItem({ token });
  } catch (error) {
    setError(error);
  }
};
