import React from 'react';
import PropTypes from 'prop-types';
import "./ShoppingList.css"

const ShoppingList = props => {
    return (
        <table border={1}>
            <tr>
                {
                    props.categories.map(category => <th>{category.name}</th>)
                }
                <th>
                    <button onClick={props.onCategoryAdd}>Dodaj kategorię</button>
                </th>
            </tr>
            <tr>
                {
                    props.categories.map((category, categoryIndex) =>
                        <td valign="top">
                            {
                                category.itemList.map((item, itemIndex) =>
                                    <div className="Item">
                                        <div
                                            className={item.checked ? "Item--crossed" : ""}
                                            onClick={() => props.onItemCheck(itemIndex, categoryIndex)}
                                        >
                                            {item.name}
                                        </div>
                                        <div
                                            className={"DeleteItem"}
                                            onClick={() => props.onItemDelete(itemIndex, categoryIndex)}
                                        >
                                            X
                                        </div>
                                    </div>
                                )
                            }
                            <tr>
                                <button onClick={() => props.onItemAdd(categoryIndex)}>Dodaj przedmiot</button>
                            </tr>
                        </td>
                    )
                }
            </tr>
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
    onItemAdd: PropTypes.func,
    onItemCheck: PropTypes.func,
    onItemDelete: PropTypes.func
};

export default ShoppingList;