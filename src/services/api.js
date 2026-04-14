const BASE_URL = "http://localhost:5000/api";

// Get students by batch
export const getStudents = async (batch) => {
  const res = await fetch(`${BASE_URL}/students?batch=${batch}`);
  return res.json();
};

// Upload assignment
export const uploadAssignment = async (formData) => {
  const res = await fetch(`${BASE_URL}/upload-assignment`, {
    method: "POST",
    body: formData,
  });
  return res.json();
};

// View submission
export const viewSubmission = (id) => {
  window.open(`${BASE_URL}/view/${id}`);
};