module.exports = (sequelize , dataTypes) =>{

    let alias = 'Categories';
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
        tableName: 'categories',
        timestamps: false,
    }
    const Category = sequelize.define(alias, cols, config);
    Category.associate = models =>{
        Category.hasMany(models.Products, {
            as : 'category_products',
            foreignKey: 'category_id'
        })
    }

    return Category;
} 