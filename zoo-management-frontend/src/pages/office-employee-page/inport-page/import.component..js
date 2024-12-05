import React from "react";
import './import.component.css';
import foodImport from '../../../assets/images/food-import.jpg'
import animalImport from '../../../assets/images/animal-import.jpg'

export default function ImportComponent() {
    return (
        <div className="import-container">
            <div className="import-type-container">
                <img src={foodImport} alt="Food import Logo" className="import-type-logo" />
                <span>Phiếu nhập thức ăn</span>
            </div>
            
            <div className="import-type-container">
                <img src={animalImport} alt="Food import Logo" className="import-type-logo" />
                <span>Phiếu nhập động vật</span>
            </div>
        </div>
    );
}