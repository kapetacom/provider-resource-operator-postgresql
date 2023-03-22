import PostgreSQLEditorComponent from './PostgreSQLEditorComponent';

import {
    ResourceConfig,
    ResourceMetadata,
    ResourceRole,
    ResourceType
} from '@kapeta/ui-web-types';

const definition = require('../../kapeta.yml');
const packageJson = require('../../package.json');

const config: ResourceConfig<ResourceMetadata> = {
    kind: definition.metadata.name,
    version: packageJson.version,
    title: definition.metadata.title,
    role: ResourceRole.CONSUMES,
    type: ResourceType.DATABASE,
    componentType: PostgreSQLEditorComponent
};

export default config;
