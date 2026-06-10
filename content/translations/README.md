# Translation Store

Stored translation artifacts live under `content/translations/<locale>/`.

Use this store for LLM-drafted, reviewed, and deployment-stable translations.
Public pages should read committed content or app-local i18n modules, not call a
translation model at request time.

## Draft A Translation

```bash
pnpm i18n:translate --id examples/get-a-quote --text "Get a quote"
pnpm i18n:translate --id insurance/story/example --input source.json --force
```

The script reads `OPENAI_API_KEY` at runtime and writes a JSON artifact with:

- source and target locale
- source hash
- source chunks
- translated chunks
- reconstructed translation
- model and response metadata
- `draft` or `reviewed` status

## Check Stored Translations

```bash
pnpm i18n:check
```

The check is deterministic and does not call the OpenAI API. It validates stored
artifact shape, source hashes, translated chunk coverage, and non-empty
translated text.
