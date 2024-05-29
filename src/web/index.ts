/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import PostgreSQLEditorComponent from './PostgreSQLEditorComponent';

import {IResourceTypeProvider, ResourceRole, ResourceProviderType} from '@kapeta/ui-web-types';
import {Metadata} from "@kapeta/schemas";
import {DSLData} from "@kapeta/kaplang-core";

const definition = require('../../kapeta.yml').default;
const packageJson = require('../../package.json');

export interface PostgresSpec {
    port: {
        type: 'postgres';
    };
}

const resourceTypeProvider: IResourceTypeProvider<Metadata, PostgresSpec, DSLData> = {
    kind: definition.metadata.name,
    version: packageJson.version,
    title: definition.metadata.title,
    role: ResourceRole.CONSUMES,
    type: ResourceProviderType.OPERATOR,
    editorComponent: PostgreSQLEditorComponent,
    definition
};

export default resourceTypeProvider;
