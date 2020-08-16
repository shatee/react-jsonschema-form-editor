import React from 'react';
import Form from '@rjsf/core';
import { css } from '@emotion/core';

type Props = {
  schema: any;
};

export const Preview = (props: Props) => {
  console.log(props.schema);
  return (
    <section
      css={css`
        padding: 8px;
        overflow-y: auto;
        overflow-x: hidden;
        .field-description {
          white-space: pre-wrap;
        }
      `}
    >
      <Form schema={props.schema} />
    </section>
  );
};
