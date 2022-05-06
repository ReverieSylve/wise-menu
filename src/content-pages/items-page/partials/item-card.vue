<script setup>
const props = defineProps({
  item: Object
})

defineEmits(['delete-item'])

const cardSubtitle = `${props.item.price} UAH - Weight: ${props.item.weight}g`
</script>

<template>
  <v-card
    class="d-flex flex-column"
    variant="outlined"
    elevation="5"
    :title="item.name"
    :subtitle="cardSubtitle"
  >

    <v-card-content>
      <span
        class="line-clamp"
        :title="item.description">

        {{ item.description }}

      </span>
    </v-card-content>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        variant="outlined"
        icon="mdi-delete-forever-outline"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
