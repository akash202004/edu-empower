import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fundraiserService } from "../../api/fundraiserService";
import { FundraiserFormComponent } from "./FundraiserFormComponent.jsx";

export const CrowdFundingForm = () => {
  const { id } = useParams(); 
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(!!id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fundraiserService.getFundraiserById(id);
        setInitialData(data);
      } catch (err) {
        console.error("Failed to fetch fundraiser:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Fundraiser" : "Create Fundraiser"}
      </h1>

      {isLoading ? (
        <p>Loading fundraiser data...</p>
      ) : (
        <FundraiserFormComponent initialData={initialData} />
      )}
    </div>
  );
};
