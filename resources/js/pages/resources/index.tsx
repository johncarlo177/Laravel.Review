import React, { useState, useEffect } from 'react';
import { Shield, ChevronLeft, Clock, Plus, Minus, Quote } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

const ResourcesPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeBlog, setActiveBlog] = useState<any>(null);

  // Map dropdown items to section indices
  const sectionMap: { [key: string]: number } = {
    'blog-insights': 0,
    'guides-how-tos': 1,
    'templates-tools': 2,
    'faqs': 3,
    'customer-stories': 4,
    'webinars-videos': 5,
    'glossary': 6,
    'support-center': 7,
    'legal-guides': 8,
  };

  // Check URL hash on mount and when it changes
  useEffect(() => {
    const openSectionFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && sectionMap[hash] !== undefined) {
        const sectionIndex = sectionMap[hash];
        setOpenIndex(sectionIndex);
        // Scroll to the section after a brief delay to ensure it's rendered
        setTimeout(() => {
          const element = document.getElementById(`section-${sectionIndex}`);
          if (element) {
            // Account for navbar height
            const navbarHeight = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 300);
      }
    };

    // Small delay to ensure page is fully loaded
    const timer = setTimeout(() => {
      openSectionFromHash();
    }, 100);
    
    // Listen for hash changes
    const handleHashChange = () => {
      openSectionFromHash();
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const blogs = [
    {
      id: 1,
      title: "How AI Can Automatically Recover Negative Reviews",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="space-y-6">
          <p>Negative reviews can be painful for small businesses. A single 1-star rating can hurt your reputation and turn potential customers away. But what if there was a way to recover those reviews automatically without manually contacting each unhappy customer?</p>
          <p>Our AI-powered platform identifies low ratings (&lt;4 stars) and sends personalized, human-like messages to understand the issue and help fix it before it hits public review sites. This process ensures:</p>
          <ul className="list-disc pl-6 space-y-2 text-indigo-400">
            <li>Customers feel heard and valued</li>
            <li>Issues are addressed before hitting public review sites</li>
            <li>Businesses recover revenue that might have been lost</li>
          </ul>
          <div className="bg-white/5 p-6 rounded-2xl border-l-4 border-indigo-500">
            <p className="font-bold text-white mb-2">Example: Sarah's Salon</p>
            <p>Sarah runs a salon and received a few negative reviews. After integrating AI Recovery, the system reached out to those customers with friendly messages. Within a month, 80% of the 1-star experiences were resolved, and many left updated positive reviews.</p>
          </div>
          <p>The result? Improved online reputation, happier customers, and increased repeat visits.</p>
        </div>
      )
    },
    {
      id: 2,
      title: "The Power of Win-Back Messages: Bringing Lost Customers Back",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="space-y-6">
          <p>Did you know that customers who haven't visited your business in 30–60+ days are often your biggest untapped revenue source? Many small businesses focus on new customers, forgetting the ones who already know and love their service.</p>
          <p>Our AI Win-Back feature automatically identifies dormant and lost customers and sends friendly, personalized messages designed to bring them back.</p>
          <ul className="list-disc pl-6 space-y-2 text-indigo-400">
            <li>Reconnects with high-value VIPs</li>
            <li>Nudges dormant customers to return</li>
            <li>Recovers one-time visitors and failed leads</li>
          </ul>
          <div className="bg-white/5 p-6 rounded-2xl border-l-4 border-indigo-500">
            <p className="font-bold text-white mb-2">Example: Tony's Taqueria</p>
            <p>Tony's Taqueria used Win-Back messages for customers absent 45 days. Within two months, 60 of these customers returned, generating $2,300 in extra revenue.</p>
          </div>
          <p className="font-bold text-white italic">Key takeaway: Re-engaging existing customers is often cheaper and more effective than acquiring new ones.</p>
        </div>
      )
    },
    {
      id: 3,
      title: "Auto-Send Ratings: Collect More Reviews Without Lifting a Finger",
      image: "https://images.unsplash.com/photo-1556742049-0ad335048995?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="space-y-6">
          <p>Online reviews drive trust. But asking every customer to leave a review can be time-consuming and inconsistent. Our Auto-Send Ratings feature automates this process.</p>
          <p className="font-bold text-white">Triggers include:</p>
          <ul className="list-disc pl-6 space-y-2 text-indigo-400">
            <li>POS or booking completion</li>
            <li>CSV upload of customer lists</li>
            <li>Manual "Service Done" button</li>
          </ul>
          <p>Once triggered, customers receive a short, natural message asking for a review. No phone numbers, no promos, no marketing fluff—just a human-feel message.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-xl text-center"><p className="font-black text-white">Effortless</p></div>
            <div className="p-4 bg-white/5 rounded-xl text-center"><p className="font-black text-white">Visible</p></div>
            <div className="p-4 bg-white/5 rounded-xl text-center"><p className="font-black text-white">Strategic</p></div>
          </div>
          <p>Businesses love it because it's simple, automatic, and effective.</p>
        </div>
      )
    },
    {
      id: 4,
      title: "Case Study: How Small Businesses Increased Revenue Using AI Recovery",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="space-y-8">
          <div className="space-y-2">
            <h4 className="text-white font-black">Sarah's Salon:</h4>
            <p className="text-slate-400">Problem: Low reviews. Solution: AI Recovery. Result: 45 returned, 80% 1-star reduction.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-black">Tony's Taqueria:</h4>
            <p className="text-slate-400">Problem: No reviews. Solution: Win-Back. Result: 60 returning, $2,300 extra revenue.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-black">Luxe Nails Studio:</h4>
            <p className="text-slate-400">Problem: High churn. Solution: Progressive Signup. Result: 35% retention improvement.</p>
          </div>
          <p className="bg-indigo-600/20 p-4 rounded-xl text-indigo-400 font-bold">Takeaway: With AI Recovery and Win-Back, businesses protect their reputation and recover revenue automatically.</p>
        </div>
      )
    },
    {
      id: 5,
      title: "Why Short, Human-Like Messages Outperform Marketing Language",
      image: "https://images.unsplash.com/photo-1512428559083-a401932140c5?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="space-y-6">
          <p>When asking customers for reviews or re-engaging them, short, friendly messages work best. People ignore marketing fluff, long descriptions, or promotional language.</p>
          <p>Our platform ensures:</p>
          <ul className="list-disc pl-6 space-y-2 text-indigo-400">
            <li>Messages include only business name + short sentence + optional link</li>
            <li>AI writes in a human, empathetic tone</li>
            <li>No phone numbers or multiple links</li>
          </ul>
          <div className="bg-slate-900 p-6 rounded-2xl border border-white/10">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Example Message</p>
            <p className="text-lg text-white">"I just had a great experience at Artisan Hair Co. Thought I'd share."</p>
          </div>
          <p>Result: Customers feel it's a genuine message, not an ad, which increases engagement and review completion rates.</p>
        </div>
      )
    },
    {
      id: 6,
      title: "Onboarding Made Easy: From First Touch to Dashboard in Minutes",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="space-y-6">
          <p>We know small business owners don't have time to navigate complicated setups. That's why our onboarding is fast, intuitive, and progressive:</p>
          <ol className="list-decimal pl-6 space-y-4 text-slate-400">
            <li><strong className="text-white">Email First:</strong> Low-friction lead capture.</li>
            <li><strong className="text-white">Progressive Signup:</strong> Fields appear one by one.</li>
            <li><strong className="text-white">Plan Selection:</strong> Select your scale before payment.</li>
            <li><strong className="text-white">Stripe Checkout:</strong> Fast, secure single-screen payment.</li>
            <li><strong className="text-white">Instant Access:</strong> Pre-configured defaults, live immediately.</li>
          </ol>
          <p className="text-indigo-400 font-bold">Benefit: High conversion, fast setup, and immediate access to AI tools without overwhelming the user.</p>
        </div>
      )
    },
    {
      id: 7,
      title: "Protect Your Reputation: Combining AI Recovery and Win-Back",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="space-y-6">
          <p>Online reputation and customer retention are critical for small businesses. Our platform combines AI Review Recovery and Win-Back to protect reputation and drive revenue:</p>
          <ul className="list-disc pl-6 space-y-3 text-slate-400">
            <li><strong className="text-white">Recover:</strong> AI contacts dissatisfied customers before public damage occurs.</li>
            <li><strong className="text-white">Win-Back:</strong> AI identifies and re-engages dormant clients.</li>
            <li><strong className="text-white">Collect:</strong> Auto-Send Ratings increases your public reputation.</li>
          </ul>
          <div className="bg-white/5 p-6 rounded-2xl border border-indigo-500/30">
            <p className="font-black text-white mb-4">Joe's Gym Results:</p>
            <ul className="space-y-2 text-indigo-400">
              <li>• 50 inactive members reactivated</li>
              <li>• Rating improved 3.6 → 4.4 stars</li>
              <li>• $4,500/mo average revenue increase</li>
            </ul>
          </div>
          <p>Conclusion: Combining review recovery and win-back creates a closed-loop system that protects reputation and grows revenue automatically.</p>
        </div>
      )
    }
  ];

  const resourcesData = [
    { 
      title: "Blog / Insights", 
      content: (
        <div className="grid gap-6 pt-4">
          {blogs.map(blog => (
            <button 
              key={blog.id} 
              onClick={() => setActiveBlog(blog)}
              className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-left group"
            >
              <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <img src={blog.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors mb-2">{blog.title}</h4>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock size={12} /> 4 min read</span>
                  <span className="text-indigo-500">Read Full Story →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )
    },
    { title: "Guides / How-To's", content: "Step-by-step instructions for getting the most out of Neviane. Learn how to configure AI Recovery, optimize your Win-Back engine, and deploy eBusiness Cards effectively." },
    { title: "Templates & Tools", content: "Ready-to-use SMS/Email messages, custom eCard designs, and review response templates designed to sound human and drive positive outcomes." },
    { 
      title: "FAQs", 
      content: (
        <div className="space-y-6 pt-2">
          {[
            { q: "What does your platform do?", a: "We help businesses automatically collect reviews, recover low ratings, and win back lost or inactive customers using AI-powered messages — all with minimal effort." },
            { q: "How do I add my customers?", a: "You can add customers by: Uploading a CSV file, Connecting your POS or CRM, or Manually entering them using the \"Service Done\" button." },
            { q: "How does AI recover bad reviews?", a: "When a customer gives a low rating (<4 stars), AI sends a friendly, personalized message to understand the issue and help fix it before it hits public review sites." },
            { q: "What is Win-Back and how does it work?", a: "Win-Back automatically reaches out to customers who haven't visited in 30–60+ days with friendly, personalized messages to bring them back." },
            { q: "Do I need to do anything manually?", a: "No. Once you add your customers and set up triggers, the platform handles review requests, low-rating recovery, and win-back automatically." },
            { q: "How does the Auto-Send Ratings feature work?", a: "Customers automatically receive review requests when: POS/Booking is completed, CSV upload occurs, or someone clicks the \"Service Done\" button." },
            { q: "Can I see the results?", a: "Yes. The platform provides reports showing: Recovered revenue, Returning customers, Reviews collected, and Win-back success." },
            { q: "Is it hard to set up?", a: "Not at all. Our onboarding is progressive: Start with email, add business details step-by-step, select plan, pay, and get instant dashboard access." },
            { q: "Can I use it on mobile?", a: "Yes, the platform is fully mobile-friendly, so you can manage reviews and track recovery on the go." },
            { q: "What if I have questions or need help?", a: "You can email us anytime at sales@neviane.com, and we'll guide you through setup or any questions about the platform." }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <p className="font-black text-indigo-400">{i + 1}. {item.q}</p>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      )
    },
    { 
      title: "Customer Stories / Case Studies", 
      content: (
        <div className="space-y-12 pt-4">
          {[
            { name: "Sarah's Salon – Hair & Beauty", problem: "Low online reviews.", solution: ["Added 200 customers via CSV.", "Activated AI Recovery & Win-Back."], result: ["45 returned in 60 days.", "32 reviews collected.", "80% 1-star reduction."], quote: "I didn't think AI could feel this human. My online reviews finally reflect the service we give." },
            { name: "Tony's Taqueria – Local Restaurant", problem: "Ghosted customers.", solution: ["Auto-Send Ratings from POS.", "Win-Back messages sent at 45 days."], result: ["60 returned in 2 months.", "25 new 5-star reviews.", "$2,300 extra revenue."], quote: "The AI did it all. My tables are fuller, and my reputation is finally shining online." },
            { name: "Luxe Nails Studio – Nail Salon", problem: "High churn.", solution: ["Progressive signup flow.", "Targeted Win-Back for one-timers."], result: ["40 became repeat clients.", "18 negative ratings recovered.", "35% retention boost."], quote: "It's like having a full-time customer relations team that knows exactly how to talk to clients." },
            { name: "Joe's Gym – Fitness Studio", problem: "Inactive members.", solution: ["Connected POS/CRM.", "AI re-engagement messages."], result: ["50 inactive reactivated.", "$4,500 monthly revenue boost.", "3.6 → 4.4 star rating."], quote: "My members feel valued, and I see the numbers in real-time. Seamless system." },
            { name: "Blossom Bakery – Café", problem: "Low repeat orders.", solution: ["POS data sync.", "Auto-Send Ratings."], result: ["35 returned after 45 days.", "20 glowing reviews.", "$1,200/mo from returners."], quote: "It's like my customers never left. The AI is friendly, proactive, and sky-high results." }
          ].map((story, i) => (
            <div key={i} className="space-y-4 border-l-2 border-indigo-500/20 pl-6 py-2">
              <h4 className="text-xl font-black text-white flex items-center gap-3"><span className="text-indigo-500 text-sm bg-indigo-500/10 px-2 py-1 rounded">{i + 1}</span>{story.name}</h4>
              <div className="space-y-2"><p className="text-slate-300 font-bold">Problem:</p><p className="text-slate-400">{story.problem}</p></div>
              <div className="space-y-2"><p className="text-slate-300 font-bold">Solution:</p><ul className="list-disc pl-5 text-slate-400 space-y-1">{story.solution.map((s, idx) => <li key={idx}>{s}</li>)}</ul></div>
              <div className="space-y-2"><p className="text-indigo-400 font-bold">Result:</p><ul className="list-disc pl-5 text-slate-400 space-y-1 font-medium">{story.result.map((r, idx) => <li key={idx}>{r}</li>)}</ul></div>
              <div className="bg-white/5 p-4 rounded-xl relative"><Quote size={16} className="text-indigo-500 absolute -top-2 -left-2 bg-slate-900" /><p className="italic text-slate-300 text-sm md:text-base">"{story.quote}"</p></div>
            </div>
          ))}
        </div>
      )
    },
    { title: "Webinars / Videos", content: "Short demos, tutorials, and deep-dive webinars. Perfect for business owners who prefer to 'see it in action' before making adjustments." },
    { title: "Glossary / Definitions", content: "A quick guide to industry terminology. Understand exactly what we mean by 'AI Recovery', 'Churn Rate', 'Win-Back Window', and more." },
    { title: "Support Center", content: "Need a hand? Access our 24/7 support resources, including contact information, ticketing system, and live chat options for active users." },
    { 
      title: "Legal / Privacy / Compliance Guides", 
      content: (
        <div className="space-y-8 pt-4">
          <div className="space-y-4"><h4 className="text-xl font-black text-indigo-400 underline decoration-indigo-500/30 underline-offset-4">1. Terms of Service</h4><div className="space-y-4 text-slate-400"><p><strong className="text-white">Acceptance:</strong> By using this platform, you agree to these terms.</p><p><strong className="text-white">Responsibilities:</strong> You are responsible for customer data accuracy and law compliance.</p></div></div>
          <div className="space-y-4"><h4 className="text-xl font-black text-indigo-400 underline decoration-indigo-500/30 underline-offset-4">2. Privacy Policy</h4><p className="text-slate-400">Customer data is never sold. We use industry-standard encryption to protect business and client information.</p></div>
          <div className="space-y-4"><h4 className="text-xl font-black text-indigo-400 underline decoration-indigo-500/30 underline-offset-4">3. Liability Disclaimer</h4><p className="text-slate-400">Platform provided "as is". We do not guarantee specific revenue results.</p></div>
          <div className="pt-8 border-t border-white/5"><p className="text-slate-500 font-bold tracking-widest text-sm uppercase">Effective Date: 12.24.25</p></div>
        </div>
      )
    }
  ];

  if (activeBlog) {
    return (
      <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
        <Navbar />
        <div className="animate-in fade-in duration-700 pt-20">
          <section className="py-24 bg-slate-950 min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
              <button onClick={() => setActiveBlog(null)} className="flex items-center gap-2 text-indigo-400 font-black mb-12 hover:translate-x-[-4px] transition-transform">
                <ChevronLeft size={20} /> Back to Resources
              </button>
              <div className="rounded-[3rem] overflow-hidden mb-12 shadow-2xl border border-white/10">
                <img src={activeBlog.image} alt="" className="w-full aspect-video object-cover" />
              </div>
              <h2 className="text-4xl md:text-5xl font-[1000] text-white mb-8 tracking-tight leading-tight">{activeBlog.title}</h2>
              <div className="text-slate-300 text-lg leading-relaxed font-medium">
                {activeBlog.content}
              </div>
              <div className="mt-20 pt-12 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3"><Shield className="text-indigo-500" size={24} /><span className="font-bold text-white">Neviane Editorial</span></div>
                <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">Authored by Reputation AI</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      <Navbar />
      <div className="animate-in fade-in duration-700 pt-20">
        <section className="py-24 bg-slate-950 min-h-screen">
          <div className="max-w-3xl mx-auto px-6">
            <div className="mb-20">
              <h2 className="text-4xl md:text-6xl font-[1000] text-white mb-6 tracking-tight">Resources</h2>
              <p className="text-slate-500 text-xl font-medium">Business intelligence and support for the modern local enterprise.</p>
            </div>
            <div className="divide-y divide-white/5">
              {resourcesData.map((item, index) => (
                <div key={index} id={`section-${index}`} className="py-6 first:pt-0">
                  <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between text-left group transition-all">
                    <span className={`text-xl md:text-2xl font-bold transition-colors ${openIndex === index ? 'text-indigo-400' : 'text-slate-300 group-hover:text-white'}`}>{item.title}</span>
                    <div className="text-slate-600">{openIndex === index ? <Minus size={20} /> : <Plus size={20} />}</div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[5000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className="text-slate-400 text-lg leading-relaxed font-medium max-w-2xl">{item.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResourcesPage;

