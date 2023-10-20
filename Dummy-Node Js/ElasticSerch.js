const { Client } = require('@elastic/elasticsearch');
const { devicemodel } = require('./device.Modal');
const elasticClient = new Client({ node: 'http://localhost:9200' });

const indexMongoDataToElasticsearch = async()=> {
    try {
      const data = await devicemodel.find().lean();
      for (const doc of data) {
        const { _id,bootstrapexpdate, ...restOfDoc } = doc;
        await elasticClient.index({
          index: 'devices_data',
          body: restOfDoc,
        });
      }
      console.log('indexing done');
    } catch (error) {
      console.error('Error indexing data to Elasticsearch:', error);
    }
}

module.exports = {
    indexMongoDataToElasticsearch,
    elasticClient
}