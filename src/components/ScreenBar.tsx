import Link from "next/link";
import PixelHeart from "@/components/PixelHeart";

export default function ScreenBar() {
  return (
    <div className="screen-bar">
      <div className="wrap">
        <Link className="logo" href="/">
          <PixelHeart />
          <span>MT-haCks</span>
        </Link>
        <Link className="btn gold" href="/">
          Back
        </Link>
      </div>
    </div>
  );
}
