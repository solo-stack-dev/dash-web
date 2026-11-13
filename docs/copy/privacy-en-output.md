Last updated: 13 November 2026

## 1. Privacy at a glance

This policy covers Dashnut, the mobile game for Android via Google Play and the planned iOS version via the App Store, and its official website. It describes the current app version 1.0.

You can play offline without an account. Progress, records, personal best replays, settings and the full game unlock status are saved on your device. The app does not send personal data or gameplay data to me, and I run no server for the app.

On Android, Google Play handles the optional full game purchase. The Google Play Billing Library also sends technical billing diagnostics to Google, including when it connects at app start or when you return to the app. I do not receive these diagnostics. Google separately makes order information available to me as the seller.

The website processes technical connection data to deliver and protect its pages. If you contact me, I process your message to handle your request. The contact form uses Cloudflare Turnstile for spam protection, which starts loading when you interact with the form or submit it.

## 2. Who is responsible and how to contact me

I am Peter Ruß, operating the one person studio Solo Stack. I am the controller responsible for the processing described in this policy unless another provider is identified as an independent controller.

Peter Ruß  
c/o POSTFLEX PFX-656-644  
Emsdettener Straße 10  
48268 Greven  
Germany  

Email: [business@solo-stack.dev](mailto:business@solo-stack.dev)  
Contact form: [Contact](/contact)

You can use either channel for support, privacy questions and requests to exercise your rights.

## 3. Data on your device

### Local game data

Dashnut stores the following in the app’s private storage on your device:

* Game progress, personal best times and medals.
* Replays of your personal best runs, used for the optional personal best ghost.
* Collected acorns.
* Settings, such as language, sound, ghost visibility and haptic feedback.
* The full game unlock status, including the product, whether it is unlocked, its source and the time of the last update. This contains no payment data or Google account data.

This locally saved data does not leave your device through the app, and I cannot access it. Storing and accessing it is strictly necessary to provide the game you requested, under section 25(2) no. 2 of the German Telecommunications Digital Services Data Protection Act, or TDDDG.

The current version has no user accounts, analytics or tracking, and no third party SDKs for analytics. The only third party component in the app that communicates is the Google Play Billing Library on Android, described in section 4. The game code itself makes no network requests.

### Resetting, uninstalling and backups

“Reset records” in Settings deletes your records and progress after confirmation. It keeps your settings and the full game unlock.

Uninstalling the app deletes its data from your device. On Android, you can restore a purchased full game through “Restore purchases” in Settings using the same Google account. Resetting records does not remove your purchase.

Android backup is disabled. Saves are not included in Android or Google backups, so your progress stays on the device. The purchase itself remains restorable through Google Play.

On iOS, depending on your device settings, iCloud device backups may include app data. Apple handles those backups under its own terms, and I have no access to them. Deleting app data or uninstalling the app does not determine what remains in separately managed iCloud backups.

### Android permissions

The Android app declares four permissions:

* **Vibration**, for optional haptic feedback.
* **Google Play billing**, for the optional one time full game purchase.
* **Internet access**, for Google Play billing and its technical diagnostics.
* **Network status access**, for Google Play billing and its technical diagnostics.

The Google Play Billing Library adds the last three permissions.

The app does not access your location, contacts, camera, microphone, photos or advertising ID. Its dependencies include Google Play services components, including a location library, but the app declares no location permission and does not access location.

### Links opened from the app

The About screen may open the support page or this policy in your browser. When you visit those pages, the website processing described below applies.

## 4. Optional full game purchase on Android

### Buying, checking and restoring the purchase

Dashnut is a free download with one optional one time purchase called the “full game”, which unlocks the remaining courses.

The purchase is made and paid entirely through Google Play, operated by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Google acts as an independent controller for your Google account, payment method and the purchase itself under its own terms and [Google Privacy Policy](https://policies.google.com/privacy).

The app uses the Google Play Billing Library to offer and check the purchase. When the app starts or returns to the foreground, and when you buy or select “Restore purchases”, it asks Google Play on the device for product details and the price, and whether your Google account owns the full game. It also confirms a new purchase to Google Play using the purchase token Google issued.

This exchange takes place between the app and Google Play. I do not receive it. The legal basis for providing and checking the purchased content is Article 6(1)(b) GDPR. Necessary device access for the purchase function is based on section 25(2) no. 2 TDDDG.

An internet connection is needed only to buy or restore the full game. Without a connection, the game keeps working and an existing unlock stays valid. The unlock is removed only if Google Play reports that the purchase no longer exists, for example after a refund.

### Billing diagnostics sent to Google

Google Play Billing Library 9.1.0 has its own diagnostic logger. Through Google datatransport, it sends Google:

* Billing call results and errors, and service connection problems.
* Device model and manufacturer.
* Android version and build.
* App version.
* Language and country setting.
* Time zone.
* Network type and mobile carrier code, known as MCC/MNC.

These diagnostics can be sent whenever the library runs, including when it connects at app start or when the app returns to the foreground. They are not limited to purchase attempts. They contain no location, contacts, advertising ID or gameplay data.

I do not receive these diagnostics. Google processes them as an independent controller under its own terms and privacy policy. Google may use them to operate, troubleshoot and improve its billing service. Google’s own rules govern retention and your rights concerning that processing.

The device access basis for the purchase function described above does not provide a blanket exemption for Google’s independent processing of diagnostics.

### Order information available to me

I do not receive your payment details or Google account password.

Google makes order information available to me as the seller through the Google Play Console. This includes, for example, the order number, date, product, price, taxes and fees, order status, and the buyer’s country or region needed for taxes. Google also lets me look up an order using its order number or the buyer’s email address, for example for a refund or support request. Google determines which order information it provides under its own terms.

I use this information only to handle the sale, refunds, support requests and bookkeeping. The legal basis for handling the sale and related requests is Article 6(1)(b) GDPR. Where tax or commercial law requires retention, the basis is Article 6(1)(c) GDPR. I keep the information for the applicable legal retention period and otherwise only as long as needed for these purposes.

### Future App Store version

The iOS version is not available yet; if it offers the full game, Apple will process that purchase under its own terms as an independent controller, and I will update this policy before release.

## 5. Google Play and the App Store

When you download Dashnut, the respective store processes data such as your account information and download history as an independent controller:

* **Google Play:** Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. See the [Google Privacy Policy](https://policies.google.com/privacy).
* **App Store:** Apple Distribution International Ltd., Hollyhill Industrial Estate, Hollyhill, Cork, Republic of Ireland. See the [Apple Privacy Policy](https://www.apple.com/legal/privacy/).

Apart from the purchase order information described in section 4, I receive no data from the stores that identifies you personally.

If you have allowed it in your device or store settings, Google or Apple may provide aggregated statistics and crash or performance reports that do not identify you. I use these only to fix errors and improve the game. The legal basis, to the extent personal data is processed for this purpose, is Article 6(1)(f) GDPR, based on my legitimate interest in a reliable, functioning game.

## 6. The website

### Hosting, delivery and technical logs

The website is hosted on Cloudflare Workers. The provider is Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA.

Cloudflare delivers the website and provides security functions. Visiting the website involves processing technical data such as your IP address, access time, requested address, status code, transferred data volume, browser and operating system, and the referrer if your browser sends it.

This processing delivers the website securely and helps identify and fix errors. Error and request logs support operation and troubleshooting. The legal basis is Article 6(1)(f) GDPR, based on my legitimate interest in operating a secure, reliable website.

Logs are retained only as long as needed for these purposes under Cloudflare’s applicable deletion rules.

The website uses no analytics or advertising tracking. Fonts are served from the website itself.

### Cloudflare’s role and international transfers

Cloudflare processes website hosting, relevant security functions, form transmission and email delivery on my behalf under its [Data Processing Addendum](https://www.cloudflare.com/cloudflare-customer-dpa/).

Relevant website, contact and security processing may take place in the USA. International transfers rely on the EU–US Data Privacy Framework and, where applicable, standard contractual clauses. Further information is available in the [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/).

You can ask me for further information or a copy of applicable international transfer safeguards using the contact details in section 2.

### Spam protection with Cloudflare Turnstile

The contact form uses Cloudflare Turnstile to protect it against automated spam and abuse.

The Turnstile script loads directly from `challenges.cloudflare.com` when you first focus, click, touch or type in the form, or submit it. It does not load merely because you view the contact page. It can therefore process technical data before you submit a message. The form requires JavaScript.

Turnstile processes your IP address, TLS fingerprint, browser information known as the User-Agent, and the site key and associated website origin. A TLS fingerprint describes technical characteristics of your connection. These signals help distinguish people from bots.

Turnstile returns a verification token. The website server sends that token and your IP address to Cloudflare to validate the check. Your form message is not sent to Turnstile for bot detection.

My legal basis is Article 6(1)(f) GDPR, based on my legitimate interest in protecting the form from spam and abuse and maintaining its availability. To the extent information is stored on or accessed from your device for protection strictly necessary to provide the contact service you requested, section 25(2) no. 2 TDDDG applies. Using the form is not treated as consent.

Cloudflare acts as my processor when protecting this website. Separately, Cloudflare acts as an independent controller when using signals to improve Turnstile’s bot detection. Cloudflare states that this independent processing is based on its legitimate interests.

For Cloudflare’s independent processing, rights, contact information and applicable retention rules, see the [Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/) together with the [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/). You can contact Cloudflare’s data protection officer at [dpo@cloudflare.com](mailto:dpo@cloudflare.com). Signals are retained under Cloudflare’s applicable rules.

The Cloudflare provider details, processing agreement and international transfer safeguards described above also apply to the relevant contact and security processing.

Turnstile performs an automated spam check that can block form submission. You can instead email [business@solo-stack.dev](mailto:business@solo-stack.dev) without using the form’s Turnstile check.

## 7. Email and the contact form

### What I process and why

You can contact me by email at [business@solo-stack.dev](mailto:business@solo-stack.dev) or through the [contact form](/contact), including for support, purchase questions, feedback and privacy requests.

If you email me, I process your email address, your name if supplied, your message and any other information it contains.

The form requires a topic, name, email address and message. All four fields are mandatory. Contacting me is voluntary, but the form cannot send without those fields and a successful security check. Replies are sent by email.

I process contact information to answer and handle your request. The legal basis is Article 6(1)(f) GDPR, based on my legitimate interest in responding to messages and providing support. Article 6(1)(b) GDPR applies where the request is necessary for a contract or for steps you request before entering into a contract.

### Form transmission and email delivery

When you submit the form, Cloudflare Workers processes the submitted fields. Cloudflare Email Sending delivers an email containing them to [business@solo-stack.dev](mailto:business@solo-stack.dev), with your name and email address set as Reply-To.

Cloudflare Email Routing then forwards incoming mail to my existing Gmail mailbox. The same routing applies to messages sent directly to my email address. Email Sending delivers form submissions; Email Routing forwards incoming mail to Gmail.

Cloudflare processes form transmission and email delivery on my behalf under the agreement described in section 6. Gmail is provided by Google Ireland Limited, whose details appear in section 4. Google may process email data in the USA, with the EU–US Data Privacy Framework or standard contractual clauses as transfer safeguards. See the [Google Privacy Policy](https://policies.google.com/privacy).

I use no separate contact database.

### Correspondence retention

I retain correspondence until your request is resolved and the messages are no longer needed, unless legal retention obligations require longer storage. Retention required by law is based on Article 6(1)(c) GDPR.

### Delivery logs

Successful form delivery records the message ID and topic in operational logs.

If sending fails, the full submitted name, email address, topic and message are recorded in Cloudflare Workers Logs. This helps diagnose delivery errors and recover your request.

The legal basis is Article 6(1)(f) GDPR, based on my legitimate interest in reliable delivery and resolving failures. These logs are kept only as long as necessary for troubleshooting and recovery under Cloudflare’s applicable deletion rules. Their retention is separate from the retention of correspondence in my mailbox.

## 8. Your privacy rights

Subject to the requirements of Articles 15 to 21 GDPR, you have the right to:

* Obtain access to your personal data and information about its processing.
* Have inaccurate data corrected and incomplete data completed.
* Have personal data erased.
* Restrict processing.
* Receive data in a portable format and have it transferred where the legal conditions apply.
* Object to processing based on Article 6(1)(f) GDPR.

If processing is based on consent, you can withdraw that consent at any time without affecting the lawfulness of earlier processing. I do not currently request consent for the processing described in this policy.

You can exercise your rights or request further information, including information or copies of applicable international transfer safeguards, by emailing [business@solo-stack.dev](mailto:business@solo-stack.dev) or using the [contact form](/contact).

I cannot access, retrieve or delete gameplay data stored only on your device. You can manage it using the reset and deletion options described in section 3. For processing carried out by Google, Apple or Cloudflare as an independent controller, you can also contact that provider directly.

### Right to object

You may object at any time, on grounds relating to your particular situation, to processing based on Article 6(1)(f) GDPR.

If you object, I will stop that processing unless I can demonstrate compelling legitimate grounds that override your interests, rights and freedoms, or the processing is necessary to establish, exercise or defend legal claims.

### Complaints

You have the right to lodge a complaint with a data protection supervisory authority, for example:

Bayerisches Landesamt für Datenschutzaufsicht  
Promenade 18  
91522 Ansbach  
Germany  

Website: [Bavarian State Office for Data Protection Supervision](https://www.lda.bayern.de)

### Automated decisions

I do not make decisions based solely on automated processing, including profiling, that produce legal effects or similarly significantly affect you within the meaning of Article 22 GDPR.

The automated Turnstile spam check can prevent a form submission, as described in section 6. Email remains available as an alternative contact channel.

## 9. Children and security

### Children

The app does not send personal data to me, including personal data from children. The Google Play Billing Library nevertheless sends the technical billing diagnostics described in section 4 to Google.

Android purchases are handled through Google Play. Google Play’s family and parental controls, such as purchase approval, apply.

### Security

The website uses HTTPS/TLS to protect data during transmission.

Locally saved gameplay data stays on your device. The billing exchanges and technical diagnostics described in section 4 go to Google.

## 10. Changes to this policy

I update this policy when the app or website changes, particularly before a future version introduces features that process personal data, such as advertising. The date at the top identifies the current version.
