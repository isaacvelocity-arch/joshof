/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  Check, 
  Star, 
  Menu, 
  X,
  Layout,
  BarChart3,
  BookOpen,
  Bell,
  Plus,
  Home,
  Compass,
  User,
  MessageSquare
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-of-light-bg border-b border-of-border px-4 md:px-8 py-3 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-of-blue rounded-full flex items-center justify-center">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline">OPERATION FUTURES</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-secondary">
          <a href="#features" className="hover:text-of-blue transition-colors">FEATURES</a>
          <a href="#testimonials" className="hover:text-of-blue transition-colors">RESULTS</a>
          <a href="#blog" className="hover:text-of-blue transition-colors">BLOG</a>
          <a href="#pricing" className="hover:text-of-blue transition-colors">PRICING</a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:block text-of-blue font-bold text-sm hover:underline">LOG IN</button>
        <button className="of-button-primary text-sm px-5 py-2">SIGN UP</button>
        <button className="lg:hidden text-secondary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-of-light-bg border-b border-of-border p-6 flex flex-col gap-4 lg:hidden"
          >
            <a href="#features" className="text-lg font-bold" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#testimonials" className="text-lg font-bold" onClick={() => setIsOpen(false)}>Results</a>
            <a href="#blog" className="text-lg font-bold" onClick={() => setIsOpen(false)}>Blog</a>
            <a href="#pricing" className="text-lg font-bold" onClick={() => setIsOpen(false)}>Pricing</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Interactive3DChart = () => {
  const [rotate, setRotate] = useState({ x: 20, y: -20 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -40;
    setRotate({ x: 20 + y, y: -20 + x });
  };

  const points = [
    { x: 10, y: 80, label: "Signals", id: "features", icon: Zap },
    { x: 40, y: 50, label: "Results", id: "testimonials", icon: BarChart3 },
    { x: 70, y: 30, label: "Education", id: "blog", icon: BookOpen },
    { x: 90, y: 10, label: "Join", id: "pricing", icon: Plus },
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 20, y: -20 })}
      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center perspective-[1000px]"
    >
      <motion.div 
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-[80%] h-[60%] border-l-2 border-b-2 border-of-border preserve-3d"
      >
        {/* Grid Lines */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute w-full h-[1px] bg-of-border/20" style={{ bottom: `${i * 25}%` }} />
        ))}
        
        {/* The Line */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M 0 90 Q 20 80 40 50 T 70 30 T 100 10"
            fill="none"
            stroke="#00aff0"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* Interactive Points */}
        {points.map((point, i) => (
          <motion.a
            key={i}
            href={`#${point.id}`}
            whileHover={{ scale: 1.2, translateZ: 50 }}
            className="absolute w-10 h-10 bg-white border-2 border-of-blue rounded-full flex items-center justify-center cursor-pointer shadow-md group"
            style={{ 
              left: `${point.x}%`, 
              bottom: `${100 - point.y}%`,
              transform: "translate(-50%, 50%) translateZ(20px)"
            }}
          >
            <point.icon className="w-5 h-5 text-of-blue" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-of-blue text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {point.label}
            </div>
          </motion.a>
        ))}

        {/* Floating Elements for 3D depth */}
        <div className="absolute -right-10 top-10 w-24 h-32 bg-of-blue/5 border border-of-blue/20 rounded-lg transform translateZ(-50px)" />
        <div className="absolute -left-10 bottom-20 w-32 h-24 bg-of-blue/5 border border-of-blue/20 rounded-lg transform translateZ(80px)" />
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="of-card p-6 flex flex-col gap-4 hover:border-of-blue/50 transition-colors group">
    <div className="w-12 h-12 rounded-full bg-of-blue/10 flex items-center justify-center group-hover:bg-of-blue transition-colors">
      <Icon className="w-6 h-6 text-of-blue group-hover:text-white" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-secondary text-sm leading-relaxed">{description}</p>
  </div>
);

const TestimonialCard = ({ name, handle, text, image }: { name: string, handle: string, text: string, image: string }) => (
  <div className="of-card p-6 flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover border border-of-border" referrerPolicy="no-referrer" />
      <div>
        <div className="font-bold flex items-center gap-1 text-of-light-text">
          {name} <Check className="w-3 h-3 text-of-blue fill-of-blue" />
        </div>
        <div className="text-secondary text-xs">@{handle}</div>
      </div>
    </div>
    <p className="text-sm leading-relaxed text-of-light-text">{text}</p>
    <div className="flex items-center gap-1 text-of-blue">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-of-blue" />)}
    </div>
  </div>
);

const BlogCard = ({ title, date, category, image }: { title: string, date: string, category: string, image: string }) => (
  <div className="of-card group cursor-pointer">
    <div className="aspect-video overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
    </div>
    <div className="p-6">
      <div className="text-of-blue text-[10px] font-bold uppercase tracking-widest mb-2">{category}</div>
      <h3 className="text-lg font-bold mb-4 group-hover:text-of-blue transition-colors text-of-light-text">{title}</h3>
      <div className="text-secondary text-xs">{date}</div>
    </div>
  </div>
);

const PricingCard = ({ plan, price, features, recommended = false }: { plan: string, price: string, features: string[], recommended?: boolean }) => (
  <div className={`of-card p-8 flex flex-col gap-6 relative ${recommended ? 'border-of-blue border-2' : ''}`}>
    {recommended && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-of-blue text-white text-[10px] font-bold px-3 py-1 rounded-full">
        RECOMMENDED
      </div>
    )}
    <div className="text-center">
      <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-2">{plan}</div>
      <div className="text-4xl font-bold mb-1 text-of-light-text">${price}<span className="text-lg text-secondary font-normal">/mo</span></div>
    </div>
    <div className="flex flex-col gap-3">
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-of-light-text">
          <Check className="w-4 h-4 text-of-blue" />
          <span>{f}</span>
        </div>
      ))}
    </div>
    <button className={recommended ? "of-button-primary w-full" : "of-button-outline w-full"}>
      CHOOSE PLAN
    </button>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen pt-16 bg-of-light-bg text-of-light-text">
      <Navbar />

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-12 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 text-of-blue font-bold text-sm tracking-widest uppercase">
            <Zap className="w-4 h-4" /> THE FUTURE OF TRADING
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
            TRADE LIKE A <span className="text-of-blue">PRO</span>, NOT A FAN.
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-lg">
            Join the most exclusive futures trading community. Institutional-grade signals, real-time education, and a tribe that wins together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="of-button-primary text-lg px-10 py-4 flex items-center justify-center gap-2 group">
              JOIN THE CLUB <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="of-button-outline text-lg px-10 py-4">
              VIEW RESULTS
            </button>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-of-light-bg" alt="user" referrerPolicy="no-referrer" />
              ))}
            </div>
            <div className="text-sm text-secondary">
              <span className="text-of-light-text font-bold">12,400+</span> traders already joined
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Interactive3DChart />
        </motion.div>
      </section>

      {/* What's Included */}
      <section id="features" className="px-6 md:px-12 py-24 bg-gray-50 border-y border-of-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">WHAT'S INCLUDED</h2>
            <p className="text-secondary max-w-2xl mx-auto">Everything you need to dominate the markets, delivered with the precision of a pro.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Zap} 
              title="Real-Time Signals" 
              description="High-probability entry and exit points for ES, NQ, and CL futures delivered directly to your dashboard."
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Market Analysis" 
              description="Daily deep dives into market structure, order flow, and institutional levels before the bell rings."
            />
            <FeatureCard 
              icon={MessageSquare} 
              title="Private Community" 
              description="Access to our exclusive Discord where pros share setups and discuss live market sentiment."
            />
            <FeatureCard 
              icon={BookOpen} 
              title="Trading Academy" 
              description="50+ hours of video content covering everything from basics to advanced supply & demand strategies."
            />
            <FeatureCard 
              icon={Bell} 
              title="Instant Alerts" 
              description="Never miss a move. Get push notifications for all signal updates and breaking market news."
            />
            <FeatureCard 
              icon={Layout} 
              title="Custom Dashboard" 
              description="A personalized workspace to track your performance, watch live streams, and access resources."
            />
          </div>
        </div>
      </section>

      {/* Testimonials / Results */}
      <section id="testimonials" className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">REAL TRADERS, REAL RESULTS</h2>
            <p className="text-secondary">We don't just talk about profits. We show them. See what our community members are achieving every single day.</p>
          </div>
          <button className="of-button-outline flex items-center gap-2">
            VIEW ALL REVIEWS <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TestimonialCard 
            name="Trader Joe" 
            handle="joe_trades" 
            image="https://i.pravatar.cc/150?u=joe"
            text="Operation Futures is the only community that actually teaches you how to fish. The signals are just the cherry on top."
          />
          <TestimonialCard 
            name="Sarah Smith" 
            handle="sarah_futs" 
            image="https://i.pravatar.cc/150?u=sarah"
            text="Finally found a group that prioritizes risk management over hype. My account has never looked healthier."
          />
          <TestimonialCard 
            name="Mike Ross" 
            handle="mike_nq" 
            image="https://i.pravatar.cc/150?u=mike"
            text="The live sessions are worth the membership alone. Watching a pro execute in real-time is the best education."
          />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="px-6 md:px-12 py-24 bg-gray-50 border-y border-of-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">LATEST UPDATES</h2>
            <div className="hidden sm:flex items-center gap-2 text-secondary font-bold text-sm cursor-pointer hover:text-of-blue">
              READ BLOG <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlogCard 
              category="Market Insight"
              title="Why the NQ is showing strength in the current cycle"
              date="April 8, 2026"
              image="https://picsum.photos/seed/market1/800/450"
            />
            <BlogCard 
              category="Education"
              title="Mastering Order Flow: A guide for beginners"
              date="April 5, 2026"
              image="https://picsum.photos/seed/edu1/800/450"
            />
            <BlogCard 
              category="Community"
              title="Recap: Our London meetup was a massive success"
              date="April 2, 2026"
              image="https://picsum.photos/seed/meetup1/800/450"
            />
          </div>
        </div>
      </section>

      {/* Pricing / Membership */}
      <section id="pricing" className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">CHOOSE YOUR EDGE</h2>
          <p className="text-secondary max-w-2xl mx-auto">Flexible plans designed for every stage of your trading journey. No hidden fees, cancel anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard 
            plan="Starter"
            price="49"
            features={[
              "Daily Market Analysis",
              "Access to Academy Basics",
              "Community Discord Access",
              "Weekly Live Q&A"
            ]}
          />
          <PricingCard 
            plan="Pro"
            price="99"
            recommended={true}
            features={[
              "All Starter Features",
              "Real-Time Trade Signals",
              "Advanced Academy Content",
              "Daily Live Trading Sessions",
              "Priority Support"
            ]}
          />
          <PricingCard 
            plan="Elite"
            price="199"
            features={[
              "All Pro Features",
              "1-on-1 Monthly Mentorship",
              "Prop Firm Scaling Plan",
              "Exclusive IRL Events",
              "Lifetime Academy Access"
            ]}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-12 py-24 text-center border-t border-of-border">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">READY TO JOIN THE <span className="text-of-blue">ELITE?</span></h2>
          <p className="text-xl text-secondary">The next market cycle is starting. Don't trade alone. Secure your spot in the Operation Futures community today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <button className="of-button-primary text-xl px-12 py-5">GET STARTED NOW</button>
            <button className="of-button-outline text-xl px-12 py-5">TALK TO A PRO</button>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex text-of-blue">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-of-blue" />)}
              </div>
              <span className="font-bold">4.9/5</span>
            </div>
            <p className="text-secondary text-sm">Trusted by over 12,000 traders worldwide</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-of-light-bg border-t border-of-border px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-of-blue rounded-full flex items-center justify-center">
                <TrendingUp className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight">OPERATION FUTURES</span>
            </div>
            <p className="text-secondary text-sm leading-relaxed">
              The premier community for futures traders. We provide the tools, education, and network to help you succeed in the markets.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-of-border flex items-center justify-center hover:border-of-blue transition-colors cursor-pointer">
                <Home className="w-5 h-5 text-secondary" />
              </div>
              <div className="w-10 h-10 rounded-full border border-of-border flex items-center justify-center hover:border-of-blue transition-colors cursor-pointer">
                <Compass className="w-5 h-5 text-secondary" />
              </div>
              <div className="w-10 h-10 rounded-full border border-of-border flex items-center justify-center hover:border-of-blue transition-colors cursor-pointer">
                <User className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">PLATFORM</h4>
            <ul className="flex flex-col gap-4 text-secondary text-sm">
              <li><a href="#" className="hover:text-of-blue transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-of-blue transition-colors">Academy</a></li>
              <li><a href="#" className="hover:text-of-blue transition-colors">Signals</a></li>
              <li><a href="#" className="hover:text-of-blue transition-colors">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">RESOURCES</h4>
            <ul className="flex flex-col gap-4 text-secondary text-sm">
              <li><a href="#" className="hover:text-of-blue transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-of-blue transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-of-blue transition-colors">Risk Disclosure</a></li>
              <li><a href="#" className="hover:text-of-blue transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">NEWSLETTER</h4>
            <p className="text-secondary text-sm mb-4">Get weekly market insights delivered to your inbox.</p>
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="Email address" className="of-input text-sm" />
              <button className="of-button-primary text-sm py-2">SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-of-border flex flex-col md:flex-row justify-between items-center gap-4 text-secondary text-xs">
          <div>&copy; 2026 OPERATION FUTURES. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-of-blue">TERMS</a>
            <a href="#" className="hover:text-of-blue">PRIVACY</a>
            <a href="#" className="hover:text-of-blue">COOKIES</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
