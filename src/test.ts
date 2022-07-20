const configCodes =  [
    {
        "CONFIG_CODE": "VBT_CODE",
        "createdAt": "2022-06-30T21:59:51.213Z",
        "CONFIG_CODE_STRING_VALUE": "VENDOR BILLED TAX2",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "BLOCK_OM_TAX_CALC",
        "createdAt": "2022-06-30T21:59:40.945Z",
        "CONFIG_CODE_STRING_VALUE": "N",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "BLOCK_AP_SELF_ASSESS_RESP",
        "createdAt": "2022-06-30T21:59:40.146Z",
        "CONFIG_CODE_STRING_VALUE": "N",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "RETURN_LEGACY_TAX_ROW",
        "createdAt": "2022-06-30T21:59:48.848Z",
        "CONFIG_CODE_STRING_VALUE": "Y",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "IND_AR_SEND_IGST_FOR_SEZ_HSS",
        "createdAt": "2022-06-30T21:59:45.717Z",
        "CONFIG_CODE_STRING_VALUE": "Y",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "AP_SELF_ASSESS_TAX",
        "createdAt": "2022-06-30T21:59:39.361Z",
        "CONFIG_CODE_STRING_VALUE": "Y",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "VBT_STATUS_CODE",
        "createdAt": "2022-06-30T21:59:52.786Z",
        "CONFIG_CODE_STRING_VALUE": "STANDARD",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "LOG_XML_PAYLOAD",
        "createdAt": "2022-06-30T21:59:46.505Z",
        "CONFIG_CODE_STRING_VALUE": "Y",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "REPORT_STAGING_DIR",
        "createdAt": "2022-06-30T21:59:48.056Z",
        "CONFIG_CODE_STRING_VALUE": "Custom/Avalara",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "PROCESS_US_TO_CA_TAXES",
        "createdAt": "2022-06-30T21:59:47.275Z",
        "CONFIG_CODE_STRING_VALUE": "N",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "USE_GL_ACCOUNT_STRING",
        "createdAt": "2022-06-30T21:59:50.427Z",
        "CONFIG_CODE_STRING_VALUE": "N",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "CUSTOM_DUTY_TAX",
        "createdAt": "2022-06-30T21:59:44.110Z",
        "CONFIG_CODE_STRING_VALUE": "Y",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "BULK_FETCH_ADDITIONAL_DATA",
        "createdAt": "2022-06-30T21:59:42.530Z",
        "CONFIG_CODE_STRING_VALUE": "N",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "SEND_SHIP_FROM_AS_POA",
        "createdAt": "2022-06-30T21:59:49.631Z",
        "CONFIG_CODE_STRING_VALUE": "N",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "VBT_RATE_CODE",
        "createdAt": "2022-06-30T21:59:51.994Z",
        "CONFIG_CODE_STRING_VALUE": "VENDOR BILLED RATE2",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "BLOCK_PO_TAX_CALC",
        "createdAt": "2022-06-30T21:59:41.732Z",
        "CONFIG_CODE_STRING_VALUE": "N",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "EXEMPTION_CONTROL_FLAG",
        "createdAt": "2022-06-30T21:59:44.912Z",
        "CONFIG_CODE_STRING_VALUE": "N",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    },
    {
        "CONFIG_CODE": "CORRECT_VBT_FOR_OC",
        "createdAt": "2022-06-30T21:59:43.320Z",
        "CONFIG_CODE_STRING_VALUE": "Y",
        "createdBy": "64iJ1vZXFkzqGtWAmKdyd2"
    }
]

import extension from './index'

extension.expressionFunctions.getConfigurationCodeValue.js({calculableFramework:null, calculableContext:null, runningContext: null, functionArguments:['SEND_SHIP_FROM_AS_POA', configCodes]}).then(result=>console.log(result))