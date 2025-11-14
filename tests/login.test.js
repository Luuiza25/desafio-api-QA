const axios = require("axios");
const baseURL = "https://serverest.dev";

describe("Login API", () => {
  it("Deve realizar login com sucesso", async () => {
    const response = await axios.post(`${baseURL}/login`, {
      email: "fulano@qa.com",
      password: "teste"
    });
  });
});
