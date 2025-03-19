import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="w-11/12 mx-auto my-10 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Privacy & Policy</h1>
      <p className="text-gray-600 text-center mb-8">Effective Date: March 2025</p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-4">
          Welcome to DeshRide! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your data when using our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Personal details (name, email, phone number, etc.).</li>
          <li>Vehicle details for car owners listing their cars.</li>
          <li>Payment and billing information.</li>
          <li>Location data for ride-sharing and rental services.</li>
          <li>Usage data (how you interact with our platform).</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To provide and improve our services.</li>
          <li>To process bookings, payments, and ride-sharing requests.</li>
          <li>To ensure security and prevent fraud.</li>
          <li>To send important updates and promotional offers.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Data Sharing & Security</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>We do not sell your data to third parties.</li>
          <li>We may share data with trusted partners for payment processing and identity verification.</li>
          <li>All sensitive data is encrypted and securely stored.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Your Rights & Choices</h2>
        <p className="text-gray-700 mb-4">
          You have the right to access, update, or delete your data. You can also opt out of promotional messages at any time.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Changes to This Policy</h2>
        <p className="text-gray-700 mb-4">
          DeshRide may update this policy occasionally. We encourage users to review this page for any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about our Privacy Policy, please contact us at <span className="font-semibold">support@deshride.com</span>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;