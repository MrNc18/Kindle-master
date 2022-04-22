import React from 'react'

export default function OrderReceived() {
  return (
    <div>
      <section className="container cart_details">
        <div className="wrp">
          <div className="row">
            <div className="col-md-12">
              <div className="cart_top_row">
                  <h2 className="body_heading">Order Received</h2>
              </div>
              <div className="thankyou">
                <p>Thank you. Your order has been received.</p>
              </div>
              <div className="order-no">
                <p>Order number: <b>2557</b></p>
                <p>Date: <b>September 7, 2021</b></p>
                <p>Total: <b>4810.45 Kz</b></p>
                <p>Payment method: <b>Net Banking</b></p>
              </div>
              <div className="cart_top_row">
                  <h2 className="body_heading">Order Details</h2>
              </div>
              <div className="row">
                <div className="col-md-12 table-responsive">
                  <table className="book_info_tbl w-100">
                    <tr className="header_row">
                      <td>Product</td>
                      <td className="text-center">Total</td>
                    </tr>
                    <tr>
                      <td className="cart_price">Prison Reeducation Methods <b>x 1</b></td>
                      <td className="cart_price text-center">1800.00 Kz</td>
                    </tr>
                    <tr>
                      <td className="cart_price">3rd National Conference on Angolan Literature <b>x 1</b></td>
                      <td className="cart_price text-center">3,000.00 Kz</td>
                    </tr>
                    <tr>
                      <td className="cart_price"><b>Subtotal:</b></td>
                      <td className="cart_price text-center">4800.00 Kz</td>
                    </tr>
                    <tr>
                      <td className="cart_price"><b>Shipping:</b> Small Packet USA Air at 10.45 Kz</td>
                      <td className="cart_price text-center">10.45 Kz</td>
                    </tr>
                    <tr>
                      <td className="cart_price"><b>Payment method:</b></td>
                      <td className="cart_price text-center">Net Banking</td>
                    </tr>
                    <tr>
                      <td className="cart_price"><b>Total:</b></td>
                      <td className="cart_price text-center">4,810.45 Kz</td>
                    </tr>
                  </table>

                </div>  
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="clear">&nbsp;</div>
      <div className="clear">&nbsp;</div>
    </div>
  )
}
