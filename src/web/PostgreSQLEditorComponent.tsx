import React,{ChangeEvent, Component} from "react";
import _ from "lodash";

import {FormRow} from "@blockware/ui-web-components";

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


    private handleMetaDataChanged(evt:ChangeEvent<HTMLInputElement>) {
        const metadata = _.clone(this.props.metadata);
        metadata[evt.target.name] = evt.target.value.trim();
        this.props.onDataChanged(metadata);
    }

    render() {

        return (
            <FormRow label="Name"
                     help="Name your database"
                     validation={['required', validateDatabaseName]}>

                <input type="text" placeholder="E.g. MyPostgresDB"
                       name="name"
                       autoComplete={"off"}
                       value={this.props.metadata.name}
                       onChange={(evt) => {this.handleMetaDataChanged(evt)}} />

            </FormRow>
        )
    }
}

export default PostgreSQLEditorComponent;