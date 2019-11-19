import React from 'react';
import PropTypes from 'prop-types';
import "./ShoppingList.css"

const ShoppingList = props => {
    return (
        <table border={1}>
            <thead>
            <tr>
                {
                    props.categories.map((category, index) =>
                        <th key={index}>
                            {category.name}
                            <div className="Delete" onClick={() => props.onCategoryDelete(index)}>X</div>
                        </th>)
                }
                {
                    props.categories.length < 5 &&
                    <th>
                        <div>
                            <button onClick={props.onCategoryAdd}>Dodaj kategorię</button>
                        </div>
                    </th>
                }
            </tr>
            </thead>
            <tbody>
            <tr>
                {
                    props.categories.map((category, categoryIndex) =>
                        <td key={categoryIndex} valign="top">
                            {
                                category.itemList.map((item, itemIndex) =>
                                    <div key={item.name + itemIndex} className="Item">
                                        <div
                                            className={item.checked ? "Item--crossed" : ""}
                                            onClick={() => props.onItemCheck(itemIndex, categoryIndex)}
                                        >
                                            {item.name}
                                        </div>
                                        <div
                                            className="Delete"
                                            onClick={() => props.onItemDelete(itemIndex, categoryIndex)}
                                        >
                                            X
                                        </div>
                                    </div>
                                )
                            }
                            {
                                category.itemList.length < 20 &&
                                <div>
                                    <button onClick={() => props.onItemAdd(categoryIndex)}>Dodaj przedmiot</button>
                                </div>
                            }
                        </td>
                    )
                }
            </tr>
            </tbody>
        </table>
    );
};

ShoppingList.propTypes = {
    categories: PropTypes.arrayOf({
        name: PropTypes.string.isRequired,
        itemList: PropTypes.arrayOf({
            name: PropTypes.string.isRequired,
            checked: PropTypes.bool.isRequired
        }).isRequired
    }).isRequired,
    onCategoryAdd: PropTypes.func,
    onCategoryDelete: PropTypes.func,
    onItemAdd: PropTypes.func,
    onItemCheck: PropTypes.func,
    onItemDelete: PropTypes.func
};

export default ShoppingList;