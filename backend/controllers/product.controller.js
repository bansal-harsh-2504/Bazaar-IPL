import Product from "../models/product.model.js";

export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      success: true,
      message: "All products fetched successfully",
      products,
    });
  } catch (error) {
    console.log("Error in Listing Product Conltroller : ", error.message);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    res.json({
      success: true,
      message: "Product info fetched successfully",
      product,
    });
  } catch (error) {
    console.log(
      "Error in Fetching single product Conltroller : ",
      error.message
    );
    res.json({ success: false, message: "Internal Server Error" });
  }
};
