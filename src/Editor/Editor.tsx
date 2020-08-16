import React, { useCallback } from 'react';
import Form, { IChangeEvent } from '@rjsf/core';
import { schema, uiSchema } from './schema';
import { css } from '@emotion/core';
import { JSONSchema7 } from 'json-schema';
import { toJSON } from './convert';

export type FormData = {
  title?: string;
  description?: string;
  fields: JSONSchema7[];
};

type Props = {
  data: FormData;
  onChange: (data: FormData, schema: JSONSchema7) => void;
};

export const Editor = (props: Props) => {
  const onChange = useCallback((e: IChangeEvent) => {
    props.onChange(e.formData, toJSON(e.formData));
  }, []);

  return (
    <section
      css={css`
        padding: 8px;
        overflow-y: auto;
        overflow-x: hidden;
      `}
    >
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={props.data}
        onChange={onChange}
      />
    </section>
  );
};
