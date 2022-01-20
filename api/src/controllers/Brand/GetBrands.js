const { Brand } = require('../../db')

const getBrands = async( req, res, next ) =>{
  try{
    const brands = await Brand.findAll({order:[['name','ASC']]})
    res.send(brands)
  }
  catch(error){
    res.status(500).send(error,{
      message: `we could not get the brans right now`
    })
  }
}

module.exports = getBrands;