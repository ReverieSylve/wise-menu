<script setup>
import uniqid from 'uniqid'
import { useFetch } from '@vueuse/core'
import { watch } from 'vue'

const emit = defineEmits(['item-created'])
let opened = $ref(false)
const open = () => (opened = true)

const form = $ref(null)
const item = $ref({
  name: '',
  description: '',
  weight: 0,
  price: 0
})
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

const createItem = async () => {
  const _payload = { ...item, ...{ id: uniqid() } }
  await useFetch('api/items').post(_payload).text()
  emit('item-created')

  opened = false
}

defineExpose({
  open
})
</script>

<template>
  <v-dialog v-model="opened">
    <v-card
      title="Create Item"
      text="Please fill in all required fields and press 'Create' button."
    >
      <template
        #append
      >
        <v-icon
          icon="mdi-window-close"
          @click="opened = false"
        />
      </template>

      <v-card-text>
        <v-form
          id="form"
          ref="form"
          @submit="createItem"
        >
          <v-text-field
            v-model="item.name"
            label="Name"
            variant="outlined"
            density="compact"
            :rules="rules.name"
            required
          />
          <v-textarea
            v-model="item.description"
            variant="outlined"
            rows="3"
            density="compact"
            :rules="rules.description"
            no-resize
            label="Description"
            required
          />
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model.number="item.price"
                suffix="UAH"
                label="Price"
                variant="outlined"
                density="compact"
                type="number"
                min="0"
                :rules="rules.price"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.number="item.weight"
                label="Weight"
                suffix="g"
                variant="outlined"
                density="compact"
                type="number"
                min="0"
                :rules="rules.weight"
                required
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
          variant="contained"
          type="submit"
          form="form"
        >
          Create
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
