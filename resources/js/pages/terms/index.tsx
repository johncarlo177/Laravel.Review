import React from 'react';
import { Head } from '@inertiajs/react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Head title="Neviane LLC – Terms & Privacy" />

      <main className="max-w-4xl mx-auto px-6 py-10 lg:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Neviane LLC — Master Service Agreement
        </h1>
        <p className="mb-4 text-sm text-slate-500">
          (Terms &amp; Conditions + Privacy Policy + Cookie Policy + Refund Policy + DPA + HIPAA Disclaimer)
        </p>

        <p className="mb-4">
          <strong>Last Updated:</strong> [Insert Date]
        </p>
        <p className="mb-6">
          <strong>Company:</strong> Neviane LLC
          <br />
          <strong>Address:</strong> 8500 Normandale Lake Blvd #350, Bloomington, MN 55437
          <br />
          <strong>Email:</strong> <a href="mailto:support@neviane.com" className="text-blue-600 underline">support@neviane.com</a>
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">1. Introduction</h2>
            <p className="text-slate-700">
              This Master Service Agreement (“Agreement”) governs the access and use of all software, platforms, websites, and
              digital products provided by Neviane LLC (“Neviane,” “Company,” “we,” “us,” or “our”). By accessing or using
              Neviane’s services (“Services”), you agree to be bound by all sections within this Agreement. If you do not agree,
              you must not use our Services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">2. Eligibility</h2>
            <p className="text-slate-700">
              Users must be at least 18 years old, have legal authority to enter binding contracts, and use the Services in
              compliance with local, state, and federal laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">3. Use of Services</h2>
            <p className="text-slate-700">
              You agree not to use the Services for illegal, fraudulent, or harmful activities; reverse engineer, scrape, clone,
              or replicate our software; circumvent security or manipulate data; or upload malware, offensive content, or
              protected information without authorization. Neviane reserves the right to suspend or terminate accounts for
              violations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">4. Account Responsibility</h2>
            <p className="text-slate-700">
              You are responsible for maintaining the confidentiality of your account, all actions performed using your
              credentials, and promptly notifying <a href="mailto:support@neviane.com" className="text-blue-600 underline">support@neviane.com</a> if
              unauthorized access occurs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">5. Payments, Billing &amp; Subscriptions</h2>
            <p className="text-slate-700">
              All fees are displayed at checkout or in your service agreement. Payments are non-refundable except where required
              by law. Subscriptions renew automatically unless canceled. Failure to pay may result in suspension or termination,
              and prices may be updated with notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">6. No Legal, Medical, or Financial Advice</h2>
            <p className="text-slate-700">
              Neviane provides automation, AI assistance, customer engagement tools, feedback systems, and digital business tools,
              but does not provide legal, medical, or financial advice, nor compliance guarantees. You are solely responsible for
              legal and regulatory compliance in your operations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">7. AI Output &amp; Third-Party Services</h2>
            <p className="text-slate-700">
              The Services may rely on GPT/AI models, SMS/email services, hosting providers, and integrations you activate. AI
              outputs may not always be accurate, and third-party outages or errors are not Neviane’s responsibility. Neviane is
              not liable for losses caused by AI interpretation or automation errors.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">8. User Data &amp; Content Ownership</h2>
            <p className="text-slate-700">
              You retain ownership of your uploaded data, contacts, content, notes, and files. Neviane retains ownership of the
              software architecture, platform logic, AI workflows, UI/UX designs, branding, and proprietary systems. You grant
              Neviane a limited license to process your data solely to provide the Services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">9. Prohibited Content</h2>
            <p className="text-slate-700">
              You must not upload or transmit illegal materials, harassment or hate content, malware, unauthorized health data, or
              sensitive personal information without proper consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">10. Termination of Service</h2>
            <p className="text-slate-700">
              Neviane may suspend or permanently terminate accounts for policy violations, payment failure, misuse of the
              platform, or actions causing risk or harm. You may close your account by contacting{' '}
              <a href="mailto:support@neviane.com" className="text-blue-600 underline">support@neviane.com</a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">11. Limitation of Liability</h2>
            <p className="text-slate-700">
              Neviane LLC is not liable for loss of revenue, loss of data, business interruption, AI output inaccuracies,
              third-party outages, or any indirect or consequential damages. Maximum liability is limited to the fees paid to
              Neviane in the previous 12 months.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">12. Indemnification</h2>
            <p className="text-slate-700">
              You agree to indemnify and hold Neviane harmless from claims arising from misuse of the Services, violations of this
              Agreement, uploaded content or data, and any legal dispute caused by your actions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">13. Governing Law</h2>
            <p className="text-slate-700">
              This Agreement is governed by the laws of the State of Minnesota, United States. Disputes will be resolved through
              courts located in Hennepin County, Minnesota.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">14. Modifications</h2>
            <p className="text-slate-700">
              Neviane may update this Agreement at any time. Continued use of the Services constitutes acceptance of the updated
              terms.
            </p>
          </div>
        </section>

        <h1 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Privacy Policy</h1>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">15. Information We Collect</h2>
            <p className="text-slate-700">
              We collect personal information (such as name, email, phone, business and billing information), account and usage
              data (login activity, IP address, device and browser details, system and AI request logs), and submitted content
              (contacts, notes, documents, and feedback responses).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">16. How We Use Your Information</h2>
            <p className="text-slate-700">
              We use information to provide and improve the Services, run AI automations, process payments, deliver customer
              support, enhance performance and security, and monitor compliance and fraud prevention. We do not sell personal
              information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">17. Sharing Information</h2>
            <p className="text-slate-700">
              We may share data with hosting providers, communication platforms, AI and automation providers, and legal
              authorities where required. We do not share user data for advertising purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">18. Data Security</h2>
            <p className="text-slate-700">
              Neviane uses encryption in transit, secure architecture, role-based access, tokenized authentication, and audit
              logs. No system is 100% immune to risk, but strong safeguards are in place.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">19. Data Retention</h2>
            <p className="text-slate-700">
              Data is retained while your account is active, when legal requirements apply, or when operational purposes require
              it. You may request deletion at any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">20. User Rights</h2>
            <p className="text-slate-700">
              You may request data access, correction, deletion, processing restrictions, or data export by contacting{' '}
              <a href="mailto:support@neviane.com" className="text-blue-600 underline">support@neviane.com</a>.
            </p>
          </div>
        </section>

        <h1 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Cookie Policy</h1>
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">21. Cookies &amp; Tracking Technology</h2>
            <p className="text-slate-700">
              Neviane uses cookies for authentication, session management, analytics, and security. You may disable cookies in
              your browser, but some features may not function properly.
            </p>
          </div>
        </section>

        <h1 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Refund Policy</h1>
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">22. Refunds</h2>
            <p className="text-slate-700">
              All payments are non-refundable, including subscription fees, usage fees, and service credits, except where legally
              required. In the event of technical issues, Neviane may offer service credit at its discretion.
            </p>
          </div>
        </section>

        <h1 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Data Processing Agreement (DPA)</h1>
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">23. Purpose</h2>
            <p className="text-slate-700">
              This section governs how Neviane processes customer data as a “Data Processor.” Neviane processes data only on
              customer instructions, implements industry-standard security, does not share data without authorization, assists in
              responding to privacy requests, and notifies users of major security breaches.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">24. Sub-Processors</h2>
            <p className="text-slate-700">
              Neviane uses verified sub-processors such as hosting providers, AI model providers, and SMS/email gateways. A
              current list is available upon request.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">25. Data Transfers</h2>
            <p className="text-slate-700">
              Data may be stored or processed in the United States or other regions with adequate protections.
            </p>
          </div>
        </section>

        <h1 className="text-3xl font-bold text-slate-900 mt-12 mb-4">HIPAA Disclaimer</h1>
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">26. HIPAA Notice</h2>
            <p className="text-slate-700">
              Neviane LLC is not designed for storage of HIPAA-protected medical information unless a separate Business Associate
              Agreement (BAA) is signed. Neviane does not act as a HIPAA Covered Entity or Business Associate by default. Users
              are responsible for ensuring no PHI is uploaded unless expressly permitted.
            </p>
          </div>
        </section>

        <h1 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Contact Information</h1>
        <section className="space-y-2 mb-12">
          <p className="text-slate-700">
            For privacy, legal, billing, or support matters, contact:
          </p>
          <p className="text-slate-700">
            <a href="mailto:support@neviane.com" className="text-blue-600 underline">support@neviane.com</a>
            <br />
            8500 Normandale Lake Blvd #350, Bloomington, MN 55437
          </p>
        </section>
      </main>
    </div>
  );
}


