import * as Sentry from "@sentry/browser";

// determine what to do
const log_to_sentry = window.SENTRY_ENABLED && window.SENTRY_DSN;
const log_to_console = process.env.NODE_ENV !== "production";

// make sure we can still access the original print functions
const print = {
  error: console.error,
  info: console.info,
  warn: console.warn,
  debug: console.debug,
  log: console.log,
};

// Handler for console.log-type calls
const createLogger = (level) => {
  const levelLogger =
    level === Sentry.Severity.Error
      ? print.error
      : level === Sentry.Severity.Warning
      ? print.warn
      : level === Sentry.Severity.Info
      ? print.info
      : level === Sentry.Severity.Debug
      ? print.debug
      : print.log;

  return (...msgs) => {
    try {
      if (log_to_console) {
        levelLogger(...msgs);
      }
    } catch (e) {
      print.error(e);
    }
  };
};

// Let the developer know what we're doing
log_to_console && console.log("redirecting console output");

// Redirect logging
console.error = createLogger(Sentry.Severity.Error);
console.info = createLogger(Sentry.Severity.Info);
console.warn = createLogger(Sentry.Severity.Warning);
console.debug = createLogger(Sentry.Severity.Debug);
console.log = createLogger(Sentry.Severity.Log);

// Attach Sentry. Do this after redirecting as Sentry will overwrite the `console.log`-type functions
// again to store messages as breadcrumbs.
// It then passes the messages to the overridden functions above.

if (log_to_sentry) {
  console.log("Initiating Sentry");

  const sentry_config = {
    dsn: window.SENTRY_DSN,
    environment: window.SENTRY_ENVIRONMENT,
    release: window.SENTRY_RELEASE,
  };
  Sentry.init(sentry_config);
  if (log_to_console) {
    print.log("Sentry config:", sentry_config);
  }
}

// Some possibly relevant information
console.log("console output redirected");
console.log(`stage is '${process.env.NODE_ENV}'`);
console.log(`Logging to console is ${log_to_console ? "enabled" : "disabled"}`);
console.log(`Sentry is ${log_to_sentry ? "enabled" : "disabled"}`);

/**
 * send errors on keypress
 * uncomment for debugging
 */
/*
window.addEventListener("keydown", (e) => {
  if (e.key === "e") {
    throw new Error("test");
  }
  if (e.key === "r") {
    setTimeout(() => {
      throw new Error("test");
    }, 10);
  }
});
*/
