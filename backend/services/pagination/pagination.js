module.exports.pagination = data =>{
    const totalPage = Math.ceil(data.count / data.perPage);
    const totalPerpage = data.perPage;
    const currentPage = data.page;
    const previousPage = currentPage ==1 ? null : currentPage - 1;
    const nextPage = currentPage == totalPage ? null : currentPage +1;

    const result = {
        data:data.data,
        pagination:{
            totalRecords: data.count,
            totalPerpage: totalPerpage,
            totalPage,
            currentPage,
            nextPage,
            previousPage
        }
    };
    return result;
}