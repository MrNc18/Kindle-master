import { ORDER_STATUS } from "../constant";

export const getTotalAmmount = (cart) => {
  return (
    cart.reduce((totalPrice, item) => {
      return totalPrice + item.price * item.buyQantity || 0;
    }, 0) || 0
  ).toFixed(2);
};

export const enableButton = (params) => {
  return (
    params.billing_firstname &&
    params.billing_lastname &&
    params.billing_companyName &&
    // params.billing_country &&
    params.billing_address &&
    params.billing_location &&
    // params.billing_Province &&
    params.billing_phone &&
    (params.diffShippingAddress
      ? params.shipping_firstname &&
        params.shipping_lastname &&
        params.shipping_companyName &&
        // params.shipping_country &&
        params.shipping_address &&
        params.shipping_location &&
        // params.shipping_Province &&
        params.shipping_phone
      : true) &&
    params.price
  );
};

export const getPayload = (orderDetails, cart) => {
  return {
    ...orderDetails,
    total_price: orderDetails.price,
    orderStatus: ORDER_STATUS.received,
    orderDetails: cart.map(
      ({ id: productId, price, buyQantity: quantity }) => ({
        productId,
        price,
        totalPrice: price * quantity,
        quantity,
      })
    ),
    quantity: cart.reduce((total, item) => total + item.quantity, 0),
  };
};
