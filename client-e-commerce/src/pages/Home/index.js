import React, { useEffect } from "react";
import { LayoutSidebar, Pagination, Pill, SideNav } from "upkit";
import { CardProduct, InputText, Responsive } from "upkit/dist";
import TopBar from "../../components/TopBar";
import menus from "./menus";
import { BounceLoader } from "react-spinners";
import { tags } from "./tags";
import Cart from "../../components/Cart";
import {
  fetchProducts,
  goToNextPage,
  goToPrevPage,
  setCategory,
  setKeyword,
  setPage,
  toggleTag,
} from "../../app/features/Product/actions";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../config";
import { addItem, removeItem } from "../../app/features/Cart/actions";
import { capitalizeFirst } from "../../app/utils";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [
    dispatch,
    products.currentPage,
    products.keyword,
    products.category,
    products.tags,
  ]);

  return (
    <div>
      <LayoutSidebar
        sidebar={
          <SideNav
            items={menus}
            verticalAlign="middle"
            onChange={(category) => dispatch(setCategory(category))}
            active={products.category}
          />
        }
        content={
          <div className="md:flex md:flex-row-reverse w-full mr-20 h-full min-h-screen">
            <div className="w-full md:w-3/4 pl-5 pb-10">
              <TopBar />

              <div className="w-full text-left mb-3 mt-7">
                <InputText
                  fullRound
                  value={products.keyword}
                  placeholder="Cari makanan kesukaanmu..."
                  fitContainer
                  onChange={(e) => dispatch(setKeyword(e.target.value))}
                />
              </div>

              <div className="mb-5 pl-2 flex w-3/3 overflow-auto pb-5">
                {tags[products.category].map((tag, index) => {
                  return (
                    <div key={index}>
                      <Pill
                        text={capitalizeFirst(tag)}
                        icon={tag.slice(0, 1).toUpperCase()}
                        isActive={products.tags.includes(tag)}
                        onClick={() => dispatch(toggleTag(tag))}
                      />
                    </div>
                  );
                })}
              </div>
              {products.status === "process" ? (
                <div className="flex justify-center">
                  <BounceLoader color="blue" />
                </div>
              ) : (
                <div>
                  <Responsive desktop={3} items="stretch">
                    {products.data.length > 0 &&
                      products.data.map((product) => {
                        return (
                          <div className="p-4" key={1}>
                            <CardProduct
                              title={product.name}
                              subText={capitalizeFirst([product.tags.name])}
                              imgUrl={`${config.api_host}/images/products/${product.image_url}`}
                              price={product.price}
                              onAddToCart={() => dispatch(addItem(product))}
                              style={{ width: "80px", height: "80px" }}
                            />
                          </div>
                        );
                      })}
                  </Responsive>
                  <div className="text-center my-5">
                    <Pagination
                      totalItems={products.totalItems}
                      page={products.currentPage}
                      perPage={products.perPage}
                      onChange={(page) => dispatch(setPage(page))}
                      onNext={() => dispatch(goToNextPage())}
                      onPrev={() => dispatch(goToPrevPage())}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/5 h-full shadow-lg border-r border-blue bg-yellow-150">
              <Cart
                items={cart}
                onItemInc={(item) => dispatch(addItem(item))}
                onItemDec={(item) => dispatch(removeItem(item))}
                onCheckout={() => navigate("checkout")}
              />
            </div>
          </div>
        }
        sidebarSize={75}
      />
    </div>
  );
}
