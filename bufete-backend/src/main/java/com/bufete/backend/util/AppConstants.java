package com.bufete.backend.util;

public interface AppConstants {
    String DEFAULT_PAGE_NUMBER = "0";
    String DEFAULT_PAGE_SIZE = "10";

    int MAX_PAGE_SIZE = 50;

    int CLIENT = 1;
    int LAWYER = 2;
    int ADMON = 3;
    int OPPONENT_CLIENT = 4;
    int OPPONENT_LAWYER = 5;

    int REQUEST = 21;
    int INVENTORY_OUT = 22;
    int INVENTORY_IN = 23;

    long LAWYER_POSSITION = 1;
    long ADMON_POSSITION = 2;
}
