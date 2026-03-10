/* eslint-disable no-extra-boolean-cast */
import { customerOrders } from "./customerOrders";
import type {
  CustomerOrderDetails,
  CustomerOrderDetailsResponse,
  CustomerOrderRecipient,
} from "@/types/orders";

const detailResponses: CustomerOrderDetailsResponse[] = [
  {
    data: {
      id: 10,
      order_id: "#order_69a7ff65a3434",
      total: 8,
      is_bulk: 0,
      payment_method: "Card",
      payment_status: "pending",
      fulfillment_status: "pending",
      created_at: "2026-03-04T09:46:13.000000Z",
      recipients: [
        {
          id: 10,
          name: "Iola Morin",
          email: "qifofu@mailinator.com",
          phone: "+1 (688) 937-6231",
          full_address:
            "Architecto fugit au, Nisi et est dolor a, Quis velit a officia, dz Veniam eos adipisic",
          items: [
            {
              id: 13,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
      ],
    },
    message: "Data fetched successfully",
    status: 200,
  },
  {
    data: {
      id: 20,
      order_id: "#order_69abb3e770940",
      total: 152,
      is_bulk: 1,
      payment_method: "Card",
      payment_status: "pending",
      fulfillment_status: "pending",
      created_at: "2026-03-07T05:13:11.000000Z",
      recipients: [
        {
          id: 56,
          name: "Kiel",
          email: "kcarmen0@blogger.com",
          phone: "581-944-9982",
          full_address:
            "241 Artisan Trail, 'Unabah, Oil & Gas Services, Afghanistan 1215",
          items: [
            {
              id: 59,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 57,
          name: "Eloisa",
          email: "eshowell1@google.co.uk",
          phone: "803-877-2503",
          full_address: "59 Dawn Park, Surkh Bilandi, JReport, Afghanistan 1215",
          items: [
            {
              id: 60,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 58,
          name: "Palmer",
          email: "prait2@si.edu",
          phone: "633-347-2331",
          full_address: "75 School Crossing, Khadir, BTLS, Afghanistan 1215",
          items: [
            {
              id: 61,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 59,
          name: "Kaycee",
          email: "kbonas3@bigcartel.com",
          phone: "940-309-9054",
          full_address: "8435 Grayhawk Pass, Dehi, Lymphedema, Afghanistan 1215",
          items: [
            {
              id: 62,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 60,
          name: "Johann",
          email: "jvittore4@yale.edu",
          phone: "742-564-9614",
          full_address: "700 Northfield Street, Pashmul, XCOM, Afghanistan 1215",
          items: [
            {
              id: 63,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 61,
          name: "Noreen",
          email: "ntucker5@phpbb.com",
          phone: "498-104-3311",
          full_address:
            "7513 Michigan Park, Bala Murghab, Risk Assessment, Afghanistan 1215",
          items: [
            {
              id: 64,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 62,
          name: "Petronia",
          email: "ptoderbrugge6@webmd.com",
          phone: "135-176-1112",
          full_address: "88232 Haas Road, Haji Khel, OODBMS, Afghanistan 1215",
          items: [
            {
              id: 65,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 63,
          name: "Osbert",
          email: "overzey7@joomla.org",
          phone: "240-451-9524",
          full_address:
            "37 Crownhardt Alley, Surkh Bilandi, Clinical Trials, Afghanistan 1215",
          items: [
            {
              id: 66,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 64,
          name: "Holly",
          email: "helfe8@cmu.edu",
          phone: "623-649-3183",
          full_address:
            "75475 Northridge Point, Sangar Saray, QlikView, Afghanistan 1215",
          items: [
            {
              id: 67,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 65,
          name: "Clare",
          email: "cpellamonuten9@biglobe.ne.jp",
          phone: "115-456-4685",
          full_address: "53563 Forest Run Avenue, Kabul, RRC, Afghanistan 1215",
          items: [
            {
              id: 68,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 66,
          name: "Ulrikaumeko",
          email: "ulicciardelloa@trellian.com",
          phone: "914-257-4521",
          full_address: "83 Dennis Avenue, Amanzi, GFS, Afghanistan 1215",
          items: [
            {
              id: 69,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 67,
          name: "Charline",
          email: "ccretneyb@blogger.com",
          phone: "312-369-6255",
          full_address: "9 Dixon Trail, Chakaray, Amazon S3, Afghanistan 1215",
          items: [
            {
              id: 70,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 68,
          name: "Justin",
          email: "jdurekc@webnode.com",
          phone: "397-460-2137",
          full_address:
            "29330 Elgar Crossing, Khanabad, General Surgery, Afghanistan 1215",
          items: [
            {
              id: 71,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 69,
          name: "Ferrell",
          email: "fnapthined@google.de",
          phone: "123-508-1808",
          full_address: "024 Union Parkway, Khanaqah, OS/390, Afghanistan 1215",
          items: [
            {
              id: 72,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 70,
          name: "Roslyn",
          email: "rliversagee@illinois.edu",
          phone: "326-437-1524",
          full_address: "20848 Fieldstone Way, Karukh, Kinect, Afghanistan 1215",
          items: [
            {
              id: 73,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 71,
          name: "Pierrette",
          email: "psanchisf@howstuffworks.com",
          phone: "945-428-8435",
          full_address:
            "3 Tony Pass, Khadir, MS Excel Pivot Tables, Afghanistan 1215",
          items: [
            {
              id: 74,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 72,
          name: "Ilaire",
          email: "icottamg@apache.org",
          phone: "966-901-5893",
          full_address:
            "12190 Waubesa Avenue, Pachir wa Agam, CQT, Afghanistan 1215",
          items: [
            {
              id: 75,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 73,
          name: "Garth",
          email: "gmarteh@columbia.edu",
          phone: "283-522-0376",
          full_address: "1697 Bonner Road, Jurm, Market Risk, Afghanistan 1215",
          items: [
            {
              id: 76,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
        {
          id: 74,
          name: "Pansie",
          email: "pcrightoni@gravatar.com",
          phone: "711-173-6601",
          full_address:
            "549 Glacier Hill Terrace, Chakaray, Kinesiology, Afghanistan 1215",
          items: [
            {
              id: 77,
              product_title:
                "Happy Birthday Letter Flag Party Background Wall Decoration",
              category: "Basia Hines",
              quantity: 1,
              sell_price: 8,
              image:
                "https://cf.cjdropshipping.com/62d7da8a-3cb1-479a-b11d-98951c874ac9.jpg",
              estimated_delivery: "-",
            },
          ],
        },
      ],
    },
    message: "Data fetched successfully",
    status: 200,
  },
];

const createFallbackRecipients = (orderId: number): CustomerOrderRecipient[] => {
  const order = customerOrders.find((entry) => entry.id === orderId);
  if (!order) {
    return [];
  }

  return [
    {
      id: order.id,
      name: Boolean(Number(order?.is_bulk))
        ? "Bulk recipient summary"
        : "Primary recipient",
      email: "recipient@example.com",
      phone: "+1 (000) 000-0000",
      full_address: "Recipient address will be available after API integration.",
      items: order.items.map((item, index) => ({
        id: item.id ?? index + 1,
        product_title: item.product_title,
        category: item.category,
        quantity: item.total_quantity ?? item.quantity ?? 1,
        sell_price: item.sell_price ?? 0,
        image: item.image,
        estimated_delivery: item.estimated_delivery ?? "-",
      })),
    },
  ];
};

export const getCustomerOrderDetail = (
  orderId: number,
): CustomerOrderDetails | undefined => {
  const existingDetail = detailResponses.find(
    (response) => response.data.id === orderId,
  );

  if (existingDetail) {
    return existingDetail.data;
  }

  const fallbackOrder = customerOrders.find((order) => order.id === orderId);
  if (!fallbackOrder) {
    return undefined;
  }

  return {
    ...fallbackOrder,
    recipients: createFallbackRecipients(orderId),
  };
};
