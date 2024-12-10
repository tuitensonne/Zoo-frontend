import axios from "axios";

const API_BASE_URL = "http://localhost:8088"; // Thay đổi theo địa chỉ BE của bạn

export const getHealthRecords = async (page = 1, pageSize = 5, searchId = null, searchName = "") => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ho-so-suc-khoe/all`, {
        params: { page, pageSize, searchId, searchName },});
    console.log("Dữ liệu từ BE:", response.data);
    return response.data; // Dữ liệu từ BE trả về
  } catch (error) {
    console.error("Error fetching health records:", error);
    throw error;
  }
};

export const getHealthRecordsDetails = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/ho-so-suc-khoe/details/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Lỗi khi tải hồ sơ sức khỏe."
        );
    }
};

// Hàm tạo mới một hồ sơ điều trị
export const createTreatment = async (treatmentData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/lich-su-dieu-tri/create`, treatmentData);
        return response.data; // Trả về dữ liệu từ BE
    } catch (error) {
        throw new Error(
        error.response?.data?.message || "Lỗi khi tạo điều trị."
        );
    }
};

export const createVaccination = async (vaccinationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/lich-su-tiem-chung/create`, vaccinationData);
        return response.data;  // Trả về dữ liệu khi lưu thành công
    } catch (error) {
        throw new Error(error.response?.data?.message || "Lỗi khi lưu tiêm chủng");
    }
};