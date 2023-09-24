import React from "react";
import PropTypes from "prop-types";
import { Button, CardItem, Text } from "upkit";
import { FaArrowRight, FaCartPlus } from "@meronex/icons/fa";
import { config } from "../../config";
import { rupiahFormat, totalPrice } from "../../app/utils";

function Cart({ items, onItemInc, onItemDec, onCheckout }) {
  return (
    <div>
      <div className="px-1 border-b mt-8 pb-2">
        <div className="text-3xl flex items-center text-blue-900">
          <FaCartPlus />
          <div className="ml-4">Keranjang</div>
        </div>

        <Text as="h5">Total: {rupiahFormat(totalPrice(items))}</Text>
        <Button
          text="Checkout"
          fitContainer
          iconAfter={<FaArrowRight />}
          disabled={false}
          onClick={onCheckout}
        />
      </div>
      {!(items.length > 0) ? (
        <div className="text-center text-sm text-blue-900">
          {" "}
          Keranjang masih kosong{" "}
        </div>
      ) : (
        <div className="p-2">
          {items.map((item, i) => {
            return (
              <div className="mb-2" key={i}>
                <CardItem
                  imgUrl={`${config.api_host}/images/products/${item.image_url}`}
                  name={item.name}
                  qty={item.qty}
                  color="green"
                  onInc={() => onItemInc(item)}
                  onDec={() => onItemDec(item)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

Cart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
  onItemInc: PropTypes.func,
  onItemDec: PropTypes.func,
  onCheckout: PropTypes.func,
};

export default Cart;
