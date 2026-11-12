You are the copywriter for the official website of the mobile game Dashnut. Write the UI text of the new contact page at /contact (German: /de/contact). It is a simple form that sends a message to the developer by email: help with the game, questions about the full game purchase or restoring it, feedback, privacy requests, or anything else. It is the second contact channel next to email that German law asks for, so it must read as a real, direct way to reach the developer. The page sits in the site's warm wooden look (the mill at golden hour). Do not use tools. Reply with JSON only, no markdown fences.

{{FACTS}}

Voice: playful, warm and confident, but plain and helpful on this page; short and concrete; "you" (German: du); no marketing clichés, no emojis, no exclamation marks; no hyphens or dashes as punctuation (words that need a hyphen in normal spelling are fine, like "E-Mail" in German); no invented facts. Do not promise when or whether the developer replies, and do not name a response time. Do not use the developer's name and never refer to the developer with a pronoun (no he/she, er/sie); write around it, for example "the developer" or passive phrasing ("any reply comes by email"). Proper nouns stay unchanged in German: Dashnut, Google Play, App Store, Cloudflare.

German is a natural adaptation, not a literal translation. German terms as in the game and the rest of the site: the full game is „Vollversion“; the button is „Käufe wiederherstellen“; the settings are „Einstellungen“; „Datenschutzerklärung“ for the privacy policy; „E-Mail“, „E-Mail-Adresse“.

Keys and intents (word counts are approximate maxima). Keep labels short.

- site_footer_contact: footer link label to this page, one word ("Contact")
- contact_meta_title: HTML title, short, in the style of the existing "Dashnut Support" (for example "Contact Dashnut")
- contact_meta_description: meta description (22 words): write to the developer of Dashnut about the game, the full game, feedback or privacy
- contact_title: big page heading, one or two words
- contact_intro: one or two sentences under the heading (30 words): what you can write about here; the answer comes by email
- contact_topic_legend: legend of the topic choice (what is it about)
- contact_topic_support: topic option, help with the game (a problem or a question about playing)
- contact_topic_purchase: topic option, the full game: buying or restoring it
- contact_topic_feedback: topic option, feedback and ideas
- contact_topic_privacy: topic option, privacy and your data
- contact_topic_other: topic option, something else (including business requests)
- contact_name_label: field label, your name
- contact_email_label: field label, your email address
- contact_email_hint: tiny hint under the email field: only used to reply to you
- contact_message_label: field label, your message
- contact_message_placeholder: placeholder inside the empty message box (15 words), a short inviting start; for a problem, mention that the phone model and app version help
- contact_honeypot_label: label of a hidden spam trap field that only bots see; tells humans to leave it empty
- contact_submit: submit button
- contact_sending: submit button while sending
- contact_error_topic: inline error, choose a topic
- contact_error_name: inline error, name missing
- contact_error_email: inline error, email address missing or invalid
- contact_error_message: inline error, message missing or too short (at least a few words)
- contact_error_turnstile: inline error, the Cloudflare check that you are human did not work or is not finished yet, try again
- contact_error_failed: error after submitting (20 words): the message could not be sent, try again later or write an email instead (the email address is shown right after this text)
- contact_noscript: shown when JavaScript is off (20 words): the form needs JavaScript for its spam check; you can write an email instead (the email address follows right after this text)
- contact_privacy_note: one short sentence before a link: where to read how the data from this form is handled (the link text follows right after)
- contact_privacy_link: link text, the privacy policy
- contact_success_title: heading after sending, short
- contact_success_body: one sentence after sending: the message arrived and any answer comes to the email address you gave (no promise about a reply or its time)
- contact_success_again: button to write another message
- support_form_text: one sentence on the support page under the email button (18 words): you can also use the contact form instead of an email (a link follows right after)
- support_form_link: link text to the contact form, two or three words

Output: {"en": {"key": "value", ...}, "de": {"key": "value", ...}} with all keys in both locales, in the order above.
