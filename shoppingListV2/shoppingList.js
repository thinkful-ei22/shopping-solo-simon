/*eslint-env jquery*/

'use strict';


/* --BREAK-- */


// Our data structure;
const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

// Returns our <li> elements;
const generateItemElement = function(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
        </button>
      </div>
    </li>`;
};

// Use function above to create <li> elements for each item of our STORE array;
const generateShoppingItemsString = function(shoppingList) {
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
};

// Place <li> elements array from above, into our HTML (render on page);
const renderShoppingList = function() {
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
};

// Get index number from <li> element;
const getItemIndexFromElement = function(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
};


/* --ADD ITEM-- */


// Push new item into STORE;
const addItemToShoppingList = function(itemName) {
  STORE.push({name: itemName, checked: false});
};

// Get data from input('Add item') and use function above to push into store, then render on page;
const handleNewItemSubmit = function() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
};


/* --CHECK ITEM-- */


// Changes checked value of elements in STORE to opposite value;
const toggleCheckedForListItem = function(itemIndex) {
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
};

// On button check click, toggle checked value at index and render;
const handleItemCheckClicked = function() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
};


/* --DELETE ITEM-- */


// Deletes <li> element at index;
const deleteItem = function(itemIndex) {
  STORE.splice(itemIndex, 1);
};

// On button delete click, delete button at index and render;
const handleDeleteItemClicked = function() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItem(itemIndex);
    renderShoppingList();
  });
};


/* --HIDE&UNHIDE CHECKED-- */


// Returns and inserts HTML elemnts to create hide button;
const generateHideUnhideButton = function() {
};

// On button hide click, hide checked items. Click again to unhide;
const handleHideClicked = function() {
};


/* --FILTER BY SUBMIT-- */ // CSS:hidden


// When words are typed into search bar, displayed list will filter if they contain typed sequence;
const displaySearchItems = function() {
};


/* --EDIT ITEM-- */ 


//Edits <li> element at index;
const editItem = function(itemIndex, promptText) {
  STORE[itemIndex].name = promptText;
};

// On button edit click, get input from prompt window, then change item text at index and render;
const handleEditClicked = function() {
  $('.js-shopping-list').on('click', '.js-item-edit', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    const promptText = prompt('Edit item text:');
    editItem(itemIndex, promptText);
    renderShoppingList();
  });
};


/* --CALLS-- */


const handleShoppingList = function() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditClicked();
};

$(handleShoppingList());