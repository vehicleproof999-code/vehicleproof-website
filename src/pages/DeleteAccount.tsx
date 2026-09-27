// Content moved from the original HTML page; edit the wording here.
export default function DeleteAccount() {
  return (
    <>
    <h1>Delete your VehicleProof account</h1>
    <p className="updated">You can delete your account and data at any time, in the app or by email.</p>

    <h2>In the app</h2>
    <ol className="steps">
      <li>Open VehicleProof and tap the <strong>profile icon</strong> at the top right of the home screen.</li>
      <li>Tap the <strong>⋯ menu</strong> at the top right, then <strong>Delete Account</strong>.</li>
      <li>Type <strong>DELETE</strong> to confirm, then tap <strong>Delete my account</strong>.</li>
    </ol>
    <p>You're signed out straight away.</p>

    <h2>Without the app</h2>
    <p>Email us from the address you use for VehicleProof, so we can confirm the account is yours:</p>
    <div className="contact-card">
      <p className="mail" style={{ margin: '0 0 6px' }}><a href="mailto:vehicleproof999@gmail.com?subject=Delete%20my%20VehicleProof%20account">vehicleproof999@gmail.com</a></p>
      <p style={{ margin: '0', color: 'var(--muted)' }}>Subject: <strong>Delete my VehicleProof account</strong></p>
    </div>
    <p>We'll confirm by email and delete the account within 7 days of confirming it's yours. If you can't send from that address, tell us and we'll find another way to verify you.</p>

    <h2>What gets deleted, and when</h2>
    <div className="table-wrap">
      <table>
        <thead><tr><th>Data</th><th>What happens</th></tr></thead>
        <tbody>
          <tr><td>Sign-in</td><td>Stops immediately. The account can't be used again.</td></tr>
          <tr><td>Name and email</td><td>Removed immediately</td></tr>
          <tr><td>Notification tokens</td><td>Removed immediately</td></tr>
          <tr><td>Google Drive connection</td><td>Disconnected immediately. Files already in your own Drive stay there; delete them in Google Drive if you want them gone.</td></tr>
          <tr><td>Vehicles, inspections, photos, records, documents, scans, reminders</td><td>Permanently deleted after <strong>30 days</strong>. Until then we can restore them if you change your mind; just email us.</td></tr>
          <tr><td>Backups</td><td>Deleted data disappears from our backups within 35 days.</td></tr>
          <tr><td>Security logs</td><td>Kept for up to 12 months without your name or email, to protect the service, then deleted.</td></tr>
        </tbody>
      </table>
    </div>
    <p><strong>Shared workspaces:</strong> if you're a member of someone else's workspace, only your membership is removed; their data stays. If you're the last admin of a shared workspace, hand it over to another member first.</p>

    <h2>Subscriptions</h2>
    <p>Deleting your account doesn't cancel a Pro subscription bought in the App Store or Google Play. Cancel it in your store account so you aren't charged again:</p>
    <ul>
      <li><strong>iPhone:</strong> Settings → your name → Subscriptions → VehicleProof → Cancel Subscription</li>
      <li><strong>Android:</strong> Google Play → profile picture → Payments &amp; subscriptions → Subscriptions → VehicleProof → Cancel</li>
    </ul>

    <p>Want to remove only some data? You can delete individual vehicles, records and documents in the app, or email us.</p>
    </>
  );
}
