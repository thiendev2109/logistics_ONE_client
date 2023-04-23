// prettier-ignore
export const accountAdmin = (state) => state.authAdmin.login.currentAccount;
export const adminToken = (state) =>
  state.authAdmin.login.currentAccount?.token;

export const allCustomers = (state) =>
  state.customer.customers.allCustomers?.data;

export const allWarehouses = (state) =>
  state.warehouse.warehouses.allWarehouses?.data;
<<<<<<< HEAD
export const allContainers = (state) =>
  state.container.containers.allContainers?.data;
=======

export const allEmployeeType = (state) =>
  state.employeeType.employeeTypes.allTypes?.data;

export const allEmployees = (state) =>
  state.employee.employees.allEmployees?.data;
>>>>>>> fa22a7a7f6ef55c930614f8b250c231eb1c66ed9
