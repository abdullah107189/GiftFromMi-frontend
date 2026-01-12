const MapSection = () => {
  return (
    <section className="w-full overflow-hidden px-3 rounded-2xl">
      <div className="xl:h-158.25 md:h-140 h-80 rounded-2xl border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29209.87682231836!2d90.407815!3d23.774658799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c769ad5e7f6f%3A0x1d928a50d9cbcc90!2sSKS%20Shopping%20Mall!5e0!3m2!1sen!2sbd!4v1768194634860!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "16px" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
