import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import GuidanceCarousel from "../components/GuidanceCarousel";
import "./GetGuidance.css";

const guidanceData = [
  {
    title: "Financial Fraud",
    description: "Financial fraud includes a wide range of scams designed to steal your money. Learn how to identify and protect yourself from these threats.",
    details:
      "Financial frauds include online banking scams, UPI theft, ATM cloning, credit/debit card misuse, and more. Always verify payment links, do not share OTPs, and report suspicious activity immediately.",
    image: "/images/hacker03.jpg",
    video: "/videos/video01.mp4",
    link: "/report",
    category: "Online Financial Fraud",
    color: "#f1f5f9",
  },
  {
    title: "Overpayment & Refund Scams",
    description: "In these scams, fraudsters trick you into believing you've received excess money and pressure you to refund the difference before you realize the initial payment was fake.",
    details:
      "In this scam, fraudsters call victims pretending to be a relative or friend, claiming they accidentally sent a large amount (e.g., ₹20,000 instead of ₹2,000). They then emotionally manipulate the victim into refunding the extra money — often before the victim realizes no such money was received. These scams rely on urgency, emotional pressure, and impersonation.\n\nAlways verify the caller’s identity, never rush into refunding money, and double-check bank statements. When in doubt, ask for transaction proof or call the actual person being impersonated. Report immediately if you suspect fraud.",
    image: "/images/hacker01.jpg",
    video: "/videos/video02.mp4",  
    link: "/report",
    category: "Online Financial Fraud",
    color: "#e2e8f0",
  },
  {
    title: "Job Scams",
    description: "Fraudsters create fake job offers to lure job seekers into paying fees for interviews, training, or security deposits. These offers often promise high salaries with little to no effort.",
    details:
      "Job scams often target freshers, students, and job-seekers by promising high-paying positions without interviews or eligibility. Scammers send emails or messages claiming to be from reputed companies or government bodies. They may ask you to pay a 'registration fee', 'interview fee', or 'security deposit'.\n\nAlways verify job offers through official company websites or trusted job portals. No genuine company asks for money to offer a job. Check for grammar errors, suspicious emails, and urgent messages. If scammed, keep all payment receipts, emails, and chat history to file a complaint.",
    image: "/images/job.jpg",     
    video: "/videos/video03.mp4",       
    link: "/report",
    category: "Online Financial Fraud",
    color: "#cbd5e1",
  },
  {
    title: "Loan Scams",
    description: "Be cautious of loan apps and lenders that promise instant loans with no paperwork. They may charge hidden fees or use your personal information for malicious purposes.",
    details:
      "Loan scams involve fraudsters posing as agents of finance companies or loan apps. Victims are promised quick loans with no paperwork or credit checks. Once you share your documents (Aadhaar, PAN, bank details), scammers either disappear after collecting 'processing fees', or offer loans with hidden, extreme interest rates and later harass for repayment.\n\nAvoid downloading unknown loan apps from unofficial sources. Always check if the lender is registered with RBI. Never share OTPs or sensitive documents on WhatsApp. Report to cybercrime authorities if threatened or cheated.",
    image: "/images/loan.jpg",     
    video: "/videos/loan.mp4",       
    link: "/report",
    category: "Online Financial Fraud",
    color: "#94a3b8",
  },    
  {
    title: "Social Media Hacking",
    description: "Learn how to secure your social media accounts from hackers. Simple steps like using strong passwords and enabling two-factor authentication can make a big difference.",
    details:
      "Enable 2FA on all social accounts, avoid public Wi-Fi, and never share login credentials. Use original apps only.",
    image: "/images/socialmedia.jpg",
    video: "/videos/video05.mp4",
    link: "/report",
    category: "Hacking/Unauthorized Access",
    color: "#64748b",
  },
  {
    title: "Online Blackmail",
    description: "Online blackmail, or extortion, involves threats to expose your private information unless you meet the blackmailer's demands. Know how to respond and protect yourself.",
    details:
      "Never give in to extortion. Block the contact, gather proof, and report to cyber police. Do not negotiate or share more info.",
    image: "/images/security.jpg",
    video: "/videos/video06.mp4",
    link: "/report",
    category: "Cyber Harassment",
    color: "#475569",
  },
  {
    title: "Sextortion & Intimate Image Abuse",
    description: "Sextortion is a serious crime where perpetrators use intimate images or videos to blackmail victims. Learn how to protect yourself and what to do if you are targeted.",
    details:
      "Sextortion is a form of blackmail where someone demands money, favors, or more images/videos by threatening to share your private or intimate content online. These cases often begin with fake romantic profiles on social media or dating apps. Once trust is built, they trick victims into sharing private content, and then begin threatening them. \n\nNever share explicit content online, even in private chats. If you're a victim, DO NOT panic or negotiate. Block the person, preserve all evidence (screenshots, chat logs), and report immediately to cybercrime authorities.",
    image: "/images/abuse.jpg",
    video: "/videos/video07.mp4",
    link: "/report",
    category: "Cyber Crime Against Women",
    color: "#334155",
  },
  {
    title: "Online Harassment & Cyberbullying",
    description: "Cyberbullying and online harassment can have a devastating impact on mental health. Understand the signs and learn how to take action against this harmful behavior.",
    details:
      "Cyberbullying includes repeated online abuse, threatening messages, trolling, or character assassination, especially on social platforms. Victims are often school/college students, influencers, or individuals speaking publicly. \n\nIt may involve body shaming, threats, abusive comments, or stalking. Never engage with trolls. Report the content to the platform and take screenshots as evidence. If the behavior continues or becomes serious, file a cyber complaint. Remember, your mental health matters — don’t hesitate to speak with trusted adults or counselors.",
    image: "/images/harassment.jpg",
    video: "/videos/video08.mp4",
    link: "/report",
    category: "Cyber Harassment",
    color: "#1e293b",
  },
  {
    title: "Stock Market Scams",
    description: "The stock market can be a breeding ground for scams. Learn to spot red flags like guaranteed returns and unsolicited stock tips to protect your investments.",
    details:
      "Stock market scams involve fraudulent advisories, manipulated stock tips, and fake trading platforms promising guaranteed returns. Scammers often approach via WhatsApp, Telegram, or SMS, posing as SEBI-registered analysts or insiders. Victims are added to premium groups and shown fake profits using screenshots or trading dashboards. \n\nBe cautious of unsolicited tips or calls promising quick profits. Always verify whether the adviser is registered with SEBI. Do not trust screenshots or testimonials blindly. If you've been scammed, gather all chat logs, payment proofs, and report immediately to the cybercrime portal.",
    image: "/images/crypto.jpg",
    video: "/videos/video09.mp4",
    link: "/report",
    category: "Online Financial Fraud",
    color: "#0f172a",
  },
  {
    title: "OTP & SIM Swap Fraud",
    description: "SIM swap fraud is a sophisticated scam where fraudsters gain control of your mobile number to access your bank accounts. Learn how to prevent and detect this type of fraud.",
    details:
      "In SIM swap fraud, scammers trick your mobile operator into issuing a duplicate SIM for your number. Once activated, they get all your OTPs and can bypass two-factor authentication to access bank accounts, UPI apps, and emails. \n\nThis usually starts with phishing, data leaks, or KYC scams. If your phone loses network suddenly and doesn’t restore — contact your telecom provider immediately. Use biometric or app-based 2FA instead of SMS OTPs. Report suspicious SIM activities instantly.",
    image: "/images/sim.jpg",
    video: "/videos/video12.mp4",
    link: "/report",
    category: "Online Financial Fraud",
    color: "#1e293b",
  },
  {
    title: "Deepfake & AI-Based Misuse",
    description: "The rise of AI has led to new forms of scams using deepfake videos and voice clones. Stay informed about these emerging threats and how to protect yourself.",
    details:
      "With the rise of AI, scammers can now create deepfake videos or voice clones of celebrities, family members, or officials to trick people. Common uses include fake videos asking for donations, deepfake pornographic content, or fake calls pretending to be a relative in distress.\n\nAlways verify such content from trusted sources. Don't forward unverified media. If your face, voice, or image is used inappropriately — gather proof and file a report. Tools are available to detect deepfakes — always stay one step ahead.",
    image: "/images/deepfake.jpg",
    video: "/videos/video13.mp4",
    link: "/report",
    category: "Cyber Harassment",
    color: "#334155",
  },
  {
    title: "In-App Purchase Scams",
    description: "In-app purchase scams target gamers, especially children, with offers of free in-game items to steal login credentials or money. Learn how to keep your gaming accounts safe.",
    details:
      "Gamers — especially children — are lured with free skins, coins, or premium upgrades. They are asked to click links, pay small amounts, or share login details. Some games may have chat features that lead to grooming, bullying, or extortion.\n\nAlways set up child-safe gaming controls and limit in-app purchases. Never share login data. Use secure payment options and monitor your child's online gaming behavior. Report any suspicious game or chat.",
    image: "/images/scam.jpg",
    video: "/videos/video14.mp4",
    link: "/report",
    category: "Online Financial Fraud",
    color: "#475569",
  },
  {
    title: "QR Code & Fake Payment Apps",
    description: "QR code scams trick you into authorizing payments instead of receiving money. Be cautious of fake payment apps that look like the real thing but are designed to steal your information.",
    details:
      "Fraudsters may send you a QR code saying it’s for 'receiving' money — but scanning it actually authorizes a debit. Some fake UPI apps look exactly like originals but are built to steal credentials.\n\nAlways scan QR codes only from verified merchants. Double-check app developers before installing payment apps. Never allow screen-sharing during support calls. Be alert — your carelessness can lead to instant loss.",
    image: "/images/qrcode.jpg",
    video: "/videos/video15.mp4",
    link: "/report",
    category: "Online Financial Fraud",
    color: "#64748b",
  },
  {
    title: "Romance Scams & Online Dating Fraud",
    description: "Romance scammers create fake profiles to build emotional connections and then exploit their victims for financial gain. Learn the warning signs to avoid falling victim to these scams.",
    details:
      "Scammers build emotional connections on dating platforms or social media. Once trust is gained, they ask for money citing emergencies (hospital, travel, family issues). Some threaten with private conversations or images later.\n\nStay skeptical of too-good-to-be-true relationships online. Never send money or share personal images. Block, report, and warn others if you suspect a romance scam.",
    image: "/images/romancefraud.jpg",
    video: "/videos/video16.mp4",
    link: "/report",
    category: "Cyber Harassment",
    color: "#94a3b8",
  }, 
];

export default function GetGuidance() {
  const navigate = useNavigate();
  const [backgroundColor, setBackgroundColor] = useState(guidanceData[0].color);

  const handleReportClick = (category) => {
    navigate(`/report?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="guidance-container" style={{ backgroundColor }}>
      <GuidanceCarousel
        guidanceData={guidanceData}
        onReportClick={handleReportClick}
        onSlideChange={(index) => setBackgroundColor(guidanceData[index].color)}
      />
    </div>
  );
}
