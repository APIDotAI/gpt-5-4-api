# Production Notes

- Keep APIDot API keys in server-side environment variables.
- Never commit real credentials, customer data, test environment URLs, or internal callback URLs.
- Persist request and response metadata so support can reconcile model, usage, and errors.
- Apply input validation before calling APIDot.
- Use exponential backoff for transient network failures.
- Do not retry unchanged invalid requests.
