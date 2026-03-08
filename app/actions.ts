'use server'

import prisma from "@/lib/prisma";
import { Product } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createProduct(prop: Product) {
    try {
        // console.log("Creating product with data:", prop);
        const createdProduct = await prisma.product.create({
            data: {
                name: prop.name,
                brand: prop.brand,
                category: prop.category,
                price: prop.price,
                quantity: prop.quantity,
                description: prop.description,
            },
        });
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2031"
        ) {
            throw new Error(
                "MongoDB must run as a replica set for Prisma. Start Docker Desktop, run `docker compose up -d`, and retry."
            );
        }

        throw error;
    }finally {
        revalidatePath("/");
    }
}

export async function updateProduct(product: Product) {
    try {
        // console.log(product)
        const updatedProduct = await prisma.product.update({
            where: { id: product.id },
            data: {
                name: product.name,
                brand: product.brand,
                category: product.category,
                price: product.price,
                quantity: product.quantity,
                description: product.description,
            },
        });
        
    }catch (error){
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2031"
        ) {
            throw new Error(
                "MongoDB must run as a replica set for Prisma. Start Docker Desktop, run `docker compose up -d`, and retry."
            );
        }
        throw error;
    }finally{
        revalidatePath("/");
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id },
        });
    }catch (error){
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2031"
        ) {
            throw new Error(
                "MongoDB must run as a replica set for Prisma. Start Docker Desktop, run `docker compose up -d`, and retry."
            );
        }
        throw error;
    }finally {
        revalidatePath("/");
    }
}