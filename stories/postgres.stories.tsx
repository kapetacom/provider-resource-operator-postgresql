import React from 'react';

import '@kapeta/ui-web-components/styles/index.less';
import PostgreSQLEditorComponent from "../src/web/PostgreSQLEditorComponent";
import {FormContainer} from "@kapeta/ui-web-components";
import {Resource} from "@kapeta/schemas";

const RESOURCE_KIND = 'kapeta/resource-type-postgresql';

const PGResource:Resource = {
  kind: RESOURCE_KIND,
  metadata: {
    name: 'MyPostgresDB'
  },
  spec: {
    port: {
      type: 'postgres'
    }
  }
};

export default {
  title: 'PostgreSQL'
};


export const Editor = () => {
  return <FormContainer initialValue={PGResource}>
    <PostgreSQLEditorComponent />
  </FormContainer>
};