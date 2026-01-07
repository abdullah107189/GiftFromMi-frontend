import logo from "@/assets/common/logo.png";

const Footer = () => {
  const footerLinks = {
    products: [
      { name: "Home", href: "#" },
      { name: "How Its Work", href: "#" },
      { name: "Shop Gifts", href: "#" },
      { name: "For Professionals", href: "#" },
      { name: "Bulk & Automation", href: "#" },
    ],
    support: [
      { name: "About Us", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Contact", href: "#" },
    ],
  };

  return (
    <footer className="bg-background">
      <div className="max-w-container mx-auto px-3 py-15">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-gray-900 text-lg">Products</h3>
            <div className="p-4 border border-gray-400 rounded-xl">
              <img
                src={logo}
                alt="GiftFromMi"
                className="h-14 w-14 object-cover mb-4"
              />
              <p className="text-[#667085] text-sm leading-relaxed">
                Where care meets beautiful gifting, delivered for you.
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-gray-900 text-lg">Quick Link</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-gray-900 text-lg">Support</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-gray-900 text-lg">Contract Us</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22.5 3.5H1.5C1.10218 3.5 0.720644 3.65804 0.43934 3.93934C0.158035 4.22064 0 4.60218 0 5L0 19C0 19.3978 0.158035 19.7794 0.43934 20.0607C0.720644 20.342 1.10218 20.5 1.5 20.5H22.5C22.8978 20.5 23.2794 20.342 23.5607 20.0607C23.842 19.7794 24 19.3978 24 19V5C24 4.60218 23.842 4.22064 23.5607 3.93934C23.2794 3.65804 22.8978 3.5 22.5 3.5ZM22.18 4.5L12 12.37L1.82 4.5H22.18ZM1 18.795V5.13L8.705 11.085L1 18.795ZM1.705 19.5L9.5 11.705L11.69 13.4C11.7774 13.4673 11.8847 13.5038 11.995 13.5038C12.1053 13.5038 12.2126 13.4673 12.3 13.4L14.5 11.705L22.295 19.5H1.705ZM23 18.795L15.295 11.085L23 5.13V18.795Z"
                    fill="#CA8A32"
                  />
                </svg>
                <span>demomail@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_845_22192)">
                    <path
                      d="M14.9453 3.75C16.2174 4.09141 17.3774 4.76142 18.3088 5.69279C19.2401 6.62416 19.9102 7.78412 20.2516 9.05625"
                      stroke="#CA8A32"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.1641 6.64648C14.9292 6.84968 15.627 7.25153 16.1867 7.8113C16.7465 8.37107 17.1484 9.06887 17.3516 9.83398"
                      stroke="#CA8A32"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.67187 11.6998C9.44364 13.2935 10.7324 14.579 12.3281 15.3467C12.4458 15.4024 12.576 15.4265 12.7059 15.4167C12.8358 15.4068 12.9608 15.3633 13.0687 15.2904L15.4125 13.7248C15.516 13.6546 15.6357 13.6117 15.7603 13.6002C15.8849 13.5887 16.0104 13.609 16.125 13.6592L20.5125 15.5435C20.6625 15.6059 20.7877 15.7159 20.869 15.8565C20.9504 15.9971 20.9832 16.1606 20.9625 16.3217C20.8234 17.407 20.2937 18.4046 19.4723 19.1276C18.6509 19.8506 17.5943 20.2495 16.5 20.2498C13.1185 20.2498 9.87548 18.9065 7.48439 16.5154C5.0933 14.1243 3.75 10.8813 3.75 7.49979C3.75025 6.40553 4.1492 5.34886 4.87221 4.5275C5.59522 3.70613 6.59274 3.17635 7.67812 3.03729C7.83922 3.01659 8.00266 3.04943 8.14326 3.13074C8.28386 3.21206 8.39384 3.33733 8.45625 3.48729L10.3406 7.88416C10.3896 7.99699 10.4101 8.12013 10.4003 8.24275C10.3905 8.36537 10.3507 8.48369 10.2844 8.58729L8.71875 10.9685C8.64905 11.0762 8.60814 11.2 8.59993 11.328C8.59172 11.4561 8.61649 11.5841 8.67187 11.6998Z"
                      stroke="#CA8A32"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_845_22192">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                {/* Clickable Phone Number */}
                <a
                  href="tel:+880123456789"
                  className="hover:text-[#CA8A32] transition-colors duration-200"
                >
                  +880 123456789
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.8369 4.61225C16.2894 3.06471 14.1905 2.19531 12.0019 2.19531C9.81339 2.19531 7.71447 3.06471 6.16694 4.61225C4.6194 6.15979 3.75 8.2587 3.75 10.4472C3.75 12.6358 4.6194 14.7347 6.16694 16.2822L9.24194 19.3572C9.31186 19.4272 9.39488 19.4827 9.48625 19.5205C9.57762 19.5583 9.67554 19.5778 9.77444 19.5778C9.87333 19.5778 9.97126 19.5583 10.0626 19.5205C10.154 19.4827 10.237 19.4272 10.3069 19.3572C10.3769 19.2873 10.4323 19.2043 10.4702 19.1129C10.508 19.0216 10.5275 18.9236 10.5275 18.8247C10.5275 18.7259 10.508 18.6279 10.4702 18.5366C10.4323 18.4452 10.3769 18.3622 10.3069 18.2922L7.23194 15.2173C6.28709 14.2736 5.64338 13.0709 5.38225 11.7613C5.12112 10.4517 5.2543 9.09403 5.76495 7.86014C6.27559 6.62625 7.14075 5.57154 8.25096 4.82947C9.36118 4.0874 10.6666 3.69131 12.0019 3.69131C13.3373 3.69131 14.6427 4.0874 15.7529 4.82947C16.8631 5.57154 17.7283 6.62625 18.2389 7.86014C18.7496 9.09403 18.8828 10.4517 18.6216 11.7613C18.3605 13.0709 17.7168 14.2736 16.7719 15.2173L11.4694 20.5198C11.3991 20.5895 11.3433 20.6724 11.3053 20.7638C11.2672 20.8552 11.2476 20.9532 11.2476 21.0522C11.2476 21.1513 11.2672 21.2493 11.3053 21.3407C11.3433 21.4321 11.3991 21.515 11.4694 21.5847C11.5392 21.655 11.6221 21.7108 11.7135 21.7489C11.8049 21.787 11.9029 21.8066 12.0019 21.8066C12.1009 21.8066 12.199 21.787 12.2904 21.7489C12.3818 21.7108 12.4647 21.655 12.5344 21.5847L17.8369 16.2822C18.6034 15.5161 19.2115 14.6065 19.6263 13.6053C20.0412 12.6041 20.2547 11.531 20.2547 10.4472C20.2547 9.36352 20.0412 8.2904 19.6263 7.28922C19.2115 6.28803 18.6034 5.37838 17.8369 4.61225Z"
                    fill="#CA8A32"
                  />
                  <path
                    d="M15.75 10.5C15.75 9.75832 15.5301 9.0333 15.118 8.41661C14.706 7.79993 14.1203 7.31928 13.4351 7.03545C12.7498 6.75162 11.9958 6.67736 11.2684 6.82206C10.541 6.96675 9.8728 7.3239 9.34835 7.84835C8.8239 8.3728 8.46675 9.04098 8.32206 9.76841C8.17736 10.4958 8.25162 11.2498 8.53545 11.9351C8.81928 12.6203 9.29993 13.206 9.91661 13.618C10.5333 14.0301 11.2583 14.25 12 14.25C12.9946 14.25 13.9484 13.8549 14.6517 13.1517C15.3549 12.4484 15.75 11.4946 15.75 10.5ZM9.75 10.5C9.75 10.055 9.88196 9.61998 10.1292 9.24997C10.3764 8.87996 10.7278 8.59157 11.139 8.42127C11.5501 8.25098 12.0025 8.20642 12.439 8.29323C12.8754 8.38005 13.2763 8.59434 13.591 8.90901C13.9057 9.22368 14.12 9.62459 14.2068 10.061C14.2936 10.4975 14.249 10.9499 14.0787 11.361C13.9084 11.7722 13.62 12.1236 13.25 12.3708C12.88 12.618 12.445 12.75 12 12.75C11.4033 12.75 10.831 12.5129 10.409 12.091C9.98705 11.669 9.75 11.0967 9.75 10.5Z"
                    fill="#CA8A32"
                  />
                </svg>
                <span>123 Green Energy TX 78701</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-15 pt-8 border-t border-[#BABABA] flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex gap-8 text-gray-500 text-sm">
            <a href="#" className="hover:text-[#C57200]">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#C57200]">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
