import BaseService from './BaseServices';

class PermissionTypeServices extends BaseService {
  constructor() {
    super('PermissionTypeControllers'); 
  }

  getPagedPermissionType() {
    return this.getAll();
  }

  getPermissionTypeById(id) {
    return this.get(id);
  }

  createPermissionType(permissionData) {
    return this.create(permissionData);
  }

  updatePermissionType(id, permissionData) {
    return this.update(id, permissionData);
  }

  deletePermissionType(id) {
    return this.delete(id);
  }
}

export default new PermissionTypeServices();
