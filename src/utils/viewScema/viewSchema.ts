import { SdkViewSchema } from '@appknit-io/common-frameworks';
export const viewSchema: SdkViewSchema = {
  schema: {
    autofocus: false,
    disabled: false,
    errorSchema: null,
    formData: null,
    idSchema: null,
    onBlur: () => {
      null;
    },
    onChange: () => {
      null;
    },
    onFocus: () => {
      null;
    },
    rawErrors: [],
    readonly: false,
    required: false,
    schema: null,
    uiSchema: {
      schema: {
        'ui:layout': [
          {
            id: 'calculableAttribute',
            title: 'Calculable Attribute',
            children: [['calculableAttribute']],
          },
          {
            id: 'nodeSettings',
            title: 'Node Settings',
            children: [['nodeSettings']],
          },
        ],
      },
    },
  },
};
