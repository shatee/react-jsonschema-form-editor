import { JSONSchema7 } from 'json-schema';
import { FormData } from './Editor';

export const toJSON = (data: FormData): JSONSchema7 => {
  const converted: JSONSchema7 = { title: data.title, type: 'object' };
  if ('description' in data) {
    converted.description = data.description;
  }
  if ('fields' in data) {
    converted.properties = data.fields.reduce<Record<string, JSONSchema7>>(
      (properties, current) => {
        if (current.title === undefined) {
          return properties;
        }
        properties[current.title] = current;
        return {
          ...properties,
          [current.title]: current,
        };
      },
      {},
    );
  }
  return converted;
};

export const fromJSON = (data: JSONSchema7): FormData => {
  const converted: FormData = {
    fields: [],
  };

  if ('title' in data) {
    converted.title = data.title;
  }
  if ('description' in data) {
    converted.description = data.description;
  }
  if (data.properties) {
    converted.fields = Object.values(data.properties) as JSONSchema7[];
  }

  return converted;
};
