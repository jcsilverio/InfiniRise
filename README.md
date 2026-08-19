# InfiniRise Studios — website

Public site for [infinirisestudios.com](https://infinirisestudios.com). Hosted on GitHub Pages from this repo.

Add the `CNAME` file (`infinirisestudios.com`) **after** apex A records point at GitHub Pages. Adding it first creates a redirect loop with Squarespace forwarding.

Apex DNS must stay on GitHub Pages A records. **Do not edit MX or TXT** — email forwarding for `contact@infinirisestudios.com` runs on Mailgun under the domain, not the Squarespace site trial.
