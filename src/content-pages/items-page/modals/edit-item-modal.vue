<script setup>
import { useFetch } from '@vueuse/core'
import { watch } from 'vue'

const emit = defineEmits(['item-edited'])
let item = $ref(null)
let opened = $ref(false)
const open = _item => {
  item = _item
  opened = true
}

const form = $ref(null)
const rules = $ref({
  name: [v => !!v || 'Name is required'],
  description: [v => !!v || 'Description is required'],
  price: [v => !!v || 'Price is required', v => v > 0 || 'Price should more than 0'],
  weight: [v => !!v || 'Weight is required', v => v > 0 || 'Weight should more than 0']
})

watch(
  () => opened,
  value => {
    if (!value) (form.reset())
  }
)

const editItem = async () => {
  await useFetch(`api/items/${item.id}`).put(item).text()
  emit('item-edited')

  opened = false
}

defineExpose({
  open
})
</script>

<template>
  <v-dialog v-model="opened">
    <v-card
      text="Please update all required fields and press 'Edit' button."
      title="Edit Item"
    >
      <template
        #append
      >
        <v-icon
          icon="mdi-window-close"
          title="Close"
          @click="opened = false"
        />
      </template>

      <v-card-text>
        <v-form
          id="form"
          ref="form"
          @submit="editItem"
        >
          <v-text-field
            v-model="item.name"
            :rules="rules.name"
            density="compact"
            label="Name"
            required
            variant="outlined"
          />
          <v-textarea
            v-model="item.description"
            :rules="rules.description"
            density="compact"
            label="Description"
            no-resize
            required
            rows="3"
            variant="outlined"
          />
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model.number="item.price"
                :rules="rules.price"
                density="compact"
                label="Price"
                min="0"
                required
                suffix="UAH"
                type="number"
                variant="outlined"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.number="item.weight"
                :rules="rules.weight"
                density="compact"
                label="Weight"
                min="0"
                required
                suffix="g"
                type="number"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-6">
        <v-spacer />
        <v-btn
          color="blue-darken-1"
          variant="outlined"
          @click="opened = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="info"
          form="form"
          type="submit"
          variant="contained"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style>
.mdi-window-close {
  cursor: pointer;
}

form .v-text-field .v-input__details {
  padding-inline-start: 0;
}

span.v-text-field__suffix {
  opacity: 1;
}
</style>
