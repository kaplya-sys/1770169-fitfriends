export const REGEX = /%([^%]*)%/;
export const TIME_REGEX = /^(\d+)(year|y|month|m|day|d|week|w|hour|h|minute|m|second|s)/;
export const APP_VALIDATE_ERROR_MESSAGE = '[App Config Validation Error]: %message%.';
export const MONGO_VALIDATE_ERROR_MESSAGE = '[Mongo Config Validation Error]: %message%.';
export const WRONG_TIME_ERROR = '[parseTime] Wrong time string: %time%';
export const VALUE_PARSE_ERROR = `[parseTime] Can't parse value count. Result is NaN.`;
export const CONVERT_FILE_ERROR = 'Failed to convert file: %error%';
export const CREATE_JWT_PAYLOAD_ERROR = `[createJWTPayload] Can't create JWT payload. Required User ID.`;
