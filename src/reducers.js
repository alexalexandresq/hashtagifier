import {
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  ADD_ITEMS,
  SELECT_COLLECTION,
  REMOVE_ITEM
} from "./actions";
import update from "immutability-helper";

const initialState = {
  lastId: Number(localStorage.getItem("lastId")) || 0,
  currentCollection: Number(localStorage.getItem("currentCollection")) || 0,
  collections: JSON.parse(localStorage.getItem("collections")) || [
    {
      id: 0,
      name: "Default",
      values: []
    }
  ]
};

export function appState(state = initialState, action) {
  switch (action.type) {
    case CREATE_COLLECTION: {
      const newId = state.lastId + 1;
      localStorage.setItem("lastId", newId);
      return update(state, {
        lastId: { $set: newId },
        collections: {
          $push: [{ id: newId, name: action.name, values: [] }]
        }
      });
    }
    case DELETE_COLLECTION:
      let newCurrentCollection = state.currentCollection;
      const filteredCollection = state.collections.filter(
        collection => collection.id !== action.collectionId
      );
      if(state.currentCollection === action.collectionId) {
        newCurrentCollection = filteredCollection[filteredCollection.length - 1].id;
        localStorage.setItem("currentCollection", newCurrentCollection);
      }
      return update(state, {
        collections: {
          $set: filteredCollection
        },
        currentCollection: {
          $set: newCurrentCollection
        }
      });
    case SELECT_COLLECTION:
      localStorage.setItem("currentCollection", action.collectionId);
      return update(state, {
        currentCollection: {
          $set: Number(action.collectionId)
        }
      });
    case ADD_ITEMS: {
      const newCollections = state.collections.map(collection => {
        if (collection.id === state.currentCollection) {
          const set = new Set([...collection.values, ...action.values]);
          return update(collection, {
            values: {
              $set: [...set]
            }
          });
        }
        return collection;
      });
      return update(state, {
        collections: {
          $set: newCollections
        }
      });
    }
    case REMOVE_ITEM: {
      const newCollections = state.collections.map(collection => {
        if (collection.id === action.collectionId) {
          const set = new Set(collection.values);
          set.delete(action.value);
          return update(collection, {
            values: {
              $set: [...set]
            }
          });
        }
        return collection;
      });
      return update(state, {
        collections: {
          $set: newCollections
        }
      });
    }
    default:
      return state;
  }
}
