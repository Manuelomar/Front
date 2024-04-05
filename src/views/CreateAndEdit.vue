<template>
  <div class="container">
    <h1>{{ $route.name === 'create' ? 'Agregar Permiso' : 'Editar Permiso' }}</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="employeeName" class="form-label">Nombre del Empleado:</label>
        <input type="text" class="form-control" id="employeeName" v-model="form.employeeName" required>
      </div>
      <div class="mb-3">
        <label for="employeeLastName" class="form-label">Apellido del Empleado:</label>
        <input type="text" class="form-control" id="employeeLastName" v-model="form.employeeLastName" required>
      </div>
      <div class="mb-3">
        <label for="permissionDate" class="form-label">Fecha del Permiso:</label>
        <input type="date" class="form-control" id="permissionDate" v-model="form.permissionDate" required>
      </div>
      <div class="mb-3">
        <label for="permissionTypeDescription" class="form-label">Descripción del Tipo de Permiso:</label>
        <input type="text" class="form-control" id="permissionTypeDescription" v-model="form.permissionTypeDescription" required>
      </div>
      <div class="button-container" style="display: flex; justify-content: space-between;">
        <button type="submit" class="btn btn-primary">Guardar</button>
        <RouterLink class="btn btn-primary" to="/">Volver</RouterLink>
      </div>

    </form>
    <div v-if="showModal" class="modal" tabindex="-1" style="display:block; background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Información</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="showModal = false"></button>
          </div>
          <div class="modal-body">
            <p>Información guardada con éxito.</p>
          </div>
        </div>
      </div>
    </div>
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
      showModal: false, // Agrega esta línea
    };
  },
  methods: {
    async submitForm() {
      try {
        const permissionTypeResponse = await PermissionTypeServices.createPermissionType({
          description: this.form.permissionTypeDescription,
        });
        const permissionTypeId = permissionTypeResponse.data.data.id;

        if (permissionTypeId) {
          const permissionData = {
            employeeName: this.form.employeeName,
            employeeLastName: this.form.employeeLastName,
            permissionTypeId1: permissionTypeId,
            permissionDate: this.form.permissionDate,
          };

          await PermissionsService.createPermission(permissionData);

          // Muestra el modal de confirmación
          this.showModal = true;

          // Espera 3 segundos, luego redirige y esconde el modal
          setTimeout(() => {
            this.showModal = false; // Opcional: Esconder el modal
            this.$router.push('/'); // Redirigir a la ruta principal
          }, 3000);
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
