---
name: heyform
description: "Create and manage forms/surveys on HeyForm via the GraphQL API. Use when you need to programmatically create, update, or query forms on a self-hosted HeyForm instance. Triggers on 'heyform', 'survey form', 'feedback form', 'create a form', 'update form', or any mention of programmatically interacting with HeyForm."
version: 1.0.0
tags:
  - heyform
  - forms
  - surveys
  - api
  - graphql
---

# HeyForm — Self-Hosted API Integration

Programmatic access to a self-hosted HeyForm instance via its GraphQL API. The free community edition doesn't ship an API token system — all auth is session-based via cookies.

## Authentication

Login is a **Query** (not a Mutation) that returns `Boolean!`. It sets session cookies that must be passed in all subsequent requests.

```javascript
const data = JSON.stringify({
  query: '{login(input:{email:"USER",password:"PASS"})}'
});
const req = http.request({
  hostname: '127.0.0.1',
  port: 9157,
  path: '/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
    'x-device-id': 'your-device-id-here'  // Required for all requests
  }
}, res => {
  const setCookies = res.headers['set-cookie'] || [];
  // Capture cookies: setCookies.map(c => c.split(';')[0]).join('; ')
});
```

**Required headers for every request:**
- `Content-Type: application/json`
- `x-device-id: <any-string>` — the API requires this; use a stable ID per script
- `Cookie: <session-cookies>` — pass cookies from login on all subsequent requests

## Key enums

From `@heyform-inc/shared-types-enums`:

```
FormKindEnum:        SURVEY=1, QUIZ=2, CONTACT=3
InteractiveModeEnum: GENERAL=1, INTERACTIVE=2, POPUP=3
FieldKindEnum:       SHORT_TEXT, LONG_TEXT, NUMBER, YES_NO, MULTIPLE_CHOICE,
                     PICTURE_CHOICE, OPINION_SCALE, RATING, DATE, FILE_UPLOAD,
                     FULL_NAME, EMAIL, URL, PHONE_NUMBER, ADDRESS, COUNTRY,
                     WELCOME, THANK_YOU, STATEMENT, GROUP, PAYMENT, SIGNATURE
```

`OPINION_SCALE` is the NPS/rating field (0-10). Use it with shape:"number" and leftLabel/rightLabel.

## Core operations

### Create a form

```graphql
mutation {
  createForm(input: {
    projectId: "PROJECT_ID",
    name: "Form Name",
    kind: 1,              # SURVEY
    interactiveMode: 1    # GENERAL
  })
}
```

Returns the new form ID as a String.

### Add/update fields (updateFormSchemas)

```graphql
mutation Update($input: UpdateFormSchemasInput!) {
  updateFormSchemas(input: $input) {
    version
    canPublish
  }
}
```

With variables:
```json
{
  "input": {
    "formId": "FORM_ID",
    "version": 1,
    "drafts": [
      {
        "id": "field-id-1",
        "title": [{"type": "text", "text": "Your question"}],
        "kind": "short_text",
        "validations": {"required": true}
      },
      {
        "id": "field-id-2",
        "title": [{"type": "text", "text": "Choose one"}],
        "kind": "multiple_choice",
        "properties": {
          "choices": [
            {"id": "c1", "label": "Yes"},
            {"id": "c2", "label": "No"}
          ],
          "allowMultiple": false,
          "allowOther": false,
          "randomize": false
        }
      }
    ]
  }
}
```

**Version matters.** You must pass the current version number. Get it from `{formDetail(input:{formId:"..."}){version}}`. Incrementing the version doesn't always work — use the current version returned by updateFormSchemas or formDetail.

### Publish a form

```graphql
mutation Publish($input: UpdateFormSchemasInput!) {
  publishForm(input: $input)
}
```

Same input shape as updateFormSchemas, but use the **new version** returned from updateFormSchemas.

### Query a form

```graphql
{
  formDetail(input: {formId: "FORM_ID"}) {
    name
    version
    canPublish
    drafts {
      id
      kind
      title
      properties
    }
  }
}
```

### List projects and teams

```graphql
{ teams { id name } }
{ projects(input: {teamId: "TEAM_ID"}) { id name } }
```

## Gotchas (learned the hard way)

1. **Login is a Query, not a Mutation.** Use `{login(...)}` not `mutation{login(...)}`.
2. **Device ID header is mandatory.** Every request needs `x-device-id`. Without it, you get 403 Forbidden.
3. **Session cookies must persist across requests.** Login sets them; capture and forward on every subsequent call.
4. **Version is per-form, not global.** Get it from formDetail before each updateFormSchemas.
5. **publishForm takes the new version.** Don't reuse the old version number.
6. **Field IDs must be unique and stable.** Use deterministic IDs (e.g., `name-1784784425583-0`) so re-runs are idempotent.
7. **`_drafts` is a JSON string in MongoDB, not an array.** Direct DB updates need `JSON.stringify()`.
8. **The `description` field on a form is NOT settable via the API.** Only through the web UI. Use a welcome/thank-you field instead.
9. **Branding footer is a paid feature.** Free community edition shows "Powered by HeyForm" on every form.

## Direct MongoDB access (when API fails)

Sometimes the API is too restrictive. You can update drafts directly in MongoDB:

```javascript
const f = db.formmodels.findOne({_id: "FORM_ID"});
const drafts = JSON.parse(f._drafts);
drafts[1] = {
  id: drafts[1].id,
  title: ["New question text"],
  kind: "opinion_scale",
  properties: {
    start: 0,
    total: 10,
    shape: "number",
    leftLabel: "Not at all likely",
    rightLabel: "Extremely likely"
  }
};
db.formmodels.updateOne(
  {_id: "FORM_ID"},
  {$set: {
    "fields.1.kind": "opinion_scale",
    "fields.1.properties": drafts[1].properties,
    _drafts: JSON.stringify(drafts)
  }}
);
```

Update both `fields[N]` (what the rendered form reads) and `_drafts` (what the editor reads). They need to stay in sync.

## Reference: working deploy script

See `references/deploy-script.js` for a full working example that:
- Logs in
- Creates a project
- Creates a form
- Adds 6 fields (short_text, opinion_scale NPS, long_text, long_text, multiple_choice, long_text)
- Publishes
