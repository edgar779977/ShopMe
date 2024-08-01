import React from 'react';
import PropTypes from 'prop-types';
import style from './Table.module.scss';

const Table = ({ columns, data, renderRowActions = null, expandedCategoryId, handleCategoryClick = null, subCategoriesKey = null }) => {
    return (
        <table className={`table table-hover ${style.table}`}>
            <thead className='text-center'>
            <tr>
                {columns.map(column => (
                    <th key={column.key}>{column.label}</th>
                ))}
                {renderRowActions && <th>Actions</th>}
            </tr>
            </thead>
            <tbody className='text-center'>
            {data.map(row => (
                <React.Fragment key={row.id}>
                    <tr
                        className={`${style['category-row']} ${expandedCategoryId === row.id ? style['expanded-category'] : ''}`}
                        onClick={() => handleCategoryClick(row.id)}
                    >
                        {columns.map(column => (
                            <td className={`${style['category-row']} ${expandedCategoryId === row.id ? style['expanded-category'] : ''}`} key={column.key}>
                                {column.render ? column.render(row) : row[column.key]}
                            </td>
                        ))}
                        {renderRowActions && (
                            <td>
                                {renderRowActions(row)}
                            </td>
                        )}
                    </tr>
                    {expandedCategoryId === row.id && row[subCategoriesKey] && (
                        <tr className={style['sub-categories-row']}>
                            <td colSpan={columns.length + (renderRowActions ? 1 : 0)}>
                                <table className={`table ${style.table}`}>
                                    <thead>
                                    <tr>
                                        {columns.map(column => (
                                            <th key={column.key}>{column.label}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {row[subCategoriesKey].map(subRow => (
                                        <tr key={subRow.id} className={style['expanded-sub-category']}>
                                            {columns.map(column => (
                                                <td key={column.key}>
                                                    {column.render ? column.render(subRow) : subRow[column.key]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    )}
                </React.Fragment>
            ))}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        render: PropTypes.func,
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    renderRowActions: PropTypes.func,
    expandedCategoryId: PropTypes.number,
    handleCategoryClick: PropTypes.func,
    subCategoriesKey: PropTypes.string,
};

export default Table;
