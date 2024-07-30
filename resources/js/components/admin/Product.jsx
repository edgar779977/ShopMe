import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../store/slices/category';
import Table from '../../components/components/table/Table';

const Product = () => {
    const dispatch = useDispatch();
    const categoriesData = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);

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

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'parent_id', label: 'Parent ID' },
        { key: 'created_at', label: 'Created At' },
        { key: 'updated_at', label: 'Updated At' }
    ];



    return (
        <div>
            <Table
                columns={columns}
                data={categoriesWithSubCategories}
                expandedCategoryId={expandedCategoryId}
                handleCategoryClick={handleCategoryClick}
                subCategoriesKey="sub_categories"
            />
        </div>
    );
};

export default Product;
