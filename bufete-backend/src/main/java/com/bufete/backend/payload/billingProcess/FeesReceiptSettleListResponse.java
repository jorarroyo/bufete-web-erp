package com.bufete.backend.payload.billingProcess;

import java.io.Serializable;
import java.util.List;

public class FeesReceiptSettleListResponse implements Serializable {

    private List<FeesReceiptSettleResponse> attorneys;
    private List<ActivitiesReceiptSettleResponse> activities;
    private List<StampReceiptSettleResponse> stamps;
    private List<ExpensesReceiptSettleResponse> expenses;

    public FeesReceiptSettleListResponse(List<FeesReceiptSettleResponse> attorneys,
                                         List<ActivitiesReceiptSettleResponse> activities,
                                         List<StampReceiptSettleResponse> stamps,
                                         List<ExpensesReceiptSettleResponse> expenses) {
        this.attorneys = attorneys;
        this.activities = activities;
        this.stamps = stamps;
        this.expenses = expenses;
    }

    public FeesReceiptSettleListResponse() {
    }

    public List<FeesReceiptSettleResponse> getAttorneys() {
        return attorneys;
    }

    public void setAttorneys(List<FeesReceiptSettleResponse> attorneys) {
        this.attorneys = attorneys;
    }

    public List<ActivitiesReceiptSettleResponse> getActivities() {
        return activities;
    }

    public void setActivities(List<ActivitiesReceiptSettleResponse> activities) {
        this.activities = activities;
    }

    public List<StampReceiptSettleResponse> getStamps() {
        return stamps;
    }

    public void setStamps(List<StampReceiptSettleResponse> stamps) {
        this.stamps = stamps;
    }

    public List<ExpensesReceiptSettleResponse> getExpenses() { return expenses; }

    public void setExpenses(List<ExpensesReceiptSettleResponse> expenses) { this.expenses = expenses; }
}
