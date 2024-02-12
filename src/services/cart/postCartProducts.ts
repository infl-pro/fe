import Axios from 'utils/Axios';

const postCartProducts = async () => {
    const response = await Axios.post('/cart/add', {
        productId: 50,
        quantity: 10,
    });

    console.log(response);
    return response.data;
};

export default postCartProducts;
