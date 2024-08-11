<template>
  <main>
    <!-- loader -->
    <UtilsLoading v-if="status == 'idle' || status == 'pending' || !data" />
    <template v-else>
      <!-- booking -->
      <FilterBooking :execute="execute" />

      <!-- date -->
      <FilterDate :execute="execute" />

      <!-- other -->
      <FilterOther :data="data" />
    </template>
  </main>
</template>

<script setup>
definePageMeta({
  middleware: "check",
});

const route = useRoute();

const { data, execute, status } = useFetch("/api/search/flight", {
  server: false,
  method: "POST",
  headers: useRequestHeaders["cookies"],
  body: {
    origin: route.query.origin,
    destination: route.query.destination,
    departure_date_time: route.query.departure_date_time,
    return_date_time: route.query.return_date_time,
    adults: parseInt(route.query.adults),
    children: parseInt(route.query.children),
    infants: parseInt(route.query.infants),
  },
});
</script>
