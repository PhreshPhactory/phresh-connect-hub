
import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <p className="mb-6 text-lg">
                Phresh Phactory, Inc. is committed to protecting the privacy of our users. We understand the importance of privacy and take it seriously. This privacy policy applies to our website, phreshphactory.com, and explains how we collect, use, and disclose personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="mb-4">
                We collect personal information when you visit our website, such as your IP address, browser type, and browsing activity. We also collect personal information when you submit a contact form or sign up for our newsletter. This information may include your name, email address, and phone number. We use this information to improve our website, respond to your inquiries, and send you updates and promotional materials.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
              <p className="mb-4">
                We may share your personal information with third parties, such as service providers and analytics partners, for the purpose of providing our services and improving our website. We will not sell or rent your personal information to third parties for their marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Security</h2>
              <p className="mb-4">
                We use industry-standard security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee the security of your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Policy Updates</h2>
              <p className="mb-4">
                We will update this privacy policy from time to time to reflect any changes in our practices or applicable laws. If we make any material changes to this policy, we will notify you by posting the updated policy on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have any questions or concerns about our privacy policy, please contact us at{' '}
                <a href="mailto:info@phreshphactory.co" className="text-primary-500 hover:text-primary-600">
                  info@phreshphactory.co
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
