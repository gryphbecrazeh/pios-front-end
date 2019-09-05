import { getItems } from "./itemActions";
import { getAlerts } from "./alertActions";
// Get ALL orders
export const getAllItems = filters => {
	getItems(filters, getAlerts);
};
// Get ALL skus
export const getAllSkus = () => {};
// Get SPECIFIC order
export const getSpecificOrder = order => {};
