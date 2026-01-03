import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SEO from "../components/SEO";
import AnimatedSection from "../components/AnimatedSection";
import { saveEstimateEnquiry } from "../services/api";
import InteriorSolutionsSection from "../components/InteriorSolutionsSection";

const BHK_DATA = {
  "1bhk": {
    name: "1 BHK",
    baseArea: 550,
    rooms: ["Living Room", "Bedroom", "Kitchen", "Bathroom"],
    basePrice: 350000,
  },
  "2bhk": {
    name: "2 BHK",
    baseArea: 950,
    rooms: [
      "Living Room",
      "Master Bedroom",
      "Bedroom 2",
      "Kitchen",
      "Bathroom 1",
      "Bathroom 2",
    ],
    basePrice: 550000,
  },
  "3bhk": {
    name: "3 BHK",
    baseArea: 1400,
    rooms: [
      "Living Room",
      "Master Bedroom",
      "Bedroom 2",
      "Bedroom 3",
      "Kitchen",
      "Bathroom 1",
      "Bathroom 2",
      "Bathroom 3",
    ],
    basePrice: 850000,
  },
};

const PACKAGES = {
  essential: {
    name: "Essential",
    rate: 1800,
    description: "Quality materials with functional design",
    features: [
      "Basic modular furniture",
      "Standard finishes",
      "Essential lighting",
      "1-year warranty",
    ],
    multiplier: 1,
  },
  premium: {
    name: "Premium",
    rate: 2500,
    description: "Premium materials with elegant design",
    features: [
      "Premium modular furniture",
      "Designer finishes",
      "Accent lighting",
      "False ceiling",
      "2-year warranty",
    ],
    multiplier: 1.4,
    popular: true,
  },
  luxury: {
    name: "Luxury",
    rate: 3500,
    description: "Luxury materials with bespoke design",
    features: [
      "Luxury custom furniture",
      "Imported finishes",
      "Smart lighting",
      "Full false ceiling",
      "Home automation ready",
      "3-year warranty",
    ],
    multiplier: 1.95,
  },
};

const ROOM_PRICES = {
  "Living Room": 80000,
  "Master Bedroom": 75000,
  Bedroom: 60000,
  "Bedroom 2": 60000,
  "Bedroom 3": 55000,
  Kitchen: 120000,
  "Modular Kitchen": 150000,
  Bathroom: 35000,
  "Bathroom 1": 35000,
  "Bathroom 2": 30000,
  "Bathroom 3": 30000,
  Wardrobe: 45000,
  "Study Room": 50000,
  "Pooja Room": 40000,
  Balcony: 25000,
};

const Estimator = () => {
  const [selectedBHK, setSelectedBHK] = useState("2bhk");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("premium");
  const [customArea, setCustomArea] = useState("");
  const [estimate, setEstimate] = useState(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize selected rooms when BHK changes
  useEffect(() => {
    const bhkData = BHK_DATA[selectedBHK];
    setSelectedRooms(bhkData.rooms);
  }, [selectedBHK]);

  // Calculate estimate whenever selections change
  useEffect(() => {
    calculateEstimate();
  }, [selectedBHK, selectedRooms, selectedPackage, customArea]);

  const calculateEstimate = () => {
    const bhkData = BHK_DATA[selectedBHK];
    const packageData = PACKAGES[selectedPackage];
    const area = customArea ? parseInt(customArea) : bhkData.baseArea;

    // Calculate room-wise cost
    let roomTotal = 0;
    const roomBreakdown = [];

    selectedRooms.forEach((room) => {
      const roomKey =
        Object.keys(ROOM_PRICES).find(
          (key) => room.includes(key) || key.includes(room)
        ) || room;
      const basePrice = ROOM_PRICES[roomKey] || ROOM_PRICES["Bedroom"] || 50000;
      const adjustedPrice = Math.round(basePrice * packageData.multiplier);
      roomTotal += adjustedPrice;
      roomBreakdown.push({ room, price: adjustedPrice });
    });

    // Calculate area-based cost
    const areaCost = area * packageData.rate;

    // Total estimate (using the higher of the two methods for accuracy)
    const totalEstimate = Math.max(roomTotal, areaCost);

    // Add 10% for miscellaneous and finishing
    const miscCost = Math.round(totalEstimate * 0.1);
    const grandTotal = totalEstimate + miscCost;

    setEstimate({
      bhk: bhkData.name,
      package: packageData.name,
      area,
      rate: packageData.rate,
      roomBreakdown,
      roomTotal,
      areaCost,
      miscCost,
      grandTotal,
      perSqFt: Math.round(grandTotal / area),
    });
  };

  const toggleRoom = (room) => {
    setSelectedRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
    );
  };

  const additionalRooms = ["Wardrobe", "Study Room", "Pooja Room", "Balcony"];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const enquiryData = {
        ...formData,
        bhkType: selectedBHK,
        packageType: selectedPackage,
        selectedRooms: selectedRooms.join(", "),
        area: customArea || BHK_DATA[selectedBHK].baseArea,
        estimatedBudget: estimate?.grandTotal,
        source: "estimator",
      };

      await saveEstimateEnquiry(enquiryData);

      toast.success(
        "Thank you! Our team will contact you with a detailed quote."
      );
      setShowEnquiryForm(false);
      setFormData({ name: "", phone: "", email: "", location: "" });

      // Track conversion
      if (window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-XXXXXXXXX/ESTIMATE_CONVERSION_ID",
          value: estimate?.grandTotal || 0,
          currency: "INR",
        });
      }
      if (window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Estimate Request",
          value: estimate?.grandTotal || 0,
          currency: "INR",
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi CASAMANDUVA! I used your estimator and got a quote of ₹${estimate?.grandTotal?.toLocaleString(
        "en-IN"
      )} for my ${
        BHK_DATA[selectedBHK].name
      } (${selectedPackage} package). I'd like to discuss this further.`
    );
    window.open(`https://wa.me/917730051329?text=${message}`, "_blank");
  };

  const estimatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CASAMANDUVA Interior Design Cost Estimator",
    description:
      "Calculate interior design costs for 1BHK, 2BHK, 3BHK apartments in Hyderabad",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "350000",
      highPrice: "3500000",
      priceCurrency: "INR",
    },
  };

  return (
    <>
      <SEO
        title="Interior Design Cost Estimator | 1BHK 2BHK 3BHK Prices"
        description="Calculate your interior design cost instantly. Get estimates for 1BHK (₹3.5L+), 2BHK (₹5.5L+), 3BHK (₹8.5L+) apartments in Hyderabad. Free consultation available."
        keywords="interior design cost calculator, 1bhk interior cost, 2bhk interior cost, 3bhk interior cost, interior design price hyderabad, modular kitchen cost"
        url="/estimator"
        schema={estimatorSchema}
      />
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=800&fit=crop"
            alt="Interior Design Cost Estimator"
            loading="eager"
          />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <AnimatedSection animation="fadeUp">
            <span className="section-badge">Free Estimate</span>
          </AnimatedSection>
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <h1>
              Interior Design <span className="text-gold">Cost Estimator</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <p>
              Get an instant estimate for your 1BHK, 2BHK, or 3BHK interior
              design project
            </p>
          </AnimatedSection>
        </div>
      </section>
      {/* Estimator Section */}
      <section className="estimator-section">
        <div className="container">
          <div className="estimator-grid">
            {/* Left: Form */}
            <div className="estimator-form">
              <h3>Configure Your Project</h3>

              {/* BHK Selection */}
              <div className="bhk-selector">
                {Object.entries(BHK_DATA).map(([key, data]) => (
                  <div
                    key={key}
                    className={`bhk-option ${
                      selectedBHK === key ? "selected" : ""
                    }`}
                    onClick={() => setSelectedBHK(key)}
                  >
                    <h4>{data.name}</h4>
                    <p>~{data.baseArea} sq.ft</p>
                  </div>
                ))}
              </div>

              {/* Custom Area */}
              <div
                className="form-group"
                style={{ marginBottom: "var(--space-lg)" }}
              >
                <label htmlFor="customArea">
                  Custom Area (sq.ft) - Optional
                </label>
                <input
                  type="number"
                  id="customArea"
                  value={customArea}
                  onChange={(e) => setCustomArea(e.target.value)}
                  placeholder={`Default: ${BHK_DATA[selectedBHK].baseArea} sq.ft`}
                  min="300"
                  max="5000"
                />
              </div>

              {/* Room Selection */}
              <div className="room-options">
                <h4>Included Rooms</h4>
                <div className="room-checkboxes">
                  {BHK_DATA[selectedBHK].rooms.map((room) => (
                    <label key={room} className="room-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedRooms.includes(room)}
                        onChange={() => toggleRoom(room)}
                      />
                      <span className="checkbox-custom"></span>
                      <span>{room}</span>
                    </label>
                  ))}
                </div>

                <h4 style={{ marginTop: "var(--space-md)" }}>Add-ons</h4>
                <div className="room-checkboxes">
                  {additionalRooms.map((room) => (
                    <label key={room} className="room-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedRooms.includes(room)}
                        onChange={() => toggleRoom(room)}
                      />
                      <span className="checkbox-custom"></span>
                      <span>{room}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Package Selection */}
              <div className="package-selector">
                <h4>Select Package</h4>
                <div className="packages">
                  {Object.entries(PACKAGES).map(([key, pkg]) => (
                    <div
                      key={key}
                      className={`package-option ${
                        selectedPackage === key ? "selected" : ""
                      }`}
                      onClick={() => setSelectedPackage(key)}
                    >
                      <div>
                        <span className="name">
                          {pkg.name}
                          {pkg.popular && (
                            <span
                              style={{
                                marginLeft: "0.5rem",
                                color: "var(--color-gold)",
                                fontSize: "0.75rem",
                              }}
                            >
                              ★ Popular
                            </span>
                          )}
                        </span>
                        <p
                          style={{
                            fontSize: "0.85rem",
                            margin: "0.25rem 0 0",
                            opacity: 0.7,
                          }}
                        >
                          {pkg.description}
                        </p>
                      </div>
                      <span className="rate">₹{pkg.rate}/sq.ft</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Estimate Result */}
            <div className="estimate-result">
              <h3>Your Estimate</h3>

              {estimate && (
                <>
                  <div className="estimate-breakdown">
                    <div className="breakdown-item">
                      <span className="label">Property Type</span>
                      <span className="value">{estimate.bhk}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="label">Package</span>
                      <span className="value">{estimate.package}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="label">Carpet Area</span>
                      <span className="value">{estimate.area} sq.ft</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="label">Selected Rooms</span>
                      <span className="value">
                        {selectedRooms.length} rooms
                      </span>
                    </div>
                    <div className="breakdown-item">
                      <span className="label">Base Cost</span>
                      <span className="value">
                        ₹{estimate.roomTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="breakdown-item">
                      <span className="label">Finishing & Misc (10%)</span>
                      <span className="value">
                        ₹{estimate.miscCost.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="total-estimate">
                    <p className="label">Estimated Budget</p>
                    <p className="amount">
                      ₹{estimate.grandTotal.toLocaleString("en-IN")}
                    </p>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        marginTop: "0.5rem",
                        opacity: 0.7,
                      }}
                    >
                      ≈ ₹{estimate.perSqFt}/sq.ft
                    </p>
                  </div>

                  <p className="estimate-note">
                    * This is an approximate estimate. Final quote may vary
                    based on site conditions, material choices, and
                    customizations.
                  </p>

                  {!showEnquiryForm ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--space-sm)",
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        onClick={() => setShowEnquiryForm(true)}
                        style={{ width: "100%" }}
                      >
                        Get Detailed Quote
                      </button>
                      <button
                        className="btn btn-outline-light"
                        onClick={openWhatsApp}
                        style={{ width: "100%" }}
                      >
                        Discuss on WhatsApp
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmitEnquiry}
                      style={{ marginTop: "var(--space-md)" }}
                    >
                      <div
                        className="form-group"
                        style={{ marginBottom: "var(--space-sm)" }}
                      >
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={handleFormChange}
                          required
                          style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "white",
                          }}
                        />
                      </div>
                      <div
                        className="form-group"
                        style={{ marginBottom: "var(--space-sm)" }}
                      >
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={handleFormChange}
                          required
                          style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "white",
                          }}
                        />
                      </div>
                      <div
                        className="form-group"
                        style={{ marginBottom: "var(--space-sm)" }}
                      >
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleFormChange}
                          style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "white",
                          }}
                        />
                      </div>
                      <div
                        className="form-group"
                        style={{ marginBottom: "var(--space-md)" }}
                      >
                        <input
                          type="text"
                          name="location"
                          placeholder="Property Location"
                          value={formData.location}
                          onChange={handleFormChange}
                          style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "white",
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        style={{ width: "100%" }}
                      >
                        {isSubmitting
                          ? "Submitting..."
                          : "Request Detailed Quote"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEnquiryForm(false)}
                        style={{
                          width: "100%",
                          marginTop: "var(--space-sm)",
                          background: "none",
                          border: "none",
                          color: "rgba(255,255,255,0.6)",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <InteriorSolutionsSection />;{/* Package Details Section */}
      <section
        className="section"
        style={{ background: "var(--color-warm-beige)" }}
      >
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-badge">Our Packages</span>
            <h2 className="section-title">
              What's <span className="text-gold">Included</span>
            </h2>
          </AnimatedSection>

          <div
            className="process-grid"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {Object.entries(PACKAGES).map(([key, pkg], index) => (
              <AnimatedSection
                key={key}
                className="process-card"
                animation="fadeUp"
                delay={index * 0.15}
                style={{ textAlign: "left" }}
              >
                <h3 style={{ marginBottom: "var(--space-xs)" }}>{pkg.name}</h3>
                <p
                  className="text-gold"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  ₹{pkg.rate}/sq.ft
                </p>
                <p style={{ marginBottom: "var(--space-md)" }}>
                  {pkg.description}
                </p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {pkg.features.map((feature, i) => (
                    <li
                      key={i}
                      style={{
                        padding: "0.5rem 0",
                        borderBottom: "1px solid rgba(44,44,44,0.1)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: "var(--color-gold)" }}>✓</span>{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <AnimatedSection className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Schedule a free consultation with our design experts</p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Book Free Consultation
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Estimator;
