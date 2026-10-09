// Content moved from the original HTML page; edit the wording here.
export default function Privacy() {
  return (
    <>
    <h1>Privacy Policy</h1>
    <p className="updated">Effective 8 October 2026</p>

    <div className="summary">
      <p><strong>In short:</strong> we use your data to run VehicleProof for you, nothing else. We don't sell it, we don't show ads, and the app has no advertising or analytics trackers. Your records are stored in Singapore. You can see, correct, export or delete your data at any time, and deleting your account in the app removes it.</p>
    </div>

    <h2>1. Who we are</h2>
    <p>VehicleProof (the app and this website) is operated by <strong>FoundryOps</strong>, a business of <strong>Mohamad Akmal bin Mohamed Abu Bakar</strong>, in Malaysia ("we", "us"). We are responsible for your personal data under Malaysia's Personal Data Protection Act 2010 (PDPA).</p>
    <p>Contact for anything in this policy: <a href="mailto:vehicleproof999@gmail.com">vehicleproof999@gmail.com</a>.</p>

    <h2>2. What we collect</h2>
    <div className="table-wrap">
      <table>
        <thead><tr><th>Data</th><th>What it includes</th><th>Where it comes from</th></tr></thead>
        <tbody>
          <tr><td>Account</td><td>Name, email address, sign-in method (email and password, Google or Apple). Your password is held by our sign-in provider; we never see it. With Apple you can hide your email: we then receive a private relay address.</td><td>You, or Google or Apple when you sign in with them</td></tr>
          <tr><td>Vehicles</td><td>Registration number, make, model, year, colour, fuel type, odometer readings, cover photo</td><td>You</td></tr>
          <tr><td>Inspections</td><td>Photos of the vehicle, damage notes, dates and times, and a digital fingerprint (SHA-256) of each photo</td><td>You, through the in-app camera</td></tr>
          <tr><td>Records and documents</td><td>Service and repair records, expenses, workshop names and amounts, receipts, insurance, road tax and registration documents, and notes</td><td>You. Documents can contain other personal details, such as an owner's name or ID number on a registration card.</td></tr>
          <tr><td>Scanned documents</td><td>The text read from receipts and documents you choose to scan</td><td>Produced from your scan</td></tr>
          <tr><td>Location</td><td>Your approximate location, only when you search for places nearby</td><td>Your phone, with your permission</td></tr>
          <tr><td>Device</td><td>Device model and name, operating system, app version, and a notification token if you allow notifications</td><td>Your phone</td></tr>
          <tr><td>Crash reports</td><td>When the app or our servers hit an unexpected error: what went wrong, the app version, phone model, operating system and the screens visited just before, with an anonymous ID. Never your name, email, photos or documents.</td><td>The app and our servers</td></tr>
          <tr><td>Subscription</td><td>Your plan and whether a subscription is active. We never receive your card details.</td><td>Apple App Store or Google Play</td></tr>
          <tr><td>Enterprise enquiries</td><td>Name, email, phone, company and your message</td><td>You, if you request an Enterprise quote</td></tr>
          <tr><td>Security logs</td><td>What was done in your account and when, with your IP address and browser details stored only in a scrambled (hashed) form</td><td>Our servers</td></tr>
          <tr><td>Support</td><td>Emails you send us</td><td>You</td></tr>
        </tbody>
      </table>
    </div>
    <p>Your name and email are needed to create an account; without them we can't provide the app. Everything else is optional and only collected when you use the feature it belongs to.</p>

    <h2>3. Why we use it</h2>
    <ul>
      <li>To provide the app: store your vehicles, inspections, records and documents, and show them back to you.</li>
      <li>To read scanned receipts and documents so you don't have to type them in.</li>
      <li>To remind you before road tax, insurance or a service is due.</li>
      <li>To find service centres, fuel and charging stations near you, when you ask.</li>
      <li>To manage your plan, device limits and subscription.</li>
      <li>To keep the service secure: detect abuse, limit misuse and investigate problems.</li>
      <li>To reply to support requests and Enterprise enquiries.</li>
      <li>To meet legal obligations.</li>
    </ul>
    <p>We don't sell your data, use it for advertising, or use your photos and documents to train AI models.</p>

    <h2>4. Who we share it with</h2>
    <p>We use a small number of service providers to run VehicleProof. They process data only on our instructions and only for the purpose listed.</p>
    <div className="table-wrap">
      <table>
        <thead><tr><th>Provider</th><th>What for</th><th>Location</th></tr></thead>
        <tbody>
          <tr><td>Auth0 (by Okta)</td><td>Sign-in, email confirmation and account security</td><td>Australia</td></tr>
          <tr><td>DigitalOcean</td><td>Servers and private file storage</td><td>Singapore</td></tr>
          <tr><td>Supabase (on Amazon Web Services)</td><td>Database</td><td>Singapore</td></tr>
          <tr><td>Mistral AI</td><td>Reading the text of receipts and documents you choose to scan</td><td>European Union</td></tr>
          <tr><td>Google</td><td>Google sign-in; Google Drive, only if you connect it; Firebase Cloud Messaging for notifications, which receives only the alert title, never your documents</td><td>United States and others</td></tr>
          <tr><td>Apple</td><td>Sign in with Apple, App Store purchases and notifications on iPhone</td><td>United States and others</td></tr>
          <tr><td>RevenueCat</td><td>Checking the status of App Store and Google Play subscriptions</td><td>United States</td></tr>
          <tr><td>Resend</td><td>Sending emails, such as Enterprise quote requests</td><td>United States</td></tr>
          <tr><td>Sentry</td><td>Crash and error reports, so we can find and fix problems. Reports carry an anonymous ID, never your name, email, photos or documents.</td><td>United States</td></tr>
          <tr><td>OpenStreetMap (Overpass API)</td><td>Finding nearby places. It receives an approximate location, not who you are.</td><td>Germany</td></tr>
        </tbody>
      </table>
    </div>
    <p><strong>Google Drive:</strong> if you connect your own Google Drive, the app can only see files it creates there. Files you store in your Drive are yours; they stay in your Drive under Google's terms, even if you later delete your VehicleProof account.</p>
    <p><strong>Sharing you choose:</strong> when you share an inspection report or invite someone to your workspace, they see what you share.</p>
    <p><strong>Legal requests:</strong> we disclose data if the law requires it, or to protect the rights and safety of users and others.</p>

    <h2>5. Transfers outside Malaysia</h2>
    <p>Your data is stored in Singapore, and some providers above process it in other countries. We only use providers that protect personal data to a standard comparable with the PDPA, under written terms with each of them.</p>

    <h2>6. How long we keep it</h2>
    <div className="table-wrap">
      <table>
        <thead><tr><th>Data</th><th>Kept for</th></tr></thead>
        <tbody>
          <tr><td>Your account and records</td><td>While your account is open</td></tr>
          <tr><td>After you delete your account</td><td>Sign-in stops at once and your name and email are removed at once. Your vehicles, records, photos and documents are permanently deleted after <strong>30 days</strong>, so we can restore them if you ask within that time.</td></tr>
          <tr><td>Database backups</td><td>Up to 35 days, after which deleted data is gone from backups too</td></tr>
          <tr><td>Security logs</td><td>12 months, without your name or email</td></tr>
          <tr><td>Nearby searches</td><td>Not saved to your account. Results are cached on our server for about 5 minutes.</td></tr>
          <tr><td>Support emails</td><td>As long as needed to resolve your request</td></tr>
        </tbody>
      </table>
    </div>

    <h2>7. How we protect it</h2>
    <ul>
      <li>All connections are encrypted (HTTPS).</li>
      <li>Your files are stored privately and can only be opened through short-lived links, after we check it's you.</li>
      <li>Sign-in details on your phone are kept in its secure storage (Android Keystore or iOS Keychain).</li>
      <li>Each workspace can only see its own data, and actions are recorded in an audit log.</li>
    </ul>
    <p>No system is perfectly secure. If a breach affects your personal data, we'll notify you and the authorities as the law requires.</p>

    <h2>8. Your rights</h2>
    <p>Under the PDPA you can:</p>
    <ul>
      <li><strong>Access</strong> the personal data we hold about you and get a copy.</li>
      <li><strong>Correct</strong> data that is inaccurate. Most of it you can edit in the app yourself.</li>
      <li><strong>Withdraw consent</strong> or ask us to stop or limit processing, for example by turning off location or notifications in your phone's settings.</li>
      <li><strong>Delete</strong> your account and data. See <a href="/delete-account/">how to delete your account</a>.</li>
      <li><strong>Receive your data</strong> in a portable form.</li>
    </ul>
    <p>Email <a href="mailto:vehicleproof999@gmail.com">vehicleproof999@gmail.com</a> from the address on your account. We'll reply within 21 days, as the PDPA requires. If you're not satisfied with our answer, you can complain to the Personal Data Protection Commissioner of Malaysia (<a href="https://www.pdp.gov.my" rel="noopener">pdp.gov.my</a>).</p>

    <h2>9. Children</h2>
    <p>VehicleProof is meant for adults who own, rent out or manage vehicles. It isn't directed at children, and we don't knowingly collect data from anyone under 13. If you think a child has given us data, contact us and we'll delete it.</p>

    <h2>10. This website</h2>
    <p>This website uses no cookies, analytics or trackers. It is hosted on GitHub Pages, which may record visitors' IP addresses for security, as described in GitHub's privacy statement.</p>

    <h2>11. Changes to this policy</h2>
    <p>If we make an important change, we'll tell you in the app or by email before it takes effect. The date at the top shows when this policy last changed.</p>

    <h2>12. Contact</h2>
    <p>FoundryOps (Mohamad Akmal bin Mohamed Abu Bakar), Malaysia<br />
    <a href="mailto:vehicleproof999@gmail.com">vehicleproof999@gmail.com</a></p>
    </>
  );
}
