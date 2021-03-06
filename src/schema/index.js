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

import { dataUser, dataBucket, dataMedia } from '../lib/data'

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLInt)},
    name: {type: new GraphQLNonNull(GraphQLString)}
  }
});

const BucketType = new GraphQLObjectType({
  name: 'Bucket',
  description: '...',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLInt)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    user: {
      type: UserType,
      resolve: (root, args) => dataUser.find( x => x.id === root.user_id )
    }
  }
});

const MediaType = new GraphQLObjectType({
  name: 'Media',
  description: '...',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLInt)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    user: {
      type: UserType,
      resolve: () => {}
    },
    bucket: {
      type: BucketType,
      resolve: () => {}
    }
  }
});


const getUser = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: (_, {id}) => dataUser.find(x => x.id === id)
}


const getBucket = {
  type: BucketType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: (_, {id}) => dataBucket.find(x => x.id === id)
}

const getMedia = {
  type: MediaType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: (_, {id}) => dataMedia.find(x => x.id === id)
}


const getAllUsers = {
  type: new GraphQLList(UserType),
  resolve: () => dataUser
}

const getAllBuckets = {
  type: new GraphQLList(BucketType),
  resolve: () => dataBucket
}

const getAllMedia = {
  type: new GraphQLList(MediaType),
  resolve: () => dataMedia
}

const addUser = {
  type: UserType,
  args: {
    name: { type: GraphQLString }
  },
  resolve: (root, {name} ) => {
    const id = dataUser.length;
    const user = {
      id,
      name
    };
    dataUser.push(user);
    return user;
  }
}

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: getUser,
      bucket: getBucket,
      media: getMedia,
      users: getAllUsers,
      medias: getAllMedia,
      buckets: getAllBuckets
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      user: addUser
    }
  })
});

export default Schema;
