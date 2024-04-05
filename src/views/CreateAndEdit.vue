<template>
    <div>
      <h1>{{ $route.name === 'create' ? 'Agregar Permiso' : 'Editar Permiso' }}</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="employeeName">Nombre del Empleado:</label>
          <input id="employeeName" v-model="form.employeeName" required>
        </div>
        <div>
          <label for="employeeLastName">Apellido del Empleado:</label>
          <input id="employeeLastName" v-model="form.employeeLastName" required>
        </div>
        <div>
          <label for="permissionDate">Fecha del Permiso:</label>
          <input type="date" id="permissionDate" v-model="form.permissionDate" required>
        </div>
        <div>
          <label for="permissionTypeDescription">Descripción del Tipo de Permiso:</label>
          <input id="permissionTypeDescription" v-model="form.permissionTypeDescription" required>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  </template>
  
  <script>
  import PermissionsService from '@/service/PermissionServices';
  import PermissionTypeServices from '@/service/PermissionTypeServices';
 
  
  export default {
    data() {
      return {
        form: {
          employeeName: '',
          employeeLastName: '',
          permissionTypeId1: null, 
          permissionDate: '',
          permissionTypeDescription: '',
        },
      };
    },
    methods: {
        async submitForm() {
  try {
    // Crear el tipo de permiso y obtener el ID
    const permissionTypeResponse = await PermissionTypeServices.createPermissionType({
      description: this.form.permissionTypeDescription,
    });
    const permissionTypeId = permissionTypeResponse.id;

    if (permissionTypeId) {
      // Usar el ID del tipo de permiso para crear el permiso
      const permissionData = {
        employeeName: this.form.employeeName,
        employeeLastName: this.form.employeeLastName,
        permissionTypeId: permissionTypeId,
        permissionDate: this.form.permissionDate,
      };

      // Crear el permiso con el ID del tipo de permiso
      await PermissionsService.createPermission(permissionData);

      alert('Permiso creado con éxito');
    } else {
      console.error('No se pudo obtener el ID del tipo de permiso creado');
    }
  } catch (error) {
    console.error('Error al crear el permiso:', error);
  }
}


    },
  };
  </script>
  