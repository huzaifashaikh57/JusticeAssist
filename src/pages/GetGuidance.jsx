import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./GetGuidance.css";
import { useNavigate } from 'react-router-dom';


const guidanceData = [
  {
    title: "Financial Fraud",
    description: "Learn how to recognize and report online financial scams like UPI, banking, and card frauds.",
    details:
      "Financial frauds include online banking scams, UPI theft, ATM cloning, credit/debit card misuse, and more. Always verify payment links, do not share OTPs, and report suspicious activity immediately.",
    image: "/images/hacker03.jpg",
    video: "/videos/video01.mp4",
    link: "/report",
    category: "Online Financial Fraud",
  },
  {
    title: "Overpayment & Refund Scams",
    description: "Beware of scammers pretending to be relatives or friends and claiming mistaken payments.",
    details:
      "In this scam, fraudsters call victims pretending to be a relative or friend, claiming they accidentally sent a large amount (e.g., ₹20,000 instead of ₹2,000). They then emotionally manipulate the victim into refunding the extra money — often before the victim realizes no such money was received. These scams rely on urgency, emotional pressure, and impersonation.\n\nAlways verify the caller’s identity, never rush into refunding money, and double-check bank statements. When in doubt, ask for transaction proof or call the actual person being impersonated. Report immediately if you suspect fraud.",
    image: "/images/hacker01.jpg",
    video: "/videos/video02.mp4",  
    link: "/report",
    category: "Online Financial Fraud",
  },
  {
    title: "Job Scams",
    description: "Beware of fake job offers asking for fees, documents, or personal details.",
    details:
      "Job scams often target freshers, students, and job-seekers by promising high-paying positions without interviews or eligibility. Scammers send emails or messages claiming to be from reputed companies or government bodies. They may ask you to pay a 'registration fee', 'interview fee', or 'security deposit'.\n\nAlways verify job offers through official company websites or trusted job portals. No genuine company asks for money to offer a job. Check for grammar errors, suspicious emails, and urgent messages. If scammed, keep all payment receipts, emails, and chat history to file a complaint.",
    image: "/images/job.jpg",     
    video: "/videos/video03.mp4",       
    link: "/report",
    category: "Online Financial Fraud",
  },
  {
    title: "Loan Scams",
    description: "Don’t fall for fake instant loan apps or illegal lenders promising easy money.",
    details:
      "Loan scams involve fraudsters posing as agents of finance companies or loan apps. Victims are promised quick loans with no paperwork or credit checks. Once you share your documents (Aadhaar, PAN, bank details), scammers either disappear after collecting 'processing fees', or offer loans with hidden, extreme interest rates and later harass for repayment.\n\nAvoid downloading unknown loan apps from unofficial sources. Always check if the lender is registered with RBI. Never share OTPs or sensitive documents on WhatsApp. Report to cybercrime authorities if threatened or cheated.",
    image: "/images/loan.jpg",     
    video: "/videos/loan.mp4",       
    link: "/report",
    category: "Online Financial Fraud",
  },    
  {
    title: "Social Media Hacking",
    description: "Protect your Facebook, Instagram, and WhatsApp accounts from unauthorized access.",
    details:
      "Enable 2FA on all social accounts, avoid public Wi-Fi, and never share login credentials. Use original apps only.",
    image: "/images/socialmedia.jpg",
    video: "/videos/video05.mp4",
    link: "/report",
    category: "Hacking/Unauthorized Access",
  },
  {
    title: "Online Blackmail",
    description: "Know how to deal with extortion involving private photos, videos, or threats.",
    details:
      "Never give in to extortion. Block the contact, gather proof, and report to cyber police. Do not negotiate or share more info.",
    image: "/images/security.jpg",
    video: "/videos/video06.mp4",
    link: "/report",
    category: "Cyber Harassment",
  },
  {
    title: "Sextortion & Intimate Image Abuse",
    description: "Understand what sextortion is and how to protect yourself from blackmail involving intimate content.",
    details:
      "Sextortion is a form of blackmail where someone demands money, favors, or more images/videos by threatening to share your private or intimate content online. These cases often begin with fake romantic profiles on social media or dating apps. Once trust is built, they trick victims into sharing private content, and then begin threatening them. \n\nNever share explicit content online, even in private chats. If you're a victim, DO NOT panic or negotiate. Block the person, preserve all evidence (screenshots, chat logs), and report immediately to cybercrime authorities.",
    image: "/images/abuse.jpg",
    video: "/videos/video07.mp4",
    link: "/report",
    category: "Cyber Crime Against Women",
  },
  {
    title: "Online Harassment & Cyberbullying",
    description: "Recognize the signs of online harassment and learn how to take action safely.",
    details:
      "Cyberbullying includes repeated online abuse, threatening messages, trolling, or character assassination, especially on social platforms. Victims are often school/college students, influencers, or individuals speaking publicly. \n\nIt may involve body shaming, threats, abusive comments, or stalking. Never engage with trolls. Report the content to the platform and take screenshots as evidence. If the behavior continues or becomes serious, file a cyber complaint. Remember, your mental health matters — don’t hesitate to speak with trusted adults or counselors.",
    image: "/images/harassment.jpg",
    video: "/videos/video08.mp4",
    link: "/report",
    category: "Cyber Harassment",
  },
  {
    title: "Stock Market Scams",
    description: "Stay alert to fake stock tips, pump-and-dump schemes, and fraudulent trading platforms.",
    details:
      "Stock market scams involve fraudulent advisories, manipulated stock tips, and fake trading platforms promising guaranteed returns. Scammers often approach via WhatsApp, Telegram, or SMS, posing as SEBI-registered analysts or insiders. Victims are added to premium groups and shown fake profits using screenshots or trading dashboards. \n\nBe cautious of unsolicited tips or calls promising quick profits. Always verify whether the adviser is registered with SEBI. Do not trust screenshots or testimonials blindly. If you've been scammed, gather all chat logs, payment proofs, and report immediately to the cybercrime portal.",
    image: "/images/crypto.jpg",
    video: "/videos/video09.mp4",
    link: "/report",
    category: "Online Financial Fraud",
  },
  {
    title: "OTP & SIM Swap Fraud",
    description: "Understand how fraudsters steal your mobile identity to access your bank accounts.",
    details:
      "In SIM swap fraud, scammers trick your mobile operator into issuing a duplicate SIM for your number. Once activated, they get all your OTPs and can bypass two-factor authentication to access bank accounts, UPI apps, and emails. \n\nThis usually starts with phishing, data leaks, or KYC scams. If your phone loses network suddenly and doesn’t restore — contact your telecom provider immediately. Use biometric or app-based 2FA instead of SMS OTPs. Report suspicious SIM activities instantly.",
    image: "/images/sim.jpg",
    video: "/videos/video12.mp4",
    link: "/report",
    category: "Online Financial Fraud",
  },
  {
    title: "Deepfake & AI-Based Misuse",
    description: "Stay informed about AI-generated fake videos, images, and voice-based scams.",
    details:
      "With the rise of AI, scammers can now create deepfake videos or voice clones of celebrities, family members, or officials to trick people. Common uses include fake videos asking for donations, deepfake pornographic content, or fake calls pretending to be a relative in distress.\n\nAlways verify such content from trusted sources. Don't forward unverified media. If your face, voice, or image is used inappropriately — gather proof and file a report. Tools are available to detect deepfakes — always stay one step ahead.",
    image: "/images/deepfake.jpg",
    video: "/videos/video13.mp4",
    link: "/report",
    category: "Cyber Harassment",
  },
  {
    title: "In-App Purchase Scams",
    description: "Understand risks of gaming frauds, fake in-game currencies, and manipulated leaderboards.",
    details:
      "Gamers — especially children — are lured with free skins, coins, or premium upgrades. They are asked to click links, pay small amounts, or share login details. Some games may have chat features that lead to grooming, bullying, or extortion.\n\nAlways set up child-safe gaming controls and limit in-app purchases. Never share login data. Use secure payment options and monitor your child's online gaming behavior. Report any suspicious game or chat.",
    image: "/images/scam.jpg",
    video: "/videos/video14.mp4",
    link: "/report",
    category: "Online Financial Fraud",
  },
  {
    title: "QR Code & Fake Payment Apps",
    description: "Be careful while scanning QR codes or using unofficial apps for digital payments.",
    details:
      "Fraudsters may send you a QR code saying it’s for 'receiving' money — but scanning it actually authorizes a debit. Some fake UPI apps look exactly like originals but are built to steal credentials.\n\nAlways scan QR codes only from verified merchants. Double-check app developers before installing payment apps. Never allow screen-sharing during support calls. Be alert — your carelessness can lead to instant loss.",
    image: "/images/qrcode.jpg",
    video: "/videos/video15.mp4",
    link: "/report",
    category: "Online Financial Fraud",
  },
  {
    title: "Romance Scams & Online Dating Fraud",
    description: "Be cautious of fake romantic profiles that manipulate emotions for money or personal gain.",
    details:
      "Scammers build emotional connections on dating platforms or social media. Once trust is gained, they ask for money citing emergencies (hospital, travel, family issues). Some threaten with private conversations or images later.\n\nStay skeptical of too-good-to-be-true relationships online. Never send money or share personal images. Block, report, and warn others if you suspect a romance scam.",
    image: "/images/romancefraud.jpg",
    video: "/videos/video16.mp4",
    link: "/report",
    category: "Cyber Harassment",
  }, 
];

export default function GetGuidance() {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    document.body.style.overflow = flippedIndex !== null ? "hidden" : "auto";
  }, [flippedIndex]);

  const handleFlip = (index) => setFlippedIndex(index);
  const handleBack = () => setFlippedIndex(null);
  const handleReportClick = (category) => {
    setFlippedIndex(null); // close modal first
    setTimeout(() => navigate(`/report?category=${encodeURIComponent(category)}`), 300); // wait for flip animation
  };

  return (
    <div className="guidance-container">

      <div className="cards-container">
        {guidanceData.map((item, index) => (
          <motion.div
            key={index}
            className="guidance-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <img src={item.image} alt={item.title} className="guidance-img" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="card-buttons">
            <button onClick={() => handleReportClick(item.category)} className="report-btn">
              Guidance Form
            </button>

              <button onClick={() => handleFlip(index)} className="know-btn">
                Know More
              </button>
            </div>
          </motion.div>
        ))}
      </div>

{/* Flip Modal */}
<AnimatePresence>
  {flippedIndex !== null && (
    <motion.div
      className="modal-overlay"
      onClick={handleBack}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flipped-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0, rotateY: 90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="modal-card-content">
          <video controls className="modal-video">
            <source src={guidanceData[flippedIndex].video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h2>{guidanceData[flippedIndex].title}</h2>
          <p>{guidanceData[flippedIndex].details}</p>
          <button className="back-btn" onClick={handleBack}>
            ✕ Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
