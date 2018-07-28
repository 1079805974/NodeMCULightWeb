<template>
  <div>
    <config-sensor/>
  </div>
</template>

<script>
  import LampCard from "../components/LampCard.vue";
  import Battery from "../components/Battery.vue";
  import SensorCard from "../components/SensorCard.vue";
  import ConfigLamp from "./configLamp.vue";
  import ConfigSensor from "./configSensor";

  export default {
    components: {
      ConfigSensor,
      ConfigLamp,
      SensorCard,
      Battery,
      LampCard}

  }
</script>
