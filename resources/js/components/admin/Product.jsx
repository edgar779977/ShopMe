import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../store/slices/category';
import Table from '../../components/components/table/Table';
import CreateProductModal from '../../components/modals/CreateProductModal';

const Product = () => {
    const dispatch = useDispatch();
    const categoriesData = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    useEffect(() => {
        if (categoriesData.category) {
            setCategories(categoriesData.category);
        }
    }, [categoriesData]);

    const categoriesWithSubCategories = useMemo(() => {
        return categories.filter(category => category.sub_categories && category.sub_categories.length > 0);
    }, [categories]);

    const [expandedCategoryId, setExpandedCategoryId] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setExpandedCategoryId(prevId => prevId === categoryId ? null : categoryId);
    };

    const handleSaveProduct = (newProduct) => {
        setCategories([...categories, newProduct]);
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'parent_id', label: 'Parent ID' },
        { key: 'created_at', label: 'Created At' },
        { key: 'updated_at', label: 'Updated At' }
    ];

    const openModal = ()=>{
        setShowModal(true)
    }

    return (
        <div>

            <CreateProductModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSaveProduct}
            />

            <Table
                columns={columns}
                data={categoriesWithSubCategories}
                expandedCategoryId={expandedCategoryId}
                handleCategoryClick={handleCategoryClick}
                subCategoriesKey="sub_categories"
                openModal={openModal}
            />
        </div>
    );
};

export default Product;
