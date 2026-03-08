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
import { useState, useEffect } from "react"
import { Product } from "@/lib/types"



export default function DetailProd(prop : { product: Product }) {
    const [isOpen, setIsOpen] = useState(false);
    const [brand, setBrand] = useState<string>(prop.product.brand);
    const [productCategory, setProductCategory] = useState<string>(prop.product.category);
    const [productName, setProductName] = useState<string>(prop.product.name);
    const [productDescription, setProductDescription] = useState<string>(prop.product.description);
    const [productPrice, setProductPrice] = useState<string>(prop.product.price.toString());
    const [productQuantity, setProductQuantity] = useState<string>(prop.product.quantity.toString());

    useEffect(() => {
        setBrand(prop.product.brand);
        setProductCategory(prop.product.category);
        setProductName(prop.product.name);
        setProductDescription(prop.product.description);
        setProductPrice(prop.product.price.toString());
        setProductQuantity(prop.product.quantity.toString());
    }, [prop.product]);

    function submitHandler(){
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant={null}>{productName}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg sm:max-h-lg scale-130">
                    <DialogHeader>
                        <DialogTitle>{productName}</DialogTitle>
                        <DialogDescription>
                            <strong>Brand:</strong> {brand} <br />
                            <strong>Category:</strong> {productCategory} <br />
                            <strong>Price:</strong> ${productPrice} <br />
                            <strong>Quantity:</strong> {productQuantity} <br />
                            <strong>Description:</strong> {productDescription}
                        </DialogDescription>
                    </DialogHeader>
                    
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={submitHandler}>
                            Done
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}