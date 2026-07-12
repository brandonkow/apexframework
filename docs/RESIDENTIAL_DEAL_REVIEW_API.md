# Residential Deal Review API

`POST /api/internal/residential-deal-review` is the private, versioned boundary between the Apex customer workspace and the Jarvis decision engine. It was introduced in Jarvis package `10.1.0`; Decision Packs continue to report the framework engine as `Apex v10.10`.

## Authentication

Send the service secret configured as `APEX_WORKSPACE_SERVICE_TOKEN`:

```text
Authorization: Bearer <service-token>
Content-Type: application/json
```

The token is server-to-server only. It must never be sent to a browser or stored in Supabase client-visible configuration.

## Contract

The current contract is `residential-deal-review.v1`. The request schema is stored in `contracts/residential-deal-review.v1.schema.json`.

```json
{
  "contractVersion": "residential-deal-review.v1",
  "requestId": "workspace-review-id",
  "assetClass": "residential",
  "dealCard": {
    "projectName": "Example Residence",
    "area": "Petaling Jaya",
    "propertyType": "Condominium",
    "askingPrice": "RM500000"
  },
  "financialProfile": {
    "monthlyIncome": "RM12000",
    "riskStyle": "Conservative"
  },
  "evidence": []
}
```

Jarvis validates the residential boundary, runs the same deterministic framework used by the public Deal Report, enriches the result with owner-curated knowledge, and returns a bounded `DecisionPacket`. Internal calls do not create Jarvis sessions, consume Jarvis report credits, invoke an LLM, or send customer inputs to an external embeddings service. Owner knowledge matching uses local lexical retrieval for this route.

The packet includes:

- Recommendation, verdict, confidence, and input completeness.
- Price position, offer anchor, maximum offer, and walk-away condition.
- Decision dimensions, scenarios, and financing stress.
- Evidence score and six evidence lanes.
- Hard stops, blockers, watchouts, missing proof, and next actions.
- Due-diligence and execution plans.
- Buyer-supplied and owner-curated source references.

Only the Apex workspace should persist customer deal state. Jarvis remains the framework and reasoning service.
