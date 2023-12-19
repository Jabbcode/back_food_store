import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/modules/categories/schemas/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  cantidad: number;

  @Prop()
  fecha: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categories: Category[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
