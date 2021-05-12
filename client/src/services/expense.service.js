import http from "../http-common";

class ExpenseService {
    getAll() {
        return http.get("/expenses");
    }

    create(data) {
        return http.post("/expenses", data);
    }

    delete(id) {
        return http.delete(`/expenses/${id}`);
    }
}

export default new ExpenseService();