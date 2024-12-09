import React, { useEffect, useState } from "react"; // Thêm useState
import { useNavigate} from "react-router-dom";
import './import.component.css';
import foodImport from '../../../assets/images/food-import.jpg';
import animalImport from '../../../assets/images/animal-import.jpg';

export default function ImportComponent() {
    const [page, setPages] = useState('choice'); // Sửa lỗi thiếu useState
    const navigate = useNavigate();

    useEffect(() => {
        if (page === 'importAnimal') {
            navigate('/office/importanimal'); 
        } else if (page === 'importFood') {
            navigate('/office/importfood');
        }
    }, [page, navigate]);

    return (
        <div className="contentexport">
            {page === "choice" && ( 
                <div className="import-choice-container">
                    <button
                        className="import-type-container"
                        onClick={() => setPages('importFood')}
                    >
                        <img src={foodImport} alt="Food import Logo" className="import-type-logo" />
                        <span>Phiếu nhập thức ăn</span>
                    </button>

                    <button
                        className="import-type-container"
                        onClick={() => setPages('importAnimal')}
                    >
                        <img src={animalImport} alt="Animal import Logo" className="import-type-logo" />
                        <span>Phiếu nhập động vật</span>
                    </button>
                </div>
            )}
        </div>
    );
}
