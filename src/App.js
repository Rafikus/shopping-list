import React from 'react';
import ShoppingList from "./ShoppingList/ShoppingList";
import Modal from "./Modal/Modal";

class App extends React.Component {
    state = {
        categories: [],
        newInput: "",
        validationError: "",
        validated: false,
        isAddCategoryModalOpen: false,
        isAddItemModalOpen: false,
        addItemToCategoryIndex: undefined
    };

    showAddCategoryModal() {
        this.setState({
            isAddCategoryModalOpen: true,
        });
    }

    showAddItemModal(categoryIndex) {
        this.setState({
            isAddItemModalOpen: true,
            addItemToCategoryIndex: categoryIndex
        });
    }

    deleteCategory(categoryIndex) {
        this.setState({
            categories: this.state.categories.filter((_, index) => index !== categoryIndex)
        });
    }

    saveNewCategory() {
        if(!this.state.validated) return;
        let categories = [...this.state.categories, {name: this.state.newInput, itemList: []}];
        this.setState({
            categories,
            isAddCategoryModalOpen: false,
        });
        this.resetInput();
    }

    saveNewItem() {
        if(!this.state.validated) return;
        let categories = [...this.state.categories];
        categories[this.state.addItemToCategoryIndex].itemList.push({name: this.state.newInput, checked: false});
        this.setState({
            categories,
            isAddItemModalOpen: false
        });
        this.resetInput();
    }

    checkItem(itemIndex, categoryIndex) {
        let categories = [...this.state.categories];
        categories[categoryIndex].itemList[itemIndex].checked = !categories[categoryIndex].itemList[itemIndex].checked
        this.setState({
            categories
        });
    }

    deleteItem(itemIndex, categoryIndex) {
        let categories = [...this.state.categories];
        categories[categoryIndex].itemList =
            categories[categoryIndex].itemList.filter((item, index) => itemIndex !== index);
        this.setState({
            categories
        });
    }

    updateInput(event) {
        let name = event.target.value;
        this.setState({newInput: name});
        if (name.length < 3) {
            this.setState({validationError: "Nazwa jest za krótka", validated: false});
            return;
        }
        if (name.length > 20) {
            this.setState({validationError: "Nazwa jest za długa", validated: false});
            return;
        }
        this.setState({validated: true, validationError: ""});
    }

    resetInput() {
        this.setState({validated: false, validationError: ""});
    }

    render() {
        return (
            <div>
                <ShoppingList
                    categories={this.state.categories}
                    onCategoryAdd={this.showAddCategoryModal.bind(this)}
                    onCategoryDelete={this.deleteCategory.bind(this)}
                    onItemAdd={this.showAddItemModal.bind(this)}
                    onItemCheck={this.checkItem.bind(this)}
                    onItemDelete={this.deleteItem.bind(this)}
                />

                <Modal onClose={() => this.setState({isAddItemModalOpen: false})}
                       onChange={this.updateInput.bind(this)}
                       isOpen={this.state.isAddItemModalOpen}
                       onSubmit={() => this.saveNewItem()}
                       validationError={this.state.validationError}
                       title={"Dodaj przedmiot"}
                />

                <Modal onClose={() => this.setState({isAddCategoryModalOpen: false})}
                       onChange={this.updateInput.bind(this)}
                       isOpen={this.state.isAddCategoryModalOpen}
                       onSubmit={() => this.saveNewCategory()}
                       validationError={this.state.validationError}
                       title={"Dodaj kategorię"}
                />
            </div>
        );
    }
}

export default App;
