import { redirect } from "next/navigation"

export default function QRScannerRedirect() {
  // Redirect legacy qr-scanner route to the new qr-analyzer page
  redirect("/tools/qr-analyzer")
}
