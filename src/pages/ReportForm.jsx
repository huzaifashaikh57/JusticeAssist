import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './ReportForm.css';

const categoryOptions = {
  "Online Financial Fraud": [
    "Aadhar Enabled Payment System (AEPS)",
    "Business Email Compromise/Email Takeover",
    "Debit/Credit Card Fraud/Sim Swap Fraud",
    "Demat/Depository Fraud",
    "E-Wallet Related Fraud",
    "Fraud Call/Vishing",
    "Internet Banking Related Fraud",
    "UPI Related Frauds",
  ],
  "Cyber Harassment": [
    "Cyber Bullying/Stalking",
    "Cyber Defamation",
    "Morphing",
    "Email Abuse",
    "Online Threat/Blackmail",
    "Social Media Abuse",
  ],
  "Cyber Crime Against Women": [
    "Sexual Harassment",
    "Obscene Content",
    "Voyeurism",
    "Non-consensual Sharing of Images",
  ],
  "Hacking/Unauthorized Access": [
    "Website Hacking",
    "Email Hacking",
    "Social Media Account Hacking",
    "Data Breach",
  ],
};

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const cities = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Pasighat"],
  "Assam": ["Guwahati", "Silchar", "Jorhat", "Dibrugarh"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Bhilai"],
  "Delhi": ["New Delhi", "Dwarka", "Saket", "Rohini"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana": ["Chandigarh", "Gurugram", "Faridabad", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli-Dharwad"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
  "Manipur": ["Imphal"],
  "Meghalaya": ["Shillong"],
  "Mizoram": ["Aizawl"],
  "Nagaland": ["Kohima"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
  "Sikkim": ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Tripura": ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Durgapur"],
  "Andaman & Nicobar": ["Port Blair"],
  "Chandigarh": ["Chandigarh"],
  "Dadra & Nagar Haveli": ["Silvassa"],
  "Daman & Diu": ["Daman", "Diu"],
  "Jammu & Kashmir": ["Srinagar", "Jammu"],
  "Ladakh": ["Leh"],
  "Lakshadweep": ["Kavaratti"],
  "Puducherry": ["Puducherry", "Mahe", "Yanam", "Karaikal"]
};

const ReportForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneCode: '+91',
    phone: '',
    state: '',
    city: '',
    category: '',
    subCategory: '',
    incidentDateTime: '',
    delay: 'No',
    platform: '',
    description: '',
    imageFile: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFormData(prev => ({ ...prev, category }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === '' || formData[key] === null) {
        if(key !== 'delay') {
        alert(`Please fill out the ${key} field.`);
        return;
        }
      }
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/report/submit-report', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        alert('Form Submitted!');
        setIsSubmitted(true); // <-- Show Download button after submit
      } else {
        alert('Form submission failed.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = '/logo.png';
  
    logo.onload = () => {
      // Add logo
      doc.addImage(logo, 'PNG', 75, 10, 60, 25);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text("Cybercrime Complaint Report", 20, 45);
  
      // Filing date
      const filingDate = new Date().toLocaleDateString();
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Date of Filing: ${filingDate}`, 160, 45, { align: "right" });
  
      // Complainant details
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text("Complainant Details", 20, 60);
  
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Name: ${formData.firstName} ${formData.lastName}`, 20, 70);
      doc.text(`Email: ${formData.email}`, 20, 78);
      doc.text(`Phone: ${formData.phoneCode}${formData.phone}`, 20, 86);
      doc.text(`State: ${formData.state}`, 20, 94);
      doc.text(`Address: ${formData.address}`, 20, 102);
  
      // Complaint details
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text("Complaint Details", 20, 118);
  
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Category: ${formData.category}`, 20, 128);
      doc.text(`Sub-Category: ${formData.subCategory}`, 20, 136);
      doc.text(`Incident Date/Time: ${formData.incidentDateTime}`, 20, 144);
      doc.text(`Delay in Reporting: ${formData.delay}`, 20, 152);
      doc.text(`Platform: ${formData.platform}`, 20, 160);
  
      // Description
      doc.text("Description:", 20, 175);
      const wrappedDesc = doc.splitTextToSize(formData.description, 170);
      doc.text(wrappedDesc, 20, 182);
  
      // Function to finalize PDF with footer
      const finalizePDF = () => {
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Generated by JusticeAssist | www.justiceassist.in", 105, 280, { align: "center" });
        doc.save("Cybercrime_Complaint_Report.pdf");
      };
  
      // Check if user uploaded an image
      if (formData.imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const imgData = e.target.result;
  
          doc.addPage(); // optional: new page for image
          doc.setFontSize(13);
          doc.setFont('helvetica', 'bold');
          doc.text("Uploaded Evidence", 20, 20);
  
          doc.addImage(imgData, 'JPEG', 15, 30, 180, 160); // adjust width/height if needed
  
          finalizePDF();
        };
        reader.readAsDataURL(formData.imageFile);
      } else {
        finalizePDF();
      }
    };
  };
  

  return (
    <div className="report-container">
      <h2 className="form-title">Cybercrime Guidance Form</h2>

      <form className="styled-form" onSubmit={handleSubmit}>
      
        <div className="form-row">
          <label>Name</label>
          <div className="form-split">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <label>Address</label>
          <input type="text" name="address" placeholder="Your residential address" value={formData.address} onChange={handleChange} required />
        </div>


        <div className="form-row">
          <label>Email</label>
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Phone</label>
          <div className="form-split">
          <input type="text"  name="phoneCode" placeholder="+91" className="short-input" value={formData.phoneCode} onChange={handleChange} required />
          <input type="text"  name="phone" placeholder="Enter your mobile number" value={formData.phone} onChange={handleChange} required />
        </div>

        </div>

        <div className="form-row">
          <label>State</label>
          <select name="state" value={formData.state} onChange={handleChange} required>
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
        <label htmlFor="city">City</label>
        <div className="floating-input">
        <select id="city" name="city" value={formData.city} onChange={handleChange} required>
            <option value="">-- Select City --</option>
            {(cities[formData.state] || []).map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

        <div className="form-row">
          <label>Complaint Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {Object.keys(categoryOptions).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {formData.category && (
          <div className="form-row">
            <label>Sub-Category</label>
            <select name="subCategory" value={formData.subCategory} onChange={handleChange} required>
              <option value="">Select Sub-Category</option>
              {categoryOptions[formData.category].map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        )}

        <div className="form-row">
          <label>Incident Date and Time</label>
          <input type="datetime-local" name="incidentDateTime" value={formData.incidentDateTime} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Is there any delay in reporting?</label>
          <div className="toggle-container">
            <input 
              type="checkbox" 
              id="delay" 
              name="delay" 
              className="toggle-input"
              checked={formData.delay === 'Yes'} 
              onChange={(e) => setFormData(prev => ({ ...prev, delay: e.target.checked ? 'Yes' : 'No' }))} 
            />
            <label htmlFor="delay" className="toggle-switch"></label>
            <span className="toggle-status">{formData.delay}</span>
          </div>
        </div>

        <div className="form-row">
          <label>Platform (e.g. Instagram, UPI app, Email, etc.)</label>
          <input type="text" name="platform" placeholder="Platform where incident occurred" value={formData.platform} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea name="description" rows="4" placeholder="Describe the incident in detail" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Upload Evidence (Image in PNG)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
           required />
        </div>


        {/* Submit Button */}
        <div className="form-actions">
    <button 
      type="submit" 
      className="submit-btn" 
    >
      SUBMIT
    </button>
    
    {/* Only show Download button after submission */}
    {isSubmitted && (
            <button type="button" className="download-btn" onClick={handleGeneratePDF}>
              DOWNLOAD PDF
            </button>
            )}
  </div>
  </form>
  </div>
  );
};

export default ReportForm;
