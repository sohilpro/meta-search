<template>
  <section class="mx-5 my-5">
    <button
      :disabled="loading"
      @click="downloadPdf"
      class="bg-blue-500 text-white px-5 flex gap-2 transition-all py-3 rounded-lg mb-5"
      :class="{ 'opacity-50': loading }"
    >
      Receive tickets as PDF
      <svg
        v-if="loading"
        xmlns="http://www.w3.org/2000/svg"
        width="1.5rem"
        height="1.5rem"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          opacity="0.25"
        />
        <path
          fill="currentColor"
          d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
        >
          <animateTransform
            attributeName="transform"
            dur="0.75s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </svg>
    </button>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
      <div
        v-for="(item, index) in tickets[0].detail"
        :key="index"
        class="bg-white flex gap-3 flex-col"
      >
        <div class="flex bg-[#00CCFF] text-white rounded-2xl w-full px-6 py-8">
          <div class="flex justify-between w-full gap-2 text-xl">
            <div class="flex gap-5 items-center">
              <img src="/icons/logo-w.svg" alt="..." />
              <p class="text-xs font-bold">CRStrip.com</p>
            </div>

            <div class="flex gap-5 items-center">
              <span class="text-sm font-extrabold"> 07813331544 </span>
              <img src="/icons/call.svg" alt="..." />
            </div>
          </div>
        </div>

        <div class="grid border-b-2 pb-4 grid-cols-3">
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> First name </span>

            <p class="font-extrabold text-[#172B30] text-xs">{{ item.name }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> Last name </span>

            <p class="font-extrabold text-[#172B30] text-xs">
              {{ item.last_name }}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]">
              ID number/passport
            </span>

            <p class="font-extrabold text-[#172B30] text-xs">
              {{ item.number_passport }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> origin </span>

            <p class="font-extrabold text-[#172B30] text-xs">
              Tehran
              <span class="text-[#172B30]/70 font-normal"
                >(mehrabad Airport)</span
              >
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> Destination </span>

            <p class="font-extrabold text-[#172B30] text-xs">
              Mashhad
              <span class="text-[#172B30]/70 font-normal"
                >(hasheminejad Airport)</span
              >
            </p>
          </div>
        </div>

        <div class="bg-[#CCF5FF] px-6 py-8 rounded-md w-full">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 bg-[#D9D9D9] rounded-full"></span>
              <span class="font-extrabold text-sm">Iran Air</span>
            </div>

            <div class="flex text-xs flex-col">
              <p class="font-extrabold text-[#172B30]">
                Mashhad
                <span class="text-[#172B30]/70 font-normal"
                  >(hasheminejad Airport)</span
                >
              </p>

              <span class="text-[#172B30]/70 text-[10px]">{{
                format({
                  date: tickets[1].ticket.outbound_group.departure_date_time,
                  format: "HH:mm A D MMMM",
                  tz: "UTC",
                })
              }}</span>
            </div>

            <!-- <span class="text-[#172B30] text-xs"> Stop Time: 5h 34m. </span> -->
            <span class="text-[#172B30] text-xs">
              Stop Time:
              {{
                format({
                  date: tickets[1].ticket.outbound_group.arrival_date_time,
                  format: "HH",
                  tz: "UTC",
                })
              }}h
              {{
                format({
                  date: tickets[1].ticket.outbound_group.arrival_date_time,
                  format: "mm",
                  tz: "UTC",
                })
              }}m.
            </span>
          </div>
        </div>

        <div class="grid grid-cols-3">
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> Time </span>

            <p class="font-extrabold text-[#172B30] text-xs">
              {{
                format({
                  date: tickets[1].ticket.outbound_group.departure_date_time,
                  format: "HH:mm A",
                  tz: "UTC",
                })
              }}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> Date </span>

            <p class="font-extrabold text-[#172B30] text-xs">
              {{
                format({
                  date: tickets[1].ticket.outbound_group.departure_date_time,
                  format: "D MMMM YYYY",
                  tz: "UTC",
                })
              }}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> Ticket number </span>

            <p class="font-extrabold text-[#172B30] text-xs">13256RA</p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> Cabin class </span>

            <p class="font-extrabold text-[#172B30] text-xs">Economic</p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> Baggage </span>

            <p class="font-extrabold text-[#172B30] text-xs">
              {{
                tickets[1].ticket.outbound_group.flight_segments[0].baggage_kg
              }}
              KG free
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> Flight number </span>

            <p class="font-extrabold text-[#172B30] text-xs">
              {{
                tickets[1].ticket.outbound_operating_airlines[0].flight_number
              }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-10">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 bg-[#D9D9D9] rounded-full"></span>
            <div class="flex flex-col">
              <span class="text-[#172B30]/70 text-[10px]">Airline</span>
              <span class="font-extrabold text-sm">Iran Air</span>
            </div>
          </div>
          <div class="flex flex-col">
            <span class="text-[#172B30]/70 text-[10px]">Issue Time</span>
            <span class="font-extrabold text-sm"
              >{{
                format({
                  date: new Date(),
                  format: "HH:mm A",
                  tz: "UTC",
                })
              }},
              {{
                format({
                  date: new Date(),
                  format: "D MMMM YYYY",
                  tz: "UTC",
                })
              }}
            </span>
            <!-- <span class="font-extrabold text-sm"
              >07:15 PM , 9 September 2022</span
            > -->
          </div>
        </div>

        <div class="grid border-b-2 pb-4 grid-cols-3">
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> Price </span>

            <p class="font-extrabold text-[#172B30] text-xs">
              {{ tickets[1].ticket.price_detail.total_fare.payable }} USD
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> Payment </span>

            <p class="font-extrabold text-[#172B30] text-xs">Online Payment</p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[#172B30]/70 text-[10px]"> Issue Place </span>

            <p class="font-extrabold text-[#172B30] text-xs">crstrip.com</p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <img src="/icons/circle.svg" class="mt-2" alt="..." />
          <div class="flex flex-col">
            <p class="text-justify text-[#172B30]">What is Lorem Ipsum?</p>
            <p class="text-justify text-[#172B30]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of with the release of
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of with the release of mmmm
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { format } from "@formkit/tempo";
const { tickets } = useTickets();
const loading = ref(false);
const basePdf = ref(null);

onMounted(async () => {
  try {
    loading.value = true;
    const data = await $fetch("/api/pdf/export-pdf", {
      method: "POST",
      body: {
        data: tickets.value[0].detail.map((i) => {
          i.flight_time = format({
            date: tickets.value[1].ticket.outbound_group.departure_date_time,
            format: "HH:mm A D MMMM",
            tz: "UTC",
          });
          i.stop_time = `${format({
            date: tickets.value[1].ticket.outbound_group.arrival_date_time,
            format: "HH",
            tz: "UTC",
          })}h ${format({
            date: tickets.value[1].ticket.outbound_group.arrival_date_time,
            format: "mm",
            tz: "UTC",
          })}m.`;
          i.time = format({
            date: tickets.value[1].ticket.outbound_group.departure_date_time,
            format: "HH:mm A",
            tz: "UTC",
          });
          i.date = format({
            date: tickets.value[1].ticket.outbound_group.departure_date_time,
            format: "D MMMM YYYY",
            tz: "UTC",
          });
          i.price = tickets.value[1].ticket.price_detail.total_fare.payable;
          i.baggage =
            tickets.value[1].ticket.outbound_group.flight_segments[0].baggage_kg;
          i.flight_number =
            tickets.value[1].ticket.outbound_operating_airlines[0].flight_number;
          i.issue_time = `${format({
            date: new Date(),
            format: "HH:mm A",
            tz: "UTC",
          })} , ${format({
            date: new Date(),
            format: "D MMMM YYYY",
            tz: "UTC",
          })}`;
          return i;
        }),
      },
    });

    basePdf.value = data;
  } catch (error) {
    console.error("Error render PDF:", error.message);
  } finally {
    loading.value = false;
  }
});

const downloadPdf = () => {
  const linkSource = `data:application/pdf;base64,${basePdf.value}`;
  const downloadLink = document.createElement("a");
  const fileName = "test.pdf";
  downloadLink.style.display = "hidden";
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};
</script>
