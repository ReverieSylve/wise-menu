<script setup>
  const props = defineProps({
    item: {
      type: Object,
      default: null
    }
  })

  const emit = defineEmits(['delete-item', 'edit-item'])

  const cardSubtitle = `${props.item.price} UAH - Weight: ${props.item.weight}g`

  const editItem = () => {
    emit('edit-item', props.item.id)
  }

  const deleteItem = () => {
    emit('delete-item', props.item)
  }
</script>

<template>
  <v-card
    class="d-flex flex-column"
    variant="outlined"
    elevation="5"
    :title="item.name"
    :subtitle="cardSubtitle"
  >
    <v-card-text>
      <span
        class="line-clamp"
        :title="item.description"
      >
        {{ item.description }}
      </span>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        variant="outlined"
        color="error"
        icon="mdi-delete-forever-outline"
        @click="deleteItem"
      />
      <v-btn
        variant="outlined"
        color="info"
        icon="mdi-pencil-outline"
        @click="editItem"
      />
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
