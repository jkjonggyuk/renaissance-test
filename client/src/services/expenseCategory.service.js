import http from "../http-common";

class ExpenseCategoryService {
    getAll() {
        return http.get("/expenseCategories");
    }

    create(data) {
        return http.post("/expenseCategories", data);
    }

}

export default new ExpenseCategoryService();