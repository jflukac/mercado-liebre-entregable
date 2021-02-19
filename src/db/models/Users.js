module.exports = (sequelize , dataTypes) =>{

    let alias = 'Users';
    let cols = {
        id : {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.INTEGER,
            allowNull : false
        },
        email : {
            type : dataTypes.STRING,
            allowNull : false,
            unique: true
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: dataTypes.STRING,
            allowNull: false,
            defaultValue: 'user'

        },
        avatar: {
            type: dataTypes.STRING,
            allowNull: false,
            defaultValue: '/images/users/default.png'
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATE,
        },
        deleted_at: {
            type: dataTypes.DATE,
        }
    }
    let config = {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
    }
    const Users = sequelize.define(alias, cols, config);

    return Users;
} 