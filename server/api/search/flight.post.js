export default defineEventHandler(async (e) => {
  const token = getCookie(e, "access_token");
  const body = await readBody(e);

  try {
    const data = await $fetch(
      `https://tickett.website/test/v1/flight/search/100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
        method: "POST",
      }
    );
    return data;
  } catch (error) {
    return error;
  }
});
