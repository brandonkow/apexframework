# Apex Monetization

This phase adds product entitlements without coupling Apex Analytic to one payment company.

## Plans

Default plan settings:

| Plan | Monthly Price | Deal Reports | Saved History |
| --- | ---: | ---: | ---: |
| Free | RM0 | 3 per month | 5 |
| Pro | RM59 | 30 per month | 50 |
| Advisor | RM199 | 150 per month | 200 |

Prices are display values and can be changed with `APEX_PRO_PRICE_RM` and `APEX_ADVISOR_PRICE_RM`. Report limits are server-owned product rules.

## Safe Launch Order

1. Deploy with `APEX_BILLING_ENFORCEMENT=false`.
2. Create Pro and Advisor checkout pages with the selected payment provider.
3. Set `APEX_PRO_CHECKOUT_URL` and `APEX_ADVISOR_CHECKOUT_URL` in Render.
4. Generate a long random `APEX_BILLING_WEBHOOK_SECRET`.
5. Connect the provider, Make, Zapier, or another trusted server automation to the Apex billing webhook.
6. Test activation, duplicate events, cancellation, failed payment, and account matching.
7. Only then set `APEX_BILLING_ENFORCEMENT=true`.

With enforcement disabled, Apex records usage and saves reports but does not block analysis. With enforcement enabled, guests must sign in and accounts must have monthly allowance or report credits.

## Checkout Handoff

Checkout URLs may contain these placeholders:

- `{email}`: encoded signed-in email.
- `{userId}`: encoded Apex account ID.
- `{plan}`: `pro` or `advisor`.

Example:

```text
https://checkout.example/pro?email={email}&account={userId}&plan={plan}
```

The checkout action happens only after the signed-in user presses an upgrade button.

## Billing Webhook

Send JSON to:

```text
POST /api/billing/webhook
Authorization: Bearer YOUR_APEX_BILLING_WEBHOOK_SECRET
Content-Type: application/json
```

Subscription activation example:

```json
{
  "eventId": "provider-event-123",
  "email": "member@example.com",
  "plan": "pro",
  "status": "active",
  "externalCustomerId": "customer-123",
  "externalSubscriptionId": "subscription-123"
}
```

Cancellation example:

```json
{
  "eventId": "provider-event-124",
  "email": "member@example.com",
  "plan": "pro",
  "status": "canceled",
  "externalCustomerId": "customer-123",
  "externalSubscriptionId": "subscription-123"
}
```

One-off report credits can be added with `creditsDelta`. Every `eventId` is recorded and duplicate delivery is ignored, so provider retries do not apply the same update twice.

## Report History

Every signed-in analysis is stored privately on the account. Reports can be reopened, printed, compared, or deleted. Free history keeps the latest 5 reports, Pro keeps 50, and Advisor keeps 200.

Report history, usage, billing identifiers, and long-term memory are private account data. They are not added to the shared Apex knowledge base and are not exposed through owner user-list responses.

## Administration

The owner user-update API accepts `plan`, `planStatus`, and `reportCredits` for testing or manual customer service. Never expose the owner token in the browser.
