import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/modules/products/schemas/product.schema';

export type StoreDocument = HydratedDocument<Store>;

@Schema()
export class Store {
  @Prop({ required: true })
  fechaModificacion: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
