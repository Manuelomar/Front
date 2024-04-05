<template>
  <main>
    <div class="container">
      <h1>Permisos</h1>
      <div class="container-button">
        <RouterLink class="btn btn-primary" to="/create">Agregar</RouterLink>

      </div>
      <GenericTable
        :headers="[ 'Nombre de empleado', 'Apellido de empleado', 'Tipo de permiso', 'Fecha de permiso']"
        :rows="permissions.map(permission => [
  permission.employeeName,
  permission.employeeLastName,
  permission.permissionType ? permission.permissionType.description : 'No especificado',
  formatDate(permission.permissionDate)
])"
        theadClass="thead-dark"
      >
        <template v-slot:actions="{ row, index }">
          <button @click="openDeleteModal(index)" class="btn btn-danger">Eliminar</button>
        </template>
      </GenericTable>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirmar Eliminación</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ¿Estás seguro de que deseas eliminar este permiso?
          </div>
          <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
  <button type="button" class="btn btn-danger" @click="confirmDelete">Eliminar</button>
</div>

        </div>
      </div>
    </div>
  </main>
</template>

<script>
import PermissionsTypeResponse from '@/models/PermissionTypeResponse';

import PermissionsService from '@/service/PermissionServices';
import PermissionsResponse from '@/models/PermissionsResponse.model';
import GenericTable from '@/components/Table.vue';

export default {
  components: {
    GenericTable
  },
  data() {
    return {
      permissions: [],
      selectedIndex: null
    };
  },
  methods: {
    formatDate(isoString) {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-ES'); 
    },
    openDeleteModal(index) {
    this.selectedIndex = index;
    this.deleteModal.show();
  },
async confirmDelete() {
  if (this.selectedIndex !== null) {
    const id = this.permissions[this.selectedIndex].id;
    try {
      await PermissionsService.deletePermission(id); // Asegúrate de que esto coincide con el método en PermissionsService
      this.permissions.splice(this.selectedIndex, 1);
      this.selectedIndex = null;
      this.deleteModal.hide(); // Ocultar el modal
    } catch (error) {
      console.error("Error al eliminar el permiso:", error);
    }
  }
}
  },
  async mounted() {
    
  this.deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'), {
      keyboard: false
    });
  try {
    const response = await PermissionsService.getPagedPermissions({ page: 1, pageSize: 10 });
    if (response.data && response.data.data && response.data.data.items) {
      // Asumiendo que cada 'item' tiene 'permissionType' como parte de los datos
      this.permissions = response.data.data.items.map(item => {
        // Instancia de PermissionsTypeResponse si permissionType está presente
        const permissionTypeData = item.permissionType
          ? new PermissionsTypeResponse(item.permissionType)
          : null;
        
        // Pasa permissionTypeData al constructor de PermissionsResponse
        return new PermissionsResponse(item, permissionTypeData);
      });
    } else {
      console.error('No permissions found in the response');
    }
  } catch (error) {
    console.error("Error fetching permissions:", error);
  }


},
};
</script>

<style>
.container-button{
  display: flex;
    justify-content: flex-end;
    width: 92%;
}
</style>
