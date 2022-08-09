import { AppknitSDK, SdkExecutionError, SdkGenericErrorCodes } from '@appknit-project/appknit-platform-sdk-v2';
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
const customerProfile = {"createdAt":"2022-06-30T21:59:38.579Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_GEO_SOURCE":"AVA","CONFIG_CODES":[{"CONFIG_CODE":"VBT_CODE","createdAt":"2022-06-30T21:59:51.213Z","CONFIG_CODE_STRING_VALUE":"VENDOR BILLED TAX2","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"BLOCK_OM_TAX_CALC","createdAt":"2022-06-30T21:59:40.945Z","CONFIG_CODE_STRING_VALUE":"N","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"BLOCK_AP_SELF_ASSESS_RESP","createdAt":"2022-06-30T21:59:40.146Z","CONFIG_CODE_STRING_VALUE":"N","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"RETURN_LEGACY_TAX_ROW","createdAt":"2022-06-30T21:59:48.848Z","CONFIG_CODE_STRING_VALUE":"Y","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"IND_AR_SEND_IGST_FOR_SEZ_HSS","createdAt":"2022-06-30T21:59:45.717Z","CONFIG_CODE_STRING_VALUE":"Y","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"AP_SELF_ASSESS_TAX","createdAt":"2022-06-30T21:59:39.361Z","CONFIG_CODE_STRING_VALUE":"Y","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"VBT_STATUS_CODE","createdAt":"2022-06-30T21:59:52.786Z","CONFIG_CODE_STRING_VALUE":"STANDARD","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"LOG_XML_PAYLOAD","createdAt":"2022-06-30T21:59:46.505Z","CONFIG_CODE_STRING_VALUE":"Y","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"REPORT_STAGING_DIR","createdAt":"2022-06-30T21:59:48.056Z","CONFIG_CODE_STRING_VALUE":"Custom/Avalara","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"PROCESS_US_TO_CA_TAXES","createdAt":"2022-06-30T21:59:47.275Z","CONFIG_CODE_STRING_VALUE":"N","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"USE_GL_ACCOUNT_STRING","createdAt":"2022-06-30T21:59:50.427Z","CONFIG_CODE_STRING_VALUE":"N","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"CUSTOM_DUTY_TAX","createdAt":"2022-06-30T21:59:44.110Z","CONFIG_CODE_STRING_VALUE":"Y","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"BULK_FETCH_ADDITIONAL_DATA","createdAt":"2022-06-30T21:59:42.530Z","CONFIG_CODE_STRING_VALUE":"N","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"SEND_SHIP_FROM_AS_POA","createdAt":"2022-06-30T21:59:49.631Z","CONFIG_CODE_STRING_VALUE":"N","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"VBT_RATE_CODE","createdAt":"2022-06-30T21:59:51.994Z","CONFIG_CODE_STRING_VALUE":"VENDOR BILLED RATE2","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"BLOCK_PO_TAX_CALC","createdAt":"2022-06-30T21:59:41.732Z","CONFIG_CODE_STRING_VALUE":"N","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"EXEMPTION_CONTROL_FLAG","createdAt":"2022-06-30T21:59:44.912Z","CONFIG_CODE_STRING_VALUE":"N","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"},{"CONFIG_CODE":"CORRECT_VBT_FOR_OC","createdAt":"2022-06-30T21:59:43.320Z","CONFIG_CODE_STRING_VALUE":"Y","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"}],"ORACLE_BUSINESS_UNITS":[{"LEGAL_ENTITY_ID":"300000011342033","JURIS_CODE_PREFIX":"USTJ","BUSINESS_UNIT":"AppKnit US BU","FIRST_PARTY_ORG_ID":"300000011343035","LEDGER_NAME":"","TAX_MODULE":"USSL","TAX_REGIME_CODE":"AVATAX US SALES AND USE TAX","createdAt":"2022-06-30T21:59:53.566Z","LEDGER_ID":"","BUSINESS_UNIT_ORG_ID":"300000011481057","LEGAL_ENTITY_NAME":"AppKnit US LE","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","AVALARA_COMPANY_CODE":"FUSION-OCICFG","COUNTRY_CODE":"USA","REGIME_SUBSCRIPTION":[]},{"LEGAL_ENTITY_ID":"300000002080003","JURIS_CODE_PREFIX":"USTJ7","FIRST_PARTY_ORG_ID":"300000011119157","BUSINESS_UNIT":"Smart ERP Services Inc.","LEDGER_NAME":"ACTUALS US","TAX_MODULE":"USSL","TAX_REGIME_CODE":"AVATAX US SALES AND USE TAX","createdAt":"2022-06-30T21:59:54.347Z","LEGAL_ENTITY_NAME":"Smart ERP Solutions Inc.","BUSINESS_UNIT_ORG_ID":"300000011107181","LEDGER_ID":"","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","AVALARA_COMPANY_CODE":"FUSION-OCICFG","COUNTRY_CODE":"USA","REGIME_SUBSCRIPTION":[{"TAX_REGIME_CODE":"AVATAX CA INPUT2 HST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:00.609Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX AU OUTPUT GST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:55.154Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"AU","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA INPUT2 PST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:01.402Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX NL INPUT VAT","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:06.137Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"NL","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX US7 SALES AND USE TAX","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:09.271Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"US","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA OUTPUT2 GST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:56.723Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX FR OUTPUT VAT2","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:02.969Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"FR","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX US7 SALES AND USE TAX","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:08.496Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"US","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX FR OUTPUT VAT2","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:04.543Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"FR","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"VATAX AU INPUT GST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:55.943Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"AU","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX FR INPUT VAT2","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:03.749Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"FR","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA OUTPUT2 PST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:58.272Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA INPUT2 GST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:59.832Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX SG OUTPUT GST2","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:07.718Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"SG","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX NL OUTPUT VAT","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:06.930Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"NL","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA INPUT2 QST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:02.187Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA OUTPUT2 HST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:57.495Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA OUTPUT2 QST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:59.048Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX NL OUTPUT VAT","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:05.326Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"NL","APPLICATION_PROCESS":"O2C","EFF_TO":""}]}],"TXN_TYPE_TAX_CALCULATION":[{"createdAt":"2022-06-30T22:00:13.175Z","DOC_TYPE":"","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"","IS_TAX_CALCULATED":true,"BILL_TO_SAME_AS_SHIP_TO":true,"TXN_TYPE_SEQ_ID":"300000145600222","TXN_TYPE":"CS2 - INV","TAX_CODE":""},{"createdAt":"2022-06-30T22:00:11.614Z","DOC_TYPE":"","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"","IS_TAX_CALCULATED":false,"BILL_TO_SAME_AS_SHIP_TO":false,"TXN_TYPE_SEQ_ID":"300000036616275","TXN_TYPE":"Equipment CC INV","TAX_CODE":"D0000000"},{"createdAt":"2022-06-30T22:00:12.392Z","DOC_TYPE":"","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"","IS_TAX_CALCULATED":false,"BILL_TO_SAME_AS_SHIP_TO":false,"TXN_TYPE_SEQ_ID":"300000036616277","TXN_TYPE":"j2 CONVERSION INV","TAX_CODE":"D0000000"},{"createdAt":"2022-06-30T22:00:10.057Z","DOC_TYPE":"","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"","IS_TAX_CALCULATED":true,"BILL_TO_SAME_AS_SHIP_TO":false,"TXN_TYPE_SEQ_ID":"35","TXN_TYPE":"Credit Memo","TAX_CODE":""},{"createdAt":"2022-06-30T22:00:13.955Z","DOC_TYPE":"","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"","IS_TAX_CALCULATED":true,"BILL_TO_SAME_AS_SHIP_TO":false,"TXN_TYPE_SEQ_ID":"300000145968924","TXN_TYPE":"Credit Memo India","TAX_CODE":""},{"createdAt":"2022-06-30T22:00:10.832Z","DOC_TYPE":"","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"","IS_TAX_CALCULATED":true,"BILL_TO_SAME_AS_SHIP_TO":false,"TXN_TYPE_SEQ_ID":"300000034416277","TXN_TYPE":"Box Sale","TAX_CODE":"D0000000"},{"createdAt":"2022-06-30T22:00:14.728Z","DOC_TYPE":"Sales Quote","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"ENC_Subscription","IS_TAX_CALCULATED":true,"BILL_TO_SAME_AS_SHIP_TO":false,"TXN_TYPE_SEQ_ID":"0","TXN_TYPE":"","TAX_CODE":""}],"ORACLE_APPLICATIONS":[{"createdAt":"2022-06-30T22:00:17.555Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","ORACLE_APPLICATION":"AR","REGIME_COUNTRIES":[],"TOLERANCE":[],"AVALARA_UDF_MAPPING":[],"AVALARA_FIELD_MAPPING":[],"AVALARA_PARAMETERS_MAPPING":[]},{"createdAt":"2022-06-30T22:00:18.331Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","ORACLE_APPLICATION":"ONT","REGIME_COUNTRIES":[],"TOLERANCE":[],"AVALARA_UDF_MAPPING":[],"AVALARA_FIELD_MAPPING":[],"AVALARA_PARAMETERS_MAPPING":[]},{"createdAt":"2022-06-30T22:00:15.974Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","ORACLE_APPLICATION":"AP","REGIME_COUNTRIES":[],"TOLERANCE":[{"TAX_TOLERANCE_PERCENT":"0","createdAt":"2022-06-30T22:00:16.753Z","TAX_TOLERANCE_AMOUNT":"0","BUSINESS_UNIT":"Smart ERP Services Inc.","createdBy":"64iJ1vZXFkzqGtWAmKdyd2"}],"AVALARA_UDF_MAPPING":[],"AVALARA_FIELD_MAPPING":[],"AVALARA_PARAMETERS_MAPPING":[]},{"createdAt":"2022-06-30T22:00:19.112Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","ORACLE_APPLICATION":"PO","REGIME_COUNTRIES":[],"TOLERANCE":[],"AVALARA_UDF_MAPPING":[],"AVALARA_FIELD_MAPPING":[],"AVALARA_PARAMETERS_MAPPING":[]}],"TXN_SOURCE_TAX_CALCULATION":[{"createdAt":"2022-06-30T22:00:20.685Z","IS_TAX_CALCULATED":false,"INVOICE_SOURCE":"SERPS_LEGACY_AP","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","LEGAL_ENTITY_ID":""},{"createdAt":"2022-06-30T22:00:19.892Z","IS_TAX_CALCULATED":false,"INVOICE_SOURCE":"FOS","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","LEGAL_ENTITY_ID":""},{"createdAt":"2022-06-30T22:00:21.470Z","IS_TAX_CALCULATED":false,"INVOICE_SOURCE":"Intercompany","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","LEGAL_ENTITY_ID":"300000002080003"}],"DOC_SEQ_USAGE":[{"createdAt":"2022-06-30T22:00:24.617Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","IS_DOC_SEQ_USED":true,"LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"FBDI3 NEW"},{"createdAt":"2022-06-30T22:00:23.831Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","IS_DOC_SEQ_USED":true,"LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"FBDI3"},{"createdAt":"2022-06-30T22:00:23.040Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","IS_DOC_SEQ_USED":false,"LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"Distributed Order Orchestration"},{"createdAt":"2022-06-30T22:00:26.963Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","IS_DOC_SEQ_USED":true,"LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"SERP Manual Doc Seq."},{"createdAt":"2022-06-30T22:00:26.171Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","IS_DOC_SEQ_USED":true,"LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"Manual w Doc Sequencing"},{"createdAt":"2022-06-30T22:00:25.392Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","IS_DOC_SEQ_USED":true,"LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"Manual w Doc Seq."},{"createdAt":"2022-06-30T22:00:27.744Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","IS_DOC_SEQ_USED":false,"LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"test"},{"createdAt":"2022-06-30T22:00:22.247Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","IS_DOC_SEQ_USED":true,"LEGAL_ENTITY_ID":"","BATCH_SOURCE_NAME":"CM FBDI3"},{"createdAt":"2022-06-30T22:00:28.519Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","IS_DOC_SEQ_USED":true,"LEGAL_ENTITY_ID":"103","BATCH_SOURCE_NAME":"FBDI5"}]}
const currentBusinessUnit = {"LEGAL_ENTITY_ID":"300000002080003","JURIS_CODE_PREFIX":"USTJ7","FIRST_PARTY_ORG_ID":"300000011119157","BUSINESS_UNIT":"Smart ERP Services Inc.","LEDGER_NAME":"ACTUALS US","TAX_MODULE":"USSL","TAX_REGIME_CODE":"AVATAX US SALES AND USE TAX","createdAt":"2022-06-30T21:59:54.347Z","LEGAL_ENTITY_NAME":"Smart ERP Solutions Inc.","BUSINESS_UNIT_ORG_ID":"300000011107181","LEDGER_ID":"","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","AVALARA_COMPANY_CODE":"FUSION-OCICFG","COUNTRY_CODE":"USA","REGIME_SUBSCRIPTION":[{"TAX_REGIME_CODE":"AVATAX CA INPUT2 HST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:00.609Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX AU OUTPUT GST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:55.154Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"AU","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA INPUT2 PST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:01.402Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX NL INPUT VAT","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:06.137Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"NL","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX US7 SALES AND USE TAX","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:09.271Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"US","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA OUTPUT2 GST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:56.723Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX FR OUTPUT VAT2","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:02.969Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"FR","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX US7 SALES AND USE TAX","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:08.496Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"US","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX FR OUTPUT VAT2","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:04.543Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"FR","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"VATAX AU INPUT GST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:55.943Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"AU","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX FR INPUT VAT2","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:03.749Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"FR","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA OUTPUT2 PST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:58.272Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA INPUT2 GST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:59.832Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX SG OUTPUT GST2","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:07.718Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"SG","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX NL OUTPUT VAT","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:06.930Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"NL","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA INPUT2 QST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:02.187Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"P2P","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA OUTPUT2 HST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:57.495Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX CA OUTPUT2 QST","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T21:59:59.048Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"CA","APPLICATION_PROCESS":"O2C","EFF_TO":""},{"TAX_REGIME_CODE":"AVATAX NL OUTPUT VAT","EFF_FROM":"1952-01-01","createdAt":"2022-06-30T22:00:05.326Z","createdBy":"64iJ1vZXFkzqGtWAmKdyd2","TAX_REGISTRATION_COUNTRY":"NL","APPLICATION_PROCESS":"O2C","EFF_TO":""}]}
const fusionRequest = {"header":{"ns:ApplicationId":"222","ns:ApplicationShortname":"AR","ns:BatchSourceName":"Manual","ns:CtrlHdrTxApplFlag":"N","ns:DefaultTaxationCountry":"US","ns:DocEventStatus":"VALIDATED_FOR_TAX","ns:EntityCode":"TRANSACTIONS","ns:EventClassCode":"INVOICE","ns:EstablishmentId":"300000002080006","ns:EstablishmentNumber":"7","ns:EventClassMappingId":"4","ns:EventTypeCode":"INV_CREATE","ns:EndPointUrl":"https://ecae-test.fa.us2.oraclecloud.com","ns:FirstPtyOrgId":"300000011119157","ns:FirstPtyRegId":"300000004353017","ns:FirstPtyRegNumber":"41-1234501","ns:HdrTrxUserKey1":"CALCULATE","ns:HistoricalFlag":"N","ns:HqEstbPartyTaxProfId":"300000002080046","ns:InternalOrganizationId":"300000011107181","ns:LedgerId":"300000002064005","ns:LegalEntityId":"300000002080003","ns:LegalEntityNumber":"SERPSOLS","ns:LogLevel":"SEVERE","ns:ReceivablesTrxTypeSeqId":"34","ns:TrxCurrencyCode":"USD","ns:TrxDate":"2022-07-21","ns:TrxDueDate":"2022-08-20","ns:TrxId":"30000015901405202","ns:TrxLevelType":"ITEM","ns:TrxNumber":"117605202"},"lines":[{"ns:AccountCcid":"300000002075018","ns:ApplicationId":"222","ns:AccountString":"SERPSOLS-00-410002-000-SERPSOLS-0-0-0-0-0","ns:AssessableValue":"100","ns:BillFromGeographyType1":"ADDRESS1","ns:BillFromGeographyType10":"PROVINCE","ns:BillFromGeographyType2":"ADDRESS2","ns:BillFromGeographyType3":"ADDRESS3","ns:BillFromGeographyType4":"ADDRESS4","ns:BillFromGeographyType5":"COUNTRY","ns:BillFromGeographyType6":"STATE","ns:BillFromGeographyType7":"COUNTY","ns:BillFromGeographyType8":"CITY","ns:BillFromGeographyType9":"POSTALCODE","ns:BillFromGeographyValue1":"5570 Baldwin Way","ns:BillFromGeographyValue5":"US","ns:BillFromGeographyValue6":"CA","ns:BillFromGeographyValue7":"ALAMEDA","ns:BillFromGeographyValue8":"PLEASANTON","ns:BillFromGeographyValue9":"94588","ns:BillFromLocationId":"300000027712047","ns:BillThirdPtyAcctId":"300000033215458","ns:BillThirdPtyAcctSiteId":"300000033215459","ns:BillToGeographyType1":"ADDRESS1","ns:BillToGeographyType10":"PROVINCE","ns:BillToGeographyType2":"ADDRESS2","ns:BillToGeographyType3":"ADDRESS3","ns:BillToGeographyType4":"ADDRESS4","ns:BillToGeographyType5":"COUNTRY","ns:BillToGeographyType6":"STATE","ns:BillToGeographyType7":"COUNTY","ns:BillToGeographyType8":"CITY","ns:BillToGeographyType9":"POSTALCODE","ns:BillToGeographyValue1":"2008 Airport Road NE","ns:BillToGeographyValue10":"AB","ns:BillToGeographyValue5":"CA","ns:BillToGeographyValue8":"Calgary","ns:BillToGeographyValue9":"T2E 3B9","ns:BillToLocationId":"300000033215461","ns:CashDiscount":"0","ns:EntityCode":"TRANSACTIONS","ns:EventClassCode":"INVOICE","ns:ExemptionControlFlag":"S","ns:LineAmt":"100","ns:LineAmtIncludesTaxFlag":"S","ns:LineClass":"INVOICE","ns:LineLevelAction":"CREATE","ns:LinesDetFactorId":"15470441","ns:PoaGeographyType1":"ADDRESS1","ns:PoaGeographyType10":"PROVINCE","ns:PoaGeographyType2":"ADDRESS2","ns:PoaGeographyType3":"ADDRESS3","ns:PoaGeographyType4":"ADDRESS4","ns:PoaGeographyType5":"COUNTRY","ns:PoaGeographyType6":"STATE","ns:PoaGeographyType7":"COUNTY","ns:PoaGeographyType8":"CITY","ns:PoaGeographyType9":"POSTALCODE","ns:PoaGeographyValue1":"5570 Baldwin Way","ns:PoaGeographyValue5":"US","ns:PoaGeographyValue6":"CA","ns:PoaGeographyValue7":"ALAMEDA","ns:PoaGeographyValue8":"PLEASANTON","ns:PoaGeographyValue9":"94588","ns:PoaLocationId":"300000027712047","ns:Precision":"2","ns:ProductCode":"HPP4520","ns:ProductDescription":"HP Envy Printer 4520","ns:ProductFiscClassification":"COMPUTER|DESKTOP","ns:ProductId":"300000011351142","ns:ProductOrgId":"300000003634674","ns:ProductType":"GOODS","ns:ShipFromGeographyType1":"ADDRESS1","ns:ShipFromGeographyType10":"PROVINCE","ns:ShipFromGeographyType2":"ADDRESS2","ns:ShipFromGeographyType3":"ADDRESS3","ns:ShipFromGeographyType4":"ADDRESS4","ns:ShipFromGeographyType5":"COUNTRY","ns:ShipFromGeographyType6":"STATE","ns:ShipFromGeographyType7":"COUNTY","ns:ShipFromGeographyType8":"CITY","ns:ShipFromGeographyType9":"POSTALCODE","ns:ShipFromGeographyValue1":"4683 Chabot Dr","ns:ShipFromGeographyValue5":"US","ns:ShipFromGeographyValue6":"California","ns:ShipFromGeographyValue7":"Alameda","ns:ShipFromGeographyValue8":"Pleasanton","ns:ShipFromGeographyValue9":"94588","ns:ShipFromLocationId":"300000003492106","ns:ShipToGeographyType1":"ADDRESS1","ns:ShipToGeographyType10":"PROVINCE","ns:ShipToGeographyType2":"ADDRESS2","ns:ShipToGeographyType3":"ADDRESS3","ns:ShipToGeographyType4":"ADDRESS4","ns:ShipToGeographyType5":"COUNTRY","ns:ShipToGeographyType6":"STATE","ns:ShipToGeographyType7":"COUNTY","ns:ShipToGeographyType8":"CITY","ns:ShipToGeographyType9":"POSTALCODE","ns:ShipToGeographyValue1":"780 Powerhouse Rd","ns:ShipToGeographyValue10":"MB","ns:ShipToGeographyValue5":"CA","ns:ShipToGeographyValue8":"Winnipeg","ns:ShipToGeographyValue9":"R3H 1C7","ns:ShipToLocationId":"300000033216491","ns:TaxReportingFlag":"Y","ns:TrxBusinessCategory":"SALES_TRANSACTION","ns:TrxId":"30000015901405202","ns:TrxLineCurrencyCode":"USD","ns:TrxLineDescription":"HP Envy Printer 4520","ns:TrxLineGlDate":"2022-07-21","ns:TrxLineId":"300000159014053","ns:TrxLineNumber":"1","ns:TrxLinePrecision":"2","ns:TrxLineQuantity":"1","ns:TrxLineType":"ITEM","ns:TrxLevelType":"LINE","ns:TrxTypeDescription":"Regular Invoice for Test","ns:UnitPrice":"100","ns:UomCode":"zzy","_addresses":{"shipFrom":{"line1":"4683 Chabot Dr","country":"US","region":"CA","county":"Alameda","city":"Pleasanton","postalCode":"94588"},"shipTo":{"line1":"780 Powerhouse Rd","country":"CA","city":"Winnipeg","postalCode":"R3H 1C7","province":"MB"},"billFrom":{"line1":"5570 Baldwin Way","country":"US","region":"CA","county":"ALAMEDA","city":"PLEASANTON","postalCode":"94588"},"billTo":{"line1":"2008 Airport Road NE","country":"CA","city":"Calgary","postalCode":"T2E 3B9","province":"AB"},"pointOfOrderOrigin":null,"pointOfOrderAcceptance":{"line1":"5570 Baldwin Way","country":"US","region":"CA","county":"ALAMEDA","city":"PLEASANTON","postalCode":"94588"},"finalDischarge":null}}],"wsAction":"Calculation"}
const avaTaxModel = {"id":85006692824814,"code":"117605202","companyId":884262,"date":"2022-07-21","paymentDate":"1900-01-01","status":"Committed","type":"SalesInvoice","batchCode":"","currencyCode":"USD","exchangeRateCurrencyCode":"USD","customerUsageType":"","entityUseCode":"","customerVendorCode":"66013","customerCode":"66013","exemptNo":"","reconciled":false,"locationCode":"","reportingLocationCode":"","purchaseOrderNo":"","referenceCode":"","salespersonCode":"","taxOverrideType":"None","taxOverrideAmount":0,"taxOverrideReason":"","totalAmount":100,"totalExempt":0,"totalDiscount":0,"totalTax":12,"totalTaxable":100,"totalTaxCalculated":12,"adjustmentReason":"NotAdjusted","adjustmentDescription":"","locked":false,"region":"MB","country":"CA","version":1,"softwareVersion":"22.6.0.0","originAddressId":-1,"destinationAddressId":-1,"exchangeRateEffectiveDate":"2022-07-21","exchangeRate":1,"description":"","email":"","businessIdentificationNo":"","modifiedDate":"2022-07-22T17:31:59.9283971Z","modifiedUserId":34042,"taxDate":"2022-07-21","lines":[{"id":85006692824819,"transactionId":85006692824814,"lineNumber":"1","boundaryOverrideId":0,"customerUsageType":"","entityUseCode":"","description":"HP Envy Printer 4520","destinationAddressId":85006692824815,"originAddressId":85006692824816,"discountAmount":0,"discountTypeId":0,"exemptAmount":0,"exemptCertId":0,"exemptNo":"","isItemTaxable":true,"isSSTP":false,"itemCode":"HPP4520","lineAmount":100,"quantity":1,"ref1":"","ref2":"","reportingDate":"2022-07-21","revAccount":"SERPSOLS-00-410002-000-SERPSOLS-0-0-0-0-0","sourcing":"Destination","tax":12,"taxableAmount":100,"taxCalculated":12,"taxCode":"P0000000","taxCodeId":8087,"taxDate":"2022-07-21","taxEngine":"","taxOverrideType":"None","businessIdentificationNo":"","taxOverrideAmount":0,"taxOverrideReason":"","taxIncluded":false,"originationDocumentId":"300000159014053","details":[{"id":85006692824828,"transactionLineId":85006692824819,"transactionId":85006692824814,"addressId":85006692824815,"country":"CA","region":"CA","countyFIPS":"","stateFIPS":"","exemptAmount":0,"exemptReasonId":4,"inState":false,"jurisCode":"CA","jurisName":"CANADA","jurisdictionId":20451988,"signatureCode":"","stateAssignedNo":"","jurisType":"CNT","jurisdictionType":"Country","nonTaxableAmount":0,"nonTaxableRuleId":0,"nonTaxableType":"RateRule","rate":0.05,"rateRuleId":322399,"rateSourceId":0,"serCode":"","sourcing":"Destination","tax":5,"taxableAmount":100,"taxType":"Output","taxSubTypeId":"O","taxTypeGroupId":"InputAndOutput","taxName":"CANADA GST/TPS","taxAuthorityTypeId":45,"taxRegionId":0,"taxCalculated":5,"taxOverride":0,"rateType":"Standard","rateTypeCode":"S","taxableUnits":100,"nonTaxableUnits":0,"exemptUnits":0,"unitOfBasis":"PerCurrencyUnit","isNonPassThru":false,"isFee":false,"reportingTaxableUnits":100,"reportingNonTaxableUnits":0,"reportingExemptUnits":0,"reportingTax":5,"reportingTaxCalculated":5,"liabilityType":"Seller"},{"id":85006692824829,"transactionLineId":85006692824819,"transactionId":85006692824814,"addressId":85006692824815,"country":"CA","region":"MB","countyFIPS":"","stateFIPS":"","exemptAmount":0,"exemptReasonId":4,"inState":false,"jurisCode":"MB","jurisName":"MANITOBA","jurisdictionId":20451991,"signatureCode":"","stateAssignedNo":"","jurisType":"STA","jurisdictionType":"State","nonTaxableAmount":0,"nonTaxableRuleId":0,"nonTaxableType":"RateRule","rate":0.07,"rateRuleId":4026411,"rateSourceId":0,"serCode":"","sourcing":"Destination","tax":7,"taxableAmount":100,"taxType":"Output","taxSubTypeId":"O","taxTypeGroupId":"InputAndOutput","taxName":"MANITOBA PST","taxAuthorityTypeId":45,"taxRegionId":0,"taxCalculated":7,"taxOverride":0,"rateType":"Standard","rateTypeCode":"S","taxableUnits":100,"nonTaxableUnits":0,"exemptUnits":0,"unitOfBasis":"PerCurrencyUnit","isNonPassThru":false,"isFee":false,"reportingTaxableUnits":100,"reportingNonTaxableUnits":0,"reportingExemptUnits":0,"reportingTax":7,"reportingTaxCalculated":7,"liabilityType":"Seller"}],"nonPassthroughDetails":[],"lineLocationTypes":[{"documentLineLocationTypeId":85006692824821,"documentLineId":85006692824819,"documentAddressId":85006692824817,"locationTypeCode":"ShipFrom"},{"documentLineLocationTypeId":85006692824822,"documentLineId":85006692824819,"documentAddressId":85006692824815,"locationTypeCode":"ShipTo"},{"documentLineLocationTypeId":85006692824823,"documentLineId":85006692824819,"documentAddressId":85006692824816,"locationTypeCode":"PointOfOrderAcceptance"}],"hsCode":"","costInsuranceFreight":0,"vatCode":"","vatNumberTypeId":0}],"addresses":[{"id":85006692824815,"transactionId":85006692824814,"boundaryLevel":"Zip5","line1":"780 Powerhouse Rd","line2":"","line3":"","city":"Winnipeg","region":"MB","postalCode":"R3H 1C7","country":"CA","taxRegionId":0},{"id":85006692824816,"transactionId":85006692824814,"boundaryLevel":"Address","line1":"5570 BALDWIN WAY","line2":"","line3":"","city":"PLEASANTON","region":"CA","postalCode":"94588-3679","country":"US","taxRegionId":4017445,"latitude":"37.688868","longitude":"-121.92819"},{"id":85006692824817,"transactionId":85006692824814,"boundaryLevel":"Address","line1":"4683 CHABOT DR","line2":"","line3":"","city":"PLEASANTON","region":"CA","postalCode":"94588-3830","country":"US","taxRegionId":4017445,"latitude":"37.694322","longitude":"-121.901154"}],"locationTypes":[],"summary":[{"country":"CA","region":"CA","jurisType":"Country","jurisCode":"CA","jurisName":"CANADA","taxAuthorityType":45,"stateAssignedNo":"","taxType":"Output","taxSubType":"O","taxName":"CANADA GST/TPS","rateType":"Standard","taxable":100,"rate":0.05,"tax":5,"taxCalculated":5,"nonTaxable":0,"exemption":0},{"country":"CA","region":"MB","jurisType":"State","jurisCode":"MB","jurisName":"MANITOBA","taxAuthorityType":45,"stateAssignedNo":"","taxType":"Output","taxSubType":"O","taxName":"MANITOBA PST","rateType":"Standard","taxable":100,"rate":0.07,"tax":7,"taxCalculated":7,"nonTaxable":0,"exemption":0}],"messages":[{"summary":"MissingHSCodeWarning","details":"No HSCode provided. Import Duty could not be calculated.","refersTo":"LineNo : 1","severity":"Success","source":"Avalara.AvaTax.TaxEngine"}]}
import extension from './index'
const triggerBody = {
    "soapenv:Envelope": {
        "$": {
            "xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
            "xmlns:ns": "http://smarterp.com/integration/services/fusion"
        },
        "soapenv:Header": {
            "$": {
                "xmlns:wsa": "http://www.w3.org/2005/08/addressing"
            },
            "wsse:Security": {
                "$": {
                    "xmlns:wsse": "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd",
                    "xmlns:wsu": "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd",
                    "soapenv:mustUnderstand": "1"
                },
                "wsu:Timestamp": {
                    "$": {
                        "wsu:Id": "TS-1654483786026"
                    },
                    "wsu:Created": "2022-06-06T02:49:46Z",
                    "wsu:Expires": "2022-06-06T03:06:26Z"
                },
                "wsse:UsernameToken": {
                    "$": {
                        "wsu:Id": "UsernameToken-1654483786026"
                    },
                    "wsse:Username": "CFGINTLECAEAPPKNIT",
                    "wsse:Password": {
                        "_": "kwWVwC5XrmS2rVjv3nCyFfhPnEC3QVYPJXS6JEEhNLWD",
                        "$": {
                            "Type": "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText"
                        }
                    },
                    "wsse:Nonce": {
                        "_": "9OTMuFas5BZcurJ/wR0vwg==",
                        "$": {
                            "EncodingType": "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary"
                        }
                    },
                    "wsu:Created": "2022-06-06T02:49:46Z"
                }
            },
            "wsa:MessageID": "uuid:36ff4309-5a74-4103-836b-d412a2c74c8d",
            "wsa:Action": "Calculation"
        },
        "soapenv:Body": {
            "ns:CalculationRequest": {
                "$": {
                    "xmlns": "http://smarterp.com/integration/services/fusion"
                },
                "ns:taxableHeaders": {
                    "ns:ApplicationId": "200",
                    "ns:ApplicationShortname": "AP",
                    "ns:CtrlHdrTxApplFlag": "N",
                    "ns:DefaultTaxationCountry": "US",
                    "ns:DocEventStatus": "UPDATED",
                    "ns:EntityCode": "AP_INVOICES",
                    "ns:EventClassCode": "STANDARD INVOICES",
                    "ns:EstablishmentId": "300000002080006",
                    "ns:EstablishmentNumber": "7",
                    "ns:EventClassMappingId": "1",
                    "ns:EventTypeCode": "STANDARD UPDATED",
                    "ns:EndPointUrl": "https://ecae-test.fa.us2.oraclecloud.com",
                    "ns:FirstPtyOrgId": "300000011119157",
                    "ns:FirstPtyRegId": "300000004353017",
                    "ns:FirstPtyRegNumber": "41-1234501",
                    "ns:HdrTrxUserKey1": "CALCULATE",
                    "ns:HistoricalFlag": "N",
                    "ns:HqEstbPartyTaxProfId": "300000002080046",
                    "ns:InternalOrganizationId": "300000011107181",
                    "ns:LedgerId": "300000002064005",
                    "ns:LegalEntityId": "300000002080003",
                    "ns:LegalEntityNumber": "SERPSOLS",
                    "ns:LogLevel": "SEVERE",
                    "ns:TrxCurrencyCode": "USD",
                    "ns:TrxDate": "2022-07-20",
                    "ns:TrxHeaderAmt": "104",
                    "ns:TrxId": "30000015901152901",
                    "ns:TrxLevelType": "ITEM",
                    "ns:TrxSource": "Manual Invoice Entry",
                    "ns:TrxNumber": "APFGUATUSUC2022072100101"
                },
                "ns:taxableLines": {
                    "ns:TaxableLine": {
                        "ns:AccountCcid": "300000004238035",
                        "ns:ApplicationId": "200",
                        "ns:AccountString": "SERPSOLS-00-110001-000-SERPCONS-0-0-0-0-0",
                        "ns:AssessableValue": "100",
                        "ns:AssetFlag": "N",
                        "ns:BillFromGeographyType1": "ADDRESS1",
                        "ns:BillFromGeographyType10": "PROVINCE",
                        "ns:BillFromGeographyType2": "ADDRESS2",
                        "ns:BillFromGeographyType3": "ADDRESS3",
                        "ns:BillFromGeographyType4": "ADDRESS4",
                        "ns:BillFromGeographyType5": "COUNTRY",
                        "ns:BillFromGeographyType6": "STATE",
                        "ns:BillFromGeographyType7": "COUNTY",
                        "ns:BillFromGeographyType8": "CITY",
                        "ns:BillFromGeographyType9": "POSTALCODE",
                        "ns:BillFromGeographyValue1": "PO Box 847891",
                        "ns:BillFromGeographyValue5": "US",
                        "ns:BillFromGeographyValue6": "TX",
                        "ns:BillFromGeographyValue7": "Dallas",
                        "ns:BillFromGeographyValue8": "Dallas",
                        "ns:BillFromGeographyValue9": "75284",
                        "ns:BillFromLocationId": "300000145615230",
                        "ns:BillFromPartyName": "Staples, Inc.",
                        "ns:BillFromPartyNumber": "50330",
                        "ns:BillThirdPtyAcctId": "300000011272151",
                        "ns:BillThirdPtyAcctSiteId": "300000145615238",
                        "ns:BillToGeographyType1": "ADDRESS1",
                        "ns:BillToGeographyType10": "PROVINCE",
                        "ns:BillToGeographyType2": "ADDRESS2",
                        "ns:BillToGeographyType3": "ADDRESS3",
                        "ns:BillToGeographyType4": "ADDRESS4",
                        "ns:BillToGeographyType5": "COUNTRY",
                        "ns:BillToGeographyType6": "STATE",
                        "ns:BillToGeographyType7": "COUNTY",
                        "ns:BillToGeographyType8": "CITY",
                        "ns:BillToGeographyType9": "POSTALCODE",
                        "ns:BillToGeographyValue1": "5570 Baldwin Way",
                        "ns:BillToGeographyValue5": "US",
                        "ns:BillToGeographyValue6": "CA",
                        "ns:BillToGeographyValue7": "ALAMEDA",
                        "ns:BillToGeographyValue8": "PLEASANTON",
                        "ns:BillToGeographyValue9": "94588",
                        "ns:BillToLocationId": "300000027712047",
                        "ns:EntityCode": "AP_INVOICES",
                        "ns:EventClassCode": "STANDARD INVOICES",
                        "ns:LineAmt": "100",
                        "ns:LineAmtIncludesTaxFlag": "S",
                        "ns:LineClass": "STANDARD INVOICES",
                        "ns:LineLevelAction": "UPDATE",
                        "ns:LinesDetFactorId": "15461410",
                        "ns:MatchType": "NOT_MATCHED",
                        "ns:MinimumAccountableUnit": "0.01",
                        "ns:Precision": "2",
                        "ns:PseudoTrxLineFlag": "N",
                        "ns:ShipFromGeographyType1": "ADDRESS1",
                        "ns:ShipFromGeographyType10": "PROVINCE",
                        "ns:ShipFromGeographyType2": "ADDRESS2",
                        "ns:ShipFromGeographyType3": "ADDRESS3",
                        "ns:ShipFromGeographyType4": "ADDRESS4",
                        "ns:ShipFromGeographyType5": "COUNTRY",
                        "ns:ShipFromGeographyType6": "STATE",
                        "ns:ShipFromGeographyType7": "COUNTY",
                        "ns:ShipFromGeographyType8": "CITY",
                        "ns:ShipFromGeographyType9": "POSTALCODE",
                        "ns:ShipFromGeographyValue1": "PO Box 847891",
                        "ns:ShipFromGeographyValue5": "US",
                        "ns:ShipFromGeographyValue6": "TX",
                        "ns:ShipFromGeographyValue7": "Dallas",
                        "ns:ShipFromGeographyValue8": "Dallas",
                        "ns:ShipFromGeographyValue9": "75284",
                        "ns:ShipFromLocationId": "300000145615230",
                        "ns:ShipFromPartyName": "Staples, Inc.",
                        "ns:ShipFromPartyNumber": "50330",
                        "ns:ShipThirdPtyAcctId": "300000011272151",
                        "ns:ShipThirdPtyAcctSiteId": "300000145615238",
                        "ns:ShipToGeographyType1": "ADDRESS1",
                        "ns:ShipToGeographyType10": "PROVINCE",
                        "ns:ShipToGeographyType2": "ADDRESS2",
                        "ns:ShipToGeographyType3": "ADDRESS3",
                        "ns:ShipToGeographyType4": "ADDRESS4",
                        "ns:ShipToGeographyType5": "COUNTRY",
                        "ns:ShipToGeographyType6": "STATE",
                        "ns:ShipToGeographyType7": "COUNTY",
                        "ns:ShipToGeographyType8": "CITY",
                        "ns:ShipToGeographyType9": "POSTALCODE",
                        "ns:ShipToGeographyValue1": "4545 Chabot Dr",
                        "ns:ShipToGeographyValue2": "Pleasanton",
                        "ns:ShipToGeographyValue5": "US",
                        "ns:ShipToGeographyValue6": "CA",
                        "ns:ShipToGeographyValue7": "Alameda",
                        "ns:ShipToGeographyValue8": "Pleasanton",
                        "ns:ShipToGeographyValue9": "94588",
                        "ns:ShipToLocationId": "300000039807162",
                        "ns:TaxProcessingCompletedFlag": "C",
                        "ns:TaxReportingFlag": "Y",
                        "ns:TrxBusinessCategory": "PURCHASE_TRANSACTION",
                        "ns:TrxId": "30000015901152901",
                        "ns:TrxLineCurrencyCode": "USD",
                        "ns:TrxLineDate": "2022-07-20",
                        "ns:TrxLineGlDate": "2022-07-20",
                        "ns:TrxLineId": "1",
                        "ns:TrxLineMau": "0.01",
                        "ns:TrxLineNumber": "1",
                        "ns:TrxLinePrecision": "2",
                        "ns:TrxLineQuantity": "1",
                        "ns:TrxLineType": "ITEM",
                        "ns:TrxLevelType": "LINE",
                        "ns:UnitPrice": "100",
                        "ns:VendorTypeLookupCode": "UTILITY",
                        "ns:VendorNumber": "10183"
                    }
                },
                "ns:detailTaxLines": {
                    "ns:DetailTaxLines": {
                        "ns:ApplicationId": "200",
                        "ns:CancelFlag": "N",
                        "ns:CompoundingTaxFlag": "N",
                        "ns:CopiedFromOtherDocFlag": "N",
                        "ns:DeleteFlag": "N",
                        "ns:EntityCode": "AP_INVOICES",
                        "ns:EventClassCode": "STANDARD INVOICES",
                        "ns:InternalOrganizationId": "300000011107181",
                        "ns:LedgerId": "300000002064005",
                        "ns:LegalEntityId": "300000002080003",
                        "ns:LegalReportingStatus": "000000000000000",
                        "ns:LineAmt": "100",
                        "ns:LineAssessableValue": "100",
                        "ns:ManuallyEnteredFlag": "Y",
                        "ns:MinimumAccountableUnit": "0.01",
                        "ns:OffsetFlag": "N",
                        "ns:OverriddenFlag": "Y",
                        "ns:Precision": "2",
                        "ns:ReportableFlag": "Y",
                        "ns:ReportingOnlyFlag": "N",
                        "ns:RoundingLevelCode": "HEADER",
                        "ns:RoundingRuleCode": "NEAREST",
                        "ns:SelfAssessedFlag": "N",
                        "ns:Tax": "VENDOR BILLED TAX2",
                        "ns:TaxAmt": "4",
                        "ns:TaxAmtIncludedFlag": "N",
                        "ns:TaxAmtTaxCurr": "4",
                        "ns:TaxApportionmentLineNumber": "1",
                        "ns:TaxCurrencyCode": "USD",
                        "ns:TaxCurrencyConversionDate": "2022-07-20",
                        "ns:TaxCurrencyConversionRate": "1",
                        "ns:TaxDate": "2022-07-20",
                        "ns:TaxDetermineDate": "2022-07-20",
                        "ns:TaxJurisdictionCode": "USTJ7-DEFAULT",
                        "ns:TaxLineId": "300000159011532",
                        "ns:TaxLineNumber": "1",
                        "ns:TaxOnlyLineFlag": "N",
                        "ns:TaxPointBasis": "INVOICE",
                        "ns:TaxRate": "4",
                        "ns:TaxRateCode": "VENDOR BILLED RATE2",
                        "ns:TaxRateType": "PERCENTAGE",
                        "ns:TaxRegimeCode": "AVATAX US7 SALES AND USE TAX",
                        "ns:TaxStatusCode": "STANDARD",
                        "ns:TaxableAmt": "100",
                        "ns:TaxableAmtTaxCurr": "100",
                        "ns:TrxCurrencyCode": "USD",
                        "ns:TrxDate": "2022-07-20",
                        "ns:TrxId": "30000015901152901",
                        "ns:TrxLevelType": "LINE",
                        "ns:TrxLineId": "1",
                        "ns:UnroundedTaxAmt": "4",
                        "ns:UnroundedTaxableAmt": "100"
                    }
                }
            }
        }
    }
}
const sdk = new AppknitSDK(null, null, {
    // @ts-ignore
    adhocDataProvider: {
        queryDataRecords: async (query)=>{
            console.log(JSON.stringify(query, null, 2))
            return [
                {
                    TAX_CODE: 'TAX_CODE',
                    RATE_CODE: 'RATE_CODE',
                    TAX_STATUS_CODE: 'TAX_STATUS_CODE',
                    JURIS_CODE: 'JURIS_CODE',
                }
            ]
        },
    }
})
extension.flowFunctions.mapToFusionResponse.js(sdk, {
    fusionRequest, customerProfile, configCodes, currentBusinessUnit, avaTaxModel,
    isUS2US: false, isCA2CA: false, isUS2CA: true, isIndia: false, isInternational: false
}).then(result=>console.log(result))

// extension.flowFunctions.mapFusionSoapRequestV2.js(sdk, {body: triggerBody}).then(result=>console.log(result))