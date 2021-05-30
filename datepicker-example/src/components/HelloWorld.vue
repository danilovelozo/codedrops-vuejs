<template>
  <div class='date-picker'>

    <div class='custom-select'>
      <select @change='editValue("months", $event)' ref='month'>
        <option
          v-for='(month, index) in months'
          :key='month'
          :value='index'>
          {{ month }}
        </option>
      </select>
    </div>

    <div class='custom-select'>
      <select @change='editValue("date", $event)' ref='date'>
        <option
          v-for='i in daysInMonth'
          :key='i'
          :value='i'>
          {{ i }}
        </option>
      </select>
    </div>

    <div class='custom-select'>
      <select @change='editValue("year", $event)' ref='year'>
        <option
          v-for='i in numberofYears'
          :key='i'
          :value='startingYear + (i - 1)'>
          {{ startingYear + (i - 1 )}}
        </option>
      </select>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import moment from 'moment'

export default {
  setup (props, context) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December']

    const startingYear = 2010
    const numberofYears = 20

    const dateValue = moment() // defaults to current date
    const daysInMonth = ref(dateValue.daysInMonth())

    const editValue = (unit, evt) => {
      dateValue.set(unit, evt.target.value)
      daysInMonth.value = dateValue.daysInMonth()
      updateElements()
      context.emit('update', dateValue)
    }

    const month = ref(null)
    const date = ref(null)
    const year = ref(null)

    const updateElements = () => [
      // month.value gives us the <select>
      month.value.value = dateValue.month(),
      date.value.value = dateValue.date(),
      year.value.value = dateValue.format('YYYY')
    ]

    onMounted(() => {
      updateElements()
    })

    return {
      month,
      date,
      year,
      editValue,
      daysInMonth,
      months,
      numberofYears,
      startingYear
    }
  }
}
</script>

<style scoped>
  .custom-select {
    background-color: #eee;
    float: left;
    margin-right: 10px;
    position: relative;
  }

  .custom-select select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none; /* remove default styling */
    background-color: inherit;
    border: none;
    color: #333;
    display: block;
    font-size: 16px;
    height: 32px;
    padding: 5px 30px 5px 10px;
    margin: 0;
    outline: none;
  }

  /* drop arrow */
  .custom-select:after {
    content: '\25bc';
    color: #AAA;
    font-size: 12px;
    position: absolute;
    right: 8px;
    top: 10px;
  }
</style>
