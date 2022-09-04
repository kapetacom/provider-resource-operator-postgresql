import React,{ChangeEvent, Component} from "react";
import _ from "lodash";

import {SingleLineInput} from "@blockware/ui-web-components";

import {
    ResourceMetadata,
    ResourceConfigProps,
} from "@blockware/ui-web-types";

function validateDatabaseName(fieldName:string, name:string) {
    if (!/^[a-z]([a-z0-9_-]*[a-z0-9_])?$/i.test(name)) {
        throw new Error('Invalid database name');
    }
}

class PostgreSQLEditorComponent extends Component<ResourceConfigProps<ResourceMetadata>> {


    private handleMetaDataChanged(name:string, value:string) {
        const metadata = _.clone(this.props.metadata);
        metadata[name] = value.trim();
        this.props.onDataChanged(metadata);
    }

    render() {

        return (
            <SingleLineInput
                name={"name"}
                value={this.props.metadata.name}
                label={"Name"}
                validation={['required', validateDatabaseName]}
                help={"Name your database"}
                onChange={(name: string, input: string) => this.handleMetaDataChanged(name, input)}
            />
        )
    }
}

export default PostgreSQLEditorComponent;