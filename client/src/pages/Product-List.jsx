import React, {Component, useEffect, useState} from 'react';
import {GetProductList} from "../APIRequest/ApiRequest";
import {useSelector} from "react-redux";
import ReactPaginate from "react-paginate";

const ProductList = (props) => {

    let [searchKeyword, setSearchKeyword] = useState("0");
    let [perPage, setPerPage] = useState(5);

    useEffect(() => {
        GetProductList(1,perPage,searchKeyword);
    },[])
    let AllProducts = useSelector ((state) => (state.product.allProducts));
    let Total = useSelector ((state) => (state.product.total));

    const handlePageClick = (event) => {
        GetProductList(event.selected+1, perPage, searchKeyword);
    }
    const perPageChange = (event) => {
        setPerPage(parseInt(event.target.value));
        GetProductList(1,event.target.value,searchKeyword);
    }
    const searchKeywordOnChnge = (event) => {
        setSearchKeyword(event.target.value);
        if ((event.target.value).length===0) {
            setSearchKeyword("0");
            GetProductList(1,perPage,"0")
        }
    }
    const searchData = (event) => {
        GetProductList(1,perPage,searchKeyword)
    }

        return (
            <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-6">
                        <h2 className="align-items-start">My Product List</h2>
                    </div>
                    <div className="col-2">
                        <select onChange={perPageChange} className="form-control form-select-sm form-select form-select-sm">
                            <option value="3">2 per page</option>
                            <option value="4">3 per page</option>
                            <option value="5">4 per page</option>
                            <option value="6">5 per page</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <div className="input-group">
                            <input onChange={searchKeywordOnChnge} type="text" className="form-control form-control-sm" placeholder="search" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button onClick={searchData} className="btn btn-danger btn-sm" type="button">Search</button>
                        </div>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Code</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            AllProducts.map((item, i) =>
                                <tr>
                                    <td>
                                        <div className="d-flex px-2 py-1">
                                            <div className="d-flex flex-column justify-content-center">
                                                <h6 className="mb-0 text-xs">{item.title}</h6>
                                                <p className="text-xs text-secondary mb-0">{item.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="text-xs fw-bold mb-0">{item.brand}</p>
                                        <p className="text-xs text-secondary mb-0">{item.price}</p>
                                    </td>
                                    <td>
                                        <p className="badge bg-gradient-success">{item.stock}</p>
                                    </td>
                                    <td>
                                        <span className="text-secondary text-xs fw-bold">{item.product_code}</span>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="container col-12 my-5">
                <nav aria-label="Page navigation example">
                    <ReactPaginate
                        previousLabel="< Previous"
                        nextLabel="next >"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={Total/perPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName="pagination"
                        activeClassName="active"
                        />
                </nav>
            </div>
            </>
        );
}


export default ProductList;
