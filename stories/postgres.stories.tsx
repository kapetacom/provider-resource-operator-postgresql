/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import '@kapeta/ui-web-components/styles/index.less';
import {FormContainer} from "@kapeta/ui-web-components";
import {Resource} from "@kapeta/schemas";
import PostgreSQLEditorComponent from "../src/web/PostgreSQLEditorComponent";

const RESOURCE_KIND = 'kapeta/resource-type-postgresql';

const PGResource:Resource = {
  kind: RESOURCE_KIND,
  metadata: {
    name: 'MyPostgresDB'
  },
  spec: {
    port: {
      type: 'postgres'
    },
    source: {
      type: 'kaplang',
      version: '1.17.0',
      value: "type Entry {\n   @Id\n   id: string\n   name: string\n}\n",
    },
    models: []
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
