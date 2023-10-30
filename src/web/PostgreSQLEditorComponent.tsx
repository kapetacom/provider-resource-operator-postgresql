/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import React from "react";

import {FormField} from "@kapeta/ui-web-components";

function validateDatabaseName(fieldName:string, name:string) {
    if (!/^[a-z]([a-z0-9_-]*[a-z0-9_])?$/i.test(name)) {
        throw new Error('Invalid database name');
    }
}

const PostgreSQLEditorComponent = () => {

    return (
        <FormField
            name={"metadata.name"}
            label={"Name"}
            validation={['required', validateDatabaseName]}
            help={"Name your database"}
        />
    )
}

export default PostgreSQLEditorComponent;