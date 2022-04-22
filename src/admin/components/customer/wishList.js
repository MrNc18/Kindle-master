import { Drawer } from "@material-ui/core";
import { deleteWishListService } from "../../services/cart";
import { deleteIconSVG } from "./../../../svgs/deleteIcon";
import { showAlert } from "./../../../utils/showAlert";
import { useHistory } from "react-router-dom";

export const WishList = ({ data, toggleDrawer, open }) => {
  const anchor = "right";
  const history = useHistory();

  const deleteWishList = async (id) => {
    try {
      await deleteWishListService(id);
      showAlert("Product removed from your wish list.", "success");
    } catch (error) {}
  };

  return (
    <Drawer anchor={anchor} open={open} onClose={toggleDrawer}>
      <div className="row" style={{ padding: "20px" }}>
        <div className="col-md-12 table-responsive">
          <p>
            <strong>Your Wish List</strong>
          </p>

          <table className="book_info_tbl">
            {data.map((product) => {
              return (
                <tr key={product.id}>
                  <td
                    onClick={() => history.push(`/products/${product.id}`)}
                    style={{ width: "300px" }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        className="cart_book_img"
                        src={product.image_url || "/images/cartbook1.png"}
                      />
                      <span className="cart_book_name">
                        {product.book_name}
                      </span>
                    </div>
                  </td>
                  <td style={{ textAlign: "center", width: "80px" }}>
                    <a
                      onClick={() => deleteWishList(product.id)}
                      className="remove_from_cart"
                      style={{ fontSize: "15px", cursor: "pointer" }}
                    >
                      {deleteIconSVG}
                    </a>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </Drawer>
  );
};
