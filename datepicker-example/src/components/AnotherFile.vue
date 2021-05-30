<template>
  <div id='root'>
    <p>Value: {{ date }} </p>
    <date-picker @update='date = $event' />
  </div>
</template>