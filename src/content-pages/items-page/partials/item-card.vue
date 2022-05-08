<script setup>
const props = defineProps({
  item: Object
})

const emit = defineEmits(['delete-item'])

const cardSubtitle = `${props.item.price} UAH - Weight: ${props.item.weight}g`

const deleteItem = () => (emit('delete-item', props.item))
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
        color="error"
        icon="mdi-delete-forever-outline"
        @click="deleteItem"
      ></v-btn>
      <v-btn
        variant="outlined"
        color="info"
        icon="mdi-pencil-outline"
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
