import Link from "next/link";

export default function ScreenBar() {
  return (
    <div className="screen-bar">
      <div className="wrap">
        <Link className="logo" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-wordmark.png" alt="MT-haCks" width={1842} height={432} />
        </Link>
        <Link className="btn gold" href="/">
          Back
        </Link>
      </div>
    </div>
  );
}
