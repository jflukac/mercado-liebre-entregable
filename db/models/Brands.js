module.exports = (sequelize , dataTypes) =>{

    let alias = 'Brands';
    let cols = {
        id : {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.INTEGER,
            allowNull : false
        },
        name : {
            type : dataTypes.STRING,
            allowNull : false
        }
    }
    let config = {
        tableName: 'brands',
        timestamps: false,
    }
    const Brands = sequelize.define(alias, cols, config);
    Brands.associate = models =>{
        Brands.hasMany(models.Products, {
            as : 'brands_products',
            foreignKey: 'brand_id'
        })
    }

    return Brands;
} 