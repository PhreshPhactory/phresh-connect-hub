import React from 'react';
import SEOHead from '@/components/SEOHead';

const Terms = () => {
  return (
    <>
      <SEOHead
        title="Terms & Conditions | Phresh Phactory, Inc."
        description="Terms and conditions governing use of Phresh Phactory, Inc. services, including SMS messaging consent and subsidiary platforms."
      />
      <div className="min-h-screen bg-white py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Terms &amp; Conditions</h1>
            <div className="prose prose-lg max-w-none">
              <p className="mb-8 text-lg font-semibold">
                This agreement also governs our subsidiary platforms and DBAs, including Rich Braids (richbraids.com).
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing our website, submitting a form, or using any service provided by Phresh Phactory, Inc., you agree to these terms and conditions. If you do not agree, please discontinue use of our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Services</h2>
                <p className="mb-4">
                  Phresh Phactory, Inc. provides operations consulting, fractional executive leadership, systems design, and related advisory and training services. Scope, deliverables, and fees for engagements are defined in individual service agreements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">SMS Messaging Terms</h2>
                <p className="mb-4">
                  By providing your mobile number and checking the SMS consent box on our contact form, you agree to receive SMS notifications, appointment updates, and marketing messages from Phresh Phactory, Inc. and our subsidiary platform, Rich Braids. Message and data rates may apply. Message frequency varies. Reply STOP to cancel or HELP for help. Consent to receive messages is not a condition of purchase. Carriers are not liable for delayed or undelivered messages.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Payments and Refunds</h2>
                <p className="mb-4">
                  Fees are due as stated at the time of purchase or as outlined in your service agreement. Unless otherwise stated in writing, program and workshop fees are non-refundable once access has been granted.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <p className="mb-4">
                  All content, frameworks, templates, and materials published by Phresh Phactory, Inc. remain our intellectual property and may not be reproduced or redistributed without written permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="mb-4">
                  Our services are provided on an as-is basis. Phresh Phactory, Inc. is not liable for indirect, incidental, or consequential damages arising from use of our website or services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p>
                  Questions about these terms may be directed to{' '}
                  <a href="mailto:Kiera@PhreshPhactory.co" className="text-primary-500 hover:text-primary-600">
                    Kiera@PhreshPhactory.co
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
