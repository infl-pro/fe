import ProductForm, {
    FileData,
    ProductFormData,
} from 'components/organisms/ProductForm';
// import { useAuthContext } from 'contexts/AuthContext';
// import { useGlobalSpinnerActionsContext } from 'contexts/GlobalSpinnerContext';
// import addProduct from 'services/products/add-product';
import { Product } from 'types';
import Axios from 'utils/Axios';
import MultipartAxios from 'utils/MultipartAxios';

interface ProductFormContainerProps {
    /**
     * 상품이 저장되었을 때의 이벤트 핸들러
     */
    onSave?: (error?: Error, product?: Product) => void;
}

/**
 * 상품 게시폼 컨테이너
 */
const ProductFormContainer = ({ onSave }: ProductFormContainerProps) => {
    // const { authUser } = useAuthContext();
    // const setGlobalSpinner = useGlobalSpinnerActionsContext();
    // 게시 버튼을 눌렀을 때
    const handleSave = async (data: ProductFormData, images: FileData[]) => {
        // if (!authUser) return;

        const product = new FormData();

        product.append('name', data.name);
        product.append('price', data.price);
        product.append('description', data.description);
        product.append('stockQuantity', data.stockQuantity);
        product.append('categoryName', data.category);
        product.append('thumbnail', data.thumbnail);
        if (images) {
            for (let i = 0; i < images.length; i++) {
                product.append('imgList', images[i].file);
            }
        }

        console.log(typeof data.thumbnail, typeof images[0]);

        // const product = {
        //     name: data.name,
        //     price: Number(data.price),
        //     description: data.description,
        //     stockQuantity: Number(data.stockQuantity),
        //     categoryName: data.category,
        //     thumbnail: data.thumbnail,
        // };

        try {
            // setGlobalSpinner(true);
            // 제품 API로 상품을 추가한다
            const response = await MultipartAxios.post(
                '/product/save',
                product,
            );
            console.log(response);
            onSave && onSave();
        } catch (err: unknown) {
            console.log(err);
            alert('상품 등록에 실패하였습니다.');
        } finally {
            // setGlobalSpinner(false);
        }
    };

    return <ProductForm onProductSave={handleSave} />;
};

export default ProductFormContainer;
