import React, { useState } from "react";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/Sidebar";
import httpClient from "../../_util/api";
import "./style.scss";

const storedValue = (key) => localStorage.getItem(key) || "";

const blankForm = () => ({
  firstName: storedValue("firstName"),
  lastName: storedValue("lastName"),
  email: "",
  phoneNumber: "",
  agentCode: storedValue("agentCode"),
  subject: "",
  description: "",
  companyWebsite: "",
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateForm = (form) => {
  const errors = {};

  if (!form.firstName.trim()) {
    errors.firstName = "First name is required.";
  }
  if (!emailPattern.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (form.phoneNumber.replace(/\D/g, "").length < 10) {
    errors.phoneNumber = "Enter a valid phone number.";
  }
  if (!form.agentCode.trim()) {
    errors.agentCode = "Enter a valid agent code.";
  }
  if (!form.subject.trim()) {
    errors.subject = "Subject is required.";
  }
  if (!form.description.trim()) {
    errors.description = "Please describe the technical problem you are facing.";
  }

  return errors;
};

const TechnicalSupport = () => {
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBanner(null);

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setBanner({
        kind: "bad",
        message: "Please correct the highlighted fields.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await httpClient.post("/support", {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        agentCode: form.agentCode.trim(),
        subject: form.subject.trim(),
        description: form.description.trim(),
        companyWebsite: form.companyWebsite,
      });
      setForm(blankForm());
      setErrors({});
      setBanner({
        kind: "ok",
        message: res?.data?.message || "Your request was submitted.",
      });
    } catch (error) {
      const data = error?.response?.data;
      if (data?.errors) {
        setErrors(data.errors);
      }
      setBanner({
        kind: "bad",
        message:
          data?.message || "Unable to reach the server. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div style={{ marginTop: "56px" }}>
        <div style={{ display: "flex", height: "92vh" }}>
          <SideBar />
          <div className="support-page">
            <main className="wrap">
              <section className="card">
                <h1 className="card-title">Technical Support</h1>
                <div className="card-body">
                  <h2 className="section-title">Technical Support</h2>
                  {banner ? (
                    <div className={`banner ${banner.kind}`} role="status">
                      {banner.message}
                    </div>
                  ) : null}
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="hp" aria-hidden="true">
                      <label htmlFor="companyWebsite">Company website</label>
                      <input
                        id="companyWebsite"
                        name="companyWebsite"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.companyWebsite}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid">
                      <div className="field">
                        <label htmlFor="firstName">
                          Name <span className="req">*</span>
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          autoComplete="given-name"
                          value={form.firstName}
                          onChange={handleChange}
                        />
                        <span className="hint">First Name</span>
                        <span className="error">{errors.firstName}</span>
                      </div>
                      <div className="field">
                        <label htmlFor="lastName">&nbsp;</label>
                        <input
                          id="lastName"
                          name="lastName"
                          autoComplete="family-name"
                          value={form.lastName}
                          onChange={handleChange}
                        />
                        <span className="hint">Last Name</span>
                        <span className="error">{errors.lastName}</span>
                      </div>
                      <div className="field">
                        <label htmlFor="email">
                          Email <span className="req">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={handleChange}
                        />
                        <span className="error">{errors.email}</span>
                      </div>
                      <div className="field">
                        <label htmlFor="phoneNumber">
                          Phone Number <span className="req">*</span>
                        </label>
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          autoComplete="tel"
                          value={form.phoneNumber}
                          onChange={handleChange}
                        />
                        <span className="error">{errors.phoneNumber}</span>
                      </div>
                      <div className="field">
                        <label htmlFor="agentCode">
                          Agent Code <span className="req">*</span>
                        </label>
                        <input
                          id="agentCode"
                          name="agentCode"
                          autoComplete="off"
                          value={form.agentCode}
                          onChange={handleChange}
                        />
                        <span className="error">{errors.agentCode}</span>
                      </div>
                      <div className="field">
                        <label htmlFor="subject">
                          Subject <span className="req">*</span>
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                        />
                        <span className="error">{errors.subject}</span>
                      </div>
                      <div className="field span-2">
                        <label htmlFor="description">
                          Please describe the technical problem you are facing
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                        />
                        <span className="error">{errors.description}</span>
                      </div>
                    </div>
                    <div className="actions">
                      <button id="submit-btn" type="submit" disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechnicalSupport;
