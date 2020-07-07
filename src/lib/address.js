export default {
    getFullAddress({country, region, city, address}) {
        return this.join([country, region, city, address], ", ");
    },
    getFullDadataAddress(data) {
        let address = this.getObjectDadataAddress(data);
        return this.getFullAddress(address);
    },
    getObjectDadataAddress(data) {
        return {
            country: data.country,
            region: data.region,
            city: data.city,
            address: this.getDadataAddress(data),
            latitude: data.geo_lat,
            longitude: data.geo_lon,
        };
    },
    getDadataAddress(data) {
        let street = data.street_with_type;
        let house = this.join([data.house_type, data.house], " ");
        let block = this.join([data.block_type, data.block], " ");
        return this.join([street, house, block], ", ");
    },
    join(address, delimeter) {
        return address.filter(item => item).join(delimeter);
    },
};
