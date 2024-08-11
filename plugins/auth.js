export default defineNuxtPlugin({
  name: "auth",
  enforce: "pre",
  hooks: {
    "app:created"() {
      (async () => {
        try {
          await $fetch("/api/auth/login", {
            method: "POST",
          });
        } catch (error) {
          return error;
        }
      })();
    },
  },
});
