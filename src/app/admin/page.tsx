"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

type Patient = {
  id: number;
  full_name: string;
  country: string;
  dob: string;
  gender: string;
  phone_code?: string;
  phone: string;
  full_phone_number?: string;
  email: string;
  disease: string;
  package_type: string;
  notes: string;
  report_file_name?: string;
  report_file_path?: string;
  status?: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const res = await fetch("/api/patients");
        const data = await res.json();

        if (res.ok && data.success) {
          setPatients(data.patients);
        } else {
          alert(data.message || "Failed to load patients");
        }
      } catch {
        alert("Failed to load patients");
      } finally {
        setIsLoading(false);
      }
    };

    loadPatients();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin-logout", { method: "POST" });
      router.push("/admin-login");
      router.refresh();
    } catch {
      alert("Logout failed. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!patientToDelete) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/patients/${patientToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to delete patient");
        return;
      }

      setPatients((prev) =>
        prev.filter((patient) => patient.id !== patientToDelete.id)
      );

      setPatientToDelete(null);
    } catch {
      alert("Failed to delete patient");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/patients/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to update status");
        return;
      }

      setPatients((prev) =>
        prev.map((patient) =>
          patient.id === id ? { ...patient, status: newStatus } : patient
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = patient.full_name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const currentStatus = patient.status || "New";
      const matchesStatus =
        statusFilter === "All" ? true : currentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, searchText, statusFilter]);

  const getStatusBadgeStyle = (status: string) => {
    if (status === "New") {
      return {
        backgroundColor: "#dbeafe",
        color: "#1d4ed8",
      };
    }

    if (status === "Contacted") {
      return {
        backgroundColor: "#fef3c7",
        color: "#b45309",
      };
    }

    if (status === "In Progress") {
      return {
        backgroundColor: "#ede9fe",
        color: "#6d28d9",
      };
    }

    return {
      backgroundColor: "#dcfce7",
      color: "#15803d",
    };
  };

  const getReportPublicUrl = (filePath: string) => {
    return supabase.storage.from("medical-reports").getPublicUrl(filePath).data
      .publicUrl;
  };

  if (isLoading) {
    return (
      <>
        <style>{themeStyles}</style>
        <main
          style={{
            fontFamily: "Arial, sans-serif",
            backgroundColor: "var(--bg)",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "var(--text)", fontSize: "18px" }}>
            Loading dashboard...
          </p>
        </main>
      </>
    );
  }

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
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            backgroundColor: "var(--card)",
            padding: "30px",
            borderRadius: "16px",
            border: "1px solid var(--card-border)",
            boxShadow: "var(--shadow)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "var(--text)",
                margin: 0,
              }}
            >
              Admin Dashboard
            </h1>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "var(--button-dark)",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </div>

          <p
            style={{
              color: "var(--text-soft)",
              marginBottom: "30px",
              fontSize: "18px",
            }}
          >
            Here the admin can view patient registrations and update status.
          </p>

          <div
            style={{
              display: "grid",
              gap: "16px",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              marginBottom: "30px",
            }}
          >
            <div>
              <label style={labelStyle}>Search by Name</label>
              <input
                type="text"
                placeholder="Search patient name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Filter by Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={inputStyle}
              >
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {filteredPatients.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>No matching patients found.</p>
          ) : (
            <div style={{ display: "grid", gap: "20px" }}>
              {filteredPatients.map((patient) => {
                const currentStatus = patient.status || "New";

                return (
                  <div
                    key={patient.id}
                    style={{
                      border: "1px solid var(--card-border)",
                      borderRadius: "14px",
                      padding: "20px",
                      backgroundColor: "var(--card)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px",
                        flexWrap: "wrap",
                        marginBottom: "10px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "var(--text)",
                          margin: 0,
                        }}
                      >
                        {patient.full_name}
                      </h2>

                      <span
                        style={{
                          ...getStatusBadgeStyle(currentStatus),
                          padding: "8px 14px",
                          borderRadius: "999px",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        {currentStatus}
                      </span>
                    </div>

                    <p style={{ color: "var(--text)" }}>
                      <strong>Country:</strong> {patient.country}
                    </p>
                    <p style={{ color: "var(--text)" }}>
                      <strong>Date of Birth:</strong> {patient.dob}
                    </p>
                    <p style={{ color: "var(--text)" }}>
                      <strong>Gender:</strong> {patient.gender}
                    </p>
                    <p style={{ color: "var(--text)" }}>
                      <strong>Phone:</strong>{" "}
                      {patient.full_phone_number
                        ? patient.full_phone_number
                        : `${patient.phone_code || ""} ${patient.phone}`}
                    </p>
                    <p style={{ color: "var(--text)" }}>
                      <strong>Email:</strong> {patient.email}
                    </p>
                    <p style={{ color: "var(--text)" }}>
                      <strong>Disease:</strong> {patient.disease}
                    </p>
                    <p style={{ color: "var(--text)" }}>
                      <strong>Package:</strong> {patient.package_type}
                    </p>
                    <p style={{ color: "var(--text)" }}>
                      <strong>Medical Report:</strong>{" "}
                      {patient.report_file_path ? (
                        <a
                          href={getReportPublicUrl(patient.report_file_path)}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "#2563eb", textDecoration: "underline" }}
                        >
                          {patient.report_file_name || "View Report"}
                        </a>
                      ) : (
                        "No file attached"
                      )}
                    </p>
                    <p style={{ color: "var(--text)" }}>
                      <strong>Notes:</strong>{" "}
                      {patient.notes || "No additional notes"}
                    </p>

                    <div style={{ marginTop: "15px", display: "grid", gap: "10px" }}>
                      <label style={labelStyle}>Status</label>
                      <select
                        value={currentStatus}
                        onChange={(e) =>
                          handleStatusChange(patient.id, e.target.value)
                        }
                        style={{
                          ...inputStyle,
                          maxWidth: "240px",
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setPatientToDelete(patient)}
                      style={{
                        marginTop: "15px",
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Delete Patient
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {patientToDelete && (
          <div style={overlayStyle}>
            <div style={deletePopupStyle}>
              <h2
                style={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  color: "var(--text)",
                  marginBottom: "12px",
                }}
              >
                Confirm Delete
              </h2>

              <p
                style={{
                  color: "var(--text-soft)",
                  lineHeight: "1.7",
                  marginBottom: "20px",
                  fontSize: "16px",
                }}
              >
                Are you sure you want to delete the patient record for{" "}
                <strong style={{ color: "var(--text)" }}>
                  {patientToDelete.full_name}
                </strong>
                ? This action cannot be undone.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "12px 18px",
                    borderRadius: "10px",
                    cursor: isDeleting ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    opacity: isDeleting ? 0.7 : 1,
                  }}
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>

                <button
                  onClick={() => setPatientToDelete(null)}
                  disabled={isDeleting}
                  style={{
                    backgroundColor: "var(--input-bg)",
                    color: "var(--text)",
                    border: "1px solid var(--card-border)",
                    padding: "12px 18px",
                    borderRadius: "10px",
                    cursor: isDeleting ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Cancel
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
    --text-muted: #6b7280;
    --card: #ffffff;
    --card-border: #e5e7eb;
    --input-bg: #ffffff;
    --input-border: #d1d5db;
    --button-dark: #111827;
    --shadow: 0 10px 25px rgba(0,0,0,0.05);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #020617;
      --text: #f8fafc;
      --text-soft: #cbd5e1;
      --text-muted: #94a3b8;
      --card: #0f172a;
      --card-border: #1e293b;
      --input-bg: #111827;
      --input-border: #334155;
      --button-dark: #1e293b;
      --shadow: 0 10px 25px rgba(0,0,0,0.35);
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

const labelStyle = {
  display: "block",
  fontSize: "16px",
  fontWeight: "bold" as const,
  color: "var(--text)",
  marginBottom: "8px",
};

const overlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  zIndex: 1000,
};

const deletePopupStyle = {
  width: "100%",
  maxWidth: "500px",
  backgroundColor: "var(--card)",
  borderRadius: "16px",
  padding: "28px",
  border: "1px solid var(--card-border)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
};