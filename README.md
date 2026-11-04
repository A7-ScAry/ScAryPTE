# ScAry PTE v6 — independent PTE practice + optional AI diagnostics

**What this is:** a neutral grey, original PTE practice website with 6,450 original / template-derived items in 22 question categories, preparation/speaking timers, microphone recording, offline answer checking and optional server-backed **real AI trait measurements**.

**What this is not:** APEUni's AI, Pearson's official exam scoring engine, a verified 10–90 PTE score predictor, an official question bank, or a guaranteed free AI service. The website is not affiliated with Pearson or APEUni.

## What changed in v6

- **Azure Speech Pronunciation Assessment integration:** When the site owner configures Azure credentials, spoken practice can produce 0–100 diagnostic values for accuracy, fluency, prosody, pronunciation, completeness (for scripted exercises), and per-word notes. Longer recordings use continuous recognition. This is independent Azure scoring, **not PTE exam scoring**.
- **AI language review:** With a configured OpenAI API key, selected writing tasks and open spoken transcripts receive AI feedback on content, grammar, vocabulary, coherence, and form (0–100 *diagnostic scores*), with improvement notes. It does not assess speaking pronunciation.
- **Private credentials:** Keys are stored in server environment variables, not sent to browser JavaScript. Azure browser SDK obtains a temporary token from a serverless API. Optional `SCARY_ACCESS_PIN` restricts provider use for personal use, although it is **not** an adequate authentication system for a large public site.
- **Clear status and fallback:** If APIs are not configured or are unreachable, the website continues in **offline practice mode** and does not claim AI scores were calculated.

## Run on your Mac (local testing)

1. Install Node.js 20+ if you do not already have it.
2. Unzip the folder; open Terminal and `cd` into the folder containing `server.js`.
3. Copy `.env.example` to `.env`, edit `.env` with your private provider credentials. Leave a provider's values blank if you only want offline practice. Never upload `.env` to GitHub.
4. Run `node server.js`.
5. Open **http://localhost:3000** in Google Chrome. Allow microphone access. Go to Settings → AI scoring providers to check connection status.

If you open `index.html` directly, the question bank and local tools work, but the `/api` endpoints and real AI integrations do **not**. Use localhost or HTTPS for microphone capture.

## Deploy to Vercel

1. Create a **private GitHub repository** for the full folder. You can make the deployed website public, but protecting the repository is helpful while you configure secrets.
2. In Vercel, import the GitHub repository. Choose **Other** framework; leave the root as the folder containing `index.html`, `api/` and `vercel.json`. No build command is required.
3. In Vercel Project → Settings → Environment Variables, add these **server secrets**:

   | Variable | Purpose |
   | --- | --- |
   | `AZURE_SPEECH_KEY` | Azure AI Speech resource API key |
   | `AZURE_SPEECH_REGION` | Azure resource region, e.g. `eastus` (use **your actual** resource region) |
   | `OPENAI_API_KEY` | OpenAI API key with usage enabled |
   | `OPENAI_MODEL` | Model identifier supporting structured output (default `gpt-4.1-mini`) |
   | `SCARY_ACCESS_PIN` | Optional private PIN guarding provider endpoints for individual testing |

4. Redeploy after saving environment variables. HTTPS is enabled for the Vercel domain.
5. In ScAry PTE Settings, optionally enter `SCARY_ACCESS_PIN` then click **Save for this tab**. Press **Check connection**. Start Read Aloud and allow microphone permission.

**Never put provider secret keys in `.html`, `app.js`, `ai.js`, public repos, query strings, or client-side storage.** The browser receives only a temporary Azure bearer token, which is time-limited but still grants service access while it remains valid. A privately shared PIN is not robust authentication; for public traffic, integrate accounts, per-user quotas, rate limiting and abuse detection before enabling paid API usage.

## How scoring works

**Offline mode:** local answer matching / spelling / keyword / length rules, summarized as a **heuristic practice index**. Do not treat the 10–90-like offline index as an actual PTE score.

**Speech AI mode:** Azure Speech SDK continuously listens during the recording stage, and returns phonetic and fluency diagnostic traits. It also tries to transcribe responses. For Read Aloud / Repeat Sentence, a reference sentence is supplied. For open speaking tasks, an unscripted assessment is used. Multi-segment trait scores are displayed as unweighted segment means and therefore should not be treated as a calibrated global score. In an exam-style full mock, the score engine still uses local heuristics for the overall summary; AI assessment is most useful in individual practice tasks.

**Language AI mode:** text is processed by an LLM using a fixed diagnostic rubric. Its 0–100 percentages are model judgments with uncertainty, NOT official Pearson conversion. This is only enabled for Write Essay, Summarize Written Text, Summarize Spoken Text, Describe Image, Retell Lecture, Summarize Group Discussion and Respond to a Situation.

**There is no validated formula in this app to transform Azure or language-model outputs into official PTE 10–90 scores.** Doing that responsibly requires paired responses and authentic Pearson scores, representative samples, fairness/accuracy analysis, and ongoing calibration. Pearson's own Scored Practice Test is the only practice test powered by the official exam scoring engine.

## Costs, privacy, and limitations

- Offline practice can be hosted cheaply or for free within the host's limits; **Azure Speech and OpenAI API calls can cost money**. Hosting fees, request limits and rate limits also apply. It is not viable to promise free, unlimited AI scoring to unlimited users without outside funding or hard quotas.
- Speech recognition uses microphone access and transmits audio to Azure when configured; written responses or recognized spoken text are sent to OpenAI when language assessment is enabled. Users should be notified before enabling these services and you must implement an appropriate privacy policy for a public launch. The browser may also use native speech recognition independently.
- No APEUni APIs or private question bank are included. APEUni integration is only possible with an **authorized commercial API/license** from APEUni, if offered.
- The internet connection and provider APIs are necessary for real AI scoring. If access is blocked or keys invalid, feedback shows an error and offline practice still works.
- Azure Speech SDK bundle loads from Microsoft's npm package via jsDelivr at runtime. Network filtering can prevent it from loading.
- These integrations were tested with simulated provider responses and simulated microphone streams. **Live paid-provider requests and actual Mac microphone results have not been verified**, because no live credentials were available.

## Official references

- Pearson PTE scoring: https://www.pearsonpte.com/pte-academic/scoring/
- Pearson official scored practice: https://www.pearsonpte.com/pte-academic/preparation/scored-practice-test/
- Azure pronunciation assessment: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment
- OpenAI Responses API: https://developers.openai.com/api/reference/resources/responses/methods/create
