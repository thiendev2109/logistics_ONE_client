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

export const allEmployeeType = (state) =>
  state.employeeType.employeeTypes.allTypes?.data;

export const allEmployees = (state) =>
  state.employee.employees.allEmployees?.data;

export const allVehicals = (state) => state.vehical.vehicals.allVehicals?.data;

export const allAdmins = (state) => state.admin.admins.allAdmins?.data;
export const allServices = (state) => state.service.services.allServices?.data;

export const allMerchandises = (state) =>
  state.merchandise.merchandises.allMerchandises?.data;

<<<<<<< HEAD
export const allBookings = (state) => state.booking.bookings.allBookings?.data;
=======
  export const allPayments = (state) => state.payment.payments.allPayments?.data;

  export const allShippings = (state) => state.shipping.shippings.allShippings?.data;

>>>>>>> 59ddd076752b8623f17d5330a8ecb01ea24a1145
