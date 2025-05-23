/* eslint-disable @typescript-eslint/naming-convention */
import type { CodegenConfig } from '@graphql-codegen/cli';

const scalars = {
  Decimal: 'BigNumber',
  Boolean: 'boolean',
  BigDecimal: 'BigNumber',
  DateTime: 'Date',
  NaiveDateTime: 'string',
  Upload: 'File',
  JSON: 'string',
};

const config: CodegenConfig = {
  overwrite: true,
  schema: 'schema.graphql',
  documents: ['src/core/api/gql/**/*.ts', '!**/*.generated.ts'],
  generates: {
    'src/core/api/schema.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        {
          add: {
            content: "import BigNumber from 'bignumber.js'",
          },
        },
      ],
      config: {
        strictScalars: true,
        scalars,
      },
    },
    'src/core/api': {
      config: {
        strictScalars: true,
        scalars,
      },
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'schema.ts',
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        {
          add: {
            content: `/* eslint-disable */
        // @ts-ignore
        import BigNumber from 'bignumber.js'`,
          },
        },
      ],
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
