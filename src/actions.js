export const CREATE_COLLECTION = 'CREATE_COLLECTION';
export const DELETE_COLLECTION = 'DELETE_COLLECTION';
export const ADD_ITEMS = 'ADD_ITEMS';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SELECT_COLLECTION = 'SELECT_COLLECTION';

export const createCollection = (name) => ({
    type: CREATE_COLLECTION,
    name
}); 
export const deleteCollection = (collectionId) => ({
    type: DELETE_COLLECTION,
    collectionId
});
export const addItems = (values) => ({
    type: ADD_ITEMS,
    values
});
export const removeItem = (value, collectionId) => ({
    type: REMOVE_ITEM,
    value,
    collectionId
});
export const selectCollection = (collectionId) => ({
    type: SELECT_COLLECTION,
    collectionId
});
