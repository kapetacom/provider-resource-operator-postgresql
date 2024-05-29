/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import * as React from "react";
import {ResourceTypeProviderEditorProps} from "@kapeta/ui-web-types";
import {
    FormField,
    InfoBox,
    ModelEditor,
    useFormContextField,
    useIsFormSubmitAttempted
} from "@kapeta/ui-web-components";
import {Alert, Stack} from "@mui/material";
import {SourceCode} from "@kapeta/schemas";
import {KAPLANG_ID, KAPLANG_VERSION, DSLConverters, DSLModel} from "@kapeta/kaplang-core";

function validateDatabaseName(fieldName: string, name: string) {
    if (!/^[a-z]([a-z0-9_-]*[a-z0-9_])?$/i.test(name)) {
        throw new Error('Invalid database name');
    }
}

const PostgreSQLEditorComponent = (props: ResourceTypeProviderEditorProps) => {
    const modelsField = useFormContextField('spec.models');
    const modelsSource = useFormContextField<SourceCode>('spec.source');
    const [modelsError, setModelsError] = React.useState<string | null>(null);
    const formSubmitAttempted = useIsFormSubmitAttempted();

    const setResult = (code: string, models: DSLModel[]) => {
        try {
            modelsField.set(models.map(m => DSLConverters.toSchemaModel(m, models)));
            modelsSource.set({type: KAPLANG_ID, version: KAPLANG_VERSION, value: code});
        } catch (e) {
            console.error('Failed to trigger change', e);
        }
    };

    const source = modelsSource.get({type: KAPLANG_ID, version: KAPLANG_VERSION, value: ''});
    const models = DSLConverters.fromSchemaEntity(modelsField.get({}));

    return (
        <Stack sx={{height: '100%'}}>
            <FormField
                name={"metadata.name"}
                label={"Name"}
                validation={['required', validateDatabaseName]}
                help={"Name your database"}
            />
            <Stack
                sx={{
                    height: '100%',
                    '.dsl-editor': {
                        boxSizing: 'border-box',
                    },
                }}
                className={'editor'}
            >
                <InfoBox>
                    The models represent your database schema. You can define tables, columns and the primary keys.
                    To further refine with constraints, indexes, etc., you should modify the generated code.
                </InfoBox>
                <ModelEditor
                    validTypes={[]}
                    onError={(err: any) => {
                        modelsSource.invalid();
                        console.log("err", err.message);
                        setModelsError(err.message);
                    }}
                    value={{
                        code: source.value,
                        entities: models,
                    }}
                    onChange={(result: any) => {
                        modelsSource.valid();
                        console.log("result", result.code, result.entities);
                        setResult(result.code, result.entities as DSLModel[]);
                    }}
                />
                {modelsError && formSubmitAttempted && (
                    <Alert sx={{ mt: 1 }} severity={'error'}>
                        {modelsError}
                    </Alert>
                )}
            </Stack>
        </Stack>
    )
}

export default PostgreSQLEditorComponent;