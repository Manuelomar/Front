import PermissionsTypeResponse from '/src/models/PermissionTypeResponse'; 

export default class CreatePermissionsResponse {
  constructor(data, permissionTypeData) {
    this.id = data.id;
    this.employeeName = data.employeeName;
    this.employeeLastName = data.employeeLastName;
    this.permissionTypeId1 = data.permissionTypeId1;
    this.permissionDate = new Date(data.permissionDate);
    this.permissionType = permissionTypeData ? new PermissionsTypeResponse(permissionTypeData) : null;
  }

  getPermissionTypeDescription() {
    return this.permissionType ? this.permissionType.description : 'Descripción no disponible';
  }
}
