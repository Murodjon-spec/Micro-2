import { HydratedDocument } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop()
    id: number;

    @Prop()
    title: string;

    @Prop()
    image: string;

    @Prop()
    likes: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
