/* eslint-disable node/no-unsupported-features/es-syntax */
const httpStatuses = {
    OKStatus: 200,
    CreatedStatus: 201,
    NoContentStatus: 204,
    ErrorNotModifiedStatus: 304,
    ErrorBadRequestStatus: 400,
    ErrorUnauthorizedStatus: 401,
    ErrorPaymentRequiredStatus: 402,
    ErrorForbiddenStatus: 403,
    ErrorNotFoundStatus: 404,
    ErrorMethodNotAllowedStatus: 405,
    ErrorUnprocessableEntityStatus: 422,
    ErrorInternalServerStatus: 500,
};

const statuses = {
    PENFING_CAN_NOT_FIND_EVIDENCE: 'PENFING_CAN_NOT_FIND_EVIDENCE',
    PENDING_DUE_CUSTOMER_EVIDENCE: 'PENDING_DUE_CUSTOMER_EVIDENCE',
    PENDING_DUE_FIRST_WITHNESS_EVIDENCE: 'PENDING_DUE_FIRST_WITHNESS_EVIDENCE',
    PENDING_DUE_SECOND_WITHNESS_EVIDENCE:
        'PENDING_DUE_SECOND_WITHNESS_EVIDENCE',
    PENDING_DUE_CUSTOMER_AND_SELL_EVIDENCE:
        'PENDING_DUE_CUSTOMER_AND_SELL_EVIDENCE',
    PENDING_DUE_SELL_EVIDENCE: 'PENDING_DUE_SELL_EVIDENCE',
    PENDING_INCOMPLETE_DATA: 'PENDING_INCOMPLETE_DATA',
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
};

module.exports = {
    ...statuses,
    ...httpStatuses,
};
