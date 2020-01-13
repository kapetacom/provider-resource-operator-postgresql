import PostgreSQLEditorComponent from './PostgreSQLEditorComponent';

import {
    ResourceConfig,
    ResourceMetadata,
    ResourceRole,
    ResourceType
} from '@blockware/ui-web-types';

const definition = require('../../blockware.yml');

const config: ResourceConfig<ResourceMetadata> = {
    kind: definition.metadata.id,
    name: definition.metadata.name,
    role: ResourceRole.CONSUMES,
    type: ResourceType.DATABASE,
    componentType: PostgreSQLEditorComponent
};

export default config;