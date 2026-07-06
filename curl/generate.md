# GPT 5.4 cURL Quickstart

## What this example shows

This example shows how to call GPT 5.4 through APIDot with a server-side API key.

## Requirements

- An APIDot account.
- An APIDot API key stored server-side.
- `curl` installed locally.
- A backend or terminal environment that does not expose API keys to browser code.

## Environment variables

Use placeholders only. Do not commit real credentials.

```env
APIDOT_API_KEY=YOUR_API_KEY_HERE
```

## How to run

```bash
export APIDOT_API_KEY="YOUR_API_KEY_HERE"

curl --fail-with-body --request POST \
  --url https://api.apidot.ai/v1/chat/completions \
  --header "Authorization: Bearer $APIDOT_API_KEY" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "gpt-5.4",
  "messages": [
    {
      "role": "system",
      "content": "You are a professional workflow assistant."
    },
    {
      "role": "user",
      "content": "Review this quarterly spreadsheet narrative. Identify formula assumptions to verify, finance risks, and the next checks an analyst should run."
    }
  ],
  "max_tokens": 1024
}'
```

## Payload

```json
{
  "model": "gpt-5.4",
  "messages": [
    {
      "role": "system",
      "content": "You are a professional workflow assistant."
    },
    {
      "role": "user",
      "content": "Review this quarterly spreadsheet narrative. Identify formula assumptions to verify, finance risks, and the next checks an analyst should run."
    }
  ],
  "max_tokens": 1024
}
```

## Expected response

```json
{
  "id": "chatcmpl_1234567890",
  "object": "chat.completion",
  "model": "gpt-5.4",
  "choices": [{"index": 0, "message": {"role": "assistant", "content": "Start by checking the model assumptions, then verify the variance drivers..."}, "finish_reason": "stop"}],
  "usage": {"prompt_tokens": 126, "completion_tokens": 228, "total_tokens": 354}
}
```

## Production notes

- Keep APIDot API keys on the server side only.
- Store selected model, request payload, user ID, and response metadata together.
- Avoid logging private prompts, customer data, API keys, or internal callback URLs.

## Related links

- Website: https://apidot.ai
- Docs: https://apidot.ai/docs
- GPT 5.4 docs: https://apidot.ai/docs/gpt-5-4
- GPT 5.4 model page: https://apidot.ai/models/gpt-5-4
