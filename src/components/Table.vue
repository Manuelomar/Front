<template>
    <table class="table">
      <thead :class="theadClass">
        <tr>
          <th scope="col" v-for="header in headers" :key="header">
            {{ header }}
          </th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            {{ cell }}
          </td>
          <td>
            <!-- Slots para acciones personalizadas -->
            <slot name="actions" :row="row" :index="index"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    name: 'GenericTable',
    props: {
      headers: {
        type: Array,
        required: true
      },
      rows: {
        type: Array,
        required: true
      },
      theadClass: {
        type: String,
        default: 'thead-light'
      }
    }
  };
  </script>
  
  <style>
.table{
    width: 90%;
    margin: auto;
}
</style>
  