import React, { useEffect, useState } from "react"; // Thêm useState
import { useNavigate, Routes, Route, Outlet } from "react-router-dom";
import './import.component.css';
import foodImport from '../../../assets/images/food-import.jpg';
import animalImport from '../../../assets/images/animal-import.jpg';
import ImportAnimalComponent from "./import-food/import-food.component";
import ImportFoodComponent from "./import-animal/import-animal.component";

export default function ImportComponent() {
    const [page, setPages] = useState('choice'); // Sửa lỗi thiếu useState
    const navigate = useNavigate();

    useEffect(() => {
        if (page === 'importAnimal') {
            navigate('/office/import/animal'); 
        } else if (page === 'importFood') {
            navigate('/office/import/food');
        }
    }, [page, navigate]);

    return (
        <div className="contentexport">
            {page === "choice" && ( 
                <div className="import-choice-container">
                    <button
                        className="import-type-container"
                        onClick={() => setPages('importAnimal')}
                    >
                        <img src={foodImport} alt="Food import Logo" className="import-type-logo" />
                        <span>Phiếu nhập thức ăn</span>
                    </button>

                    <button
                        className="import-type-container"
                        onClick={() => setPages('importFood')}
                    >
                        <img src={animalImport} alt="Animal import Logo" className="import-type-logo" />
                        <span>Phiếu nhập động vật</span>
                    </button>
                </div>
            )}

            <Routes>
                <Route path="food" element={<ImportFoodComponent/>} />  {}
                <Route path="animal" element={<ImportAnimalComponent/>} />  {}
            </Routes>
            <Outlet/>
        </div>
    );
}
