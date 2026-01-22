"use client";

import { useState } from "react";
import { cx } from "../../utils/cx";

/**
 * EmailSubmit - Email capture form with validation
 *
 * @param {"demo"|"subscribe"} [intent="subscribe"] - Form intent
 * @param {function} [onSubmit] - Submit handler (receives email, intent)
 * @param {string} [placeholder] - Custom placeholder text
 * @param {string} [buttonText] - Custom button text
 * @param {string} [successMessage] - Custom success message
 * @param {string} [errorMessage] - Custom error message
 * @param {string} [className] - Additional classes
 *
 * @example
 * // Basic subscription form
 * <EmailSubmit
 *   intent="subscribe"
 *   onSubmit={(email) => handleSubscribe(email)}
 * />
 *
 * // Demo request form
 * <EmailSubmit
 *   intent="demo"
 *   onSubmit={(email) => handleDemoRequest(email)}
 * />
 */
export default function EmailSubmit({
  intent = "subscribe",
  onSubmit,
  placeholder,
  buttonText,
  successMessage = "Thanks for signing up! Someone from the team will be in touch soon.",
  errorMessage = "Double check that email — it doesn't seem quite right.",
  className = "",
}) {
  const [emailState, setEmailState] = useState("empty");

  const defaultPlaceholder = intent === "demo" ? "Enter your email" : "Sign up for updates";
  const defaultButtonText = intent === "demo" ? "Request a demo" : "Submit";

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!validateEmail(email)) {
      setEmailState("error");
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(email, intent);
      }
      setEmailState("success");
    } catch (error) {
      setEmailState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-row">
        <label htmlFor="email-address" className="sr-only">
          {intent === "demo" ? "Request a demo" : "Subscribe"}
        </label>
        <div className="relative flex border border-rule-color rounded-lg w-full max-w-lg mx-auto">
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={emailState === "success"}
            className={cx(
              "h-10 w-full flex rounded-lg py-2.5 pl-4 pr-20 text-sm tracking-wide font-brand font-light placeholder-body-text-lighter bg-white",
              emailState === "success" && "opacity-50"
            )}
            placeholder={placeholder || defaultPlaceholder}
          />
          <button
            type="submit"
            disabled={emailState === "success"}
            className={cx(
              "absolute right-0 top-0 h-full text-white bg-body-text rounded-r-lg text-sm px-4 py-2.5 text-center inline-flex items-center transition-colors",
              emailState === "success"
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-body-text-light"
            )}
          >
            {buttonText || defaultButtonText}
          </button>
        </div>
      </div>

      {/* Feedback messages */}
      {emailState === "error" && (
        <div className="my-4 w-full max-w-lg mx-auto rounded-md bg-red-10 p-4 text-center text-sm tracking-wide font-brand">
          <span className="font-semibold text-red">Oops!</span>
          <br />
          <span className="text-body-text-light">{errorMessage}</span>
        </div>
      )}

      {emailState === "success" && (
        <div className="my-4 w-full max-w-lg mx-auto rounded-md bg-green-10 p-4 text-center text-sm tracking-wide font-brand">
          <span className="font-semibold text-green">Success!</span>
          <br />
          <span className="text-body-text-light">{successMessage}</span>
        </div>
      )}
    </form>
  );
}

/**
 * EmailSubmitInline - Compact inline email capture
 *
 * @param {function} [onSubmit] - Submit handler
 * @param {string} [placeholder] - Placeholder text
 * @param {string} [className] - Additional classes
 */
export function EmailSubmitInline({
  onSubmit,
  placeholder = "Enter your email",
  className = "",
}) {
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!validateEmail(email)) return;

    if (onSubmit) {
      await onSubmit(email);
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={cx("text-sm text-green font-medium", className)}>
        Thanks! We'll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cx("flex gap-2", className)}>
      <input
        name="email"
        type="email"
        required
        placeholder={placeholder}
        className="flex-1 h-9 px-3 text-sm rounded-md border border-rule-color bg-white font-light"
      />
      <button
        type="submit"
        className="h-9 px-4 text-sm font-medium bg-body-text text-white rounded-md hover:bg-body-text-light transition-colors"
      >
        Submit
      </button>
    </form>
  );
}
