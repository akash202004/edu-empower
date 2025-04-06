export const isStudentDetailsComplete = (data: Record<string, any>): boolean => {
    const requiredFields = [
      "fullName",
      "dateOfBirth",
      "gender",
      "nationality",
      "contactNumber",
      "address",
      "fatherName",
      "motherName",
      "guardianName",
      "guardianContact",
      "aboutMe",
      "tenthResult",
      "twelfthResult",
      "incomeCert",
      "domicileCert"
    ];
  
    return requiredFields.every((field) =>
      data[field] !== undefined &&
      data[field] !== null &&
      data[field].toString().trim() !== ""
    );
  };
  