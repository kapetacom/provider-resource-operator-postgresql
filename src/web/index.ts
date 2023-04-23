import PostgreSQLEditorComponent from './PostgreSQLEditorComponent';

import {
    IResourceTypeProvider,
    ResourceRole,
    ResourceProviderType
} from '@kapeta/ui-web-types';
import {Metadata} from "@kapeta/schemas";

const definition = require('../../kapeta.yml');
const packageJson = require('../../package.json');

const resourceTypeProvider: IResourceTypeProvider<Metadata> = {
    kind: definition.metadata.name,
    version: packageJson.version,
    title: definition.metadata.title,
    role: ResourceRole.CONSUMES,
    type: ResourceProviderType.OPERATOR,
    editorComponent: PostgreSQLEditorComponent,
    definition
};

export default resourceTypeProvider;
