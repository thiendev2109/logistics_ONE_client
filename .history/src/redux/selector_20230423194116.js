// prettier-ignore
export const accountAdmin = (state) => state.authAdmin.login.currentAccount;
export const adminToken = (state) =>
  state.authAdmin.login.currentAccount?.token;

export const allCustomers = (state) =>
  state.customer.customers.allCustomers?.data;

export const allWarehouses = (state) =>
  state.warehouse.warehouses.allWarehouses?.data;
export const allContainers = (state) =>
  state.container.containers.allContainers?.data;