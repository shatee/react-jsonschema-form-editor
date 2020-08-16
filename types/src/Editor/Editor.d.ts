/// <reference types="react" />
import { JSONSchema7 } from 'json-schema';
export declare type FormData = {
    title?: string;
    description?: string;
    fields: JSONSchema7[];
};
declare type Props = {
    data: FormData;
    onChange: (data: FormData, schema: JSONSchema7) => void;
};
export declare const Editor: (props: Props) => JSX.Element;
export {};
