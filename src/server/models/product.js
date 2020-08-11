const paginate = (array, limit, page) => {
  return array.slice((page - 1) * limit, page * limit);
}

module.exports = {
  paginate,
}
