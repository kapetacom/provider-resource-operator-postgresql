import React from 'react';
import {
  ResourceKind,
  BlockWrapper
} from '@blockware/ui-web-types';

import '@blockware/ui-web-components/styles/index.less';
import PostgreSQLEditorComponent from "../src/web/PostgreSQLEditorComponent";

const RESOURCE_KIND = 'sqldb.blockware.com/v1/PostgreSQL';

const block:BlockWrapper<any> = {
  addEntity: entity => {

  },
  getData: () => {
    return {};
  },
  setData: () => {

  },
  getEntityNames: () => ['entity1', 'entity2']
};

const PGResource:ResourceKind<any> = {
  kind: RESOURCE_KIND,
  metadata: {
    name: 'MyPostgresDB'
  },
  spec: {}
};

export default {
  title: 'PostgreSQL'
};

export const Editor = () => <PostgreSQLEditorComponent {...PGResource} block={block} />;