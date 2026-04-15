import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { fetchProductById, postProduct, editProduct, isLoading, error } =
    useProductStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        const product = await fetchProductById(Number(id));
        if (product) {
          setFormData({
            title: product.title,
            description: product.description,
            price: product.price.toString(),
            stock: product.stock.toString(),
          });
        }
      };
      fetchProduct();
    }
  }, [id, isEdit, fetchProductById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: "",
      description: "",
      price: "",
      stock: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Product name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = "Stock must be 0 or greater";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    const productData = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      tags: [],
    };

    let success = false;

    if (isEdit) {
      const result = await editProduct(Number(id), productData);
      success = !!result;
    } else {
      const result = await postProduct(productData);
      success = !!result;
    }

    if (success) {
      navigate("/products");
    }
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/products")}
        className="cursor-pointer"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{isEdit ? "Edit Product" : "Create Product"}</CardTitle>
          <CardDescription>
            {isEdit
              ? "Update the product details below"
              : "Fill in the details to create a new product"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Product Name</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (errors.title) {
                    setErrors({ ...errors, title: "" });
                  }
                }}
                placeholder="Enter product name"
                className={
                  errors.title
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
                disabled={isLoading}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) {
                    setErrors({ ...errors, description: "" });
                  }
                }}
                placeholder="Enter product description"
                rows={4}
                className={
                  errors.description
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
                disabled={isLoading}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => {
                    setFormData({ ...formData, price: e.target.value });
                    if (errors.price) {
                      setErrors({ ...errors, price: "" });
                    }
                  }}
                  placeholder="0.00"
                  className={
                    errors.price
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  disabled={isLoading}
                />
                {errors.price && (
                  <p className="text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => {
                    setFormData({ ...formData, stock: e.target.value });
                    if (errors.stock) {
                      setErrors({ ...errors, stock: "" });
                    }
                  }}
                  placeholder="0"
                  className={
                    errors.stock
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  disabled={isLoading}
                />
                {errors.stock && (
                  <p className="text-sm text-red-600">{errors.stock}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEdit ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{isEdit ? "Update Product" : "Create Product"}</>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/products")}
                disabled={isLoading}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
