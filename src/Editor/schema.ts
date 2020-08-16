import { JSONSchema7 } from 'json-schema';
import { UiSchema } from '@rjsf/core';

type Type = 'number' | 'integer' | 'string' | 'boolean' | 'array' | 'object';

type FieldProperty = {
  title: string;
  type: Type;
};

const createProperty = (
  title: string,
  type: Type,
  addition: Record<string, any> = {},
) => {
  return {
    [title]: {
      title,
      type,
      ...addition,
    },
  };
};

type FieldSchema = {
  properties:
    | Record<string, FieldProperty>
    | Record<'type', Record<'enum', [string]>>;
  required?: string[];
};

const stringSchema: JSONSchema7 = {
  properties: {
    type: {
      enum: ['string'],
    },
    ...createProperty('pattern', 'string', {
      format: 'regex',
    }),
    ...createProperty('format', 'string', {
      enum: [
        'text',
        'date',
        'date-time',
        'uri',
        'email',
        'hostname',
        'ipv4',
        'ipv6',
        'regex',
      ],
    }),
    ...createProperty('enum', 'array', {
      items: {
        type: 'string',
      },
    }),
  },
  if: {
    properties: {
      format: {
        minLength: 1
      }
    }
  },
  then: {
    properties: {
      ...createProperty('maxLength', 'integer'),
    },
    required: [
      'pattern'
    ]
  },
  else: {
    properties: {
      ...createProperty('maxLength', 'integer'),
      ...createProperty('minLength', 'integer'),
    },
    required: []
  },
  dependencies: {
    format: {
      oneOf: [
        {
          properties: {
            format: {
              not: {
                type: 'string'
              }
            },
            ...createProperty('maxLength', 'integer'),
            ...createProperty('minLength', 'integer'),
          },
        },
      ],
    },
  },
};

const numberSchema: FieldSchema = {
  properties: {
    type: {
      enum: ['number'],
    },
    ...createProperty('maximum', 'number'),
    ...createProperty('exclusiveMaximum', 'boolean'),
    ...createProperty('minimum', 'number'),
    ...createProperty('exclusiveMinimum', 'boolean'),
  },
};

const integerSchema: FieldSchema = {
  properties: {
    type: {
      enum: ['integer'],
    },
    ...createProperty('maximum', 'integer'),
    ...createProperty('exclusiveMaximum', 'boolean'),
    ...createProperty('minimum', 'integer'),
    ...createProperty('exclusiveMinimum', 'boolean'),
  },
};

const booleanSchema: FieldSchema = {
  properties: {
    type: {
      enum: ['boolean'],
    },
  },
};

const nullSchema: FieldSchema = {
  properties: {
    type: {
      enum: ['null'],
    },
  },
};

export const schema: JSONSchema7 = {
  title: 'Form Editor',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: 'title',
    },
    description: {
      type: 'string',
      title: 'description',
    },
    fields: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ...createProperty('title', 'string'),
          ...createProperty('description', 'string'),
          ...createProperty('required', 'boolean'),
          ...createProperty('type', 'string', {
            enum: ['string', 'number', 'integer', 'boolean', 'null'],
          }),
        },
        required: ['title', 'type'],
        dependencies: {
          type: {
            oneOf: [
              nullSchema,
              stringSchema,
              numberSchema,
              integerSchema,
              booleanSchema,
            ],
          },
        },
      },
    },
  },
  required: ['title'],
};

export const uiSchema: UiSchema = {
  description: {
    'ui:widget': 'textarea',
  },
  fields: {
    items: {
      description: {
        'ui:widget': 'textarea',
      },
    },
  },
};

console.log(JSON.stringify(schema, undefined, '  '));
