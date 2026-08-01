/**
 * PayU handoff.
 *
 * PayU's hosted checkout is a plain form POST, not a JS modal — there's no
 * script to load and nothing to configure client-side. The backend signs the
 * fields (the salt never leaves the server); all we do is post them and let the
 * browser navigate to PayU. The result comes back to the backend's callback,
 * which redirects to /thank-you.
 */

export interface PayuHandoff {
  /** PayU's payment endpoint — test or production, decided by the backend */
  action: string;
  /** signed form fields, including the hash */
  params: Record<string, string>;
}

/**
 * Submit the signed fields to PayU. This navigates away from the SPA, so
 * nothing after the call will run — clear any local state first.
 */
export function redirectToPayu({ action, params }: PayuHandoff): void {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = action;
  form.style.display = 'none';
  // PayU signs bytes, so the form must post back in the same encoding.
  form.acceptCharset = 'UTF-8';

  for (const [name, value] of Object.entries(params)) {
    const input = document.createElement('input');
    input.type  = 'hidden';
    input.name  = name;
    input.value = value ?? '';
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}
