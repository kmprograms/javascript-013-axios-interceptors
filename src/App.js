import React, {useState} from 'react';
import axios from "axios";

// >> npm install axios

const App = (props) => {

    const [products, setProducts] = useState([])

    // REQUEST INTERCEPTOR - PRZECHWYCENIE REQUESTA ZANIM ZOSTANIE WYSLANY
    axios.interceptors.request.use(function (config) {
        const token = '1111-2222-3333-4444';
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    }, error => {
        return Promise.reject(error);
    });

    // RESPONSE INTERCEPTOR - PRZECHWYCENIE RESPONSE ZANIM ZOSTANIE PRZETWORZONY
    axios.interceptors.response.use((response) => {
        response.data = response.data.map(product => ({...product, ...{name: product.name.toLowerCase()}}));
        return response;
    }, error => {
        return Promise.reject(error);
    });

    const getProducts = async () => {
        const response = await axios
            .get('http://localhost:8080/products')
            .catch(err => console.log(err));
        setProducts(response.data);
    }

    return <div>
        <button onClick={getProducts} className="btn btn-success my-5">GET PRODUCTS</button>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>PRICE</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                </tr>)}
            </tbody>
        </table>
    </div>

}
export default App;
