import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from 'src/modules/products/schemas/product.schema';

@Schema()
export class Store {
  @Prop({ required: true })
  fechaModificacion: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export type StoreDocument = Store & Document;
export const StoreSchema = SchemaFactory.createForClass(Store);
