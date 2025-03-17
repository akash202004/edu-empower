import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";

const ScholarshipApplyForm = () => {
  const { isSignedIn, user } = useUser();
  
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "Not Specified",
    nationality: "",
    contactNumber: "",
    address: "",
    fatherName: "",
    motherName: "",
    scholarshipReason: "",
    careerGoals: "",
    otherScholarships: false,
    tenthResult: null,  // File
    twelfthResult: null, // File
    incomeCert: null, // File
    verified: false,
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : e.target.value,
    });
  };

  // Function to Upload File to Cloudinary
  const uploadToCloudinary = async (file) => {
    if (!file) return null; // Skip if no file selected

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Eduempower"); // Set in Cloudinary

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/pahari/raw/upload`, 
        formData
      );
      return response.data.secure_url; // URL of uploaded file
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      return null;
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.verified) {
      alert("Please confirm that the details provided are correct.");
      return;
    }

    try {
      // Upload files to Cloudinary
      const tenthResultUrl = await uploadToCloudinary(formData.tenthResult);
      const twelfthResultUrl = await uploadToCloudinary(formData.twelfthResult);
      const incomeCertUrl = await uploadToCloudinary(formData.incomeCert);

      // Ensure all uploads succeeded
      if (!tenthResultUrl || !twelfthResultUrl || !incomeCertUrl) {
        alert("File upload failed. Please try again.");
        return;
      }

      // Prepare Data for Submission
      const submissionData = {
        ...formData,
        tenthResult: tenthResultUrl,
        twelfthResult: twelfthResultUrl,
        incomeCert: incomeCertUrl,
      };

      // Send Data to Backend API
      const response = await axios.post("http://localhost:3000/api/students", submissionData);
      console.log("Form submitted successfully:", response.data);

      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the application. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mt-20 text-center">Scholarship Application</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div>
          <label className="block font-medium">Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"/>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block font-medium">Date of Birth</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"/>
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
            <option value="Not Specified">Not Specified</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="block font-medium">Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"/>
        </div>

        {/* Father's Name */}
        <div>
          <label className="block font-medium">Father's Name</label>
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"/>
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block font-medium">Mother's Name</label>
          <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"/>
        </div>

        {/* File Uploads */}
        <div className="col-span-2">
          <label className="block font-medium">Upload 10th Grade Result</label>
          <input type="file" name="tenthResult" accept=".pdf,.jpg,.png" onChange={handleChange} required />
        </div>

        <div className="col-span-2">
          <label className="block font-medium">Upload 12th Grade Result</label>
          <input type="file" name="twelfthResult" accept=".pdf,.jpg,.png" onChange={handleChange} required />
        </div>

        <div className="col-span-2">
          <label className="block font-medium">Upload Income Certificate</label>
          <input type="file" name="incomeCert" accept=".pdf,.jpg,.png" onChange={handleChange} required />
        </div>

        {/* Confirmation Checkbox */}
        <div className="flex items-center col-span-2">
          <input type="checkbox" name="verified" checked={formData.verified} onChange={handleChange} />
          <label className="ml-2">I confirm that the details provided are correct</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="col-span-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ScholarshipApplyForm;
