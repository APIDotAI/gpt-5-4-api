# GPT 5.4 API with APIDot

GPT 5.4 API examples with APIDot: cURL, Node.js, request fields, responses, and production notes.

[Try on APIDot](https://apidot.ai/models/gpt-5-4) | [Get API Key](https://apidot.ai/dashboard/api-key) | [API Docs](https://apidot.ai/docs/gpt-5-4) | [Pricing](https://apidot.ai/pricing) | [Main Examples](https://github.com/APIDotAI/apidot-examples)

## Why this repo exists

OpenAI GPT 5.4 API for efficient professional task execution, spreadsheet and document analysis, tool-oriented planning, code/test handoffs, streaming, and OpenAI-compatible chat completions.

This repository turns that APIDot workflow into runnable server-side examples: a cURL request, a native Node.js example, request fields, response handling notes, and production integration guardrails.

## Overview

GPT 5.4 is OpenAI's frontier model for efficient professional work, combining broad reasoning with coding and agentic strengths from the GPT-5.3-Codex line. It is designed for work that should produce an action plan, review, handoff, or structured operational answer rather than casual chat.

Choose GPT 5.4 for spreadsheet and document reasoning, legal or financial material review, coding plans, browser-operation plans, tool selection, and professional workflows that need reliable judgment without always escalating to GPT 5.5. It is the middle ground between cheaper bulk models and the most expensive long-horizon option.

On APIDot, call `gpt-5.4` through OpenAI-compatible text chat. The page centers on `POST /v1/chat/completions` with Bearer authentication, also documents the configured Responses-compatible path, and keeps hosted Computer Use, web search, visual input UI, and file upload outside the current APIDot page contract.

## Endpoint

`POST /v1/chat/completions`

Send OpenAI-compatible chat completions requests to GPT 5.4 for professional task execution, spreadsheet and document analysis, tool planning, and coding handoffs.

## Best practices

- Use `gpt-5.4` for professional tasks such as spreadsheet review, legal or finance material analysis, tool-selection plans, browser-operation handoffs, and implementation planning.
- Give the model the business objective, evidence, tool constraints, expected output format, and verification criteria instead of asking for a generic answer.
- Use `/v1/chat/completions` for OpenAI-compatible chat clients and APIDot playground parity; use `/v1/responses` only when your client already models work as Responses-style execution.
- Read assistant text from `choices[0].message.content`, or from `data.choices[0].message.content` if your response payload is wrapped.
- Use `usage.prompt_tokens` and `usage.completion_tokens` to route GPT 5.4 as a professional-work model between cheaper bulk models and GPT 5.5.
- Set `stream: true` only when your client is prepared to consume streaming chat completion events.

## Quick start

```bash
cp .env.example .env
# Edit .env and set APIDOT_API_KEY
cd node
npm start
```

Use [curl/generate.md](curl/generate.md) when you want a copy-paste cURL request instead of Node.js.

## Minimal API request

Submit to APIDot:

```bash
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

Primary payload:

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

## Request variants

### gpt-5.4

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

## Request parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| model | string | yes | Target model ID. Use `gpt-5.4`. |
| messages | object[] | yes | Conversation array in OpenAI-compatible chat format. Include the objective, evidence, tool constraints, and desired professional output. |
| messages[].role | string | yes | Message role. Use `system`, `user`, or `assistant`. |
| messages[].content | string | yes | Text content for the message. |
| temperature | number | no | Sampling temperature, usually between 0 and 2. |
| top_p | number | no | Nucleus sampling value, usually between 0 and 1. |
| max_tokens | integer | no | Maximum output tokens to return. Increase it for spreadsheet audits, professional memos, or implementation plans. |
| stream | boolean | no | Set `true` to receive streaming chat completion events. |

## Response fields

| Field | Type | Description |
| --- | --- | --- |
| id | string | Chat completion response ID. |
| choices[].message.content | string | Generated assistant text. |
| choices[].finish_reason | string | Reason generation stopped. |
| usage.prompt_tokens | integer | Input token count billed at the GPT 5.4 input rate. |
| usage.completion_tokens | integer | Output token count billed at the GPT 5.4 output rate. |
| usage.total_tokens | integer | Total token count across input and output. |

## Example response

```json
{
  "id": "chatcmpl_1234567890",
  "object": "chat.completion",
  "model": "gpt-5.4",
  "choices": [{"index": 0, "message": {"role": "assistant", "content": "Start by checking the model assumptions, then verify the variance drivers..."}, "finish_reason": "stop"}],
  "usage": {"prompt_tokens": 126, "completion_tokens": 228, "total_tokens": 354}
}
```

## Error classes

| Code | Name | Description |
| --- | --- | --- |
| 401 | Unauthorized | Missing, invalid, or disabled APIDot API key. |
| 400 | Invalid request | The request body is missing required fields, or the requested API path is not supported for this model. |
| 402 | Insufficient credits | The account does not have enough credits for the requested token usage. |
| 500 | Service error | The GPT 5.4 request failed or timed out. |

## Production notes

- Keep APIDot API keys in server-side environment variables.
- Persist selected model, request payload, user ID, and response metadata together for support and cost review.
- Avoid logging API keys, private prompts, customer data, private media URLs, or internal callback URLs.
- Validate request fields before sending traffic to APIDot.
- Retry transient network failures with backoff, but do not retry unchanged invalid payloads.

## Common mistakes

- Committing a real API key or `.env` file.
- Calling APIDot directly from browser code instead of a server-side environment.
- Logging private prompts, customer data, API keys, or internal callback URLs.
- Reusing request fields from another model without checking this model's docs.

## FAQ

### Which GPT 5.4 model ID can I send?

Send `gpt-5.4` in the `model` field.

### What authentication header should I use?

Use `Authorization: Bearer $APIDOT_API_KEY` when calling `/v1/chat/completions`.

### When should I use `/v1/chat/completions` instead of `/v1/responses`?

Use `/v1/chat/completions` for OpenAI-compatible chat clients and APIDot playground parity. Use `/v1/responses` when your integration already depends on Responses-style workflow state.

### Does this docs page expose Computer Use, web search, or file upload UI?

No. This APIDot docs page documents text chat completions and the configured Responses path. It does not expose hosted Computer Use, web search, file upload UI, or a platform-level agent environment.

### Can I stream responses?

Yes. Set `stream: true` to receive streaming chat completion events.

### How is usage reported?

Read `usage.prompt_tokens`, `usage.completion_tokens`, and `usage.total_tokens` from the response for cost tracking and model routing.

## Related links

- Website: https://apidot.ai
- Docs: https://apidot.ai/docs
- GPT 5.4 docs: https://apidot.ai/docs/gpt-5-4
- GPT 5.4 model page: https://apidot.ai/models/gpt-5-4
- GitHub organization: https://github.com/APIDotAI
- Main examples: https://github.com/APIDotAI/apidot-examples
