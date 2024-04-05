import BaseService from './BaseServices';

class PermissionsService extends BaseService {
  constructor() {
    super('Permissions'); 
  }

  getPagedPermissions() {
    return this.getAll();
  }

  getPermissionById(id) {
    return this.get(id);
  }

  createPermission(permissionData) {
    return this.create(permissionData);
  }

  updatePermission(id, permissionData) {
    return this.update(id, permissionData);
  }

  deletePermission(id) {
    return this.delete(id);
  }
  
}

export default new PermissionsService();
