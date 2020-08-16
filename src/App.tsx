import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Editor } from './Editor';
import { Preview } from './Preview';
import { css } from '@emotion/core';
import { JSONSchema7 } from 'json-schema';

type Data = any;

type Props = {
  data: Data;
};

const AppComponent = (props: Props) => {
  const [data, setData] = useState(props.data);
  const [schema, setSchema] = useState<JSONSchema7>({});

  const onChange = useCallback((data: Data, schema: JSONSchema7) => {
    setData(data);
    setSchema(schema);
  }, []);

  return (
    <section
      css={css`
        display: flex;
        height: calc(100vh - 120px);
        > * {
          flex: 1 0 1px;
          border: 1px solid #ddd;
          & + * {
            margin-left: 4px;
          }
        }
      `}
    >
      <Editor data={data} onChange={onChange} />
      <Preview schema={schema} />
    </section>
  );
};

export class App {
  constructor(private target: Element, private data: Data = {}) {}

  public execute() {
    ReactDOM.render(<AppComponent data={this.data} />, this.target);
  }
}
