import { IProduct, IProductsService } from '../serviceModel';
import NorthwindDbService from '../NorthwindDB/dbService';

class ProductsService implements IProductsService {

    public async getProducts(productName: string, categoryName: string, supplierName: string,
        supplierLocation: string, inventoryStatus: string, inventoryRange: string,
        discontinued: string, revenueRange: string): Promise<IProduct[]> {

        let results: IProduct[] = await NorthwindDbService.getAllProducts();
        if (productName) {
            results = results.filter(r => r.productName.toLowerCase().indexOf(productName.toLowerCase()) >= 0);
        }
        if (categoryName) {
            results = results.filter(r => r.categoryName.toLowerCase().indexOf(categoryName.toLowerCase()) >= 0);
        }
        if (supplierName) {
            results = results.filter(r => r.supplierName.toLowerCase().indexOf(supplierName.toLowerCase()) >= 0);
        }
        if (supplierLocation) {
            results = results.filter(r => r.supplierCity.toLowerCase().indexOf(supplierLocation.toLowerCase()) >= 0);
        }
        if (inventoryStatus) {
            results = results.filter(r => r.inventoryStatus.toLowerCase().indexOf(inventoryStatus.toLowerCase()) >= 0);
        }
        if (inventoryRange) {
            const range = inventoryRange.split("-");
            const min = parseInt(range[0]) || 0;;
            const max = parseInt(range[1]) || Number.MAX_VALUE;
            results = results.filter(r => r.unitsInStock >= min && r.unitsInStock <= max);
        }
        if (discontinued) {
            results = results.filter(r => r.discontinued === (discontinued.toLowerCase() === "true"));
        }
        if (revenueRange) {
            const range = revenueRange.split("-");
            const min = parseInt(range[0]) || 0;
            const max = parseInt(range[1]) || Number.MAX_VALUE
            results = results.filter(r => r.revenue >= min && r.revenue <= max);
        }
        return results;
    }

    public async getProduct(productIdOrName: string): Promise<IProduct> {

        let results: IProduct[] = [];
        if (parseInt(productIdOrName) >= 0) {

            // We have a product ID
            // results = mockResults.filter(r => r.productId === productIdOrName);

        } else {

            // We have a product name
            // const nameQuery = productIdOrName.toLowerCase().trim();
            // results = mockResults.filter(r => r.productName.toLowerCase().indexOf(nameQuery) >= 0);
        }
        return results?.length > 0 ? results[0] : null;
    }

    public async createProduct(product: IProduct) {
        product.productId = "999";
        return product;
    }

    public async updateProduct(productIdOrName: string, product: IProduct) {
        return product;
    }
}

export default new ProductsService();
