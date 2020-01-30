require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";

const PORT = process.env.PORT || 4000;

const typeDefs = `
    type Query{
        hello: String!
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hi"
    }
};

// type 정의와 resolver들이 필요
const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: PORT }, () => {
    console.log(`server running on port: http://localhost:${PORT}`);
});
