import { createRoot } from "react-dom/client";

import Invoice from "@/components/shared/Invoice";
import type { OrderInvoice } from "@/types/orders";

const getPrintableStyles = () => {
  const links = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]'),
  )
    .map((link) => link.outerHTML)
    .join("");

  const styles = Array.from(document.querySelectorAll("style"))
    .map((style) => style.outerHTML)
    .join("");

  return `${links}${styles}`;
};

export const generateInvoicePdf = (invoice: OrderInvoice) => {
  const printWindow = window.open("", "_blank", "width=1024,height=768");

  if (!printWindow) {
    throw new Error("Unable to open invoice window.");
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice ${invoice.order_uuid}</title>
        ${getPrintableStyles()}
      </head>
      <body>
        <div id="invoice-print-root"></div>
      </body>
    </html>
  `);
  printWindow.document.close();

  const container =
    printWindow.document.getElementById("invoice-print-root");

  if (!container) {
    throw new Error("Invoice print container not found.");
  }

  const root = createRoot(container);
  root.render(<Invoice invoice={invoice} />);

  printWindow.setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 400);
};
