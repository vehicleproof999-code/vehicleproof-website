// Customer sign-off by QR code, drawn in HTML (there is no screenshot of it
// yet): the staff phone showing the code for the customer to scan. Sizes are
// in em, set from the phone's width.

/** A QR-like pattern for the picture: the three corner squares and a fixed scatter. Not scannable. */
function QrPattern() {
  const n = 25;
  const finder = (x: number, y: number) => x < 8 && y < 8 || x > n - 9 && y < 8 || x < 8 && y > n - 9;
  let seed = 7;
  const cells: [number, number][] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      if (!finder(x, y) && seed % 100 < 47) cells.push([x, y]);
    }
  }
  const eye = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} rx={1.2} />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={.8} fill="#fff" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={.6} />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} aria-hidden="true">
      <rect x={-1} y={-1} width={n + 2} height={n + 2} fill="#fff" />
      {cells.map(([x, y]) => <rect key={`${x}.${y}`} x={x + .06} y={y + .06} width={.88} height={.88} rx={.18} />)}
      {eye(0, 0)}{eye(n - 7, 0)}{eye(0, n - 7)}
    </svg>
  );
}

/** The staff phone: a sealed inspection's sign-off code, for the customer to scan. */
export function StaffQrScreen() {
  return (
    <div className="sign-screen staff">
      <p className="sign-nav"><span>‹ Inspection</span></p>
      <p className="sign-title">Customer sign-off</p>
      <div className="sign-card sign-vehicle">
        <b>WXY 8821</b>
        <span>Perodua Myvi · Return</span>
        <span className="sealed">Sealed · 18 Nov, 10:42</span>
      </div>
      <div className="sign-card sign-qr">
        <QrPattern />
        <b>Scan to check and sign</b>
        <span>With the phone camera. No app needed.</span>
      </div>
      <div className="sign-buttons">
        <span>Sign on this phone</span>
        <span>Send a signing link</span>
      </div>
    </div>
  );
}
