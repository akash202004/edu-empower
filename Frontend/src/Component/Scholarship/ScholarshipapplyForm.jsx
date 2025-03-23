import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useState } from "react";

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
    tenthResult: null, 
    twelfthResult: null, 
    incomeCert: null, 
    verified: false,
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, type, checked, files, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  // Upload File to Cloudinary
  const uploadToCloudinary = async (file) => {
    if (!file) return null;
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "Eduempower");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/pahari/raw/upload",
        uploadData
      );
      console.log(`Uploaded ${file.name}:`, response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error.response?.data || error);
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
      console.log("Uploading files to Cloudinary...");

      const [tenthResultUrl, twelfthResultUrl, incomeCertUrl] = await Promise.all([
        uploadToCloudinary(formData.tenthResult),
        uploadToCloudinary(formData.twelfthResult),
        uploadToCloudinary(formData.incomeCert),
      ]);

      if (!tenthResultUrl || !twelfthResultUrl || !incomeCertUrl) {
        alert("File upload failed. Please try again.");
        return;
      }

      const submissionData = {
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        nationality: formData.nationality,
        contactNumber: String(formData.contactNumber),
        address: formData.address,
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        scholarshipReason: formData.scholarshipReason,
        careerGoals: formData.careerGoals,
        otherScholarships: formData.otherScholarships,
        tenthResult: tenthResultUrl,
        twelfthResult: twelfthResultUrl,
        incomeCert: incomeCertUrl,
      };

      console.log("Submitting data to backend:", submissionData);

      const response = await axios.post("http://localhost:3000/api/students", submissionData);
      console.log("Form submitted successfully:", response.data);

      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error);
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

        {/* Nationality */}
        <div>
          <label className="block font-medium">Nationality</label>
          <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"/>
        </div>

        {/* Contact */}
        <div>
          <label className="block font-medium">Mobile No</label>
          <input type="number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"/>
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="block font-medium">Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"/>
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
