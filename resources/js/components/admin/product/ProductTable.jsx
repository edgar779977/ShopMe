import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../../store/slices/category';
import style from './ProductTable.module.scss';

const ProductTable = () => {
    const dispatch = useDispatch();
    const categoriesData = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    useEffect(() => {
        // Update categories state when categoriesData changes
        if (categoriesData.category) {
            setCategories(categoriesData.category);
        }
    }, [categoriesData]);

    const categoriesWithSubCategories = useMemo(() => {
        // Memoize categories with subcategories to prevent unnecessary recalculations
        return categories.filter(category => category.sub_categories && category.sub_categories.length > 0);
    }, [categories]);

    const [expandedCategoryId, setExpandedCategoryId] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setExpandedCategoryId(prevId => prevId === categoryId ? null : categoryId);
    };

    const renderSubCategories = (subCategories) => {
        if (!subCategories || subCategories.length === 0) {
            return null;
        }

        return (
            <table className={style['sub-categories-table']}>
                <tbody>
                {subCategories.map((subCategory) => (
                    <tr key={subCategory.id}>
                        <td>{subCategory.id}</td>
                        <td>{subCategory.name}</td>
                        <td>{subCategory.parent_id}</td>
                        <td>{subCategory.created_at}</td>
                        <td>{subCategory.updated_at}</td>
                        <td>{renderSubCategories(subCategory.sub_categories)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const renderTableRows = () => {
        return categoriesWithSubCategories.map((category) => (
            <React.Fragment key={category.id}>
                <tr
                    className={style['category-row']}
                    style={{ background: expandedCategoryId === category.id ? 'red' : 'inherit' }}
                    onClick={() => handleCategoryClick(category.id)}
                >
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.parent_id}</td>
                    <td>{category.created_at}</td>
                    <td>{category.updated_at}</td>
                </tr>
                {expandedCategoryId === category.id && category.sub_categories && (
                    <tr className={style['sub-categories-row']}>
                        <td colSpan="5">
                            {renderSubCategories(category.sub_categories)}
                        </td>
                    </tr>
                )}
            </React.Fragment>
        ));
    };

    return (
        <div>
            <table className={style['main-table']}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Parent ID</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                </tr>
                </thead>
                <tbody>
                {renderTableRows()}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
