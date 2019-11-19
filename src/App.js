import React from 'react';
import ShoppingList from "./ShoppingList/ShoppingList";

let sampleData = [
    {
        name: "Nabiał",
        itemList: [{name: "Śmietana", checked: false}, {name: "Mleko", checked: false}, {name: "Twarożek", checked: false}]
    },
    {
        name: "Pieczywo",
        itemList: [{name: "Chleb", checked: false}, {name: "4 Bułki", checked: false}]
    },
    {
        name: "Chemia",
        itemList: [{name: "Proszek do prania", checked: false}]
    }
];

class App extends React.Component {
    state = {
        categories: sampleData
    };

    checkItem(itemIndex, categoryIndex) {
        let categories = [...this.state.categories];
        categories[categoryIndex].itemList[itemIndex].checked = !categories[categoryIndex].itemList[itemIndex].checked
        this.setState({
            ...this.state,
            categories
        })
    }

    deleteItem(itemIndex, categoryIndex) {
        let categories = [...this.state.categories];
        categories[categoryIndex].itemList =
            categories[categoryIndex].itemList.filter((item, index) => itemIndex !== index);
        this.setState({
            ...this.state,
            categories
        })
    }

    render() {
        return (
            <div>
                <ShoppingList
                    categories={this.state.categories}
                    onItemCheck={this.checkItem.bind(this)}
                    onItemDelete={this.deleteItem.bind(this)}
                />
            </div>
        );
    }
}

export default App;
