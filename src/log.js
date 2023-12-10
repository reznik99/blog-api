// TODO: Add support for File Loggin
// TODO: Add support for Log Level filters

export const RedColor = '\x1b[31m';
export const YellowColor = '\x1b[33m';
export const CyanColor = '\x1b[36m';
export const WhiteColor = '\x1b[0m';
export const ResetColor = '\x1b[0m';

export function log_error(message) {
    console.error(`${RedColor}[ERRO] ${new Date().toUTCString()}${ResetColor}`, message)
}

export function log_warning(message) {
    console.warn(`${YellowColor}[WARN] ${new Date().toUTCString()}${ResetColor}`, message)
}

export function log_info(message) {
    console.info(`${CyanColor}[INFO] ${new Date().toUTCString()}${ResetColor}`, message)
}

export function log_debug(message) {
    console.debug(`${CyanColor}[INFO] ${new Date().toUTCString()}${ResetColor}`, message)
}