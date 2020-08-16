import { JSONSchema7 } from 'json-schema';
import { FormData } from './Editor';
export declare const toJSON: (data: FormData) => JSONSchema7;
export declare const fromJSON: (data: JSONSchema7) => FormData;
