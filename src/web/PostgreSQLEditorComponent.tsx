/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import React, {useMemo} from "react";

import {
    DSLConverters, DSLData,
    DSLDataType, DSLDataTypeParser, DSLTypeHelper,
    FormField,
    InfoBox, KAPLANG_ID, KAPLANG_VERSION,
    ModelEditor,
    useFormContextField,
    useIsFormSubmitAttempted
} from "@kapeta/ui-web-components";
import {Alert, Stack} from "@mui/material";
import { SourceCode } from "@kapeta/schemas";
import {IncludeContextType, ResourceTypeProviderEditorProps} from "@kapeta/ui-web-types";

function validateDatabaseName(fieldName:string, name:string) {
    if (!/^[a-z]([a-z0-9_-]*[a-z0-9_])?$/i.test(name)) {
        throw new Error('Invalid database name');
    }
}


const typeNameMapper = (e:DSLData) => {
    return DSLTypeHelper.asFullName(e, true);
};

const PostgreSQLEditorComponent = (props: ResourceTypeProviderEditorProps) => {

    const modelsField = useFormContextField('spec.models');
    const modelsSource = useFormContextField<SourceCode>('spec.source');
    const [modelsError, setModelsError] = React.useState<string | null>(null);
    const formSubmitAttempted = useIsFormSubmitAttempted();

    const setResult = (code: string, models: DSLDataType[]) => {
        try {
            modelsField.set(models.map(m => DSLConverters.toSchemaEntity(m, models)));
            modelsSource.set({ type: KAPLANG_ID, version: KAPLANG_VERSION, value: code });
        } catch (e) {
            console.error('Failed to trigger change', e);
        }
    };

    const validTypes = useMemo(() => {
        let includeTypes:string[] = [];
        if (props.context?.languageProvider && props.context?.languageProvider.getDSLIncludes) {
            // The language target might provide some additional types
            const include = props.context.languageProvider.getDSLIncludes(IncludeContextType.ENTITIES);
            if (include?.source) {
                try {
                    includeTypes = DSLDataTypeParser.parse(include?.source).map(typeNameMapper);
                } catch (e) {
                    console.error('Failed to parse include types', e);
                }
            }
        }

        if (includeTypes.length > 0) {
            return includeTypes;
        }

        return [];
    }, [props.context?.languageProvider]);

    const source = modelsSource.get({ value: '', type: KAPLANG_ID, version: KAPLANG_VERSION });
    const entities = DSLConverters.fromSchemaMethods(modelsField.get({}));

    return (
        <Stack sx={{ height: '100%' }}>
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
                    validTypes={validTypes}
                    onError={(err: any) => {
                        modelsSource.invalid();
                        setModelsError(err.message);
                    }}
                    value={{
                        code: source.value,
                        entities,
                    }}
                    onChange={(result: any) => {
                        modelsSource.valid();
                        setResult(result.code, result.entities as DSLDataType[]);
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