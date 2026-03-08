'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { brands, categories } from "@/lib/constants"
import { Product } from "@/lib/types"
import { updateProduct } from "@/app/actions"



export default function UpdateProd(prop : { product: Product }) {
    const [isOpen, setIsOpen] = useState(false);
    const [brand, setBrand] = useState<string>(prop.product.brand);
    const [customBrand, setCustomBrand] = useState<string>(prop.product.brand);
    const [productCategory, setProductCategory] = useState<string>(prop.product.category);
    const [customCategory, setCustomCategory] = useState<string>(prop.product.category);
    const [productName, setProductName] = useState<string>(prop.product.name);
    const [productDescription, setProductDescription] = useState<string>(prop.product.description);
    const [productPrice, setProductPrice] = useState<string>(prop.product.price.toString());
    const [productQuantity, setProductQuantity] = useState<string>(prop.product.quantity.toString());

    useEffect(() => {
        setBrand(prop.product.brand);
        setCustomBrand(prop.product.brand);
        setProductCategory(prop.product.category);
        setCustomCategory(prop.product.category);
        setProductName(prop.product.name);
        setProductDescription(prop.product.description);
        setProductPrice(prop.product.price.toString());
        setProductQuantity(prop.product.quantity.toString());
    }, [prop.product]);
    
    async function updateProductHandler() {
            const data : Product = {
                id: prop.product.id,
                name: productName,
                category: productCategory === "Other.." ? customCategory : productCategory,
                brand: brand === "Other.." ? customBrand : brand,
                price: parseFloat(productPrice) || 0,
                quantity: parseInt(productQuantity) || 0,
                description: productDescription,
            }
            try {
                setIsOpen(false);
                await updateProduct(data);
            }catch (error) {
                console.error("Error updating product:", error);
            }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                            Make changes to your product here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="w-full mx-auto">
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                type="text"
                                className="shadow"
                                placeholder="Product Name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="brand">Brand</FieldLabel>
                            <Select value={brands.hasOwnProperty(brand.toLocaleLowerCase()) ? brand : "Other.."} onValueChange={setBrand}>
                                <SelectTrigger className="shadow" >
                                    <SelectValue placeholder="Select a brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(brands).map(([value, label]) => (
                                        <SelectItem key={value} value={label}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* Show input field only when "Other.." is selected */}
                            {!brands.hasOwnProperty(brand.toLocaleLowerCase()) && (
                                <Input
                                    id="custom-brand"
                                    type="text"
                                    placeholder="Enter brand name"
                                    className="shadow mt-2"
                                    value={customBrand}
                                    onChange={(e) => setCustomBrand(e.target.value)}
                                />
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="category">Category</FieldLabel>
                            <Select value={categories.hasOwnProperty(productCategory.toLocaleLowerCase()) ? productCategory : "Other.."} onValueChange={setProductCategory}>
                                <SelectTrigger className="shadow" >
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(categories).map(([value, label]) => (
                                        <SelectItem key={value} value={label}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* Show input field only when "Other.." is selected */}
                            {!categories.hasOwnProperty(productCategory.toLocaleLowerCase()) && (
                                <Input
                                    id="custom-category"
                                    type="text"
                                    placeholder="Enter Category Name"
                                    value={customCategory}
                                    onChange={(e) => setCustomCategory(e.target.value)}
                                    className="mt-2 shadow"
                                />
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="price">Price</FieldLabel>
                            <Input
                                id="price"
                                type="number"
                                placeholder="0.00"
                                className="shadow"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                            <Input
                                id="quantity"
                                type="number"
                                placeholder="0"
                                className="shadow"
                                value={productQuantity}
                                onChange={(e) => setProductQuantity(e.target.value)}
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="description">Product Description</FieldLabel>
                            <Textarea
                                id="description"
                                placeholder="Enter Product Description"
                                className="shadow"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                required
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={updateProductHandler}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}