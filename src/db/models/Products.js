module.exports = (sequelize , dataTypes) =>{

    let alias = 'Products';
    let cols = {
        id : {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.INTEGER,
            allowNull : false
        },
        title : {
            type : dataTypes.STRING,
            allowNull : false
        },
        description : {
            type : dataTypes.STRING,
            allowNull : true
        },
        photo:{
            type : dataTypes.STRING,
            allowNull : false
        },
        price: {
            type : dataTypes.FLOAT,
            allowNull : false
        },
        stock: {
            type : dataTypes.INTEGER,
            allowNull : false,
            defaultValue: 1
        },
        brand_id: {
            type : dataTypes.INTEGER,
            allowNull : false
        },
        category_id: {
            type : dataTypes.INTEGER,
            allowNull : false
        },
        created_at: {
            type: dataTypes.DATE,
        },
        updated_at: {
            type: dataTypes.DATE,
        },
        deleted_at: {
            type: dataTypes.DATE,
        }
    }
    let config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
    }
    const Product = sequelize.define(alias, cols, config);
    Product.associate = models =>{
        Product.belongsTo(models.Brands, {
            as : 'brand',
            foreignKey: 'brand_id'
        })
        
        Product.belongsTo(models.Categories, {
            as : 'category',
            foreignKey: 'category_id'
        })
    }

    return Product;
} 