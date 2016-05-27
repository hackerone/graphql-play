import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import Items from '../lib/items';

const items = new Items();

const itemType = new GraphQLObjectType({
  name: 'Item',
  description: 'An item.',
  fields: {
    id: {
      description: 'The items id.',
      type: GraphQLInt
    },
    name: {
      description: 'The items name.',
      type: GraphQLString
    }
  }
});

const itemList = new GraphQLObjectType({
  name: 'ItemList',
  description: 'items',
  type: itemList,
  fields: {
    items: {
      description: '...',
      type: new GraphQLList(itemType)
    }
  }
})

export const getItemField = {
  description: 'Get an item by id.',
  type: itemType,
  args: {
    id: {
      description: 'ID of the item to retreive.',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: (root, {id}) => items.getById(id)
};

export const getAllItems = {
  description: 'Get all items',
  type: itemList,
  resolve: (root) => {
    return items.getAll()
  }
}
