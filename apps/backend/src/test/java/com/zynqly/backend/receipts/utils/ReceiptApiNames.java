package com.zynqly.backend.receipts.utils;

public class ReceiptApiNames {

    public static final String apiURL = "/api/v1/receipts/";

    public static String apiURL(int id) {
        return apiURL + "%d".formatted(id);
    }

    public static String apiURL(String id) {
        return apiURL + id;
    }
}
