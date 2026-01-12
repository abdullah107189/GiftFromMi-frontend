import { Button } from "../ui/button";

const ContactSection = () => {
  const contactCard = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <g clip-path="url(#clip0_845_26529)">
            <path
              d="M8.32032 23.6804C12.7919 28.152 17.844 31.1561 22.1814 31.9223C22.4719 31.9741 22.7665 32.0004 23.0616 32.0008C24.3101 32.0008 25.4687 31.517 26.3894 30.5962L29.4652 27.5205C29.8882 27.0966 30.1258 26.5222 30.1258 25.9233C30.1258 25.3245 29.8882 24.7501 29.4652 24.3262L23.9396 18.8006C23.5157 18.3776 22.9413 18.14 22.3424 18.14C21.7435 18.14 21.1691 18.3776 20.7453 18.8006L17.9546 21.5914C15.3126 19.6771 12.3237 16.6882 10.4094 14.0463L13.2001 11.2555C13.6232 10.8316 13.8608 10.2572 13.8608 9.65834C13.8608 9.05948 13.6232 8.48508 13.2001 8.06119L7.67457 2.53562C7.25068 2.11261 6.67629 1.87504 6.07744 1.87504C5.47859 1.87504 4.9042 2.11261 4.48032 2.53562L1.40457 5.61131C0.270318 6.7455 -0.200619 8.24 0.0784433 9.81944C0.844506 14.1567 3.84876 19.2089 8.32032 23.6804ZM2.81876 7.0255L5.89451 3.95C5.94332 3.90207 6.009 3.87521 6.07741 3.87521C6.14582 3.87521 6.2115 3.90207 6.26032 3.95L11.7859 9.47556C11.8335 9.52456 11.8602 9.5902 11.8602 9.65853C11.8602 9.72686 11.8335 9.7925 11.7859 9.8415L8.84838 12.779C8.55417 13.0719 8.37361 13.4597 8.33893 13.8734C8.30425 14.2871 8.41772 14.6996 8.65907 15.0374C10.7558 17.9854 14.0153 21.2451 16.9634 23.3416C17.3011 23.5831 17.7137 23.6966 18.1274 23.6619C18.5411 23.6273 18.929 23.4467 19.2219 23.1524L22.1594 20.2149C22.2082 20.167 22.2739 20.1401 22.3424 20.1401C22.4108 20.1401 22.4765 20.167 22.5254 20.2149L28.0509 25.7406C28.0988 25.7894 28.1257 25.8551 28.1257 25.9235C28.1257 25.9919 28.0988 26.0576 28.0509 26.1064L24.9751 29.1821C24.3064 29.8509 23.4603 30.1174 22.5292 29.953C18.6445 29.2665 13.8613 26.393 9.73451 22.2663C5.60769 18.1395 2.73426 13.3563 2.04794 9.4715C1.88338 8.54019 2.14994 7.69431 2.81876 7.0255ZM32.0008 13.2513C32.0008 13.5165 31.8954 13.7708 31.7079 13.9584C31.5203 14.1459 31.266 14.2513 31.0008 14.2513C30.7355 14.2513 30.4812 14.1459 30.2936 13.9584C30.1061 13.7708 30.0008 13.5165 30.0008 13.2513C30.0008 7.04725 24.9534 2 18.7495 2C18.4843 2 18.2299 1.89464 18.0424 1.70711C17.8549 1.51957 17.7495 1.26522 17.7495 1C17.7495 0.734784 17.8549 0.48043 18.0424 0.292893C18.2299 0.105357 18.4843 0 18.7495 0C26.0563 0 32.0008 5.9445 32.0008 13.2513ZM18.7495 7.73606C18.4843 7.73606 18.2299 7.63071 18.0424 7.44317C17.8549 7.25563 17.7495 7.00128 17.7495 6.73606C17.7495 6.47085 17.8549 6.21649 18.0424 6.02896C18.2299 5.84142 18.4843 5.73606 18.7495 5.73606C20.742 5.73831 22.6522 6.53081 24.0611 7.93969C25.4699 9.34858 26.2624 11.2588 26.2647 13.2513C26.2647 13.5165 26.1593 13.7708 25.9718 13.9584C25.7843 14.1459 25.5299 14.2513 25.2647 14.2513C24.9995 14.2513 24.7451 14.1459 24.5576 13.9584C24.3701 13.7708 24.2647 13.5165 24.2647 13.2513C24.2631 11.789 23.6815 10.3872 22.6475 9.35323C21.6136 8.31929 20.2117 7.7377 18.7495 7.73606ZM16.6351 11.4601C16.6351 11.1949 16.7405 10.9406 16.928 10.753C17.1156 10.5655 17.3699 10.4601 17.6351 10.4601C18.7092 10.4613 19.739 10.8886 20.4985 11.6481C21.258 12.4076 21.6852 13.4373 21.6864 14.5114C21.6864 14.7767 21.5811 15.031 21.3935 15.2185C21.206 15.4061 20.9517 15.5114 20.6864 15.5114C20.4212 15.5114 20.1669 15.4061 19.9793 15.2185C19.7918 15.031 19.6864 14.7767 19.6864 14.5114C19.6858 13.9676 19.4695 13.4462 19.085 13.0616C18.7004 12.6771 18.179 12.4607 17.6351 12.4601C17.3699 12.4601 17.1156 12.3548 16.928 12.1672C16.7405 11.9797 16.6351 11.7253 16.6351 11.4601Z"
              fill="#CA8A32"
            />
          </g>
          <defs>
            <clipPath id="clip0_845_26529">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      label: "Give Us A Call",
      value: "(+01) 789 859 654",
      href: "tel:+01789859654",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M29.1875 4.75H2.8125C1.25856 4.75 0 6.01637 0 7.5625V24.4375C0 25.9928 1.26781 27.25 2.8125 27.25H29.1875C30.7284 27.25 32 25.9981 32 24.4375V7.5625C32 6.01912 30.7464 4.75 29.1875 4.75ZM28.7936 6.625L17.9888 17.3729C17.4575 17.9042 16.7512 18.1967 16 18.1967C15.2487 18.1967 14.5425 17.9041 14.0095 17.3712L3.20637 6.625H28.7936ZM1.875 24.0559V7.94531L9.97738 16.005L1.875 24.0559ZM3.20756 25.375L11.3068 17.3273L12.6854 18.6987C13.5708 19.5841 14.7479 20.0717 16 20.0717C17.2521 20.0717 18.4292 19.5841 19.3128 18.7005L20.6933 17.3273L28.7924 25.375H3.20756ZM30.125 24.0559L22.0226 16.005L30.125 7.94531V24.0559Z"
            fill="#CA8A32"
          />
        </svg>
      ),
      label: "Send Us A Message",
      value: "info@domain.com",
      href: "mailto:info@domain.com",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M21.3423 21.1428C24.7474 15.7995 24.3194 16.4661 24.4175 16.3268C25.6572 14.5782 26.3125 12.5201 26.3125 10.375C26.3125 4.68625 21.6962 0 16 0C10.3224 0 5.6875 4.677 5.6875 10.375C5.6875 12.5188 6.3565 14.6307 7.63688 16.4029L10.6576 21.1429C7.42794 21.6392 1.9375 23.1182 1.9375 26.375C1.9375 27.5622 2.71237 29.2541 6.40387 30.5724C8.9815 31.493 12.3894 32 16 32C22.7516 32 30.0625 30.0955 30.0625 26.375C30.0625 23.1177 24.5785 21.6402 21.3423 21.1428ZM9.20306 15.3716C9.19276 15.3555 9.18198 15.3397 9.17075 15.3242C8.10531 13.8584 7.5625 12.1213 7.5625 10.375C7.5625 5.68638 11.3379 1.875 16 1.875C20.6524 1.875 24.4375 5.68806 24.4375 10.375C24.4375 12.1241 23.9049 13.8023 22.8971 15.2294C22.8068 15.3486 23.278 14.6166 16 26.0368L9.20306 15.3716ZM16 30.125C8.62537 30.125 3.8125 27.9573 3.8125 26.375C3.8125 25.3115 6.2855 23.5628 11.7655 22.8812L15.2094 28.2851C15.2941 28.4181 15.4109 28.5275 15.5491 28.6033C15.6873 28.6791 15.8423 28.7188 15.9999 28.7188C16.1575 28.7188 16.3126 28.6791 16.4508 28.6033C16.589 28.5275 16.7058 28.4181 16.7905 28.2851L20.2343 22.8812C25.7144 23.5628 28.1875 25.3115 28.1875 26.375C28.1875 27.9439 23.4179 30.125 16 30.125Z"
            fill="#CA8A32"
          />
          <path
            d="M16 5.6875C13.4153 5.6875 11.3125 7.79031 11.3125 10.375C11.3125 12.9597 13.4153 15.0625 16 15.0625C18.5847 15.0625 20.6875 12.9597 20.6875 10.375C20.6875 7.79031 18.5847 5.6875 16 5.6875ZM16 13.1875C14.4492 13.1875 13.1875 11.9258 13.1875 10.375C13.1875 8.82419 14.4492 7.5625 16 7.5625C17.5508 7.5625 18.8125 8.82419 18.8125 10.375C18.8125 11.9258 17.5508 13.1875 16 13.1875Z"
            fill="#CA8A32"
          />
        </svg>
      ),
      label: "Visit Our Location",
      value: "45 Avenue, USA",
      href: "https://www.google.com/maps/search/?api=1&query=45+Avenue+USA",
    },
  ];
  return (
    <section className="xl:py-15 md:py-10 py-5">
      <div className="max-w-container mx-auto px-3">
        {/* Main Wrapper with light border */}
        <div className="border border-gray-300 rounded-2xl xl:p-12 lg:p-10 md:p-8 p-6 flex flex-col lg:flex-row gap-12 lg:gap-20 w-[90%] mx-auto">
          {/* Left Side: Contact Info */}
          <div className="w-full lg:w-1/2 xl:p-8 lg:p-6 md:p-4 p-3 border border-gray-300 rounded-2xl">
            <h2 className="flex items-center gap-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_845_26519)">
                  <path
                    d="M16.3038 12.0003L17.3693 13.9596L24 12.0003L17.3693 10.041L16.3038 12.0003ZM10.0407 17.3696L12 24.0003L13.9593 17.3696L12 16.3041L10.0407 17.3696ZM7.69621 12.0003L6.63071 10.041L0 12.0003L6.63071 13.9596L7.69621 12.0003Z"
                    fill="#CA8A32"
                  />
                  <path
                    d="M17.9252 6.07422L11.9997 9.29664L6.07422 6.07422L9.29664 11.9997L6.07422 17.9253L11.9997 14.7028L17.9252 17.9253L14.7028 11.9997L17.9252 6.07422Z"
                    fill="#CA8A32"
                  />
                  <path
                    d="M13.9576 6.63071L11.9984 0L10.0391 6.63071L11.9983 7.69621L13.9576 6.63071Z"
                    fill="#CA8A32"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_845_26519">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="font-semibold xl:text-xl text-lg text-gray-900">
                Contact Us
              </span>
            </h2>

            <h2 className="xl:text-[32px] md:text-2xl text-xl font-semibold text-gray-900 mb-4">
              We're Here to Help
            </h2>

            <p className="text-gray-500 text-base xl:mb-12 lg:mb-10 md:mb-8 mb-6">
              We'd love to hear from you. Send us a message and we'll get back
              to you as soon as possible.
            </p>

            <div className="space-y-6">
              {/* Contact Cards */}
              {contactCard.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center md:gap-4 gap-3 md:p-5 p-3 border border-gray-300 rounded-2xl "
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full text-xl text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-700 mb-1">{item.label}</p>
                    <a
                      href={item.href}
                      target={
                        item.label === "Visit Our Location" ? "_blank" : "_self"
                      }
                      rel="noreferrer"
                      className="text-gray-900 md:text-xl text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full lg:w-1/2 xl:p-8 lg:p-6 md:p-4 p-3 border border-gray-300 rounded-2xl">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:gap-8 lg:gap-6 md:gap-4 gap-3">
                <div className="">
                  <label className="text-gray-500 font-medium ">
                    First name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 mt-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CA8A32]/20 focus:border-[#CA8A32]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-500 font-medium">Last name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 mt-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CA8A32]/20 focus:border-[#CA8A32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                <div className="">
                  <label className="text-gray-500 font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 mt-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CA8A32]/20 focus:border-[#CA8A32]"
                  />
                </div>
                <div className="">
                  <label className="text-gray-500 font-medium">
                    Mobile number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 mt-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CA8A32]/20 focus:border-[#CA8A32]"
                  />
                </div>
              </div>

              <div className="mt-3 ">
                <label className="text-gray-500 font-medium">Message</label>
                <textarea
                  rows={4}
                  placeholder="Type Your Message"
                  className="w-full px-4 py-3 min-h-37.5 mt-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CA8A32]/20 focus:border-[#CA8A32] resize-none"
                ></textarea>
              </div>

              {/* recaptcha Placeholder */}
              <div className="p-3 border border-gray-300 rounded-xl w-fit flex items-center gap-3 xl:my-8 lg:my-6 my-4">
                <input type="checkbox" className="w-5 h-5 accent-[#CA8A32]" />
                <span className="text-sm text-gray-500 font-medium">
                  I'm not a robot
                </span>
                <img
                  src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                  alt="recaptcha"
                  className="w-6 h-6 ml-4"
                />
              </div>

              <Button type="submit">Submit Your Message</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
