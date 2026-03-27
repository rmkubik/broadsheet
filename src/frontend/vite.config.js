export default {
  /**
   * This does not seem ideal for me. How do I change this config per
   * environment? Ideally, these sort of values would all come from
   * my .env file so it would be easy to set up in deployment for one
   * place.
   *
   * Surely there's an existing pattern I can borrow for this problem.
   */

  /**
   * This gets set to BASE_URL as an env var in the browser env.
   */
  base: "http://localhost:3000",
};
