"use client"
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen text-apricot-orange flex flex-col align-middle items-center justify-center">
      <div
        className="hover:cursor-pointer"
        onClick={() => router.push("/thumbnail")}
      >
        THUMBNAIL
      </div>
      <div>APRICOT</div>
      <div>APRICOT</div>
      <div>APRICOT</div>
      <div>APRICOT</div>
      <div>APRICOT</div>
      <div>APRICOT</div>
      <div>APRICOT</div>
    </div>
  );
}
