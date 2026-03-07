'use client'

import { createProduct } from "@/app/actions"
import  Form  from "next/form"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

import { Textarea } from "@/components/ui/textarea"

import { Product } from "@/lib/types"

import { brands, categories } from "@/lib/constants"

export default function AddProd() {
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [customBrand, setCustomBrand] = useState<string>("");
    const [productCategory, setProductCategory] = useState<string>("");
    const [customCategory, setCustomCategory] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>("");
    const [productQuantity, setProductQuantity] = useState<string>("");
    
    function clearField(){
        setSelectedBrand("");
        setProductName("");
        setCustomBrand("");
        setProductCategory("");
        setCustomCategory("");
        setProductDescription("");
        setProductPrice("");
        setProductQuantity("");
    }

    async function createProductHandler() {
        const data : Product = {
            name: productName,
            category: productCategory === "Other.." ? customCategory : productCategory,
            brand: selectedBrand === "Other.." ? customBrand : selectedBrand,
            price: parseFloat(productPrice) || 0,
            quantity: parseInt(productQuantity) || 0,
            description: productDescription,
        }
        try {
            await createProduct(data);
        }catch (error) {
            console.error("Error creating product:", error);
        }finally{
            clearField();
        }
    }

    return(
        <div className="mb-6 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center scrollbar-hide">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <form className="w-full mx-auto" action={createProductHandler}>
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
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="shadow">
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
                {selectedBrand === "Other.." && (
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
                <Select value={productCategory} onValueChange={setProductCategory}>
                    <SelectTrigger className="shadow"   >
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
                {productCategory === "Other.." && (
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
                <Field orientation="horizontal">
                <Button type="button" variant="outline" onClick={clearField}>
                    Cancel
                </Button>
                <Button type="submit">Submit</Button>
                </Field>
            </FieldGroup>
            </form>
        </div>
    )
}