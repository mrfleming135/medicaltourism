"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

const diseaseOptions = [
  "Heart Disease",
  "IVF / Fertility",
  "Knee Pain",
  "Joint Pain",
  "Migraine",
  "Stroke",
  "Cancer",
  "General Checkup",
];

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    country: "Sri Lanka",
    dob: "",
    gender: "",
    phoneCode: "+94",
    phone: "",
    email: "",
    disease: "",
    packageType: "",
    notes: "",
    reportFileName: "",
    reportFilePath: "",
  });

  const [reportFile, setReportFile] = useState<File | null>(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;

    setFormData({
      ...formData,
      country: selectedCountry,
      phoneCode: selectedCountry === "Bangladesh" ? "+880" : "+94",
    });
  };

  const handleDiseaseButtonClick = (disease: string) => {
    setFormData({
      ...formData,
      disease,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setReportFile(file);

    setFormData({
      ...formData,
      reportFileName: file ? file.name : "",
    });
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.country.trim() ||
      !formData.dob.trim() ||
      !formData.gender.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.disease.trim() ||
      !formData.packageType.trim()
    ) {
      alert("Please fill all mandatory fields before continuing.");
      return;
    }

    setShowReviewPopup(true);
  };

  const handleConfirmRegistration = async () => {
    try {
      setIsSubmitting(true);

      let uploadedFilePath = "";

      if (reportFile) {
        const safeFileName = `${Date.now()}-${reportFile.name.replace(/\s+/g, "-")}`;
        const filePath = `patients/${safeFileName}`;

        const { error: uploadError } = await supabase.storage
          .from("medical-reports")
          .upload(filePath, reportFile, {
            cacheControl: "3600",
            upsert: false,
            contentType: reportFile.type,
          });

        if (uploadError) {
          alert(uploadError.message || "Failed to upload medical report");
          return;
        }

        uploadedFilePath = filePath;
      }

      const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          reportFilePath: uploadedFilePath,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to save registration");
        return;
      }

      setShowReviewPopup(false);
      setReportFile(null);

      setFormData({
        fullName: "",
        country: "Sri Lanka",
        dob: "",
        gender: "",
        phoneCode: "+94",
        phone: "",
        email: "",
        disease: "",
        packageType: "",
        notes: "",
        reportFileName: "",
        reportFilePath: "",
      });

      router.push("/thank-you");
    } catch {
      alert("Something went wrong while saving the registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{themeStyles}</style>

      <main
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "var(--bg)",
          minHeight: "100vh",
          padding: "40px",
          color: "var(--text)",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "950px",
            margin: "0 auto",
            backgroundColor: "var(--card)",
            padding: "30px",
            borderRadius: "16px",
            border: "1px solid var(--card-border)",
            boxShadow: "var(--shadow)",
            transition: "background-color 0.3s ease, border-color 0.3s ease",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "var(--text)",
              marginBottom: "20px",
            }}
          >
            Patient Registration
          </h1>

          <p
            style={{
              color: "var(--text-soft)",
              marginBottom: "30px",
              fontSize: "18px",
            }}
          >
            Please enter your details and choose your preferred medical tourism package.
          </p>

          <form onSubmit={handleReview} style={{ display: "grid", gap: "16px" }}>
            <label style={labelStyle}>Name *</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <div style={{ display: "grid", gap: "10px" }}>
              <label style={labelStyle}>Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
                style={inputStyle}
                required
              >
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Bangladesh">Bangladesh</option>
              </select>
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              <label style={labelStyle}>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <label style={labelStyle}>Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={inputStyle}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <div style={{ display: "grid", gap: "10px" }}>
              <label style={labelStyle}>Phone Number *</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    maxWidth: "180px",
                  }}
                  required
                >
                  <option value="+94">🇱🇰 +94</option>
                  <option value="+880">🇧🇩 +880</option>
                </select>

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <label style={labelStyle}>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <div style={{ display: "grid", gap: "10px" }}>
              <label style={labelStyle}>Select Disease *</label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {diseaseOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleDiseaseButtonClick(item)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "999px",
                      border:
                        formData.disease === item
                          ? "2px solid var(--button-dark)"
                          : "1px solid var(--input-border)",
                      backgroundColor:
                        formData.disease === item ? "var(--button-dark)" : "var(--card)",
                      color: formData.disease === item ? "white" : "var(--text)",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition:
                        "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              <label style={labelStyle}>Select Package *</label>
              <select
                name="packageType"
                value={formData.packageType}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="">Select Package</option>
                <option value="Premium Care - $250 per day">
                  Premium Care - $250 per day
                </option>
                <option value="Deluxe Care - $150 per day">
                  Deluxe Care - $150 per day
                </option>
                <option value="Budget Care - $80 per day">
                  Budget Care - $80 per day
                </option>
              </select>

              <div
                style={{
                  backgroundColor: "var(--note-bg)",
                  border: "1px solid var(--note-border)",
                  borderRadius: "10px",
                  padding: "14px",
                  color: "var(--note-text)",
                  lineHeight: "1.6",
                }}
              >
                <strong>Package Note:</strong> Package prices are shown per day.
                The actual treatment duration will be discussed with you directly.
                Final package cost may vary depending on the treatment time, hospital
                requirement, and stay duration. Flight tickets, visa, immigration, and
                other travel-related charges are not included in the package. These will
                vary separately, and our team will guide you during the discussion process.
              </div>
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              <label style={labelStyle}>Attach Old Medical Reports</label>
              <input
                type="file"
                name="medicalReports"
                onChange={handleFileChange}
                style={fileInputStyle}
              />
              {formData.reportFileName && (
                <p style={{ color: "var(--text)", margin: 0 }}>
                  Selected File: {formData.reportFileName}
                </p>
              )}
            </div>

            <label style={labelStyle}>Additional Notes</label>
            <textarea
              name="notes"
              placeholder="Additional Notes"
              rows={5}
              value={formData.notes}
              onChange={handleChange}
              style={inputStyle}
            />

            <button
              type="submit"
              style={{
                backgroundColor: "var(--button-dark)",
                color: "white",
                padding: "14px 20px",
                borderRadius: "10px",
                border: "none",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Review Information
            </button>
          </form>
        </div>

        {showReviewPopup && (
          <div style={overlayStyle}>
            <div style={popupStyle}>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "var(--text)",
                  marginBottom: "20px",
                }}
              >
                Confirm Registration
              </h2>

              <div style={{ display: "grid", gap: "10px", color: "var(--text)" }}>
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>Country:</strong> {formData.country}</p>
                <p><strong>Date of Birth:</strong> {formData.dob}</p>
                <p><strong>Gender:</strong> {formData.gender}</p>
                <p><strong>Phone:</strong> {formData.phoneCode} {formData.phone}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Disease:</strong> {formData.disease}</p>
                <p><strong>Package:</strong> {formData.packageType}</p>
                <p><strong>Medical Report:</strong> {formData.reportFileName || "No file attached"}</p>
                <p><strong>Additional Notes:</strong> {formData.notes || "No additional notes"}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "25px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={handleConfirmRegistration}
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "var(--button-dark)",
                    color: "white",
                    padding: "12px 18px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Registration"}
                </button>

                <button
                  onClick={() => setShowReviewPopup(false)}
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "var(--secondary-button-bg)",
                    color: "var(--text)",
                    padding: "12px 18px",
                    borderRadius: "10px",
                    border: "1px solid var(--card-border)",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Edit Information
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

const themeStyles = `
  :root {
    color-scheme: light dark;
    --bg: #f8fafc;
    --text: #111827;
    --text-soft: #4b5563;
    --card: #ffffff;
    --card-border: #e5e7eb;
    --input-bg: #ffffff;
    --input-border: #d1d5db;
    --button-dark: #111827;
    --secondary-button-bg: #e5e7eb;
    --note-bg: #fff7ed;
    --note-border: #fdba74;
    --note-text: #111827;
    --shadow: 0 10px 25px rgba(0,0,0,0.05);
    --popup-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #020617;
      --text: #f8fafc;
      --text-soft: #cbd5e1;
      --card: #0f172a;
      --card-border: #1e293b;
      --input-bg: #111827;
      --input-border: #334155;
      --button-dark: #1e293b;
      --secondary-button-bg: #1f2937;
      --note-bg: #3f2a14;
      --note-border: #c2410c;
      --note-text: #fed7aa;
      --shadow: 0 10px 25px rgba(0,0,0,0.35);
      --popup-shadow: 0 10px 30px rgba(0,0,0,0.45);
    }
  }
`;

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid var(--input-border)",
  fontSize: "16px",
  color: "var(--text)",
  backgroundColor: "var(--input-bg)",
};

const fileInputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid var(--input-border)",
  fontSize: "16px",
  color: "var(--text)",
  backgroundColor: "var(--input-bg)",
};

const labelStyle = {
  fontSize: "16px",
  fontWeight: "bold" as const,
  color: "var(--text)",
};

const overlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  zIndex: 1000,
};

const popupStyle = {
  width: "100%",
  maxWidth: "650px",
  backgroundColor: "var(--card)",
  borderRadius: "16px",
  padding: "30px",
  border: "1px solid var(--card-border)",
  boxShadow: "var(--popup-shadow)",
};