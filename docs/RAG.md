# Real Estate RAG Draft

## Purpose

The app includes a local retrieval layer that answers investment questions from a curated knowledge base. It does not require an external vector database. When OpenAI mode is enabled, the server sends the current question, submitted deal/profile context, and selected retrieval context to OpenAI for response generation; the API key remains server-side.

Retrieval is only one part of the EstateLab second brain. Retrieved material is evidence or prior guidance, not the final judgment. The thinking-partner records in the selected runtime store capture the investor's answers, testable beliefs, and decisions so later discussions can challenge and improve them.

The public Jarvis frontend is read-only. User prompts query the curated backend knowledge but are not stored as source knowledge, beliefs, decisions, properties, or comparable data. Chat history remains separate conversation memory, protected by a guest browser identity or member authentication. Backend knowledge curation is owner-only.

## Current Flow

1. Keep canonical framework guidance in `rag/corpus.json`.
2. Upload owner evidence through `POST /api/owner/documents`; originals stay in `ESTATELAB_OBJECT_DIR`.
3. Extract text-compatible files, split them into overlapping chunks, and generate embeddings when configured.
4. Retrieve owner chunks with hybrid semantic and lexical scoring, alongside framework references, beliefs, and decisions.
5. Return source metadata with every relevant answer and log retrieval mode, source IDs, and latency without retaining the raw question in monitoring.

## Scaling Beyond The Current Index

The current implementation already supports embeddings without requiring an external vector database. At larger corpus sizes:

1. Add extraction for PDF and office formats.
2. Move chunk vectors to PostgreSQL with a vector extension or a dedicated vector service.
3. Add source recency, geography, evidence grade, and supersession metadata.
4. Measure retrieval precision from owner feedback before changing ranking weights.
5. Add contradiction and stale-evidence detection across sources and beliefs.

## Suggested Corpus Sources

- Personal buy box and target markets
- Rent comparables and lease notes
- Lender term sheets
- Insurance quotes
- Inspection summaries
- Rehab scopes and contractor bids
- Local property tax rules
- Investor decision rules and risk limits
- Decision journals and post-mortems
- Beliefs with confidence, scope, contrary evidence, and falsifiers
- Geographic context modules, including Malaysia-specific due-diligence categories

## Guardrails

- Treat outputs as decision support, not financial, legal, or tax advice.
- Cite source chunks in every answer.
- Flag missing assumptions instead of inventing them.
- Separate factual retrieval from model-generated recommendations.
- Keep personally identifying tenant or seller information out of the corpus unless storage is encrypted and access-controlled.
- Do not allow public users to mutate the knowledge base. Owner API access requires the configured owner token.
