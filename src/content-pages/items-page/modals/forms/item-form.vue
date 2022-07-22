<script setup>
  import { minValue, required } from '@vuelidate/validators'
  import useValidate from '@vuelidate/core'

  let item = $ref({
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

  const validate = () => v$.$validate()

  const getItem = () => item

  const setItem = _item => {
    Object.assign(item, _item)
  }

  defineExpose({
    validate,
    getItem,
    setItem
  })
</script>

<template>
  <v-card-text>
    <v-text-field
      v-model="item.name"
      name="name"
      label="Name"
      variant="outlined"
      density="compact"
      :error="v$.name.$error"
      :error-messages="v$.name.$errors[0]?.$message"
    />
    <v-textarea
      v-model="item.description"
      name="description"
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
          name="price"
          suffix="&#8372;"
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
          name="weight"
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
</template>

<style>
  div.v-text-field .v-input__details {
    padding-inline-start: 0;
  }
</style>
