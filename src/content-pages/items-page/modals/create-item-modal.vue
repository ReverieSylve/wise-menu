<script setup>
  import uniqid from 'uniqid'
  import { useItemsStore } from '../../../stores/items'
  import { watch } from 'vue'
  import useValidate from '@vuelidate/core'
  import { required, minValue } from '@vuelidate/validators'
  let opened = $ref(false)
  const open = () => (opened = true)

  const { addItem } = useItemsStore()

  const item = $ref({
    name: '',
    description: '',
    weight: 0,
    price: 0
  })
  const rules = {
    name: { required },
    description: { required },
    price: { required, minValue: minValue(0.01) },
    weight: { required, minValue: minValue(0.01) }
  }

  const v$ = $ref(useValidate(rules, item))

  watch(
    () => opened,
    value => {
      if (!value) v$.$reset()
    }
  )

  const createItem = async () => {
    const isValid = await v$.$validate()
    if (!isValid) return
    const _payload = { ...item, ...{ id: uniqid() } }
    addItem(_payload)
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
      <template #append>
        <v-icon
          icon="mdi-window-close"
          @click="opened = false"
        />
      </template>

      <v-card-text>
        <v-text-field
          v-model="item.name"
          label="Name"
          variant="outlined"
          density="compact"
          :error="v$.name.$error"
          :error-messages="v$.name.$errors[0]?.$message"
        />
        <v-textarea
          v-model="item.description"
          variant="outlined"
          rows="3"
          density="compact"
          no-resize
          label="Description"
          :error="v$.description.$error"
          :error-messages="v$.description.$errors[0]?.$message"
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
              :error="v$.price.$error"
              :error-messages="v$.price.$errors[0]?.$message"
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
              :error="v$.weight.$error"
              :error-messages="v$.weight.$errors[0]?.$message"
            />
          </v-col>
        </v-row>
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
          @click="createItem()"
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

  div.v-text-field .v-input__details {
    padding-inline-start: 0;
  }

  span.v-text-field__suffix {
    opacity: 1;
  }
</style>
