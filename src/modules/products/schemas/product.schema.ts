import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
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

  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Category' }] })
  categories: Category[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
